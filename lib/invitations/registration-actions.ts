"use server";

import { InvitationError } from "./errors";
import { assertInvitationMatchesEmail } from "./redemption";
import type { InvitationActionResult } from "./types";

export async function validateInvitationRegistration(
  token: string,
  email: string,
): Promise<InvitationActionResult> {
  try {
    await assertInvitationMatchesEmail(token, email);
    return { success: true, message: "Invitation verified." };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof InvitationError
          ? error.message
          : "Could not verify this invitation.",
    };
  }
}
