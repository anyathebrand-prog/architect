"use client";

import Link from "next/link";
import { useState } from "react";

const inputCls =
  "w-full border-0 border-b border-paper/40 bg-transparent py-3 text-lg outline-none focus:border-clay aria-[invalid=true]:border-clay";

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs: Record<string, string> = {};
    if (!String(fd.get("name")).trim()) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fd.get("email")))) errs.email = "Please enter a valid email.";
    if (!String(fd.get("message")).trim()) errs.message = "Please write a short message.";
    if (!fd.get("consent")) errs.consent = "Please confirm you've read the privacy notice.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const res = await fetch("/api/contact", { method: "POST", body: fd }).catch(() => null);
    setStatus(res?.ok ? "done" : "error");
    if (res?.ok) form.reset();
  }

  if (status === "done")
    return (
      <p role="status" className="display text-4xl">
        Thank you — <em>we&apos;ll reply within one working day.</em>
      </p>
    );

  const field = (name: string, label: string, type = "text", auto?: string) => (
    <div>
      <label htmlFor={`c-${name}`} className="meta block text-paper/60">{label}</label>
      {type === "textarea" ? (
        <textarea id={`c-${name}`} name={name} rows={4} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `c-${name}-err` : undefined} className={inputCls} />
      ) : (
        <input id={`c-${name}`} name={name} type={type} autoComplete={auto} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `c-${name}-err` : undefined} className={inputCls} />
      )}
      {errors[name] && <p id={`c-${name}-err`} role="alert" className="mt-2 text-sm text-clay">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-6">
      {field("name", "Name", "text", "name")}
      {field("email", "Email", "email", "email")}
      {field("phone", "Phone (optional)", "tel", "tel")}
      {field("message", "Message", "textarea")}
      <div>
        <label className="flex items-start gap-3 text-sm text-paper/80">
          <input type="checkbox" name="consent" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "c-consent-err" : undefined} className="mt-1 h-4 w-4 accent-clay" />
          <span>
            I agree to my details being used only to respond to this enquiry (NDP Act 2023).{" "}
            <Link href="/privacy" className="underline">Privacy notice</Link>
          </span>
        </label>
        {errors.consent && <p id="c-consent-err" role="alert" className="mt-2 text-sm text-clay">{errors.consent}</p>}
      </div>
      <button disabled={status === "sending"} className="pill meta h-12 justify-center bg-clay px-8 text-paper transition-colors hover:bg-paper hover:text-ink disabled:text-muted md:justify-self-start">
        {status === "sending" ? "Sending…" : "Send enquiry →"}
      </button>
      {status === "error" && <p role="alert" className="text-sm text-clay">Couldn&apos;t send. Please email or call us directly.</p>}
    </form>
  );
}
