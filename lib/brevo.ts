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

export type SendEmailResult =
  | { success: true }
  | { success: false; error: string };

function senderEmail(): string {
  return process.env.BREVO_SENDER_EMAIL || "noreply@femalerockers.com";
}

function senderName(): string {
  return process.env.BREVO_SENDER_NAME || "Female Rockers";
}

export async function sendTransactionalEmail(
  to: string,
  subject: string,
  html: string,
  text?: string,
): Promise<SendEmailResult> {
  try {
    if (smtpTransport) {
      await smtpTransport.sendMail({
        from: `${senderName()} <${senderEmail()}>`,
        to,
        subject,
        html,
        text,
      });
    } else {
      await brevo!.transactionalEmails.sendTransacEmail({
        subject,
        sender: { email: senderEmail(), name: senderName() },
        to: [{ email: to }],
        htmlContent: html,
        textContent: text,
      });
    }
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
