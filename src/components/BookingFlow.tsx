"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { consultationTypes, type ConsultationId } from "@/data/content";

const ease = [0.16, 1, 0.3, 1] as const;
const steps = ["Type", "Date", "Time", "Details"] as const;

const projectTypes = ["Residential", "Commercial", "Hospitality", "Interior", "Renovation", "Event / Experiential", "Other"];
const budgets = ["Under ₦25m", "₦25m – ₦75m", "₦75m – ₦200m", "₦200m – ₦500m", "Above ₦500m", "Not sure yet"];
const timelines = ["As soon as possible", "Within 3 months", "3 – 6 months", "6 – 12 months", "Just exploring"];
const slots = ["09:30", "10:30", "11:30", "13:00", "14:00", "15:00", "16:00", "17:00"];

type Errors = Partial<Record<string, string>>;

const fmtDate = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function BookingFlow() {
  // Allow deep links like /book?type=site to skip straight to the date step
  const typeParam = useSearchParams().get("type");
  const preset = consultationTypes.find((c) => c.id === typeParam)?.id ?? null;
  const [step, setStep] = useState(preset ? 1 : 0);
  const [dir, setDir] = useState(1);
  const [type, setType] = useState<ConsultationId | null>(preset);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [summary, setSummary] = useState<Record<string, string> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
    setTimeout(() => headingRef.current?.focus(), 50);
  };

  const chosen = consultationTypes.find((c) => c.id === type);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs: Errors = {};
    const req = (k: string, msg: string) => !String(fd.get(k) || "").trim() && (errs[k] = msg);
    req("name", "Please enter your full name.");
    req("email", "Please enter your email address.");
    req("phone", "Please enter a phone number we can reach you on.");
    req("projectType", "Please choose a project type.");
    req("location", "Please tell us where the project is.");
    req("budget", "Please choose a budget range.");
    req("timeline", "Please choose a timeline.");
    req("description", "A sentence or two about the project helps us prepare.");
    const email = String(fd.get("email") || "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "That email address doesn't look right.";
    const file = fd.get("files") as File | null;
    if (file && file.size > 10 * 1024 * 1024) errs.files = "Files must be under 10MB.";
    if (!fd.get("consent")) errs.consent = "Please confirm you've read the privacy notice.";
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    fd.set("consultation", chosen!.title);
    fd.set("date", iso(date!));
    fd.set("time", time!);
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setSummary({
        Consultation: `${chosen!.title} · ${chosen!.duration}`,
        Date: fmtDate(date!),
        Time: `${time} (WAT)`,
        Fee: chosen!.fee,
        Name: String(fd.get("name")),
        Email: email,
        Project: `${fd.get("projectType")} — ${fd.get("location")}`,
      });
      setStatus("done");
      setDir(1);
      setStep(4);
    } catch {
      setStatus("error");
    }
  }

  const progress = Math.min(step, 4) / 4;

  return (
    <div className="relative bg-paper">
      {/* Progress */}
      <div className="rule-b relative">
        <ol className="grid grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className={`meta border-r border-[var(--color-rule)] px-3 py-4 last:border-r-0 ${i <= step ? "" : "opacity-40"}`}>
              <span className="text-clay">({String(i + 1).padStart(2, "0")})</span> {s}
            </li>
          ))}
        </ol>
        <motion.div
          className="absolute -bottom-px left-0 h-[2px] w-full origin-left bg-clay"
          animate={{ scaleX: step === 4 ? 1 : progress + 0.25 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 1.2, ease }}
          aria-hidden
        />
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: `${d * 40}%`, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: `${d * -40}%`, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease }}
            className="p-4 py-10 md:p-10"
          >
            {step === 0 && (
              <fieldset>
                <legend>
                  <h2 ref={headingRef} tabIndex={-1} className="display mb-8 text-4xl md:text-6xl">
                    Choose a <em>consultation</em>
                  </h2>
                </legend>
                <div className="grid gap-2 md:grid-cols-3">
                  {consultationTypes.map((c, i) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => { setType(c.id); go(1); }}
                      aria-pressed={type === c.id}
                      className={`group flex min-h-80 flex-col justify-between rounded-3xl p-6 text-left transition-colors duration-500 ${
                        type === c.id ? "bg-ink text-paper" : "bg-panel hover:bg-white hover:ring-1 hover:ring-ink/10"
                      }`}
                    >
                      <span className="meta flex justify-between">
                        <span className="text-clay">({String(i + 1).padStart(2, "0")})</span>
                        <span>{c.duration}</span>
                      </span>
                      <span>
                        <span className="display block text-4xl md:text-5xl">{c.title}</span>
                        <span className="mt-4 block text-sm leading-relaxed opacity-80">{c.description}</span>
                        <span className="meta mt-6 block border-t border-current/30 pt-3">{c.fee}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <div>
                <h2 ref={headingRef} tabIndex={-1} className="display mb-8 text-4xl md:text-6xl">
                  Pick a <em>date</em>
                </h2>
                <Calendar value={date} onChange={(d) => { setDate(d); setTime(null); go(2); }} />
                <Back onClick={() => go(0)} />
              </div>
            )}

            {step === 2 && date && (
              <div>
                <h2 ref={headingRef} tabIndex={-1} className="display mb-2 text-4xl md:text-6xl">
                  Pick a <em>time</em>
                </h2>
                <p className="meta mb-8 opacity-60">{fmtDate(date)} · West Africa Time</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { setTime(s); go(3); }}
                      aria-pressed={time === s}
                      className={`display rounded-2xl py-6 text-3xl transition-colors ${time === s ? "bg-ink text-paper" : "bg-panel hover:bg-ink hover:text-paper"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <Back onClick={() => go(1)} />
              </div>
            )}

            {step === 3 && (
              <form ref={formRef} onSubmit={submit} noValidate className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-4">
                  <h2 ref={headingRef} tabIndex={-1} className="display mb-6 text-4xl md:text-6xl">
                    About <em>you</em>
                  </h2>
                  <dl className="meta space-y-3 rounded-3xl bg-panel p-5">
                    <div><dt className="opacity-50">Consultation</dt><dd>{chosen?.title} · {chosen?.duration}</dd></div>
                    <div><dt className="opacity-50">When</dt><dd>{date && fmtDate(date)}, {time}</dd></div>
                    <div><dt className="opacity-50">Fee</dt><dd>{chosen?.fee}</dd></div>
                  </dl>
                  <Back onClick={() => go(2)} />
                </div>
                <div className="grid gap-6 md:col-span-8 md:grid-cols-2">
                  <Field name="name" label="Full name" autoComplete="name" errors={errors} required />
                  <Field name="email" label="Email" type="email" autoComplete="email" errors={errors} required />
                  <Field name="phone" label="Phone" type="tel" autoComplete="tel" errors={errors} required />
                  <Field name="company" label="Company (optional)" autoComplete="organization" errors={errors} />
                  <Select name="projectType" label="Project type" options={projectTypes} errors={errors} />
                  <Field name="location" label="Project location" errors={errors} required />
                  <Select name="budget" label="Rough budget" options={budgets} errors={errors} />
                  <Select name="timeline" label="Timeline" options={timelines} errors={errors} />
                  <Field name="description" label="Short project description" textarea errors={errors} required className="md:col-span-2" />
                  <div className="md:col-span-2">
                    <label htmlFor="files" className="meta mb-2 block">Site photos or sketches (optional, max 10MB)</label>
                    <input
                      id="files"
                      name="files"
                      type="file"
                      accept="image/*,application/pdf"
                      aria-describedby={errors.files ? "files-err" : undefined}
                      className="block w-full border border-dashed border-ink/40 p-4 text-sm file:meta file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2 file:text-paper"
                    />
                    {errors.files && <p id="files-err" role="alert" className="mt-2 text-sm text-clay">{errors.files}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-start gap-3 text-sm leading-relaxed">
                      <input
                        type="checkbox"
                        name="consent"
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? "consent-err" : undefined}
                        className="mt-1 h-4 w-4 accent-clay"
                      />
                      <span>
                        I agree to ONWA STUDIO processing my details only to respond to this enquiry and arrange the
                        consultation, in line with the Nigeria Data Protection Act 2023. Read the{" "}
                        <Link href="/privacy" target="_blank" className="underline underline-offset-2">privacy notice</Link>.
                      </span>
                    </label>
                    {errors.consent && <p id="consent-err" role="alert" className="mt-2 text-sm text-clay">{errors.consent}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="pill meta h-12 w-full justify-center bg-ink px-8 text-paper transition-colors hover:bg-clay disabled:opacity-60 md:w-auto"
                    >
                      {status === "sending" ? "Booking…" : "Confirm booking →"}
                    </button>
                    {status === "error" && (
                      <p role="alert" className="mt-3 text-sm text-clay">
                        Something went wrong sending your booking. Please try again, or call us on 0707 346 3305.
                      </p>
                    )}
                  </div>
                </div>
              </form>
            )}

            {step === 4 && summary && (
              <div className="grid gap-10 md:grid-cols-12" role="status">
                <div className="md:col-span-7">
                  <p className="meta mb-6 text-clay">Booking received</p>
                  <h2 ref={headingRef} tabIndex={-1} className="display text-5xl md:text-7xl">
                    Thank you. <em>We&apos;ll see you soon.</em>
                  </h2>
                  <p className="mt-6 max-w-md leading-relaxed">
                    A confirmation is on its way to <strong>{summary.Email}</strong>. We&apos;ll be in touch before
                    the day to confirm details, and Chidinma will review your notes before you meet.
                  </p>
                </div>
                <dl className="on-dark rounded-3xl bg-ink p-6 text-paper md:col-span-5">
                  {Object.entries(summary).map(([k, v]) => (
                    <div key={k} className="rule-b on-dark flex justify-between gap-4 py-3">
                      <dt className="meta opacity-50">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="meta mt-8 underline-offset-4 hover:underline">
      ← Back
    </button>
  );
}

const inputCls =
  "w-full border-0 border-b border-ink/40 bg-transparent py-3 text-lg outline-none transition-colors focus:border-clay focus-visible:outline-none aria-[invalid=true]:border-clay";

function Field({
  name, label, errors, textarea, className = "", required, ...rest
}: { name: string; label: string; errors: Errors; textarea?: boolean; className?: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  const err = errors[name];
  const common = {
    id: name,
    name,
    "aria-invalid": !!err,
    "aria-describedby": err ? `${name}-err` : undefined,
    "aria-required": required,
    className: inputCls,
  };
  return (
    <div className={className}>
      <label htmlFor={name} className="meta block">{label}</label>
      {textarea ? <textarea rows={4} {...common} /> : <input {...common} {...rest} />}
      {err && <p id={`${name}-err`} role="alert" className="mt-2 text-sm text-clay">{err}</p>}
    </div>
  );
}

function Select({ name, label, options, errors }: { name: string; label: string; options: string[]; errors: Errors }) {
  const err = errors[name];
  return (
    <div>
      <label htmlFor={name} className="meta block">{label}</label>
      <select id={name} name={name} defaultValue="" aria-invalid={!!err} aria-required aria-describedby={err ? `${name}-err` : undefined} className={inputCls}>
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      {err && <p id={`${name}-err`} role="alert" className="mt-2 text-sm text-clay">{err}</p>}
    </div>
  );
}

function Calendar({ value, onChange }: { value: Date | null; onChange: (d: Date) => void }) {
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const offset = (month.getDay() + 6) % 7; // Monday first
  const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="max-w-xl">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" disabled={!canPrev} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="meta px-2 py-1 disabled:opacity-30" aria-label="Previous month">←</button>
        <p className="display text-3xl" aria-live="polite">{month.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>
        <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="meta px-2 py-1" aria-label="Next month">→</button>
      </div>
      <div className="grid grid-cols-7 gap-1" role="grid">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="meta py-2 text-center text-muted" role="columnheader">{d}</div>
        ))}
        {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} className="bg-paper" />)}
        {Array.from({ length: days }).map((_, i) => {
          const d = new Date(month.getFullYear(), month.getMonth(), i + 1);
          const disabled = d <= today || d.getDay() === 0;
          const selected = value?.toDateString() === d.toDateString();
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onChange(d)}
              aria-label={fmtDate(d)}
              aria-pressed={selected}
              className={`aspect-square rounded-xl text-lg transition-colors ${
                selected ? "bg-ink text-paper" : disabled ? "text-ink/25" : "bg-panel hover:bg-ink hover:text-paper"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <p className="meta mt-3 opacity-60">Sundays closed. Saturday meetings by request.</p>
    </div>
  );
}
