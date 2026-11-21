import Image from "next/image";
import type { Block, Figure } from "@/content/types";
import { slugify } from "@/lib/format";
import { Inline } from "./Inline";
import { LinkIcon } from "./Icons";

function Heading({ level, text, id }: { level: 2 | 3; text: string; id?: string }) {
  const anchor = id ?? slugify(text);
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={anchor} className="prose-heading">
      <Inline text={text} />
      <a className="heading-anchor" href={`#${anchor}`} aria-label="Link to this section">
        <LinkIcon />
      </a>
    </Tag>
  );
}

function Shot({ image, sizes }: { image: Figure; sizes: string }) {
  return (
    <a href={image.src} target="_blank" rel="noopener" className="shot-link" aria-label={`Open image: ${image.alt}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        unoptimized={image.src.endsWith(".svg")}
      />
    </a>
  );
}

const TONE_LABEL = { verified: "Verified", pending: "Pending", note: "Note" } as const;

/** Renderiza bloques de contenido con notas al margen (sidenotes). */
export function Prose({ blocks }: { blocks: Block[] }) {
  let noteIndex = 0;
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p": {
            if (!b.aside) {
              return (
                <p key={i}>
                  <Inline text={b.text} />
                </p>
              );
            }
            const n = ++noteIndex;
            return (
              <p key={i} className="has-sidenote">
                <Inline text={b.text} />
                <sup className="sidenote-ref" aria-hidden="true">
                  {n}
                </sup>
                <span className="sidenote" role="note">
                  <span className="sidenote-num">{n}</span> <Inline text={b.aside} />
                </span>
              </p>
            );
          }
          case "h2":
            return <Heading key={i} level={2} text={b.text} id={b.id} />;
          case "h3":
            return <Heading key={i} level={3} text={b.text} id={b.id} />;
          case "list": {
            const L = b.ordered ? "ol" : "ul";
            return (
              <L key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </L>
            );
          }
          case "code":
            return (
              <figure key={i} className="code-block">
                <pre tabIndex={0} aria-label={b.lang ? `Code ${b.lang}` : "Code"}>
                  <code>{b.code}</code>
                </pre>
                {(b.caption || b.lang) && (
                  <figcaption>
                    {b.lang && <span className="code-lang">{b.lang}</span>}
                    {b.caption && <Inline text={b.caption} />}
                  </figcaption>
                )}
              </figure>
            );
          case "figure":
            return (
              <figure key={i} className={b.wide ? "prose-figure is-wide" : "prose-figure"}>
                <Shot image={b.image} sizes={b.wide ? "(max-width: 767px) 100vw, 856px" : "(max-width: 767px) 100vw, 640px"} />
                {b.caption && (
                  <figcaption>
                    <Inline text={b.caption} />
                  </figcaption>
                )}
              </figure>
            );
          case "figures":
            return (
              <figure key={i} className="prose-figure gallery">
                <div className="gallery-row">
                  {b.images.map((img) => (
                    <div key={img.src} className="gallery-item" style={{ flex: `${img.width / img.height} 1 0` }}>
                      <Shot image={img} sizes="(max-width: 767px) 50vw, 320px" />
                      {img.label && <span className="gallery-label">{img.label}</span>}
                    </div>
                  ))}
                </div>
                {b.caption && (
                  <figcaption>
                    <Inline text={b.caption} />
                  </figcaption>
                )}
              </figure>
            );
          case "table":
            return (
              <figure key={i} className="prose-table">
                <div className="table-scroll" tabIndex={0}>
                  <table>
                    <thead>
                      <tr>
                        {b.head.map((h) => (
                          <th key={h} scope="col">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((r, j) => (
                        <tr key={j}>
                          {r.map((c, k) => (
                            <td key={k}>
                              <Inline text={c} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.caption && (
                  <figcaption>
                    <Inline text={b.caption} />
                  </figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <aside key={i} className="callout" data-tone={b.tone}>
                <p className="callout-title">{b.title ?? TONE_LABEL[b.tone]}</p>
                <p>
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <p>
                  <Inline text={b.text} />
                </p>
                {b.cite && <cite>{b.cite}</cite>}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
