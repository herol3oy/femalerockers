"use server";

import { randomBytes } from "node:crypto";
import { and, count, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import {
  usersTable,
  waitlistEntriesTable,
  waitlistInvitationsTable,
} from "@/app/db/schema";
import { sendWaitlistInvitation } from "@/lib/brevo";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" } as const;
  }

  const adminRows = await db
    .select({
      role: usersTable.role,
      deactivatedAt: usersTable.deactivatedAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (
    adminRows.length === 0 ||
    adminRows[0].role !== "admin" ||
    adminRows[0].deactivatedAt
  ) {
    return { error: "Forbidden" } as const;
  }

  return { user } as const;
}

function generateToken(): string {
  return randomBytes(32).toString("hex");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type InviteResult = {
  email: string;
  status: "sent" | "skipped" | "failed";
  error?: string;
};

export async function sendBulkInvitations(rawEmails: string[]) {
  const result = await requireAdmin();
  if ("error" in result) return { error: result.error };

  const emails = [
    ...new Set(
      rawEmails
        .map((e) => e.trim().toLowerCase())
        .filter((e) => e.length > 0 && isValidEmail(e)),
    ),
  ];

  if (emails.length === 0) {
    return { error: "No valid emails provided" };
  }

  const results: InviteResult[] = [];

  for (const email of emails) {
    const existing = await db
      .select({ id: waitlistInvitationsTable.id })
      .from(waitlistInvitationsTable)
      .where(
        and(
          eq(waitlistInvitationsTable.email, email),
          sql`${waitlistInvitationsTable.status} IN ('pending', 'sent')`,
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      results.push({ email, status: "skipped" });
      continue;
    }

    const token = generateToken();

    const [inserted] = await db
      .insert(waitlistInvitationsTable)
      .values({
        email,
        token,
        source: "admin",
        status: "pending",
      })
      .returning({ id: waitlistInvitationsTable.id });

    const sendResult = await sendWaitlistInvitation(email, token);

    if (sendResult.success) {
      await db
        .update(waitlistInvitationsTable)
        .set({ status: "sent", sentAt: new Date() })
        .where(eq(waitlistInvitationsTable.id, inserted.id));
      results.push({ email, status: "sent" });
    } else {
      await db
        .update(waitlistInvitationsTable)
        .set({
          status: "failed",
          errorMessage: sendResult.error,
        })
        .where(eq(waitlistInvitationsTable.id, inserted.id));
      results.push({ email, status: "failed", error: sendResult.error });
    }
  }

  const invited = results.filter((r) => r.status === "sent").length;
  const skipped = results.filter((r) => r.status === "skipped").length;
  const failed = results.filter((r) => r.status === "failed").length;

  revalidatePath("/admin/waitlist");

  return { invited, skipped, failed, results };
}

export type WaitlistStats = {
  totalInvited: number;
  totalConfirmed: number;
  conversionRate: number;
  referralsSent: number;
  referralsConverted: number;
  invitations: Array<{
    id: string;
    email: string;
    source: string;
    status: string;
    sentAt: Date | null;
    confirmedAt: Date | null;
    errorMessage: string | null;
    createdAt: Date;
    referrerEmail: string | null;
  }>;
};

export async function getWaitlistStats(page = 1, limit = 50) {
  const result = await requireAdmin();
  if ("error" in result) return { error: result.error };

  const offset = (page - 1) * limit;

  const [invitedCount] = await db
    .select({ count: count() })
    .from(waitlistInvitationsTable);

  const [confirmedCount] = await db
    .select({ count: count() })
    .from(waitlistEntriesTable);

  const [referralSentCount] = await db
    .select({ count: count() })
    .from(waitlistInvitationsTable)
    .where(eq(waitlistInvitationsTable.source, "referral"));

  const [referralConvertedCount] = await db
    .select({ count: count() })
    .from(waitlistInvitationsTable)
    .where(
      and(
        eq(waitlistInvitationsTable.source, "referral"),
        eq(waitlistInvitationsTable.status, "confirmed"),
      ),
    );

  const invitations = await db
    .select({
      id: waitlistInvitationsTable.id,
      email: waitlistInvitationsTable.email,
      source: waitlistInvitationsTable.source,
      status: waitlistInvitationsTable.status,
      sentAt: waitlistInvitationsTable.sentAt,
      confirmedAt: waitlistInvitationsTable.confirmedAt,
      errorMessage: waitlistInvitationsTable.errorMessage,
      createdAt: waitlistInvitationsTable.createdAt,
      referrerId: waitlistInvitationsTable.referrerId,
    })
    .from(waitlistInvitationsTable)
    .orderBy(sql`${waitlistInvitationsTable.createdAt} DESC`)
    .limit(limit)
    .offset(offset);

  const invitationsWithReferrer = await Promise.all(
    invitations.map(async (inv) => {
      if (!inv.referrerId) {
        return { ...inv, referrerEmail: null };
      }
      const [referrer] = await db
        .select({ email: waitlistEntriesTable.email })
        .from(waitlistEntriesTable)
        .where(eq(waitlistEntriesTable.id, inv.referrerId))
        .limit(1);
      return { ...inv, referrerEmail: referrer?.email ?? null };
    }),
  );

  const totalInvited = invitedCount?.count ?? 0;
  const totalConfirmed = confirmedCount?.count ?? 0;

  return {
    totalInvited,
    totalConfirmed,
    conversionRate:
      totalInvited > 0 ? Math.round((totalConfirmed / totalInvited) * 100) : 0,
    referralsSent: referralSentCount?.count ?? 0,
    referralsConverted: referralConvertedCount?.count ?? 0,
    invitations: invitationsWithReferrer,
  };
}
