import nodemailer from "nodemailer";
import { site } from "@/data/site";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

type Email = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: string }[]; // base64 content
};

/**
 * Sends email through, in order of preference:
 *  1. Gmail SMTP when GMAIL_USER + GMAIL_APP_PASSWORD are set (no domain needed)
 *  2. Resend's HTTP API when RESEND_API_KEY is set (needs a verified domain to email clients)
 * With neither, it logs instead, so the site works in development.
 */
export async function sendEmail(opts: Email) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
  if (GMAIL_USER && GMAIL_APP_PASSWORD) {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD.replace(/\s/g, "") },
    });
    await transport.sendMail({
      from: `${site.name} <${GMAIL_USER}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
      attachments: opts.attachments?.map((a) => ({ filename: a.filename, content: a.content, encoding: "base64" })),
    });
    return;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[email:dev]", opts.to, opts.subject);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || `${site.name} <bookings@onwastudio.com>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      reply_to: opts.replyTo,
      attachments: opts.attachments,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status}`);
}

export function table(fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:8px 16px 8px 0;color:#7a6a5c;text-transform:uppercase;font-size:11px;letter-spacing:.12em">${esc(k)}</td><td style="padding:8px 0">${esc(v)}</td></tr>`)
    .join("");
  return `<table style="font-family:Helvetica,Arial,sans-serif;color:#141210;border-collapse:collapse">${rows}</table>`;
}

export function layout(title: string, body: string) {
  return `<div style="background:#E8DFD3;padding:32px;font-family:Helvetica,Arial,sans-serif;color:#141210">
  <p style="font-family:Georgia,serif;font-size:28px;margin:0 0 24px">ONWA <em>Studio</em></p>
  <h1 style="font-family:Georgia,serif;font-weight:400;font-size:32px;margin:0 0 16px">${title}</h1>
  ${body}
  <p style="margin-top:32px;font-size:12px;color:#7a6a5c">${site.address.join(", ")} · ${site.phoneDisplay}</p></div>`;
}

/**
 * Optional: mirror the booking into Cal.com (which then handles calendar invites and
 * reminder workflows). Set CAL_API_KEY and CAL_EVENT_TYPE_<ID> (e.g. CAL_EVENT_TYPE_VIRTUAL).
 */
export async function createCalBooking(b: { typeId: string; start: string; name: string; email: string; phone: string; notes: string }) {
  const key = process.env.CAL_API_KEY;
  const eventTypeId = process.env[`CAL_EVENT_TYPE_${b.typeId.toUpperCase()}`];
  if (!key || !eventTypeId) return false;
  const res = await fetch("https://api.cal.com/v2/bookings", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "cal-api-version": "2024-08-13" },
    body: JSON.stringify({
      eventTypeId: Number(eventTypeId),
      start: b.start,
      attendee: { name: b.name, email: b.email, timeZone: "Africa/Lagos", phoneNumber: b.phone },
      bookingFieldsResponses: { notes: b.notes },
    }),
  });
  if (!res.ok) console.error("[cal] booking failed", res.status, await res.text());
  return res.ok;
}
