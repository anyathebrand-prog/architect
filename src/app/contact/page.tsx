import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Button, Kicker, PageHero } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ONWA STUDIO in Ikoyi, Lagos — email, phone, WhatsApp, opening hours and directions.",
};

const tile = "rounded-[2rem] bg-paper p-6 md:p-8";

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title={<>Come and see <em>the studio.</em></>} />
      <section className="grid gap-2 md:grid-cols-12 md:gap-3">
        <div className="grid gap-2 sm:grid-cols-2 md:col-span-7 md:gap-3">
          <div className={tile}>
            <Kicker>Studio</Kicker>
            <address className="mt-4 text-2xl not-italic leading-tight tracking-tight">
              {site.address.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
          </div>
          <div className={tile}>
            <Kicker>Talk to us</Kicker>
            <a href={`mailto:${site.email}`} className="mt-4 block text-2xl tracking-tight hover:text-clay">{site.email}</a>
            <a href={`tel:${site.phone}`} className="mt-1 block text-2xl tracking-tight hover:text-clay">{site.phoneDisplay}</a>
            <a href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="pill meta mt-5 bg-ink px-4 py-2.5 text-paper hover:bg-clay">WhatsApp us</a>
          </div>
          <div className={tile}>
            <Kicker>Opening hours</Kicker>
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
          <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-travertine sm:col-span-2">
            <iframe
              title="Map showing ONWA STUDIO, Ikoyi, Lagos"
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.425%2C6.440%2C3.445%2C6.455&layer=mapnik&marker=6.4475%2C3.435"
              loading="lazy"
              className="absolute inset-0 h-full w-full grayscale"
            />
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
