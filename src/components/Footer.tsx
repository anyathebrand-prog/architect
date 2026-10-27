import Link from "next/link";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="on-dark mt-2 overflow-hidden rounded-[2rem] bg-ink px-4 pt-14 text-paper md:mt-3 md:rounded-[2.5rem] md:px-10 md:pt-20">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="display text-5xl md:text-7xl">
            Let&apos;s build something <em>that lasts.</em>
          </p>
          <Link href="/book" className="group mt-8 inline-flex items-center gap-1">
            <span className="pill meta h-11 bg-paper px-6 text-ink transition-colors group-hover:bg-clay group-hover:text-paper">Book a consultation</span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-paper/30 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm md:col-span-6 md:grid-cols-3">
          <div>
            <p className="meta mb-3 text-paper/50">Studio</p>
            <address className="not-italic leading-relaxed text-paper/80">
              {site.address.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
          </div>
          <div>
            <p className="meta mb-3 text-paper/50">Contact</p>
            <a href={`mailto:${site.email}`} className="block text-paper/80 hover:text-paper">{site.email}</a>
            <a href={`tel:${site.phone}`} className="mt-1 block text-paper/80 hover:text-paper">{site.phoneDisplay}</a>
            <ul className="mt-4 space-y-1">
              {site.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="text-paper/80 hover:text-paper">{s.label} ↗</a></li>)}
            </ul>
          </div>
          <div>
            <p className="meta mb-3 text-paper/50">Index</p>
            <ul className="space-y-1">
              {nav.map((n) => <li key={n.href}><Link href={n.href} className="text-paper/80 hover:text-paper">{n.label}</Link></li>)}
            </ul>
          </div>
        </div>
      </div>
      <p aria-hidden className="display mt-16 select-none text-center text-[23vw] leading-[0.78] tracking-[-0.06em] text-paper/10 md:text-[19vw] xl:text-[18rem]">
        Onwa<em>Studio</em>
      </p>
      <div className="rule-t meta flex flex-wrap justify-between gap-2 py-5 text-paper/50">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Founded &amp; led by {site.founder.name}</span>
        <Link href="/privacy" className="hover:text-paper">Privacy</Link>
      </div>
    </footer>
  );
}
