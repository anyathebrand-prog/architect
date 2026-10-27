import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chip, CtaBlock, Panel, RevealImage } from "@/components/ui";
import { getPost, posts } from "@/data/content";
import { img, site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { type: "article", publishedTime: p.date, images: [p.cover] },
  };
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    datePublished: p.date,
    image: p.cover,
    author: { "@type": "Person", name: site.founder.name },
    publisher: { "@type": "Organization", name: site.name },
  };
  return (
    <article className="space-y-2 md:space-y-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Panel>
        <div className="flex flex-wrap gap-1.5">
          <Link href="/journal" className="pill meta bg-ink px-3 py-1.5 text-paper">← Journal</Link>
          <Chip>{p.category}</Chip>
          <Chip>{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</Chip>
          <Chip>{p.readTime} read</Chip>
        </div>
        <h1 data-split className="display mt-10 max-w-5xl text-5xl md:text-8xl">{p.title}</h1>
      </Panel>
      <RevealImage src={p.cover} alt="" priority className="aspect-[16/9] md:rounded-[2.5rem]" sizes="100vw" />
      <Panel className="grid gap-10 md:grid-cols-12">
        <div className="flex items-center gap-3 self-start md:col-span-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image src={img("photo-1531123897727-8f129e1688ce", 200)} alt="" fill sizes="48px" className="object-cover" />
          </span>
          <span>
            <span className="block font-medium">{site.founder.name}</span>
            <span className="block text-sm text-muted">{site.founder.title}</span>
          </span>
        </div>
        <div className="space-y-6 text-lg leading-relaxed md:col-span-7 md:col-start-5">
          <p className="display text-3xl md:text-4xl"><em>{p.excerpt}</em></p>
          {p.body.map((b, i) => <p key={i} className="text-ink/80">{b}</p>)}
        </div>
      </Panel>
      <CtaBlock title={<>Talk it through <em>with us.</em></>} />
    </article>
  );
}
