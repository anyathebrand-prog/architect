import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Button, Kicker, PageHero } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ONWA STUDIO in Lagos — email, phone, WhatsApp and availability.",
};

const tile = "rounded-[2rem] bg-paper p-6 md:p-8";

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title={<>Let&apos;s <em>talk.</em></>} />
      <section className="grid gap-2 md:grid-cols-12 md:gap-3">
        <div className="grid gap-2 sm:grid-cols-2 md:col-span-7 md:gap-3">
          <div className={`${tile} sm:col-span-2`}>
            <Kicker>Talk to us</Kicker>
            <a href={`mailto:${site.email}`} className="mt-4 block text-2xl tracking-tight hover:text-clay">{site.email}</a>
            <a href={`tel:${site.phone}`} className="mt-1 block text-2xl tracking-tight hover:text-clay">{site.phoneDisplay}</a>
            <a href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="pill meta mt-5 bg-ink px-4 py-2.5 text-paper hover:bg-clay">WhatsApp us</a>
          </div>
          <div className={tile}>
            <Kicker>Availability</Kicker>
            <dl className="mt-4 space-y-2">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between rounded-xl bg-panel px-3 py-2">
                  <dt>{h.days}</dt><dd className="text-muted">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={tile}>
            <Kicker>Follow</Kicker>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {site.socials.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="pill px-4 py-2.5 ring-1 ring-ink/15 hover:bg-ink hover:text-paper">{s.label} ↗</a></li>
              ))}
            </ul>
          </div>
          <div className={`${tile} flex min-h-64 flex-col justify-between gap-8 bg-panel sm:col-span-2`}>
            <Kicker>Where we work</Kicker>
            <p className="display text-4xl md:text-5xl">
              Based in {site.city.split(",")[0]}, <em>working wherever you gather.</em>
            </p>
            <p className="max-w-md text-muted">
              Meet us on a video call, in person at your venue or office, or on site — choose the format when you book.
            </p>
          </div>
        </div>
        <div className="on-dark flex flex-col justify-between gap-12 rounded-[2rem] bg-ink p-6 text-paper md:col-span-5 md:rounded-[2.5rem] md:p-10">
          <div>
            <h2 className="display mb-10 text-5xl">Send an <em>enquiry</em></h2>
            <ContactForm />
          </div>
          <div className="rule-t pt-6">
            <p className="mb-4 text-paper/70">Ready to meet? Skip the queue.</p>
            <Button href="/book" variant="light">Book a consultation</Button>
          </div>
        </div>
      </section>
    </>
  );
}
