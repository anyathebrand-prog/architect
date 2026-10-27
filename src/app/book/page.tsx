import type { Metadata } from "next";
import { Suspense } from "react";
import BookingFlow from "@/components/BookingFlow";
import { PageHero } from "@/components/ui";
import { img, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Book a virtual call, studio meeting or site visit with ONWA STUDIO's principal architect, Chidinma Anya.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        kicker="Book a consultation"
        title={<>Let&apos;s build something <em>that lasts.</em></>}
        intro={`Every consultation is with ${site.founder.name} herself. Choose how you'd like to meet, pick a time, and tell us a little about the event or project.`}
        bubbles={[img("photo-1531123897727-8f129e1688ce", 200), img("photo-1519167758481-83f550bb49b3", 200), img("photo-1600585154340-be6161a56a0c", 200)]}
      />
      <section className="panel overflow-hidden" aria-label="Booking">
        <Suspense fallback={<div className="min-h-96" />}>
          <BookingFlow />
        </Suspense>
      </section>
      <p className="meta px-4 py-4 text-center text-muted">
        Prefer to talk now? Call <a className="underline" href={`tel:${site.phone}`}>{site.phoneDisplay}</a> or{" "}
        <a className="underline" href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>.
      </p>
    </>
  );
}
