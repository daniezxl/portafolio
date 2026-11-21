"use client";

import { useEffect, useState } from "react";
import { applyTheme, currentPref, type ThemePref } from "@/lib/theme";

const OPTIONS: { id: ThemePref; label: string }[] = [
  { id: "system", label: "System" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

export function ThemeToggle() {
  const [pref, setPref] = useState<ThemePref | null>(null);

  useEffect(() => {
    setPref(currentPref());
    const onChange = (e: Event) => setPref((e as CustomEvent<ThemePref>).detail);
    window.addEventListener("theme:change", onChange);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      if (currentPref() === "system") applyTheme("system");
    };
    mq.addEventListener("change", onSystem);
    return () => {
      window.removeEventListener("theme:change", onChange);
      mq.removeEventListener("change", onSystem);
    };
  }, []);

  return (
    <span className="segmented" role="group" aria-label="Theme">
      {OPTIONS.map((o) => (
        <button key={o.id} type="button" aria-pressed={pref === o.id} onClick={() => applyTheme(o.id)}>
          {o.label}
        </button>
      ))}
    </span>
  );
}
