"use server";

import { randomBytes } from "node:crypto";
import { and, count, eq, sql } from "drizzle-orm";
import { db } from "@/app/db";
import {
  usersTable,
  waitlistEntriesTable,
  waitlistInvitationsTable,
} from "@/app/db/schema";
import { sendWaitlistReferral } from "@/lib/brevo";

function generateToken(): string {
  return randomBytes(32).toString("hex");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type ConfirmResult =
  | { success: true; entryId: string; referralCode: string }
  | { success: false; error: string };

export async function confirmWaitlistEntry(
  token: string,
  acceptedTos: boolean,
): Promise<ConfirmResult> {
  if (!acceptedTos) {
    return { success: false, error: "You must accept the Terms of Service" };
  }

  const [invitation] = await db
    .select()
    .from(waitlistInvitationsTable)
    .where(eq(waitlistInvitationsTable.token, token))
    .limit(1);

  if (!invitation) {
    return { success: false, error: "Invalid invitation link" };
  }

  if (invitation.status === "confirmed") {
    return { success: false, error: "This invitation has already been used" };
  }

  const existingEntry = await db
    .select({ id: waitlistEntriesTable.id })
    .from(waitlistEntriesTable)
    .where(eq(waitlistEntriesTable.email, invitation.email))
    .limit(1);

  if (existingEntry.length > 0) {
    return { success: false, error: "You are already on the waitlist" };
  }

  const referralCode = randomBytes(16).toString("hex");

  const [inserted] = await db
    .insert(waitlistEntriesTable)
    .values({
      email: invitation.email,
      referralCode,
      acceptedTos: true,
      invitationId: invitation.id,
    })
    .returning({ id: waitlistEntriesTable.id });

  await db
    .update(waitlistInvitationsTable)
    .set({ status: "confirmed", confirmedAt: new Date() })
    .where(eq(waitlistInvitationsTable.id, invitation.id));

  // If this was a referral, update the referrer's invitation to 'confirmed'
  if (invitation.referrerId) {
    const [referrerInvitation] = await db
      .select({ id: waitlistInvitationsTable.id })
      .from(waitlistInvitationsTable)
      .where(
        and(
          eq(waitlistInvitationsTable.referrerId, invitation.referrerId),
          eq(waitlistInvitationsTable.email, invitation.email),
        ),
      )
      .limit(1);

    if (referrerInvitation) {
      await db
        .update(waitlistInvitationsTable)
        .set({ status: "confirmed", confirmedAt: new Date() })
        .where(eq(waitlistInvitationsTable.id, referrerInvitation.id));
    }
  }

  return { success: true, entryId: inserted.id, referralCode };
}

export type ReferralResult = {
  email: string;
  status: "sent" | "failed";
  error?: string;
};

export async function sendReferrals(
  entryId: string,
  referralCode: string,
  emails: string[],
): Promise<{ sent: number; failed: number; results: ReferralResult[] }> {
  const [entry] = await db
    .select()
    .from(waitlistEntriesTable)
    .where(
      and(
        eq(waitlistEntriesTable.id, entryId),
        eq(waitlistEntriesTable.referralCode, referralCode),
      ),
    )
    .limit(1);

  if (!entry) {
    return {
      sent: 0,
      failed: emails.length,
      results: emails.map((email) => ({
        email,
        status: "failed" as const,
        error: "Invalid referral code",
      })),
    };
  }

  const [referralCountResult] = await db
    .select({ count: count() })
    .from(waitlistInvitationsTable)
    .where(
      and(
        eq(waitlistInvitationsTable.referrerId, entryId),
        sql`${waitlistInvitationsTable.status} IN ('sent', 'confirmed')`,
      ),
    );

  const usedReferrals = referralCountResult?.count ?? 0;
  const remaining = 3 - usedReferrals;

  if (remaining <= 0) {
    return {
      sent: 0,
      failed: emails.length,
      results: emails.map((email) => ({
        email,
        status: "failed" as const,
        error: "Referral limit reached (3 maximum)",
      })),
    };
  }

  const validEmails = emails
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.length > 0 && isValidEmail(e));

  const allowedEmails = validEmails.slice(0, remaining);

  const results: ReferralResult[] = [];

  for (const email of allowedEmails) {
    const existing = await db
      .select({ id: waitlistInvitationsTable.id })
      .from(waitlistInvitationsTable)
      .where(
        and(
          eq(waitlistInvitationsTable.email, email),
          sql`${waitlistInvitationsTable.status} IN ('pending', 'sent', 'confirmed')`,
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      results.push({ email, status: "failed", error: "Already invited" });
      continue;
    }

    const token = generateToken();

    const [inserted] = await db
      .insert(waitlistInvitationsTable)
      .values({
        email,
        token,
        source: "referral",
        referrerId: entryId,
        status: "pending",
      })
      .returning({ id: waitlistInvitationsTable.id });

    // Look up referrer's display name
    const [referrer] = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.id, entry.id))
      .limit(1);

    const referrerName = referrer?.email?.split("@")[0] || "Someone";

    const sendResult = await sendWaitlistReferral(email, token, referrerName);

    if (sendResult.success) {
      await db
        .update(waitlistInvitationsTable)
        .set({ status: "sent", sentAt: new Date() })
        .where(eq(waitlistInvitationsTable.id, inserted.id));
      results.push({ email, status: "sent" });
    } else {
      await db
        .update(waitlistInvitationsTable)
        .set({ status: "failed", errorMessage: sendResult.error })
        .where(eq(waitlistInvitationsTable.id, inserted.id));
      results.push({ email, status: "failed", error: sendResult.error });
    }
  }

  const sent = results.filter((r) => r.status === "sent").length;
  const failed = results.filter((r) => r.status === "failed").length;

  return { sent, failed, results };
}
