import "server-only";

import { sendTransactionalEmail } from "@/lib/brevo";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendRegistrationInvitation(
  to: string,
  token: string,
  expiresAt: Date,
  inviterName?: string,
) {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://femalerockers.com"
  ).replace(/\/+$/, "");
  const invitationUrl = `${baseUrl}/auth/sign-up?invite=${encodeURIComponent(token)}`;
  const subjectInviter = inviterName?.replace(/[\r\n]+/g, " ").trim();
  const safeInviter = subjectInviter ? escapeHtml(subjectInviter) : null;
  const heading = safeInviter
    ? `${safeInviter} invited you to Female Rockers`
    : "You're invited to Female Rockers";
  const expiration = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(expiresAt);

  return sendTransactionalEmail(
    to,
    safeInviter
      ? `${subjectInviter} invited you to Female Rockers`
      : "You're invited to Female Rockers",
    `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#e5e5e5;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 24px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="padding:0 0 32px;">
    <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;">${heading}</h1>
  </td></tr>
  <tr><td style="padding:0 0 24px;font-size:16px;line-height:1.6;color:#a3a3a3;">
    <p style="margin:0 0 16px;">Create your Female Rockers account and member profile using the private link below.</p>
    <p style="margin:0 0 16px;">This invitation is for <strong style="color:#ffffff;">${escapeHtml(to)}</strong>, can be used once, and expires on ${expiration} UTC.</p>
  </td></tr>
  <tr><td style="padding:0 0 32px;">
    <a href="${invitationUrl}" style="display:inline-block;padding:14px 32px;background:#e11d48;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;border-radius:12px;">Create your account</a>
  </td></tr>
  <tr><td style="padding:0 0 24px;font-size:14px;line-height:1.6;color:#737373;">
    <p style="margin:0;">If the button does not work, copy and paste this link into your browser:</p>
    <p style="margin:8px 0 0;"><a href="${invitationUrl}" style="color:#e11d48;word-break:break-all;">${invitationUrl}</a></p>
  </td></tr>
  <tr><td style="padding:24px 0 0;border-top:1px solid #262626;font-size:13px;color:#525252;">
    <p style="margin:0;">Female Rockers &mdash; Where Female Musicians Get Discovered.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`,
  );
}
