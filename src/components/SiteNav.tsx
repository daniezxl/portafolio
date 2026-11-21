"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { openCommandMenu } from "./CommandMenu";
import { Rabbit } from "./Icons";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/notas", label: "Notas" },
];

/** Columna izquierda fija, al estilo de la meta de paco.me. */
export function SiteNav({ children }: { children?: ReactNode }) {
  const path = usePathname();
  const [mac, setMac] = useState(true);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);

  return (
    <div className="meta">
      <nav className="site-nav" aria-label="Principal">
        <Link href="/" className="site-mark" aria-label="Daniel Curiel, inicio">
          <Rabbit />
        </Link>
        <ul>
          {LINKS.map((l) => {
            const current = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link href={l.href} aria-current={current ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button type="button" className="nav-search" onClick={openCommandMenu}>
              Buscar <kbd>{mac ? "⌘" : "Ctrl"} K</kbd>
            </button>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
