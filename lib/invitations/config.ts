import "server-only";

const DEFAULT_EXPIRY_DAYS = 7;
const MAX_EXPIRY_DAYS = 30;

function enabled(value: string | undefined): boolean {
  return value === undefined ? true : value.trim().toLowerCase() === "true";
}

export function isInvitationIssuingEnabled(): boolean {
  return enabled(process.env.INVITATION_ISSUING_ENABLED);
}

export function isInvitationRedemptionEnabled(): boolean {
  return enabled(process.env.INVITATION_REDEMPTION_ENABLED);
}

export function invitationExpiryDays(): number {
  const parsed = Number.parseInt(process.env.INVITATION_EXPIRY_DAYS ?? "", 10);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_EXPIRY_DAYS) {
    return DEFAULT_EXPIRY_DAYS;
  }

  return parsed;
}

export function invitationExpirationDate(from = new Date()): Date {
  const expiresAt = new Date(from);
  expiresAt.setUTCDate(expiresAt.getUTCDate() + invitationExpiryDays());
  return expiresAt;
}
