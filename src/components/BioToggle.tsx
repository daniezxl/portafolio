"use client";

import { useId, useState } from "react";
import { Inline } from "./Inline";

/** Bio en dos longitudes, con el selector de leerob.com. */
export function BioToggle({ short, long }: { short: readonly string[]; long: readonly string[] }) {
  const [mode, setMode] = useState<"short" | "long">("short");
  const id = useId();
  const text = mode === "short" ? short : long;

  return (
    <section className="bio" aria-labelledby={`${id}-label`}>
      <div className="bio-bar">
        <span id={`${id}-label`} className="label">
          Bio
        </span>
        <span className="segmented" role="group" aria-label="Bio length">
          <button type="button" aria-pressed={mode === "short"} onClick={() => setMode("short")}>
            Short
          </button>
          <button type="button" aria-pressed={mode === "long"} onClick={() => setMode("long")}>
            Long
          </button>
        </span>
      </div>
      <div key={mode} className="bio-text" aria-live="polite">
        {text.map((p, i) => (
          <p key={i}>
            <Inline text={p} />
          </p>
        ))}
      </div>
    </section>
  );
}
