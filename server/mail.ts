import nodemailer from 'nodemailer';

export function escapeHtml(value: string | number | undefined | null) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };

    return entities[character];
  });
}

export function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: {
      user,
      pass,
    },
  });
}

export function buildInquiryId() {
  const timestamp = Date.now().toString().slice(-4);
  const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
  return `TEM-2026-${timestamp}${randomHex}`;
}
