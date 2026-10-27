"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site, img } from "@/data/site";

const seg = "flex h-12 items-center rounded-2xl bg-paper transition-colors";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Close the menu on navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-2 z-50 md:top-4">
      <div className="flex gap-1.5 rounded-[1.25rem] bg-canvas/80 p-1.5 backdrop-blur-md">
        <Link href="/" className={`${seg} flex-1 justify-between px-4 hover:bg-white`} aria-label={`${site.name} home`}>
          <span className="text-lg font-semibold tracking-tight">
            Onwa<em className="font-normal">Studio</em>
          </span>
          <span className="meta hidden text-right text-[0.55rem] leading-tight text-muted sm:block">
            Architecture &amp;
            <br />
            experiential design
          </span>
        </Link>
        <a href={site.socials[0].href} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`${seg} hidden w-16 justify-center ring-1 ring-ink/10 hover:bg-white md:flex`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
        </a>
        <a href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={`${seg} hidden w-16 justify-center ring-1 ring-ink/10 hover:bg-white md:flex`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3" /></svg>
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          className={`${seg} meta gap-6 px-4 hover:bg-white md:w-56 md:justify-between`}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden className="hidden items-center gap-1 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            <span className="h-2 w-2 -translate-y-1 rounded-full bg-ink" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            <span className="h-2 w-2 translate-y-0.5 rounded-full bg-ink" />
          </span>
        </button>
        <Link href="/book" className={`${seg} meta hidden bg-ink px-6 text-paper hover:bg-clay sm:flex`}>
          Book a consultation
        </Link>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Primary"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="panel absolute inset-x-0 top-full mt-2 grid gap-6 p-4 shadow-2xl shadow-ink/10 md:grid-cols-12 md:p-8"
          >
            <ul className="md:col-span-8">
              {[{ href: "/", label: "Home" }, ...nav].map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i, duration: 0.6 }}>
                  <Link
                    href={n.href}
                    aria-current={pathname === n.href ? "page" : undefined}
                    className="display group flex items-baseline gap-4 py-1 text-4xl transition-colors hover:text-clay aria-[current=page]:italic md:text-6xl"
                  >
                    <span className="meta w-6 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col justify-between gap-6 rounded-3xl bg-panel p-5 md:col-span-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={img("photo-1519167758481-83f550bb49b3", 800)} alt="" fill sizes="30vw" className="object-cover" />
              </div>
              <div className="meta space-y-1 text-muted">
                <a href={`mailto:${site.email}`} className="block text-ink">{site.email}</a>
                <a href={`tel:${site.phone}`} className="block text-ink">{site.phoneDisplay}</a>
                <p>{site.address.join(", ")}</p>
              </div>
              <Link href="/book" className="pill meta justify-center bg-ink py-3 text-paper">Book a consultation</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
