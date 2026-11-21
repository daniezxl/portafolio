"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlateRenderer, type PlateColors } from "@/lib/plate/renderer";
import { hashString, type Framing } from "@/lib/plate/motif";
import { MOTIFS, TECHNIQUES, type Motif, type Technique } from "@/lib/plate/techniques";

const FPS = 12;
const DISSOLVE_MS = 560;
const AUTO_MS = 3000;

function readColors(el: HTMLElement): PlateColors {
  const cs = getComputedStyle(el);
  const v = (n: string) => cs.getPropertyValue(n).trim();
  return {
    paper: v("--plate-paper"),
    ink: v("--plate-ink"),
    cobalt: v("--plate-cobalt"),
    carmine: v("--plate-carmine"),
    line: v("--plate-line"),
    stitch: [1, 2, 3, 4, 5].map((i) => v(`--stitch-${i}`)),
    dark: document.documentElement.dataset.theme === "dark",
  };
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface CanvasProps {
  seed: string;
  technique: Technique;
  /** "always": anima mientras sea visible. "hover": cuadro fijo, anima al pasar el puntero. */
  motion: "always" | "hover";
  className?: string;
  onPointerLight?: boolean;
  framing?: Framing;
  /** Qué imprimir. Sin valor, se elige según la semilla. */
  motif?: Motif;
}

/** Lienzo de la lámina. No tiene controles; ver <PlateHero> para la versión interactiva. */
export function PlateCanvas({
  seed,
  technique,
  motion,
  className,
  onPointerLight = false,
  framing = "full",
  motif: motifProp,
}: CanvasProps) {
  const motif: Motif = motifProp ?? (hashString(seed) % 2 ? "chip" : "editor");
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    renderer: null as PlateRenderer | null,
    colors: null as PlateColors | null,
    technique,
    motif,
    t: Math.random() * 20,
    last: 0,
    visible: false,
    hovering: false,
    raf: 0,
    glow: { x: 0, y: 0 },
    glowTarget: { x: 0, y: 0 },
    transitionStart: 0,
    reduced: false,
  });

  const draw = useCallback((now: number) => {
    const s = state.current;
    if (!s.renderer || !s.colors) return;
    const p = s.transitionStart ? Math.min(1, (now - s.transitionStart) / DISSOLVE_MS) : 1;
    if (p >= 1) s.transitionStart = 0;
    s.renderer.render(s.technique, s.t, s.glow, s.colors, p, s.motif);
  }, []);

  const loop = useCallback(
    (now: number) => {
      const s = state.current;
      s.raf = 0;
      const animating = !s.reduced && s.visible && (motion === "always" || s.hovering);
      const transitioning = s.transitionStart !== 0;
      if (!animating && !transitioning) return;
      if (now - s.last >= 1000 / FPS) {
        const dt = s.last ? Math.min(0.25, (now - s.last) / 1000) : 1 / FPS;
        s.last = now;
        if (animating) s.t += dt;
        s.glow.x += (s.glowTarget.x - s.glow.x) * 0.25;
        s.glow.y += (s.glowTarget.y - s.glow.y) * 0.25;
        draw(now);
      }
      s.raf = requestAnimationFrame(loop);
    },
    [draw, motion],
  );

  const kick = useCallback(() => {
    const s = state.current;
    if (!s.raf) {
      s.last = 0;
      s.raf = requestAnimationFrame(loop);
    }
  }, [loop]);

  // Montaje: renderer, tamaño, visibilidad y tema.
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const s = state.current;
    s.reduced = prefersReducedMotion();
    s.renderer = new PlateRenderer(canvas, hashString(seed), framing);
    s.colors = readColors(wrap);

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width < 2 || height < 2) return;
      s.renderer!.resize(width, height, window.devicePixelRatio || 1);
      draw(performance.now());
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
      if (s.visible) kick();
    });
    io.observe(wrap);

    const onTheme = () => {
      s.colors = readColors(wrap);
      draw(performance.now());
    };
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      s.reduced = mq.matches;
      kick();
    };
    mq.addEventListener("change", onMotion);

    const onVis = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [seed, framing, draw, kick]);

  // Cambio de técnica o de motivo: disolución por bloques.
  useEffect(() => {
    const s = state.current;
    if (s.technique === technique && s.motif === motif) return;
    if (s.renderer) {
      s.renderer.snapshot();
      s.transitionStart = s.reduced ? 0 : performance.now();
    }
    s.technique = technique;
    s.motif = motif;
    if (s.reduced) draw(performance.now());
    else kick();
  }, [technique, motif, draw, kick]);

  return (
    <div
      ref={wrapRef}
      className={className}
      onPointerEnter={() => {
        state.current.hovering = true;
        kick();
      }}
      onPointerLeave={() => {
        const s = state.current;
        s.hovering = false;
        s.glowTarget = { x: 0, y: 0 };
      }}
      onPointerMove={(e) => {
        if (!onPointerLight) return;
        const r = e.currentTarget.getBoundingClientRect();
        state.current.glowTarget = {
          x: ((e.clientX - r.left) / r.width - 0.5) * 2,
          y: ((e.clientY - r.top) / r.height - 0.5) * 2,
        };
      }}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}

/**
 * Lámina de portada: cada 3 s se reimprime en la siguiente técnica y alterna
 * entre el editor de código y la red neuronal. Clic, Enter o las flechas la
 * reimprimen a mano (y reinician la cuenta).
 */
export function PlateHero({ seed = "daniel-curiel" }: { seed?: string }) {
  const [tech, setTech] = useState(0);
  const [mot, setMot] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = TECHNIQUES[tech];
  const motif = MOTIFS[mot];

  const step = useCallback((dir: 1 | -1) => {
    setTech((i) => (i + dir + TECHNIQUES.length) % TECHNIQUES.length);
    setMot((m) => (m + 1) % MOTIFS.length);
  }, []);

  useEffect(() => {
    const onReprint = () => step(1);
    window.addEventListener("plate:reprint", onReprint);
    return () => window.removeEventListener("plate:reprint", onReprint);
  }, [step]);

  // Avance automático: se reinicia con cada cambio y se detiene con el foco del teclado.
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = window.setTimeout(() => {
      if (!document.hidden) step(1);
    }, AUTO_MS);
    return () => window.clearTimeout(id);
  }, [tech, mot, paused, step]);

  return (
    <figure className="plate-hero">
      <button
        type="button"
        className="plate-press"
        aria-label={`Lámina: ${motif.name} en ${current.name}. Reimprimir`}
        onClick={() => step(1)}
        onFocus={(e) => setPaused(e.currentTarget.matches(":focus-visible"))}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
      >
        <PlateCanvas
          seed={seed}
          technique={current.id}
          motif={motif.id}
          motion="always"
          className="plate-canvas"
          onPointerLight
        />
      </button>
      <figcaption className="plate-caption">
        <span className="plate-caption-now">
          <span className="plate-caption-name">{motif.name}</span>
          <span className="plate-caption-note">{current.note}</span>
        </span>
        <span className="plate-techniques" role="group" aria-label="Técnica de impresión">
          {TECHNIQUES.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className="plate-technique"
              aria-pressed={i === tech}
              onClick={() => setTech(i)}
            >
              {t.name}
            </button>
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
