import { NextResponse } from "next/server";
import { consultationTypes } from "@/data/content";
import { site } from "@/data/site";
import { createCalBooking, layout, sendEmail, table } from "@/lib/notify";

const required = ["name", "email", "phone", "projectType", "location", "budget", "timeline", "description", "consultation", "date", "time"];

export async function POST(req: Request) {
  const fd = await req.formData();
  const get = (k: string) => String(fd.get(k) ?? "").trim().slice(0, 4000);

  if (required.some((k) => !get(k)) || !fd.get("consent")) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const type = consultationTypes.find((c) => c.title === get("consultation"));
  const fields = {
    Consultation: `${get("consultation")} (${type?.duration ?? ""})`,
    Date: get("date"),
    Time: `${get("time")} WAT`,
    Fee: type?.fee ?? "",
    Name: get("name"),
    Email: get("email"),
    Phone: get("phone"),
    Company: get("company"),
    "Project type": get("projectType"),
    Location: get("location"),
    Budget: get("budget"),
    Timeline: get("timeline"),
    Description: get("description"),
  };

  const attachments: { filename: string; content: string }[] = [];
  const file = fd.get("files");
  if (file instanceof File && file.size > 0) {
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "File too large" }, { status: 413 });
    attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()).toString("base64") });
  }

  try {
    await Promise.all([
      sendEmail({
        to: process.env.STUDIO_INBOX || site.email,
        subject: `New consultation: ${fields.Name} — ${fields.Consultation}, ${fields.Date} ${get("time")}`,
        html: layout("New consultation booking", table(fields)),
        replyTo: fields.Email,
        attachments,
      }),
      sendEmail({
        to: fields.Email,
        subject: `Your ${get("consultation")} with ${site.name} is confirmed`,
        html: layout(
          `See you on ${fields.Date}.`,
          `<p>Dear ${fields.Name.split(" ")[0].replace(/[<>&]/g, "")},</p><p>Thank you for booking a consultation. Chidinma will review your notes beforehand. You'll receive reminders 24 hours and 1 hour before we meet.</p>${table({ Consultation: fields.Consultation, Date: fields.Date, Time: fields.Time, Fee: fields.Fee })}<p>Need to reschedule? Reply to this email or call ${site.phoneDisplay}.</p>`,
        ),
      }),
      createCalBooking({
        typeId: type?.id ?? "virtual",
        start: new Date(`${get("date")}T${get("time")}:00+01:00`).toISOString(),
        name: fields.Name,
        email: fields.Email,
        phone: fields.Phone,
        notes: `${fields["Project type"]} in ${fields.Location}. Budget ${fields.Budget}. ${fields.Description}`,
      }),
    ]);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
