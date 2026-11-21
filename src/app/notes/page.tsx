import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { sortedNotes } from "@/content/notes";
import { formatMonth } from "@/lib/format";
import { stagger } from "@/lib/stagger";

export const metadata: Metadata = {
  title: "Notes",
  description: "Talks, press and what I learn along the way.",
};

export default function NotesIndex() {
  const byYear = new Map<string, ReturnType<typeof sortedNotes>>();
  for (const n of sortedNotes()) {
    const y = n.date ? n.date.slice(0, 4) : "";
    byYear.set(y, [...(byYear.get(y) ?? []), n]);
  }

  return (
    <div className="page">
      <SiteNav />
      <main className="main" id="content">
        <h1 className="page-title" data-animate>
          Notes
        </h1>
        <p className="page-lede" data-animate style={stagger(1)}>
          What happens around my projects: talks, press and what I learn along the way.
        </p>
        <div data-animate style={stagger(2)}>
          {[...byYear].map(([year, list]) => (
            <section key={year || "undated"} aria-labelledby={year ? `y-${year}` : undefined}>
              {year && (
                <h2 id={`y-${year}`} className="label year-label">
                  {year}
                </h2>
              )}
              <div className="rows">
                {list.map((n) => (
                  <Link key={n.slug} href={`/notes/${n.slug}`} className="row">
                    <span>
                      <span className="row-title">{n.title}</span>
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
