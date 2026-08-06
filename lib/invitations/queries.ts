import "server-only";

import { and, count, desc, eq, gte, lte } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { db } from "@/app/db";
import { registrationInvitationsTable, usersTable } from "@/app/db/schema";
import { requireInvitationAdmin, requireInvitationMember } from "./auth";
import { isInvitationIssuingEnabled } from "./config";
import type { InvitationListItem } from "./types";
import { MAX_ADMIN_ATTEMPTS_PER_DAY } from "./validation";

export async function expirePendingInvitations(): Promise<void> {
  await db
    .update(registrationInvitationsTable)
    .set({ status: "expired" })
    .where(
      and(
        eq(registrationInvitationsTable.status, "pending"),
        lte(registrationInvitationsTable.expiresAt, new Date()),
      ),
    );
}

export async function getAdminInvitationData() {
  const admin = await requireInvitationAdmin();
  const issuingEnabled = isInvitationIssuingEnabled();

  await expirePendingInvitations();

  const inviter = alias(usersTable, "registration_invitation_inviter");
  const invitations: InvitationListItem[] = await db
    .select({
      id: registrationInvitationsTable.id,
      recipientEmail: registrationInvitationsTable.recipientEmail,
      source: registrationInvitationsTable.source,
      inviterEmail: inviter.email,
      memberSlot: registrationInvitationsTable.memberSlot,
      status: registrationInvitationsTable.status,
      deliveryError: registrationInvitationsTable.deliveryError,
      createdAt: registrationInvitationsTable.createdAt,
      sentAt: registrationInvitationsTable.sentAt,
      expiresAt: registrationInvitationsTable.expiresAt,
      acceptedAt: registrationInvitationsTable.acceptedAt,
      revokedAt: registrationInvitationsTable.revokedAt,
    })
    .from(registrationInvitationsTable)
    .innerJoin(inviter, eq(registrationInvitationsTable.inviterId, inviter.id))
    .orderBy(desc(registrationInvitationsTable.createdAt))
    .limit(500);

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [attempts] = await db
    .select({ value: count() })
    .from(registrationInvitationsTable)
    .where(
      and(
        eq(registrationInvitationsTable.inviterId, admin.id),
        eq(registrationInvitationsTable.source, "admin"),
        gte(registrationInvitationsTable.createdAt, since),
      ),
    );

  const statuses = invitations.reduce(
    (totals, invitation) => {
      totals[invitation.status] += 1;
      return totals;
    },
    {
      pending: 0,
      accepted: 0,
      expired: 0,
      revoked: 0,
      failed: 0,
    },
  );

  return {
    issuingEnabled,
    invitations,
    statuses,
    attemptsRemaining: Math.max(0, MAX_ADMIN_ATTEMPTS_PER_DAY - Number(attempts?.value ?? 0)),
  };
}

export async function getMemberInvitationData() {
  const member = await requireInvitationMember();
  const issuingEnabled = isInvitationIssuingEnabled();

  await expirePendingInvitations();

  const invitations = await db
    .select({
      memberSlot: registrationInvitationsTable.memberSlot,
      status: registrationInvitationsTable.status,
    })
    .from(registrationInvitationsTable)
    .where(
      and(
        eq(registrationInvitationsTable.inviterId, member.id),
        eq(registrationInvitationsTable.source, "member"),
      ),
    );

  const usedSlots = new Set(
    invitations
      .filter((invitation) => invitation.status !== "failed")
      .map((invitation) => invitation.memberSlot)
      .filter((slot): slot is number => slot !== null),
  );

  return {
    issuingEnabled,
    remainingSlots: Math.max(0, 3 - usedSlots.size),
  };
}

export async function adminAttemptsInLastDay(adminId: string): Promise<number> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [result] = await db
    .select({ value: count() })
    .from(registrationInvitationsTable)
    .where(
      and(
        eq(registrationInvitationsTable.inviterId, adminId),
        eq(registrationInvitationsTable.source, "admin"),
        gte(registrationInvitationsTable.createdAt, since),
      ),
    );

  return Number(result?.value ?? 0);
}
