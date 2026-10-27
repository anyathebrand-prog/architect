"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

const wa = `${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

/** Sitewide: sticky booking CTA, click-to-call and WhatsApp. */
export default function QuickContact() {
  const onBook = usePathname() === "/book";
  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 hidden items-center gap-1.5 rounded-full bg-paper/90 p-1.5 shadow-xl shadow-ink/10 ring-1 ring-ink/10 backdrop-blur md:flex">
        <a href={`tel:${site.phone}`} aria-label={`Call the studio on ${site.phoneDisplay}`} className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-paper">
          <PhoneIcon />
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat with the studio on WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-paper">
          <WaIcon />
        </a>
        {!onBook && (
          <Link href="/book" className="pill meta group h-11 bg-ink px-5 text-paper transition-all duration-700 ease-[var(--ease-stone)] hover:bg-clay hover:px-7">
            Book a consultation
            <span className="transition-transform duration-700 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>

      <div className="fixed inset-x-2 bottom-2 z-40 flex h-14 gap-1.5 rounded-full bg-paper/95 p-1.5 shadow-xl shadow-ink/15 ring-1 ring-ink/10 backdrop-blur md:hidden">
        <a href={`tel:${site.phone}`} aria-label="Call the studio" className="flex w-11 items-center justify-center rounded-full ring-1 ring-ink/10">
          <PhoneIcon />
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp the studio" className="flex w-11 items-center justify-center rounded-full ring-1 ring-ink/10">
          <WaIcon />
        </a>
        <Link href="/book" className="pill meta flex-1 justify-center bg-ink text-paper">
          Book a consultation →
        </Link>
      </div>
    </>
  );
}

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2" />
  </svg>
);
const WaIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2m4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3" />
  </svg>
);
