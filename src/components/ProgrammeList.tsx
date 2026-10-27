"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Project } from "@/data/projects";
import { useProjectTransition } from "./ProjectCard";

/** Projects listed like an event programme; a preview image follows the cursor on desktop. */
export default function ProgrammeList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const go = useProjectTransition();

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const el = preview.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
    const move = (e: PointerEvent) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="relative" onPointerLeave={() => setActive(null)}>
      <ul className="rule-b">
        {projects.map((p, i) => (
          <li key={p.slug} className="rule-t">
            <Link
              href={`/projects/${p.slug}`}
              onClick={(e) => go(e, p.slug)}
              onPointerEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              className={`group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 py-5 transition-opacity duration-500 md:grid-cols-12 md:py-7 ${
                active && active !== p.slug ? "opacity-30" : ""
              }`}
            >
              <span className="meta text-muted md:col-span-1">({String(i + 1).padStart(2, "0")})</span>
              <span className="display text-3xl transition-transform duration-700 ease-[var(--ease-stone)] md:col-span-5 md:text-5xl lg:text-6xl group-hover:translate-x-3">
                {p.title}
              </span>
              <span data-vt className="relative row-span-2 h-16 w-14 overflow-hidden md:hidden">
                <Image src={p.cover} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="meta col-start-2 text-muted md:col-span-2 md:col-start-auto">{p.type}</span>
              <span className="meta hidden text-muted md:col-span-3 md:block">{p.location}</span>
              <span className="meta hidden text-right md:col-span-1 md:block">{p.year}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {projects.map((p) => (
            <div
              key={p.slug}
              className={`absolute left-0 top-0 h-[22vw] w-[17vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-[clip-path] duration-700 ease-[var(--ease-stone)] ${
                active === p.slug ? "[clip-path:inset(0)]" : "[clip-path:inset(50%_0)]"
              }`}
            >
              <Image src={p.cover} alt="" fill sizes="17vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
