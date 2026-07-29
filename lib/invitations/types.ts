import type { InvitationSource, InvitationStatus } from "@/app/db/schema";

export type InvitationActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

export type AdminInvitationResultStatus =
  | "sent"
  | "failed"
  | "skipped"
  | "invalid"
  | "duplicate";

export type AdminInvitationResult = {
  input: string;
  email: string;
  status: AdminInvitationResultStatus;
  error?: string;
};

export type AdminBulkInvitationResponse =
  | {
      success: true;
      sent: number;
      failed: number;
      skipped: number;
      invalid: number;
      duplicates: number;
      results: AdminInvitationResult[];
    }
  | { success: false; error: string };

export type InvitationListItem = {
  id: string;
  recipientEmail: string;
  source: InvitationSource;
  inviterEmail: string;
  memberSlot: number | null;
  status: InvitationStatus;
  deliveryError: string | null;
  createdAt: Date;
  sentAt: Date | null;
  expiresAt: Date;
  acceptedAt: Date | null;
  revokedAt: Date | null;
};

export type RedeemableInvitation = {
  id: string;
  recipientEmail: string;
  source: InvitationSource;
  inviterId: string;
  expiresAt: Date;
};

export type InvitationPageState =
  | { state: "available"; invitation: RedeemableInvitation }
  | { state: "disabled" }
  | { state: "invalid" };
