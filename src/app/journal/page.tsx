import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowCircle, Chip, PageHero } from "@/components/ui";
import { posts } from "@/data/content";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles, project updates, site visits and design thoughts from ONWA STUDIO.",
};

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function JournalPage() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero kicker={`Journal — ${posts.length} entries`} title={<>Notes from the <em>drawing board</em></>} />

      <Link href={`/journal/${lead.slug}`} className="group grid gap-2 md:grid-cols-12 md:gap-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] md:col-span-7 md:aspect-auto md:min-h-[32rem] md:rounded-[2.5rem]">
          <Image src={lead.cover} alt="" fill priority sizes="58vw" className="object-cover transition-transform duration-[1600ms] group-hover:scale-[1.04]" />
          <div className="absolute left-4 top-4 flex gap-1.5"><Chip>Latest</Chip><Chip>{lead.category}</Chip></div>
        </div>
        <div className="panel flex flex-col justify-between gap-10 p-6 md:col-span-5 md:p-10">
          <p className="meta text-muted">{fmt(lead.date)} · {lead.readTime} read</p>
          <div>
            <h2 className="display text-5xl md:text-6xl">{lead.title}</h2>
            <p className="mt-6 text-lg leading-snug text-ink/70">{lead.excerpt}</p>
          </div>
          <span className="flex items-center gap-3 font-medium">Read the article <ArrowCircle dark /></span>
        </div>
      </Link>

      <ul className="grid gap-2 md:grid-cols-3 md:gap-3">
        {rest.map((p) => (
          <li key={p.slug}>
            <Link href={`/journal/${p.slug}`} className="group flex h-full flex-col rounded-[2rem] bg-paper p-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={p.cover} alt="" fill sizes="33vw" className="object-cover transition-transform duration-[1600ms] group-hover:scale-[1.05]" />
                <span className="pill meta absolute left-3 top-3 bg-paper/90 px-3 py-1.5 text-[0.6rem]">{p.category}</span>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-4">
                <h2 className="text-2xl font-display leading-tight">{p.title}</h2>
                <div className="flex items-center justify-between">
                  <span className="meta text-muted">{fmt(p.date)} · {p.readTime}</span>
                  <ArrowCircle />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
