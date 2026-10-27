"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";

/** Draggable, scrollable row of project tiles with a progress bar. */
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const drag = useRef({ down: false, x: 0, left: 0, moved: 0 });

  useEffect(() => {
    const el = track.current!;
    const onScroll = () => setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return; // touch uses native scrolling
    drag.current = { down: true, x: e.clientX, left: track.current!.scrollLeft, moved: 0 };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    d.moved = Math.max(d.moved, Math.abs(dx));
    track.current!.scrollLeft = d.left - dx;
  };
  const onUp = () => (drag.current.down = false);

  const step = (dir: number) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.6, behavior: "smooth" });

  return (
    <div>
      <ul
        ref={track}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        // Swallow the click that ends a drag so it doesn't open a project
        onClickCapture={(e) => {
          if (drag.current.moved > 6) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto md:snap-none md:gap-3"
        aria-label="Featured projects"
      >
        {projects.map((p) => (
          <li key={p.slug} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] md:w-[23.5vw]">
            <ProjectCard project={p} cursor="Drag" />
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center gap-6">
        <div className="relative h-px flex-1 bg-ink/15" aria-hidden>
          <div className="absolute inset-y-[-1px] left-0 w-1/4 bg-ink transition-[left] duration-300" style={{ left: `${progress * 75}%` }} />
        </div>
        <div className="flex gap-2">
          <button onClick={() => step(-1)} aria-label="Previous projects" className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-ink/15 hover:bg-ink hover:text-paper">‹</button>
          <button onClick={() => step(1)} aria-label="Next projects" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper hover:bg-clay">›</button>
        </div>
      </div>
    </div>
  );
}
