import type { MetadataRoute } from "next";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/proyectos", "/notas"].map((p) => ({ url: `${site.url}${p}` }));
  return [
    ...pages,
    ...notes.map((n) => ({ url: `${site.url}/notas/${n.slug}`, lastModified: n.date })),
    ...projects.map((p) => ({ url: `${site.url}/proyectos/${p.slug}` })),
  ];
}
