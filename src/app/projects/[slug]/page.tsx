import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@/components/Icons";
import { PlateCanvas } from "@/components/Plate";
import { Prose } from "@/components/Prose";
import { SiteNav } from "@/components/SiteNav";
import { Toc } from "@/components/Toc";
import { getProject, projects } from "@/content/projects";
import { headings } from "@/lib/format";
import { techniqueName } from "@/lib/plate/techniques";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.summary };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  return (
    <div className="page">
      <SiteNav>
        <Toc items={headings(p.body)} />
      </SiteNav>
      <main className="main" id="content">
        <article>
          <Link href="/projects" className="back">
            <ArrowLeft /> Projects
          </Link>
          <h1 className="page-title">
            {p.title}
            {p.placeholder && <span className="tag">example</span>}
          </h1>
          <p className="page-lede">{p.summary}</p>
          <div className="actions">
            {p.demo ? (
              <a className="button button-primary" href={p.demo.href} target="_blank" rel="noopener noreferrer">
                {p.demo.label}
                <ArrowUpRight />
              </a>
            ) : p.demo === null ? (
              <span className="button button-off">Demo in progress</span>
            ) : null}
            {p.repo ? (
              <a className="button" href={p.repo.href} target="_blank" rel="noopener noreferrer">
                {p.repo.label}
                <ArrowUpRight />
              </a>
            ) : p.repo === null ? (
              <span className="button button-off">Private code</span>
            ) : null}
          </div>
          {p.image ? (
            <figure className="shot">
              <Image
                src={p.image.src}
                alt={p.image.alt}
                width={p.image.width}
                height={p.image.height}
                sizes="(max-width: 767px) 100vw, 640px"
                priority
                unoptimized={p.image.src.endsWith(".svg")}
              />
              {p.image.caption && <figcaption>{p.image.caption}</figcaption>}
            </figure>
          ) : (
            <div className="cover">
              <PlateCanvas seed={p.slug} technique={p.technique} motion="hover" className="plate-strip" framing="strip" onPointerLight />
            </div>
          )}
          <Prose blocks={p.body} />
        </article>
      </main>
      <aside className="side" aria-label="Project details">
        <dl className="facts">
          <div>
            <dt>Date</dt>
            <dd>{p.year}</dd>
          </div>
          {p.status && (
            <div>
              <dt>Status</dt>
              <dd>{p.status}</dd>
            </div>
          )}
          <div>
            <dt>Role</dt>
            <dd>{p.role}</dd>
          </div>
          {p.team && (
            <div>
              <dt>Team</dt>
              <dd>{p.team}</dd>
            </div>
          )}
          <div>
            <dt>Stack</dt>
            <dd>
              <ul>
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
          {!p.image && (
            <div>
              <dt>Plate</dt>
              <dd>{techniqueName(p.technique)}</dd>
            </div>
          )}
          {p.links?.length ? (
            <div>
              <dt>Links</dt>
              <dd>
                <ul>
                  {p.links.map((l) => (
                    <li key={l.href + l.label}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                        <ArrowUpRight className="ext" />
                      </a>
                      {l.placeholder && <span className="tag">pending</span>}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      </aside>
    </div>
  );
}
