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
  _expiresAt: Date,
  _inviterName?: string,
) {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://femalerockers.com"
  ).replace(/\/+$/, "");
  const invitationUrl = `${baseUrl}/auth/sign-up?invite=${encodeURIComponent(token)}`;
  const safeInvitationUrl = escapeHtml(invitationUrl);
  const text = `You're invited to Female Rockers

We’re building the next chapter of Female Rockers, and we’d love you to be part of its first professional community.

Female Rockers started as a platform for interviews, artist features, and music discovery. We’re now developing it into a curated network where musicians can present their work, connect with others, join challenges, and be discovered by fans and music industry professionals.

Before opening registration publicly, we’re inviting a selected group of professional musicians whose work we know and respect.

As an invited member, you’ll receive:

* A professional profile for your music, biography, photos, and links
* Eligibility for a manually approved Female Rockers Pro badge
* Inclusion in our professional musician directory
* Access to future challenges and community features
* Opportunities to be considered for interviews, song reviews, stories, and other features
* Three personal invitations to share with musicians you trust

Female Rockers has never charged musicians, amateur or professional, and never will.

We are not building this platform by monetizing artists. Musicians have already paid their dues through years of lessons, practice, equipment, sacrifice, and hard work. Being seen and discovered should not require another fee.

Registration is currently available by invitation only, and every Pro badge is reviewed manually.

Create your account using your private invitation link:

${invitationUrl}

We’d be genuinely happy to have you among the musicians helping shape the future of Female Rockers.

Female Rockers
Where Female Musicians Get Discovered

https://femalerockers.com`;

  return sendTransactionalEmail(
    to,
    "You're invited to Female Rockers",
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>You're invited to Female Rockers</title>
</head>
<body bgcolor="#0a0a0a" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<table role="presentation" border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#0a0a0a">
<tr><td align="center">
<table role="presentation" border="0" width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:48px 24px;">
<table role="presentation" border="0" width="600" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:600px;">
  <tr><td role="heading" aria-level="1" style="padding:0 0 32px;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:34px;color:#ffffff;mso-line-height-rule:exactly;">
    <strong>You're invited to Female Rockers</strong>
  </td></tr>
  <tr><td style="padding:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:#a3a3a3;mso-line-height-rule:exactly;">
    We’re building the next chapter of Female Rockers, and we’d love you to be part of its first professional community.<br><br>
    Female Rockers started as a platform for interviews, artist features, and music discovery. We’re now developing it into a curated network where musicians can present their work, connect with others, join challenges, and be discovered by fans and music industry professionals.<br><br>
    Before opening registration publicly, we’re inviting a selected group of professional musicians whose work we know and respect.<br><br>
    As an invited member, you’ll receive:<br><br>
    &bull;&nbsp; A professional profile for your music, biography, photos, and links<br>
    &bull;&nbsp; Eligibility for a manually approved Female Rockers Pro badge<br>
    &bull;&nbsp; Inclusion in our professional musician directory<br>
    &bull;&nbsp; Access to future challenges and community features<br>
    &bull;&nbsp; Opportunities to be considered for interviews, song reviews, stories, and other features<br>
    &bull;&nbsp; Three personal invitations to share with musicians you trust<br><br>
    Female Rockers has never charged musicians, amateur or professional, and never will.<br><br>
    We are not building this platform by monetizing artists. Musicians have already paid their dues through years of lessons, practice, equipment, sacrifice, and hard work. Being seen and discovered should not require another fee.<br><br>
    Registration is currently available by invitation only, and every Pro badge is reviewed manually.<br><br>
    Create your account using your private invitation link:<br><br>
    <a href="${safeInvitationUrl}" style="color:#fb7185;"><strong>Create your account</strong></a><br><br>
    We’d be genuinely happy to have you among the musicians helping shape the future of Female Rockers.<br><br>
    Female Rockers<br>
    Where Female Musicians Get Discovered
  </td></tr>
  <tr><td style="padding:24px 0 0;border-top:1px solid #262626;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#525252;mso-line-height-rule:exactly;">
    <a href="https://femalerockers.com" style="color:#737373;">femalerockers.com</a>
  </td></tr>
</table>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`,
    text,
  );
}
