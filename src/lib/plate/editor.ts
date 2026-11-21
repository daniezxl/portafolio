/**
 * Segundo motivo: un editor de código.
 *
 * Una ventana con barra de título, números de línea, código que se escribe
 * solo (tokens de distintos tonos), un minimapa y una terminal abajo. A los
 * lados, dos llaves enormes, y al fondo una lluvia de caracteres.
 *
 * Igual que el chip, se dibuja en escala de grises (negro = tinta) y cada
 * técnica de impresión la interpreta.
 */

import { mulberry32, type Framing, type MotifFrame } from "./motif";

const TAU = Math.PI * 2;
const MONO = `ui-monospace, "Cascadia Mono", Consolas, Menlo, monospace`;
const RAIN = "01{}[]();=>&|<>/*+-#$%:.?!";

const FILES = ["portfolio.tsx", "model.py", "api.ts", "schema.sql", "agent.ts"];
const PROMPTS = ["npm run dev", "python train.py", "git push origin main", "docker compose up", "pytest -q"];

export interface EditorParams {
  file: string;
  prompt: string;
  /** Por línea: sangría y tokens [ancho relativo, tono]. */
  lines: { indent: number; tokens: [number, number][] }[];
  rain: number[];
}

export function editorFromSeed(seed: number): EditorParams {
  const r = mulberry32(seed ^ 0x9e3779b9);
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)];
  const indents = [0, 1, 2, 2, 3, 2, 1, 2, 1, 0];
  const tones = [1, 0.85, 0.6, 0.85, 0.42];
  const lines = indents.map((indent) => {
    const n = 2 + Math.floor(r() * 4);
    return {
      indent,
      tokens: Array.from({ length: n }, () => [0.05 + r() * 0.13, pick(tones)] as [number, number]),
    };
  });
  return {
    file: pick(FILES),
    prompt: pick(PROMPTS),
    lines,
    rain: Array.from({ length: 64 }, () => r()),
  };
}

const gray = (ink: number) => {
  const v = Math.round(255 * (1 - Math.min(1, Math.max(0, ink))));
  return `rgb(${v},${v},${v})`;
};

