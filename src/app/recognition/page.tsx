import type { Metadata } from "next";
import { Chip, CtaBlock, PageHero } from "@/components/ui";
import { recognition } from "@/data/content";

export const metadata: Metadata = {
  title: "Recognition",
  description: "Awards, press features and publications for ONWA STUDIO and principal architect Chidinma Anya.",
};

export default function RecognitionPage() {
  const years = [...new Set(recognition.map((r) => r.year))];
  return (
    <>
      <PageHero
        kicker={`${recognition.filter((r) => r.kind === "Award").length} awards · ${recognition.filter((r) => r.kind !== "Award").length} features`}
        title={<>Awards, press &amp; <em>publications</em></>}
      />
      {years.map((y) => (
        <section key={y} className="grid gap-2 md:grid-cols-12 md:gap-3" aria-label={String(y)}>
          <div className="panel flex items-start p-6 md:col-span-3 md:p-8">
            <p className="display text-6xl md:text-7xl">{y}</p>
          </div>
          <ul className="grid gap-2 md:col-span-9 md:grid-cols-2 md:gap-3">
            {recognition.filter((r) => r.year === y).map((r) => (
              <li key={r.title} data-fade className={`flex min-h-48 flex-col justify-between gap-6 rounded-[2rem] p-6 ${r.kind === "Award" ? "bg-paper" : "bg-paper ring-1 ring-ink/10"}`}>
                <Chip dark={r.kind === "Award"} className="self-start">{r.kind}</Chip>
                <div>
                  <h2 className="text-2xl font-display leading-tight">{r.title}</h2>
                  <p className="mt-2 text-muted">{r.org}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <CtaBlock title={<>Work with an <em>award-winning</em> studio.</>} />
    </>
  );
}
