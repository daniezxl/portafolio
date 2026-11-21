import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PlateCanvas } from "@/components/Plate";
import { SiteNav } from "@/components/SiteNav";
import { projects } from "@/content/projects";
import { stagger } from "@/lib/stagger";

export const metadata: Metadata = {
  title: "Projects",
  description: "Products with real users, competition projects and what I'm building now.",
};

export default function ProjectsIndex() {
  return (
    <div className="page">
      <SiteNav />
      <main className="main" id="content">
        <h1 className="page-title" data-animate>
          Projects
        </h1>
        <p className="page-lede" data-animate style={stagger(1)}>
          Products with real users, competition projects and what I'm building now.
        </p>
        <div className="project-rows" data-animate style={stagger(2)}>
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="project-row">
              {p.image ? (
                <Image
                  src={p.image.src}
                  alt=""
                  width={p.image.width}
                  height={p.image.height}
                  sizes="160px"
                  loading="eager"
                  className="project-thumb"
                  unoptimized={p.image.src.endsWith(".svg")}
                />
              ) : (
                <PlateCanvas seed={p.slug} technique={p.technique} motion="hover" className="plate-thumb" />
              )}
              <div>
                <div className="project-row-head">
                  <span className="row-title">
                    {p.title}
                    {p.placeholder && <span className="tag">example</span>}
                  </span>
                  <span className="label">{p.year}</span>
                </div>
                <p>{p.summary}</p>
                <p className="stack">{p.stack.join(" · ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