export function drawEditor(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: EditorParams,
  f: MotifFrame,
  framing: Framing = "full",
) {
  const S = framing === "strip" ? h * 1.8 : Math.min(w, h);
  const cx = w / 2;
  const cy = h / 2;
  const t = f.t;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);

  // 1. Lluvia de caracteres al fondo: columnas que bajan a distinta velocidad.
  const fs = Math.max(7, S * 0.034);
  const colW = fs * 1.15;
  const rowH = fs * 1.25;
  ctx.font = `700 ${fs}px ${MONO}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const cols = Math.ceil(w / colW) + 1;
  const rows = Math.ceil(h / rowH) + 2;
  for (let c = 0; c < cols; c++) {
    const rnd = p.rain[c % p.rain.length];
    const speed = 0.6 + rnd * 1.4;
    const shift = (t * speed * rowH * 1.5 + rnd * h) % rowH;
    const head = Math.floor(t * speed * 1.5 + rnd * 40);
    for (let k = 0; k < rows; k++) {
      const y = k * rowH - rowH + shift;
      const idx = (head - k + c * 7 + 1000) % RAIN.length;
      // Las columnas se desvanecen a ratos, como en un flujo de datos.
      const fade = 0.5 + 0.5 * Math.sin(t * 0.8 + c * 1.7 + k * 0.35);
      ctx.fillStyle = gray(0.12 + fade * 0.3);
      ctx.fillText(RAIN[idx], c * colW, y);
    }
  }

  // Brillo que sigue al puntero.
  const g = ctx.createRadialGradient(f.glowX, f.glowY, 0, f.glowX, f.glowY, S * 0.55);
  g.addColorStop(0, "rgba(255,255,255,0.95)");
  g.addColorStop(0.55, "rgba(255,255,255,0.5)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // 2. Llaves gigantes a los lados.
  const W = Math.min(w * 0.64, S * 1.2);
  const H = S * 0.74;
  const braceSize = S * 0.6;
  ctx.font = `700 ${braceSize}px ${MONO}`;
  ctx.fillStyle = gray(1);
  const bx = Math.min(W / 2 + braceSize * 0.42, w / 2 - braceSize * 0.15);
  const bob = Math.sin(t * 1.2) * S * 0.01;
  ctx.fillText("{", cx - bx, cy + bob);
  ctx.fillText("}", cx + bx, cy - bob);

  // 3. La ventana del editor.
  const x0 = cx - W / 2;
  const y0 = cy - H / 2;
  const rad = S * 0.03;
  const lw = Math.max(1.5, S * 0.012);
  ctx.beginPath();
  ctx.roundRect(x0 - lw * 2, y0 - lw * 2, W + lw * 4, H + lw * 4, rad + lw);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(x0, y0, W, H, rad);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.lineWidth = lw;
  ctx.strokeStyle = gray(1);
  ctx.stroke();

  // Barra de título con tres botones y el nombre del archivo.
  const bar = H * 0.12;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x0, y0, W, H, rad);
  ctx.clip();
  ctx.fillStyle = gray(1);
  ctx.fillRect(x0, y0, W, bar);
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(x0 + bar * 0.55 + i * bar * 0.5, y0 + bar / 2, bar * 0.14, 0, TAU);
    ctx.fill();
  }
  ctx.font = `700 ${bar * 0.42}px ${MONO}`;
  ctx.fillText(p.file, cx, y0 + bar / 2);

  // Terminal abajo.
  const term = H * 0.2;
  const ty = y0 + H - term;
  ctx.fillStyle = gray(1);
  ctx.fillRect(x0, ty, W, term);

  // Columna de números de línea y minimapa.
  const gutter = W * 0.09;
  const mini = W * 0.08;
  ctx.fillStyle = gray(0.16);
  ctx.fillRect(x0, y0 + bar, gutter, ty - y0 - bar);
  ctx.fillRect(x0 + W - mini, y0 + bar, mini, ty - y0 - bar);

  // Código que se escribe solo.
  const area = ty - (y0 + bar);
  const lh = area / (p.lines.length + 0.6);
  const tokH = Math.max(2, lh * 0.42);
  const unit = W - gutter - mini - lh;
  const indentW = unit * 0.06;
  const totalTokens = p.lines.reduce((n, l) => n + l.tokens.length, 0);
  // El archivo ya está casi escrito: solo se teclean (y se borran) los últimos tokens.
  const tail = Math.min(10, totalTokens - 1);
  const phase = Math.floor(t * 4) % (tail * 2 + 6);
  const typed = totalTokens - tail + Math.min(tail, phase < tail + 6 ? phase : tail * 2 + 6 - phase);
  ctx.font = `700 ${Math.min(lh * 0.5, gutter * 0.45)}px ${MONO}`;
  let count = 0;
  const cur: { at: [number, number] | null } = { at: null };
  p.lines.forEach((line, li) => {
    const yMid = y0 + bar + lh * (li + 0.8);
    ctx.fillStyle = gray(0.55);
    ctx.fillText(String(li + 1), x0 + gutter / 2, yMid);
    let x = x0 + gutter + lh * 0.5 + line.indent * indentW;
    for (const [tw, tone] of line.tokens) {
      if (count >= typed) {
        if (!cur.at) cur.at = [x, yMid];
        break;
      }
      const ww = tw * unit;
      ctx.beginPath();
      ctx.roundRect(x, yMid - tokH / 2, ww, tokH, tokH / 2);
      ctx.fillStyle = gray(tone);
      ctx.fill();
      x += ww + tokH * 0.7;
      count++;
    }
    if (count === typed && !cur.at && li === p.lines.length - 1) cur.at = [x, yMid];
    // Minimapa: la misma línea en miniatura.
    ctx.fillStyle = gray(0.5);
    const mw = Math.min(mini * 0.8, line.tokens.reduce((s, [tw]) => s + tw, 0) * mini * 1.6);
    ctx.fillRect(x0 + W - mini + mini * 0.12 + line.indent * mini * 0.06, yMid - tokH * 0.2, mw * 0.8, tokH * 0.4);
  });
  // Cursor parpadeante.
  if (cur.at && Math.floor(t * 2.2) % 2 === 0) {
    const [ccx, ccy] = cur.at;
    ctx.fillStyle = gray(1);
    ctx.fillRect(ccx, ccy - lh * 0.36, Math.max(2, lh * 0.12), lh * 0.72);
  }

  // Línea de comandos en la terminal.
  const tfs = term * 0.32;
  ctx.font = `700 ${tfs}px ${MONO}`;
  ctx.textAlign = "left";
  ctx.fillStyle = "#fff";
  const tx = x0 + gutter * 0.5;
  const line1 = `$ ${p.prompt}`;
  ctx.fillText(line1, tx, ty + term * 0.36);
  const ready = Math.floor(t * 0.5) % 2 === 0;
  ctx.fillText(ready ? "✓ listo en 1.2 s" : "▸ compilando…", tx, ty + term * 0.74);
  if (Math.floor(t * 2.2) % 2 === 0) {
    const mw = ctx.measureText(line1).width;
    ctx.fillRect(tx + mw + tfs * 0.3, ty + term * 0.36 - tfs * 0.5, tfs * 0.55, tfs);
  }
  ctx.restore();
}
