import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { sortedNotes } from "@/content/notes";
import { formatMonth } from "@/lib/format";
import { stagger } from "@/lib/stagger";

export const metadata: Metadata = {
  title: "Notas",
  description: "Explicaciones cortas sobre backend, datos e inteligencia artificial.",
};

export default function NotesIndex() {
  const byYear = new Map<string, ReturnType<typeof sortedNotes>>();
  for (const n of sortedNotes()) {
    const y = n.date ? n.date.slice(0, 4) : "Borradores";
    byYear.set(y, [...(byYear.get(y) ?? []), n]);
  }

  return (
    <div className="page">
      <SiteNav />
      <main className="main" id="contenido">
        <h1 className="page-title" data-animate>
          Notas
        </h1>
        <p className="page-lede" data-animate style={stagger(1)}>
          Lo que pasa alrededor de mis proyectos: presentaciones, prensa y lo que voy aprendiendo.
        </p>
        <div data-animate style={stagger(2)}>
          {[...byYear].map(([year, list]) => (
            <section key={year} aria-labelledby={`y-${year}`}>
              <h2 id={`y-${year}`} className="label year-label">
                {year}
              </h2>
              <div className="rows">
                {list.map((n) => (
                  <Link key={n.slug} href={`/notas/${n.slug}`} className="row">
                    <span>
                      <span className="row-title">{n.title}</span>
                      {n.placeholder && <span className="tag">borrador</span>}
                    </span>
                    {n.date && <time dateTime={n.date}>{formatMonth(n.date)}</time>}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
