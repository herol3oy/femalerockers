"use server";

import { and, count, eq, gte, inArray, lte, ne, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import { registrationInvitationsTable, usersTable } from "@/app/db/schema";
import {
  requireInvitationAdmin,
  requireInvitationMember,
  type InvitationActor,
} from "./auth";
import { invitationExpirationDate, isInvitationIssuingEnabled } from "./config";
import { sendRegistrationInvitation } from "./email";
import { InvitationError } from "./errors";
import { adminAttemptsInLastDay } from "./queries";
import { generateInvitationToken, hashInvitationToken } from "./token";
import type {
  AdminBulkInvitationResponse,
  AdminInvitationResult,
  InvitationActionResult,
} from "./types";
import {
  isValidEmail,
  MAX_ADMIN_ATTEMPTS_PER_DAY,
  MAX_ADMIN_BATCH_SIZE,
  normalizeEmail,
  parseBulkEmails,
} from "./validation";

function issuingDisabledResult(): { success: false; error: string } {
  return {
    success: false,
    error: "Invitation issuing is currently unavailable.",
  };
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof InvitationError ? error.message : fallback;
}

function databaseErrorCode(error: unknown): string | undefined {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }
}

async function createAdminInvitation(
  email: string,
  admin: InvitationActor,
): Promise<AdminInvitationResult> {
  const token = generateInvitationToken();
  const expiresAt = invitationExpirationDate();

  try {
    const reservation = await db.transaction(async (tx) => {
      await tx.execute(
        sql`select ${usersTable.id} from ${usersTable} where ${usersTable.id} = ${admin.id} for update`,
      );

      await tx
        .update(registrationInvitationsTable)
        .set({ status: "expired" })
        .where(
          and(
            eq(registrationInvitationsTable.recipientEmail, email),
            eq(registrationInvitationsTable.status, "pending"),
            lte(registrationInvitationsTable.expiresAt, new Date()),
          ),
        );

      const [existingMember] = await tx
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(sql`lower(${usersTable.email}) = ${email}`)
        .limit(1);

      if (existingMember) {
        return {
          skipped: true as const,
          error: "A member already uses this email",
        };
      }

      const [activeInvitation] = await tx
        .select({ id: registrationInvitationsTable.id })
        .from(registrationInvitationsTable)
        .where(
          and(
            eq(registrationInvitationsTable.recipientEmail, email),
            eq(registrationInvitationsTable.status, "pending"),
          ),
        )
        .limit(1);

      if (activeInvitation) {
        return {
          skipped: true as const,
          error: "An active invitation already exists",
        };
      }

      const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const [attempts] = await tx
        .select({ value: count() })
        .from(registrationInvitationsTable)
        .where(
          and(
            eq(registrationInvitationsTable.inviterId, admin.id),
            eq(registrationInvitationsTable.source, "admin"),
            gte(registrationInvitationsTable.createdAt, since),
          ),
        );

      if (Number(attempts?.value ?? 0) >= MAX_ADMIN_ATTEMPTS_PER_DAY) {
        return {
          skipped: true as const,
          error: "The rolling 24-hour invitation limit has been reached",
        };
      }

      const [created] = await tx
        .insert(registrationInvitationsTable)
        .values({
          recipientEmail: email,
          tokenHash: hashInvitationToken(token),
          source: "admin",
          inviterId: admin.id,
          expiresAt,
        })
        .returning({ id: registrationInvitationsTable.id });

      return { skipped: false as const, invitationId: created.id };
    });

    if (reservation.skipped) {
      return {
        input: email,
        email,
        status: "skipped",
        error: reservation.error,
      };
    }

    const delivery = await sendRegistrationInvitation(email, token, expiresAt);

    if (!delivery.success) {
      await db
        .update(registrationInvitationsTable)
        .set({
          status: "failed",
          deliveryError: delivery.error.slice(0, 2000),
          revokedAt: null,
        })
        .where(
          and(
            eq(registrationInvitationsTable.id, reservation.invitationId),
            inArray(registrationInvitationsTable.status, [
              "pending",
              "revoked",
            ]),
          ),
        );

      return {
        input: email,
        email,
        status: "failed",
        error: delivery.error,
      };
    }

    await db
      .update(registrationInvitationsTable)
      .set({ sentAt: new Date() })
      .where(
        and(
          eq(registrationInvitationsTable.id, reservation.invitationId),
          eq(registrationInvitationsTable.status, "pending"),
        ),
      );

    return { input: email, email, status: "sent" };
  } catch (error) {
    if (databaseErrorCode(error) === "23505") {
      return {
        input: email,
        email,
        status: "skipped",
        error: "An active invitation already exists",
      };
    }

    return {
      input: email,
      email,
      status: "failed",
      error: "Could not create or deliver the invitation",
    };
  }
}

