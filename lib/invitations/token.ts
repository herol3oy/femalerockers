import { createHash, randomBytes } from "node:crypto";

const TOKEN_BYTES = 32;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

export function generateInvitationToken(): string {
  return randomBytes(TOKEN_BYTES).toString("base64url");
}

export function isInvitationToken(value: string): boolean {
  return TOKEN_PATTERN.test(value);
}

export function hashInvitationToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}
