import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { layout, sendEmail, table } from "@/lib/notify";

export async function POST(req: Request) {
  const fd = await req.formData();
  const get = (k: string) => String(fd.get(k) ?? "").trim().slice(0, 4000);
  if (!get("name") || !get("email") || !get("message") || !fd.get("consent")) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    await sendEmail({
      to: process.env.STUDIO_INBOX || site.email,
      subject: `Website enquiry from ${get("name")}`,
      html: layout("New enquiry", table({ Name: get("name"), Email: get("email"), Phone: get("phone"), Message: get("message") })),
      replyTo: get("email"),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
