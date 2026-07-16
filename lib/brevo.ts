import { BrevoClient } from "@getbrevo/brevo";
import nodemailer from "nodemailer";

const smtpHost = process.env.MAILPIT_SMTP_HOST;
const smtpPort = Number(process.env.MAILPIT_SMTP_PORT) || 1025;

const smtpTransport = smtpHost
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
    })
  : null;

const brevo = !smtpHost
  ? new BrevoClient({ apiKey: process.env.BREVO_API_KEY || "" })
  : null;

type SendEmailResult = { success: true } | { success: false; error: string };

function senderEmail(): string {
  return process.env.BREVO_SENDER_EMAIL || "noreply@femalerockers.com";
}

function senderName(): string {
  return process.env.BREVO_SENDER_NAME || "Female Rockers";
}

async function sendEmail(
  to: string,
  subject: string,
  html: string,
): Promise<SendEmailResult> {
  try {
    if (smtpTransport) {
      await smtpTransport.sendMail({
        from: `${senderName()} <${senderEmail()}>`,
        to,
        subject,
        html,
      });
    } else {
      await brevo!.transactionalEmails.sendTransacEmail({
        subject,
        sender: { email: senderEmail(), name: senderName() },
        to: [{ email: to }],
        htmlContent: html,
      });
    }
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

export async function sendWaitlistInvitation(
  to: string,
  token: string,
): Promise<SendEmailResult> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://femalerockers.com";
  const inviteUrl = `${baseUrl}/waitlist/${token}`;
  return sendEmail(
    to,
    "You're invited to Female Rockers",
    invitationHtml(inviteUrl),
  );
}

export async function sendWaitlistReferral(
  to: string,
  token: string,
  referrerName: string,
): Promise<SendEmailResult> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://femalerockers.com";
  const inviteUrl = `${baseUrl}/waitlist/${token}`;
  return sendEmail(
    to,
    `${referrerName} invited you to Female Rockers`,
    referralHtml(inviteUrl, referrerName),
  );
}

function invitationHtml(url: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#e5e5e5;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 24px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="padding:0 0 32px;">
    <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;">You're invited to Female Rockers</h1>
  </td></tr>
  <tr><td style="padding:0 0 24px;font-size:16px;line-height:1.6;color:#a3a3a3;">
    <p style="margin:0 0 16px;">Hey,</p>
    <p style="margin:0 0 16px;">You've been invited to join <strong style="color:#ffffff;">Female Rockers</strong> — a platform built for women who rock. Create a standout artist profile, share your music, and connect with fans and collaborators.</p>
    <p style="margin:0 0 16px;">As an early bird member, you'll get priority access before we open to the public.</p>
  </td></tr>
  <tr><td style="padding:0 0 32px;">
    <a href="${url}" style="display:inline-block;padding:14px 32px;background:#e11d48;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;border-radius:12px;">Join the Waitlist</a>
  </td></tr>
  <tr><td style="padding:0 0 24px;font-size:14px;line-height:1.6;color:#737373;">
    <p style="margin:0;">If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="margin:8px 0 0;"><a href="${url}" style="color:#e11d48;word-break:break-all;">${url}</a></p>
  </td></tr>
  <tr><td style="padding:24px 0 0;border-top:1px solid #262626;font-size:13px;color:#525252;">
    <p style="margin:0;">Female Rockers &mdash; Where Female Musicians Get Discovered.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function referralHtml(url: string, referrerName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#e5e5e5;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 24px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="padding:0 0 32px;">
    <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;">${referrerName} invited you to Female Rockers</h1>
  </td></tr>
  <tr><td style="padding:0 0 24px;font-size:16px;line-height:1.6;color:#a3a3a3;">
    <p style="margin:0 0 16px;">Hey,</p>
    <p style="margin:0 0 16px;"><strong style="color:#ffffff;">${referrerName}</strong> thinks you'd be a great fit for <strong style="color:#ffffff;">Female Rockers</strong> — a platform built for women who rock.</p>
    <p style="margin:0 0 16px;">Create a standout artist profile, share your music, and connect with fans and collaborators. Early bird members get priority access.</p>
  </td></tr>
  <tr><td style="padding:0 0 32px;">
    <a href="${url}" style="display:inline-block;padding:14px 32px;background:#e11d48;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;border-radius:12px;">Join the Waitlist</a>
  </td></tr>
  <tr><td style="padding:0 0 24px;font-size:14px;line-height:1.6;color:#737373;">
    <p style="margin:0;">If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="margin:8px 0 0;"><a href="${url}" style="color:#e11d48;word-break:break-all;">${url}</a></p>
  </td></tr>
  <tr><td style="padding:24px 0 0;border-top:1px solid #262626;font-size:13px;color:#525252;">
    <p style="margin:0;">Female Rockers &mdash; Where Female Musicians Get Discovered.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
