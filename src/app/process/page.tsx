import type { Metadata } from "next";
import { CtaBlock, PageHero } from "@/components/ui";
import { process } from "@/data/content";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "Process",
  description: "How ONWA STUDIO works: Brief, Concept, Design Development, Construction and Handover — and what you receive at each stage.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        kicker="Process — 5 stages"
        title={<>Five stages, <em>one</em> lead architect.</>}
        intro="A clear, unhurried process — whether it's a one-night gala or a forty-room hotel. You always know where we are, what comes next and what you'll receive."
        bubbles={[img("photo-1503387762-592deb58ef4e", 200), img("photo-1541888946425-d81bb19240f5", 200), img("photo-1600585154340-be6161a56a0c", 200)]}
      />
      <ol className="grid gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-5">
        {process.map((s, i) => (
          <li
            key={s.title}
            data-fade
            className={`flex min-h-[26rem] flex-col justify-between gap-8 rounded-[2rem] p-6 ${i === 4 ? "bg-ink text-paper" : i % 2 ? "bg-paper ring-1 ring-ink/10" : "bg-paper"} ${
              i % 2 ? "lg:mt-16" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="display text-6xl">0{i + 1}</span>
              <span className={`pill meta px-3 py-1.5 ring-1 ${i === 4 ? "ring-paper/25" : "ring-ink/15"}`}>{s.duration}</span>
            </div>
            <div>
              <h2 className="display text-4xl">{s.title}</h2>
              <p className={`mt-3 text-sm leading-snug ${i === 4 ? "text-paper/70" : "text-muted"}`}>{s.text}</p>
            </div>
            <div>
              <p className={`meta mb-2 ${i === 4 ? "text-paper/50" : "text-muted"}`}>You receive</p>
              <ul className="flex flex-wrap gap-1.5">
                {s.deliverables.map((d) => (
                  <li key={d} className={`pill px-3 py-1.5 text-xs ${i === 4 ? "bg-paper/10" : "bg-panel"}`}>{d}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <CtaBlock title={<>Start with <em>a brief.</em></>} />
    </>
  );
}
