import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { Arrow, Chip } from "./ui";

/** Tall image card with info chips, uppercase title and a pill CTA. */
export function FeatureCard({ project, className = "", sizes = "33vw", chips = false }: { project: Project; className?: string; sizes?: string; chips?: boolean }) {
  return (
    <article className={`group relative overflow-hidden rounded-3xl bg-earth text-paper ${className}`}>
      <Image src={project.cover} alt={`${project.title}, ${project.location}`} fill sizes={sizes} className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-stone)] group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      {chips ? (
        <div className="absolute left-4 top-4 flex max-w-[80%] flex-wrap gap-1.5">
          <Chip>Year</Chip>
          <Chip>{project.year}</Chip>
          <Chip>Type</Chip>
          <Chip>{project.type}</Chip>
          <Chip>Place</Chip>
          <Chip>{project.location}</Chip>
        </div>
      ) : (
        <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink">↗</span>
      )}
      <div className="absolute inset-x-4 bottom-4">
        <h3 className="text-2xl font-medium uppercase leading-[0.95] tracking-tight md:text-3xl">{project.title}</h3>
        <p className="mt-2 max-w-xs text-xs leading-snug text-paper/75">{project.summary}</p>
        <Link
          href={`/projects/${project.slug}`}
          data-cursor="View"
          className="pill meta mt-4 w-full justify-between bg-paper px-5 py-3 text-ink transition-colors hover:bg-clay hover:text-paper"
        >
          View project <Arrow />
          <span className="absolute inset-0" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

/** Soft rounded service card with a round thumbnail and Read more pill. */
export function ServiceCard({
  title,
  text,
  href,
  image,
  tone = "fill",
  className = "",
}: {
  title: string;
  text: string;
  href: string;
  image: string;
  tone?: "fill" | "outline";
  className?: string;
}) {
  return (
    <div
      data-fade
      className={`flex flex-col items-center gap-3 rounded-3xl p-6 text-center transition-transform duration-700 ease-[var(--ease-stone)] hover:-translate-y-1 ${
        tone === "fill" ? "bg-panel" : "bg-paper ring-1 ring-ink/10"
      } ${className}`}
    >
      <span className="relative h-9 w-9 overflow-hidden rounded-full">
        <Image src={image} alt="" fill sizes="36px" className="object-cover" />
      </span>
      <h3 className="mt-2 font-medium leading-tight">{title}</h3>
      <p className="text-xs leading-snug text-muted">{text}</p>
      <Link href={href} className="pill meta mt-2 bg-paper px-4 py-2 ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper">
        Read more
      </Link>
    </div>
  );
}
