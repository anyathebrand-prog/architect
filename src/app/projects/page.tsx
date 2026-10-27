import type { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";
import { CtaBlock, PageHero } from "@/components/ui";
import { projects } from "@/data/projects";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Experiential, hospitality, residential, commercial, interiors and masterplanning projects by ONWA STUDIO, Lagos.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker={`${projects.length} projects — 2014 to now`}
        title={<>Events, buildings &amp; <em>interiors</em></>}
        intro="Pavilions, galas and launches alongside the homes, hotels and workplaces that host people every day — each one led by our principal architect."
        bubbles={[img("photo-1519167758481-83f550bb49b3", 200), img("photo-1566073771259-6a8506099945", 200), img("photo-1618221195710-dd6b41faaea6", 200)]}
      />
      <section className="py-2" aria-label="Project index">
        <ProjectsGrid projects={projects} />
      </section>
      <CtaBlock />
    </>
  );
}