export async function sendAdminInvitations(
  rawEmails: string,
): Promise<AdminBulkInvitationResponse> {
  if (!isInvitationIssuingEnabled()) {
    return issuingDisabledResult();
  }

  let admin: InvitationActor;
  try {
    admin = await requireInvitationAdmin();
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Could not authorize this request."),
    };
  }

  const parsed = parseBulkEmails(rawEmails);

  if (parsed.inputCount === 0) {
    return { success: false, error: "Enter at least one email address." };
  }

  if (parsed.inputCount > MAX_ADMIN_BATCH_SIZE) {
    return {
      success: false,
      error: `A batch can contain at most ${MAX_ADMIN_BATCH_SIZE} recipients.`,
    };
  }

  const attempts = await adminAttemptsInLastDay(admin.id);
  if (parsed.candidates.length > MAX_ADMIN_ATTEMPTS_PER_DAY - attempts) {
    return {
      success: false,
      error:
        "This batch exceeds your remaining invitation limit for the rolling 24-hour period.",
    };
  }

  const results: AdminInvitationResult[] = parsed.entries
    .filter((entry) => entry.status !== "ready")
    .map((entry) => ({
      input: entry.input,
      email: entry.email,
      status: entry.status,
      error: entry.error,
    }));

  for (const email of parsed.candidates) {
    results.push(await createAdminInvitation(email, admin));
  }

  revalidatePath("/admin/invitations");

  return {
    success: true,
    sent: results.filter((result) => result.status === "sent").length,
    failed: results.filter((result) => result.status === "failed").length,
    skipped: results.filter((result) => result.status === "skipped").length,
    invalid: results.filter((result) => result.status === "invalid").length,
    duplicates: results.filter((result) => result.status === "duplicate")
      .length,
    results,
  };
}

