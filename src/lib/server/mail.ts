import "server-only";

import nodemailer from "nodemailer";

export function sendMail(message: { to: string; subject: string; text: string; replyTo?: string }) {
  const host = process.env.SMTP_HOST;
  const from = process.env.SMTP_FROM;
  if (!host || !from) throw new Error("SMTP is not configured.");
  const secure = process.env.SMTP_SECURE === "true";
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || (secure ? 465 : 587)),
    secure,
    requireTLS: !secure && process.env.NODE_ENV === "production",
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  }).sendMail({ from, ...message });
}