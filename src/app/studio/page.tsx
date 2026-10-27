import type { Metadata } from "next";
import { ServiceCard } from "@/components/cards";
import { Button, Chip, CtaBlock, Kicker, PageHero, Panel, RevealImage } from "@/components/ui";
import { img, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Studio",
  description: "ONWA STUDIO's philosophy, and its founder and principal architect Chidinma Anya, who personally leads every project.",
};

const values = [
  { t: "Context", d: "We start with the site and the occasion: its climate, its people, its history.", i: "photo-1431576901776-e539bd916ba2" },
  { t: "Materials", d: "Earth, stone, timber, lime, linen — honest, local where possible, detailed to age well.", i: "photo-1600566753190-17f0baa2a6c3" },
  { t: "Light", d: "We draw with shadow as much as light: deep reveals, filtered sun, rooms that change through an evening.", i: "photo-1511818966892-d7d671e672a2" },
  { t: "Sustainability", d: "Passive cooling before machines. Event structures designed to be reused, returned or rebuilt.", i: "photo-1600585154340-be6161a56a0c" },
];

const collaborators = ["Structural engineers", "MEP & sustainability", "Quantity surveyors", "Main contractors", "Lighting & production", "Craftspeople & makers"];

export default function StudioPage() {
  return (
    <>
      <PageHero
        kicker="The studio"
        title={<>A small studio, <em>personally</em> led.</>}
        intro="ONWA — ‘moon’ in Igbo — is a Lagos studio for experiential design, architecture and interiors. We take on a deliberately small number of projects at a time, so each receives the full attention of the person who founded it."
        bubbles={[img("photo-1503387762-592deb58ef4e", 200), img("photo-1531123897727-8f129e1688ce", 200), img("photo-1497366216548-37526070297c", 200)]}
      />

      {/* Founder */}
      <section className="grid gap-2 md:grid-cols-12 md:gap-3" aria-labelledby="founder">
        <div className="relative md:col-span-5">
          <RevealImage src={img("photo-1531123897727-8f129e1688ce", 1600)} alt={`${site.founder.name} in the ONWA studio`} className="aspect-[4/5] h-full md:rounded-[2.5rem]" sizes="42vw" />
          <div className="absolute left-4 top-4 flex gap-1.5">
            <Chip>Founder</Chip>
            <Chip>Principal architect</Chip>
          </div>
        </div>
        <div className="panel flex flex-col justify-between gap-10 p-6 md:col-span-7 md:p-12">
          <div>
            <Kicker>Meet the Creative Director</Kicker>
            <h2 id="founder" data-split className="display mt-4 text-6xl md:text-8xl">
              Chidinma <em>Anya</em>
            </h2>
          </div>
          <blockquote className="display text-3xl md:text-4xl">
            “Architecture is a promise you make to people you&apos;ll never meet. <em>I want ours kept for a hundred years.</em>”
          </blockquote>
          <div className="space-y-4 leading-snug text-ink/75">
            <p>Chidinma founded ONWA STUDIO in 2014 after a decade working between Lagos, London and Accra. Her work moves between temporary, experiential architecture — pavilions, galas, launches — and the permanent buildings that host people, treating both with the same rigour.</p>
            <p>She is known for a material language of earth, stone and linen, and for designing with the West African climate rather than against it.</p>
          </div>
          <dl className="grid gap-2 sm:grid-cols-3">
            {[
              ["Education", "M.Arch, Architectural Association · B.Sc, University of Lagos"],
              ["Registration", "ARCON · MNIA"],
              ["Recognition", "40 Under 40 Africa · AAA 2025 · WAF 2026 shortlist"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-panel p-4">
                <dt className="meta text-muted">{k}</dt>
                <dd className="mt-2 text-sm leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Values */}
      <Panel aria-labelledby="values">
        <h2 id="values" data-split className="display mx-auto max-w-3xl text-center text-5xl md:text-7xl">
          What the studio <em>values</em>
        </h2>
        <div className="mt-14 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {values.map((v, i) => (
            <ServiceCard key={v.t} title={v.t} text={v.d} href="/process" image={img(v.i, 200)} tone={i % 2 ? "outline" : "fill"} className={i % 2 ? "lg:mt-16" : ""} />
          ))}
        </div>
      </Panel>

      {/* Working with the studio */}
      <section className="grid gap-2 md:grid-cols-12 md:gap-3">
        <div className="panel flex flex-col justify-between gap-10 p-6 md:col-span-7 md:p-12">
          <Kicker>Working with the studio</Kicker>
          <p data-split className="display text-4xl md:text-6xl">
            One architect, <em>from first sketch</em> to handover.
          </p>
          <p className="max-w-lg text-lg leading-snug text-ink/75">
            Chidinma attends the first site visit, draws the concept, reviews every drawing and walks the site — or the venue — with you at handover. Around her, we bring in trusted collaborators as each project needs them.
          </p>
          <Button href="/book">Book a consultation</Button>
        </div>
        <div className="panel bg-ink p-6 text-paper md:col-span-5 md:p-12">
          <Kicker className="!text-paper/50">Trusted collaborators</Kicker>
          <ul className="mt-6 flex flex-wrap gap-2">
            {collaborators.map((c) => (
              <li key={c} className="pill px-4 py-2.5 text-sm ring-1 ring-paper/25">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Studio space */}
      <section className="grid gap-2 md:grid-cols-12 md:gap-3" aria-label="The studio space">
        <RevealImage src={img("photo-1503387762-592deb58ef4e")} alt="Hand drawings and plans on the studio table" className="aspect-[4/3] md:col-span-7 md:rounded-[2.5rem]" sizes="58vw" />
        <div className="grid gap-2 md:col-span-5 md:gap-3">
          <RevealImage src={img("photo-1497366216548-37526070297c", 1000)} alt="The Ikoyi studio workspace" className="aspect-[16/10] md:rounded-[2.5rem]" sizes="42vw" from="center" />
          <RevealImage src={img("photo-1541888946425-d81bb19240f5", 1000)} alt="Site visit during construction" className="aspect-[16/10] md:rounded-[2.5rem]" sizes="42vw" />
        </div>
      </section>

      <CtaBlock title={<>Meet the <em>architect.</em></>} />
    </>
  );
}
