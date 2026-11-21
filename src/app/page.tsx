import Link from "next/link";
import { BioToggle } from "@/components/BioToggle";
import { ArrowUpRight } from "@/components/Icons";
import { Inline, isExternal } from "@/components/Inline";
import { PlateHero } from "@/components/Plate";
import { SiteNav } from "@/components/SiteNav";
import { sortedNotes } from "@/content/notes";
import { site } from "@/content/site";
import { formatMonth } from "@/lib/format";
import { stagger } from "@/lib/stagger";

export default function Home() {
  const notes = sortedNotes();

  return (
    <div className="page">
      <SiteNav />
      <main className="main" id="content">
        <h1 className="home-name" data-animate>
          {site.name}
        </h1>

        <div data-animate style={stagger(1)}>
          <BioToggle short={site.bio.short} long={site.bio.long} />
        </div>

        <div data-animate style={stagger(2)}>
          <PlateHero />
        </div>

        <div className="columns" data-animate style={stagger(3)}>
          {site.columns.map((col) => (
            <section key={col.title} className="column" aria-labelledby={`col-${col.title}`}>
              <h2 id={`col-${col.title}`}>{col.title}</h2>
              {col.items.map((item) => {
                const external = item.href ? isExternal(item.href) : false;
                return (
                  <div key={item.title} className="column-item">
                    {!item.href ? (
                      <span className="row-title">{item.title}</span>
                    ) : external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.title}
                        <ArrowUpRight className="ext" />
                      </a>
                    ) : (
                      <Link href={item.href!}>{item.title}</Link>
                    )}
                    <p>
                      {item.description}
                      {item.placeholder && <span className="tag">example</span>}
                    </p>
                  </div>
                );
              })}
            </section>
          ))}
        </div>

        <section aria-labelledby="writing" data-animate style={stagger(4)}>
          <h2 id="writing" className="section-title">
            Writing
          </h2>
          <div className="rows">
            {notes.map((n) => (
              <Link key={n.slug} href={`/notes/${n.slug}`} className="row">
                <span>
                  <span className="row-title">{n.title}</span>
                </span>
                {n.date && <time dateTime={n.date}>{formatMonth(n.date)}</time>}
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="topics">
          <h2 id="topics" className="section-title">
            Topics
          </h2>
          <ul className="topics">
            {site.topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="tools">
            <span className="label">Tools</span>{" "}
            {site.tools.map((t, i) => (
              <span key={t} className="tool">
                {t}
                {i < site.tools.length - 1 ? " ·" : ""}{" "}
              </span>
            ))}
          </p>
        </section>

        <section aria-labelledby="now" className="now">
          <h2 id="now" className="section-title">
            Now
          </h2>
          {site.now.map((p, i) => (
            <p key={i}>
              <Inline text={p} />
            </p>
          ))}
        </section>
      </main>
    </div>
  );
}
