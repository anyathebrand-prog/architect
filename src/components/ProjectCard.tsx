"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/data/projects";
import { Arrow } from "./ui";

/**
 * Navigates with the View Transitions API so the card image expands into the
 * detail page hero (which carries the same view-transition-name).
 */
export function useProjectTransition() {
  const router = useRouter();
  return (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (e.defaultPrevented) return;
    const doc = document as Document & { startViewTransition?: (cb: () => Promise<void>) => unknown };
    if (!doc.startViewTransition || e.metaKey || e.ctrlKey || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    const media = e.currentTarget.querySelector<HTMLElement>("[data-vt]");
    if (media && media.offsetParent) media.style.viewTransitionName = "project-hero";
    doc.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          router.push(`/projects/${slug}`);
          const start = performance.now();
          const check = () => {
            if (document.getElementById(`hero-${slug}`) || performance.now() - start > 2000) resolve();
            else requestAnimationFrame(check);
          };
          check();
        }),
    );
  };
}

/** Image tile: "Learn details" chip, arrow, and the title set in white boxes. */
export default function ProjectCard({
  project,
  sizes = "(min-width: 768px) 25vw, 80vw",
  aspect = "aspect-[4/5]",
  cursor = "View",
}: {
  project: Project;
  sizes?: string;
  aspect?: string;
  cursor?: string;
}) {
  const go = useProjectTransition();
  const [first, ...rest] = project.title.split(" ");
  return (
    <Link
      href={`/projects/${project.slug}`}
      onClick={(e) => go(e, project.slug)}
      data-cursor={cursor}
      draggable={false}
      className="group/card relative block select-none"
    >
      <div data-vt className={`relative overflow-hidden rounded-3xl bg-travertine ${aspect}`}>
        <Image
          src={project.cover}
          alt={`${project.title}, ${project.location}`}
          fill
          sizes={sizes}
          draggable={false}
          className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-stone)] group-hover/card:scale-[1.05]"
        />
        <span className="pill meta absolute left-3 top-3 bg-paper/90 px-3 py-1.5 text-[0.6rem] backdrop-blur">Learn details</span>
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 transition-transform duration-500 group-hover/card:rotate-[-45deg]">
          <Arrow />
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex flex-col items-start">
          <span className="font-display rounded-t-xl bg-paper px-3 pt-2 text-xl italic leading-none tracking-tight md:text-2xl">{first}</span>
          <span className="font-display rounded-b-xl rounded-tr-xl bg-paper px-3 pb-2 pt-1 text-xl leading-none tracking-tight md:text-2xl">
            {rest.join(" ") || " "}
          </span>
        </div>
      </div>
    </Link>
  );
}
