"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { applyTheme } from "@/lib/theme";
import { CornerReturn, Search } from "./Icons";

export interface CommandEntry {
  group: string;
  label: string;
  hint?: string;
  href?: string;
  action?: "theme-light" | "theme-dark" | "theme-system" | "copy-email" | "reprint";
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export const openCommandMenu = () => window.dispatchEvent(new Event("cmdk:open"));

export function CommandMenu({ entries, email }: { entries: CommandEntry[]; email: string }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return entries;
    return entries.filter((e) => norm(`${e.label} ${e.hint ?? ""} ${e.group}`).includes(q));
  }, [entries, query]);

  const open = useCallback(() => {
    const d = dialog.current;
    if (!d || d.open) return;
    setQuery("");
    setActive(0);
    d.showModal();
    requestAnimationFrame(() => input.current?.focus());
  }, []);

  const close = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialog.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", open);
    };
  }, [open, close]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = async (e: CommandEntry) => {
    close();
    if (e.href) {
      if (/^https?:/.test(e.href)) window.open(e.href, "_blank", "noopener,noreferrer");
      else router.push(e.href);
      return;
    }
    switch (e.action) {
      case "theme-light":
        applyTheme("light");
        break;
      case "theme-dark":
        applyTheme("dark");
        break;
      case "theme-system":
        applyTheme("system");
        break;
      case "copy-email":
        try {
          await navigator.clipboard.writeText(email);
          setToast("Email copied");
        } catch {
          window.location.href = `mailto:${email}`;
        }
        break;
      case "reprint":
        if (window.location.pathname !== "/") router.push("/");
        else window.dispatchEvent(new Event("plate:reprint"));
        break;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[active];
      if (r) run(r);
    }
  };

  let lastGroup = "";
  return (
    <>
      <dialog
        ref={dialog}
        className="cmdk"
        aria-label="Search the site"
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="cmdk-panel" onKeyDown={onKeyDown}>
          <label className="cmdk-input">
            <Search />
            <input
              ref={input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              placeholder="Search pages, notes, actions…"
              aria-label="Search"
              aria-controls="cmdk-list"
              aria-activedescendant={results[active] ? `cmdk-${active}` : undefined}
              role="combobox"
              aria-expanded="true"
              autoComplete="off"
              spellCheck={false}
            />
            <kbd>Esc</kbd>
          </label>
          <div ref={list} id="cmdk-list" className="cmdk-list" role="listbox">
            {results.length === 0 && <p className="cmdk-empty">Nothing for “{query}”. Try “notes” or “theme”.</p>}
            {results.map((r, i) => {
              const header = r.group !== lastGroup;
              lastGroup = r.group;
              return (
                <div key={`${r.group}-${r.label}`}>
                  {header && <p className="cmdk-group">{r.group}</p>}
                  <div
                    id={`cmdk-${i}`}
                    data-index={i}
                    role="option"
                    aria-selected={i === active}
                    className="cmdk-item"
                    onMouseMove={() => setActive(i)}
                    onClick={() => run(r)}
                  >
                    <span>{r.label}</span>
                    {r.hint && <span className="cmdk-hint">{r.hint}</span>}
                    {i === active && <CornerReturn className="cmdk-enter" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </dialog>
      <div className="toast" role="status" aria-live="polite" data-show={toast ? "" : undefined}>
        {toast}
      </div>
    </>
  );
}