export async function sendMemberInvitation(
  rawEmail: string,
): Promise<InvitationActionResult> {
  if (!isInvitationIssuingEnabled()) {
    return issuingDisabledResult();
  }

  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) {
    return { success: false, error: "Enter a valid email address." };
  }

  let member: InvitationActor;
  try {
    member = await requireInvitationMember();
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Could not authorize this request."),
    };
  }

  try {
    const allocation = await db.transaction(async (tx) => {
      await tx.execute(
        sql`select ${usersTable.id} from ${usersTable} where ${usersTable.id} = ${member.id} for update`,
      );

      const [eligibleMember] = await tx
        .select({
          id: usersTable.id,
          artistName: usersTable.artistName,
        })
        .from(usersTable)
        .where(
          and(
            eq(usersTable.id, member.id),
            eq(usersTable.isApproved, true),
            ne(usersTable.role, "admin"),
            sql`${usersTable.deactivatedAt} IS NULL`,
          ),
        )
        .limit(1);

      if (!eligibleMember) {
        throw new InvitationError(
          "Invitations are available to approved members only.",
        );
      }

      await tx
        .update(registrationInvitationsTable)
        .set({ status: "expired" })
        .where(
          and(
            eq(registrationInvitationsTable.recipientEmail, email),
            eq(registrationInvitationsTable.status, "pending"),
            lte(registrationInvitationsTable.expiresAt, new Date()),
          ),
        );

      const [existingMember] = await tx
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(sql`lower(${usersTable.email}) = ${email}`)
        .limit(1);

      if (existingMember) {
        throw new InvitationError("A member already uses this email.");
      }

      const [activeInvitation] = await tx
        .select({ id: registrationInvitationsTable.id })
        .from(registrationInvitationsTable)
        .where(
          and(
            eq(registrationInvitationsTable.recipientEmail, email),
            eq(registrationInvitationsTable.status, "pending"),
          ),
        )
        .limit(1);

      if (activeInvitation) {
        throw new InvitationError(
          "An active invitation already exists for this email.",
        );
      }

      const usedRows = await tx
        .select({ slot: registrationInvitationsTable.memberSlot })
        .from(registrationInvitationsTable)
        .where(
          and(
            eq(registrationInvitationsTable.inviterId, member.id),
            eq(registrationInvitationsTable.source, "member"),
            ne(registrationInvitationsTable.status, "failed"),
          ),
        );
      const usedSlots = new Set(usedRows.map((row) => row.slot));
      const memberSlot = [1, 2, 3].find((slot) => !usedSlots.has(slot));

      if (!memberSlot) {
        throw new InvitationError(
          "You have already used all three lifetime invitation slots.",
        );
      }

      const token = generateInvitationToken();
      const expiresAt = invitationExpirationDate();
      const [created] = await tx
        .insert(registrationInvitationsTable)
        .values({
          recipientEmail: email,
          tokenHash: hashInvitationToken(token),
          source: "member",
          inviterId: member.id,
          memberSlot,
          expiresAt,
        })
        .returning({ id: registrationInvitationsTable.id });

      return {
        invitationId: created.id,
        inviterName: eligibleMember.artistName,
        token,
        expiresAt,
      };
    });

    const delivery = await sendRegistrationInvitation(
      email,
      allocation.token,
      allocation.expiresAt,
      allocation.inviterName,
    );

    if (!delivery.success) {
      await db
        .update(registrationInvitationsTable)
        .set({
          status: "failed",
          deliveryError: delivery.error.slice(0, 2000),
          revokedAt: null,
        })
        .where(
          and(
            eq(registrationInvitationsTable.id, allocation.invitationId),
            inArray(registrationInvitationsTable.status, [
              "pending",
              "revoked",
            ]),
          ),
        );

      revalidatePath("/invite");
      return {
        success: false,
        error:
          "The email could not be delivered. Your invitation slot was released.",
      };
    }

    await db
      .update(registrationInvitationsTable)
      .set({ sentAt: new Date() })
      .where(
        and(
          eq(registrationInvitationsTable.id, allocation.invitationId),
          eq(registrationInvitationsTable.status, "pending"),
        ),
      );

    revalidatePath("/invite");
    return { success: true, message: `Invitation sent to ${email}.` };
  } catch (error) {
    if (databaseErrorCode(error) === "23505") {
      return {
        success: false,
        error:
          "That email already has an active invitation, or all slots are used.",
      };
    }

    return {
      success: false,
      error: errorMessage(error, "Could not send this invitation."),
    };
  }
}

export async function revokeAdminInvitation(
  invitationId: string,
): Promise<InvitationActionResult> {
  if (!isInvitationIssuingEnabled()) {
    return issuingDisabledResult();
  }

  try {
    await requireInvitationAdmin();
    const [revoked] = await db
      .update(registrationInvitationsTable)
      .set({ status: "revoked", revokedAt: new Date() })
      .where(
        and(
          eq(registrationInvitationsTable.id, invitationId),
          eq(registrationInvitationsTable.status, "pending"),
          gte(registrationInvitationsTable.expiresAt, new Date()),
        ),
      )
      .returning({ id: registrationInvitationsTable.id });

    if (!revoked) {
      return {
        success: false,
        error: "Only an active pending invitation can be revoked.",
      };
    }

    revalidatePath("/admin/invitations");
    return { success: true, message: "Invitation revoked." };
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Could not revoke this invitation."),
    };
  }
}

export async function revokeMemberInvitation(
  invitationId: string,
): Promise<InvitationActionResult> {
  if (!isInvitationIssuingEnabled()) {
    return issuingDisabledResult();
  }

  try {
    const member = await requireInvitationMember();
    const [revoked] = await db
      .update(registrationInvitationsTable)
      .set({ status: "revoked", revokedAt: new Date() })
      .where(
        and(
          eq(registrationInvitationsTable.id, invitationId),
          eq(registrationInvitationsTable.inviterId, member.id),
          eq(registrationInvitationsTable.source, "member"),
          eq(registrationInvitationsTable.status, "pending"),
          gte(registrationInvitationsTable.expiresAt, new Date()),
        ),
      )
      .returning({ id: registrationInvitationsTable.id });

    if (!revoked) {
      return {
        success: false,
        error: "Only your active pending invitations can be revoked.",
      };
    }

    revalidatePath("/invite");
    return {
      success: true,
      message: "Invitation revoked. This lifetime slot remains used.",
    };
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Could not revoke this invitation."),
    };
  }
}
