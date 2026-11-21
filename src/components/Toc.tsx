"use client";

import { useEffect, useState } from "react";

interface Item {
  id: string;
  text: string;
  level: number;
}

/** Índice de la nota: resalta la sección que se está leyendo. */
export function Toc({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (!items.length) return null;
  return (
    <nav className="toc" aria-label="Table of contents">
      <p className="toc-title">On this page</p>
      <ol>
        {items.map((i) => (
          <li key={i.id} data-level={i.level}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "location" : undefined}>
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
