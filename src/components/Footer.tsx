import { site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";
import { ArrowUpRight } from "./Icons";
import { Motto } from "./Motto";
import { ThemeToggle } from "./ThemeToggle";

/** Cierre de página: una banda de cobalto con borde de porcelana. */
export function Footer() {
  return (
    <footer className="band" id="contacto">
      <div className="band-inner">
        <h2 className="band-title">Contacto</h2>
        <p className="band-lede">
          {site.contact} Escríbeme a{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.emailPlaceholder && <span className="tag">pendiente</span>} <CopyEmail email={site.email} />
        </p>
        <ul className="band-links">
          {site.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {l.label}
                <ArrowUpRight />
              </a>
              {l.placeholder && <span className="tag">pendiente</span>}
            </li>
          ))}
        </ul>
        <div className="band-foot">
          <Motto mottos={site.mottos} />
          <ThemeToggle />
          <span className="band-year">{site.name} · 2026</span>
        </div>
      </div>
    </footer>
  );
}
