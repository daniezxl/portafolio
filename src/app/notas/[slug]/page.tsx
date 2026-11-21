import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/Icons";
import { plain } from "@/components/Inline";
import { PlateCanvas } from "@/components/Plate";
import { Prose } from "@/components/Prose";
import { SiteNav } from "@/components/SiteNav";
import { Toc } from "@/components/Toc";
import { getNote, notes, sortedNotes } from "@/content/notes";
import { formatDate, headings, readingMinutes } from "@/lib/format";
import { techniqueName } from "@/lib/plate/techniques";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  return {
    title: plain(note.title),
    description: note.summary,
    openGraph: { type: "article", title: note.title, description: note.summary, publishedTime: note.date },
  };
}

export default async function NotePage({ params }: Props) {
  const note = getNote((await params).slug);
  if (!note) notFound();

  const list = sortedNotes();
  const i = list.findIndex((n) => n.slug === note.slug);
  const newer = list[i - 1];
  const older = list[i + 1];

  return (
    <div className="page">
      <SiteNav>
        <Toc items={headings(note.body)} />
      </SiteNav>
      <main className="main" id="contenido">
        <article>
          <Link href="/notas" className="back">
            <ArrowLeft /> Notas
          </Link>
          <h1 className="page-title">
            {note.title}
            {note.placeholder && <span className="tag">borrador</span>}
          </h1>
          <p className="meta-line">
            {note.date && <time dateTime={note.date}>{formatDate(note.date)}</time>}
            <span>{readingMinutes(note.body)} min de lectura</span>
            <span>Lámina en {techniqueName(note.technique)}</span>
          </p>
          <div className="cover">
            <PlateCanvas seed={note.slug} technique={note.technique} motion="hover" className="plate-strip" framing="strip" onPointerLight />
          </div>
          <Prose blocks={note.body} />
        </article>

        {(newer || older) && (
          <nav aria-label="Más notas" className="rows more">
            {older && (
              <Link href={`/notas/${older.slug}`} className="row">
                <span className="row-title">{older.title}</span>
                <span className="row-meta">Anterior</span>
              </Link>
            )}
            {newer && (
              <Link href={`/notas/${newer.slug}`} className="row">
                <span className="row-title">{newer.title}</span>
                <span className="row-meta">Siguiente</span>
              </Link>
            )}
          </nav>
        )}
      </main>
    </div>
  );
}
