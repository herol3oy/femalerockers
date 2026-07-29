import "server-only";

import { and, eq, gt, lte } from "drizzle-orm";
import { db } from "@/app/db";
import { registrationInvitationsTable } from "@/app/db/schema";
import { isInvitationRedemptionEnabled } from "./config";
import { InvitationError } from "./errors";
import { hashInvitationToken, isInvitationToken } from "./token";
import type { InvitationPageState, RedeemableInvitation } from "./types";
import { normalizeEmail } from "./validation";

type InvitationTransaction = Parameters<
  Parameters<typeof db.transaction>[0]
>[0];

const selection = {
  id: registrationInvitationsTable.id,
  recipientEmail: registrationInvitationsTable.recipientEmail,
  source: registrationInvitationsTable.source,
  inviterId: registrationInvitationsTable.inviterId,
  status: registrationInvitationsTable.status,
  expiresAt: registrationInvitationsTable.expiresAt,
};

export async function getInvitationPageState(
  token: string | undefined,
): Promise<InvitationPageState> {
  if (!isInvitationRedemptionEnabled()) {
    return { state: "disabled" };
  }

  if (!token || !isInvitationToken(token)) {
    return { state: "invalid" };
  }

  const tokenHash = hashInvitationToken(token);
  const now = new Date();

  await db
    .update(registrationInvitationsTable)
    .set({ status: "expired" })
    .where(
      and(
        eq(registrationInvitationsTable.tokenHash, tokenHash),
        eq(registrationInvitationsTable.status, "pending"),
        lte(registrationInvitationsTable.expiresAt, now),
      ),
    );

  const [invitation] = await db
    .select(selection)
    .from(registrationInvitationsTable)
    .where(
      and(
        eq(registrationInvitationsTable.tokenHash, tokenHash),
        eq(registrationInvitationsTable.status, "pending"),
        gt(registrationInvitationsTable.expiresAt, now),
      ),
    )
    .limit(1);

  if (!invitation) {
    await db
      .update(registrationInvitationsTable)
      .set({ status: "expired" })
      .where(
        and(
          eq(registrationInvitationsTable.tokenHash, tokenHash),
          eq(registrationInvitationsTable.status, "pending"),
          lte(registrationInvitationsTable.expiresAt, now),
        ),
      );
    return { state: "invalid" };
  }

  return { state: "available", invitation };
}

export async function assertInvitationMatchesEmail(
  token: string,
  email: string,
): Promise<RedeemableInvitation> {
  const state = await getInvitationPageState(token);

  if (state.state === "disabled") {
    throw new InvitationError(
      "Invitation registration is currently unavailable.",
    );
  }

  if (
    state.state !== "available" ||
    state.invitation.recipientEmail !== normalizeEmail(email)
  ) {
    throw new InvitationError(
      "This invitation is invalid, expired, or belongs to another email address.",
    );
  }

  return state.invitation;
}

export async function lockInvitationForOnboarding(
  tx: InvitationTransaction,
  token: string,
  authenticatedEmail: string,
): Promise<RedeemableInvitation> {
  if (!isInvitationRedemptionEnabled()) {
    throw new InvitationError(
      "Invitation registration is currently unavailable.",
    );
  }

  if (!isInvitationToken(token)) {
    throw new InvitationError("This invitation is invalid.");
  }

  const tokenHash = hashInvitationToken(token);
  const [invitation] = await tx
    .select(selection)
    .from(registrationInvitationsTable)
    .where(eq(registrationInvitationsTable.tokenHash, tokenHash))
    .limit(1)
    .for("update");

  if (!invitation) {
    throw new InvitationError("This invitation is invalid.");
  }

  if (
    invitation.status === "pending" &&
    invitation.expiresAt.getTime() <= Date.now()
  ) {
    await tx
      .update(registrationInvitationsTable)
      .set({ status: "expired" })
      .where(
        and(
          eq(registrationInvitationsTable.id, invitation.id),
          eq(registrationInvitationsTable.status, "pending"),
        ),
      );
    throw new InvitationError("This invitation has expired.");
  }

  if (invitation.status !== "pending") {
    throw new InvitationError("This invitation is no longer available.");
  }

  if (invitation.recipientEmail !== normalizeEmail(authenticatedEmail)) {
    throw new InvitationError(
      "Sign in with the email address that received this invitation.",
    );
  }

  return invitation;
}

export async function acceptLockedInvitation(
  tx: InvitationTransaction,
  invitationId: string,
  acceptedUserId: string,
): Promise<void> {
  const [accepted] = await tx
    .update(registrationInvitationsTable)
    .set({
      status: "accepted",
      acceptedUserId,
      acceptedAt: new Date(),
    })
    .where(
      and(
        eq(registrationInvitationsTable.id, invitationId),
        eq(registrationInvitationsTable.status, "pending"),
        gt(registrationInvitationsTable.expiresAt, new Date()),
      ),
    )
    .returning({ id: registrationInvitationsTable.id });

  if (!accepted) {
    throw new InvitationError("This invitation is no longer available.");
  }
}
