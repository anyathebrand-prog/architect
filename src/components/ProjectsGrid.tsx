"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { categories, type Category, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProgrammeList from "./ProgrammeList";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [hovered, setHovered] = useState<string | null>(null);
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div role="toolbar" aria-label="Filter projects by category" className="flex flex-wrap gap-1.5">
          {(["All", ...categories] as const).map((c) => {
            const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={active}
                className={`pill meta px-4 py-2.5 transition-colors duration-500 ${active ? "bg-ink text-paper" : "bg-paper ring-1 ring-ink/10 hover:bg-white"}`}
              >
                {c}
                <span className={active ? "text-paper/50" : "text-muted"}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="flex gap-1 rounded-full bg-paper p-1 ring-1 ring-ink/10" role="group" aria-label="View">
          {(["grid", "list"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} aria-pressed={view === v} className={`pill meta px-4 py-2 ${view === v ? "bg-ink text-paper" : ""}`}>
              {v}
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{list.length} projects shown</p>

      {view === "list" ? (
        <div className="panel px-4 py-6 md:px-8">
          <ProgrammeList projects={list} />
        </div>
      ) : (
        <LayoutGroup>
          <motion.ul layout className="grid gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: hovered && hovered !== p.slug ? 0.45 : 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.9, ease, opacity: { duration: 0.4 } }}
                  onPointerEnter={() => setHovered(p.slug)}
                  onPointerLeave={() => setHovered(null)}
                  className={i % 5 === 0 ? "sm:col-span-2" : ""}
                >
                  <ProjectCard project={p} aspect={i % 5 === 0 ? "aspect-[4/5] sm:aspect-[8/5]" : "aspect-[4/5]"} sizes={i % 5 === 0 ? "50vw" : "25vw"} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      )}
    </div>
  );
}
