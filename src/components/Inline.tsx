import Link from "next/link";
import type { ReactNode } from "react";

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

export const isExternal = (href: string) => /^https?:\/\//.test(href) || href.startsWith("mailto:");

/** Interpreta *cursiva*, **negrita**, `código` y [enlaces](url) dentro de un texto. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  const out: ReactNode[] = parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      return isExternal(href) ? (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <Link key={i} href={href}>
          {label}
        </Link>
      );
    }
    return part;
  });
  return <>{out}</>;
}

/** Texto plano (para metadatos, búsquedas y conteo de palabras). */
export const plain = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*`]/g, "");
