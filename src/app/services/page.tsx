import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button, Chip, CtaBlock, PageHero } from "@/components/ui";
import { services } from "@/data/content";
import { getProject } from "@/data/projects";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Event & experiential design, architecture, interiors, renovation, consultation, project management and masterplanning in Lagos and beyond.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services — 7 disciplines"
        title={<>Seven disciplines, <em>one</em> studio.</>}
        intro="Event and experiential design leads everything we do. Choose a service below, or book a consultation and we'll advise on the right scope."
        bubbles={[img("photo-1464366400600-7168b8af9bc3", 200), img("photo-1600607687939-ce8a6c25118c", 200), img("photo-1487958449943-2429e8be8625", 200)]}
      />
      {services.map((s, i) => {
        const examples = s.projects.map(getProject).filter((p) => !!p);
        const lead = i === 0;
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={`grid scroll-mt-24 gap-6 rounded-[2rem] p-6 md:grid-cols-12 md:rounded-[2.5rem] md:p-10 ${lead ? "bg-ink text-paper" : "bg-paper"}`}
          >
            <div className="flex flex-col justify-between gap-8 md:col-span-5">
              <div>
                <div className="flex gap-1.5">
                  <Chip dark={!lead}>0{i + 1}</Chip>
                  {lead && <Chip className="!bg-clay !text-paper !ring-0">Our first discipline</Chip>}
                </div>
                <h2 data-split className="display mt-6 text-5xl md:text-7xl">{s.title}</h2>
                <p className={`mt-6 max-w-md text-lg leading-snug ${lead ? "text-paper/75" : "text-ink/70"}`}>{s.description}</p>
              </div>
              <div>
                <ul className="mb-8 flex flex-wrap gap-1.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className={`pill px-3 py-1.5 text-sm ${lead ? "ring-1 ring-paper/25" : "bg-panel"}`}>{d}</li>
                  ))}
                </ul>
                <Button href="/book" variant={lead ? "light" : "solid"}>Book a consultation</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:col-span-7 md:gap-3">
              {examples.slice(0, 2).map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} data-cursor="View" className="group relative block aspect-[4/5] overflow-hidden rounded-3xl">
                  <Image src={p.cover} alt={p.title} fill sizes="30vw" className="object-cover transition-transform duration-[1600ms] group-hover:scale-[1.05]" />
                  <span className="pill meta absolute bottom-3 left-3 bg-paper px-3 py-2 text-ink">{p.title}</span>
                </Link>
              ))}
              {!examples.length && (
                <div className="col-span-2 flex min-h-64 items-end rounded-3xl bg-panel p-6">
                  <p className="display text-3xl md:text-4xl">Start with a <em>free 30-minute call.</em></p>
                </div>
              )}
              {examples.length === 1 && (
                <div className="flex items-end rounded-3xl bg-panel p-6">
                  <p className="display text-2xl">More examples <em>on request.</em></p>
                </div>
              )}
            </div>
          </section>
        );
      })}
      <CtaBlock />
    </>
  );
}
