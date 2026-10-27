import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { posts } from "@/data/content";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/studio", "/process", "/services", "/journal", "/recognition", "/book", "/contact", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
    ...posts.map((p) => ({ url: `${site.url}/journal/${p.slug}`, lastModified: p.date })),
  ];
}
