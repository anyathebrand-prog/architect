import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeatureCard } from "@/components/cards";
import { Chip, CtaBlock, FloorPlan, Kicker, Panel, RevealImage } from "@/components/ui";
import { getNextProject, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title}, ${p.location}`,
    description: p.summary,
    openGraph: { title: `${p.title} — ${site.name}`, description: p.summary, images: [p.cover] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = getNextProject(slug);
  const [first, ...rest] = p.title.split(" ");

  const stats = [
    ["Location", p.location],
    ["Area", `${p.area.toLocaleString("en-GB")} sqm`],
    ["Year", String(p.year)],
    ["Status", p.status],
    ["Client", p.client],
    ["Collaborators", p.collaborators.join(", ")],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    image: p.cover,
    dateCreated: String(p.year),
    locationCreated: p.location,
    creator: { "@type": "Organization", name: site.name },
  };

  return (
    <article className="space-y-2 md:space-y-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero image card */}
      <header id={`hero-${p.slug}`} className="relative h-[80svh] overflow-hidden rounded-[2rem] bg-earth md:h-[88vh] md:rounded-[2.5rem]" style={{ viewTransitionName: "project-hero" }}>
        <Image src={p.cover} alt={`${p.title}, ${p.location}`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5 md:left-6 md:top-6">
          <Link href="/projects" className="pill meta bg-paper px-3 py-1.5 hover:bg-ink hover:text-paper">← All projects</Link>
          <Chip>{p.category}</Chip>
          <Chip>{p.status}</Chip>
        </div>
        <h1 className="absolute bottom-4 left-4 flex flex-col items-start md:bottom-6 md:left-6">
          <span className="font-display rounded-t-2xl bg-paper px-4 pt-3 text-4xl italic leading-none tracking-tight md:text-7xl">{first}</span>
          <span className="font-display rounded-b-2xl rounded-tr-2xl bg-paper px-4 pb-3 pt-1 text-4xl leading-none tracking-tight md:text-7xl">{rest.join(" ")}</span>
        </h1>
      </header>

      {/* Stats */}
      <dl className="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-3">
        {stats.map(([k, v]) => (
          <div key={k} className="rounded-3xl bg-paper p-5">
            <dt className="meta text-muted">{k}</dt>
            <dd className="mt-3 font-medium leading-snug">{v}</dd>
          </div>
        ))}
      </dl>

      {/* Concept */}
      <Panel className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <Kicker>Concept</Kicker>
          <p data-split className="display mt-4 text-4xl md:text-6xl">{p.summary}</p>
        </div>
        <div className="space-y-5 text-lg leading-snug text-ink/75 md:col-span-4 md:col-start-9 md:pt-10">
          {p.story.map((s, i) => (
            <p key={i} data-fade>
              {p.story.length > 1 && <span className="meta mr-2 text-clay">Act {["I", "II", "III", "IV"][i]}</span>}
              {s}
            </p>
          ))}
        </div>
      </Panel>

      {/* Gallery */}
      <section className="grid gap-2 md:grid-cols-12 md:gap-3" aria-label="Gallery">
        <RevealImage src={p.gallery[0]} alt={`${p.title} — view 1`} className="aspect-[4/3] md:col-span-8 md:rounded-[2.5rem]" sizes="66vw" />
        <RevealImage src={p.gallery[1]} alt={`${p.title} — view 2`} className="aspect-[4/5] md:col-span-4 md:aspect-auto md:rounded-[2.5rem]" sizes="33vw" from="center" />
        <RevealImage src={p.gallery[2]} alt={`${p.title} — view 3`} className="aspect-[16/9] md:col-span-12 md:aspect-[21/9] md:rounded-[2.5rem]" sizes="100vw" parallax={5} />
      </section>

      {/* Drawings + materials */}
      <section className="grid gap-2 md:grid-cols-12 md:gap-3">
        <div className="panel p-6 md:col-span-8 md:p-10">
          <div className="flex items-center justify-between">
            <Kicker>Drawings</Kicker>
            <Chip>Ground floor plan · 1:200</Chip>
          </div>
          <FloorPlan className="mt-8 w-full text-earth" />
        </div>
        <div className="panel p-6 md:col-span-4 md:p-8">
          <Kicker>Materials</Kicker>
          <ul className="mt-6 space-y-2">
            {p.materials.map((m) => (
              <li key={m.name} className="flex items-center gap-4 rounded-2xl bg-panel p-2">
                <span className="h-14 w-14 shrink-0 rounded-xl ring-1 ring-ink/10" style={{ backgroundColor: m.swatch }} aria-hidden />
                <span>
                  <span className="block font-medium">{m.name}</span>
                  <span className="text-sm text-muted">{m.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBlock title={<>Have a project like this <em>in mind?</em></>} />

      {/* Next project */}
      <section className="grid gap-2 md:grid-cols-12 md:gap-3" aria-label="Next project">
        <div className="panel flex flex-col justify-between gap-6 p-6 md:col-span-4 md:p-10">
          <Kicker>Next project</Kicker>
          <p className="display text-5xl md:text-6xl">{next.title}</p>
          <p className="text-muted">{next.location} · {next.year}</p>
        </div>
        <FeatureCard project={next} className="aspect-[4/3] md:col-span-8 md:aspect-auto md:min-h-[28rem]" sizes="66vw" />
      </section>
    </article>
  );
}
