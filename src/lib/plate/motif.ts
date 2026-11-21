/**
 * El motivo: un chip con una red neuronal.
 *
 * Al centro, un procesador con sus pines. De él salen pistas de circuito
 * impreso por las que viajan paquetes de datos. Alrededor, tres capas de
 * neuronas que se activan en ola, un anillo de código que gira y ondas de
 * señal en el fondo.
 *
 * Se dibuja en escala de grises sobre un lienzo de máscara (negro = tinta,
 * blanco = papel). Cada técnica de impresión interpreta esa máscara.
 */

export interface MotifParams {
  traces: number;
  layers: [number, number, number];
  spin: number;
  pins: number;
  code: string;
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const SNIPPETS = [
  "const answer = await model.generate(prompt);",
  "for (const batch of data) loss = train(batch);",
  "SELECT * FROM ideas WHERE useful = true;",
  "def forward(x): return softmax(W @ x + b)",
  "git commit -m \"ship it\"",
  "while (learning) { iterate(); }",
];

export function paramsFromSeed(seed: number): MotifParams {
  const r = mulberry32(seed);
  const pick = (n: number) => Math.floor(r() * n);
  const a = SNIPPETS[pick(SNIPPETS.length)];
  let b = SNIPPETS[pick(SNIPPETS.length)];
  if (b === a) b = SNIPPETS[(SNIPPETS.indexOf(a) + 1) % SNIPPETS.length];
  return {
    traces: [16, 20, 24][pick(3)],
    layers: [6 + pick(2) * 2, 12 + pick(2) * 2, 18 + pick(2) * 4] as [number, number, number],
    spin: r() * Math.PI * 2,
    pins: 4 + pick(2),
    code: `${a}  ·  ${b}  ·  0110 1001 1100  ·  `,
  };
}

const gray = (ink: number) => {
  const v = Math.round(255 * (1 - Math.min(1, Math.max(0, ink))));
  return `rgb(${v},${v},${v})`;
};

const TAU = Math.PI * 2;
const MONO = `ui-monospace, "Cascadia Mono", Consolas, Menlo, monospace`;

export interface MotifFrame {
  t: number;
  glowX: number;
  glowY: number;
}

export type Framing = "full" | "strip";

export function drawMotif(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: MotifParams,
  f: MotifFrame,
  framing: Framing = "full",
) {
  // "strip": una franja que recorta la mitad inferior del motivo.
  const R = framing === "strip" ? Math.max(w * 0.27, h * 0.9) : Math.min(w, h) * 0.47;
  const cx = w / 2;
  const cy = framing === "strip" ? h * 0.5 - R * 0.52 : h / 2;
  const far = Math.hypot(w, h);
  const t = f.t;
  const lw = Math.max(1, R * 0.016);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);

  // 1. Ondas de señal que se expanden desde el chip (el túnel del video).
  const band = R * 0.16;
  const offset = (t * R * 0.12) % (band * 4);
  const levels = [0.12, 0.3, 0.2, 0.38];
  for (let i = Math.ceil((far + offset) / band) + 1; i >= 0; i--) {
    const r = i * band - offset;
    if (r <= 0) continue;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.fillStyle = gray(levels[i % 4]);
    ctx.fill();
  }

  // Rejilla de puntos de placa de circuito.
  const step = Math.max(6, R * 0.075);
  const dot = Math.max(0.6, R * 0.008);
  ctx.fillStyle = gray(0.55);
  ctx.beginPath();
  for (let y = (cy % step) - step; y < h + step; y += step) {
    for (let x = (cx % step) - step; x < w + step; x += step) {
      ctx.moveTo(x + dot, y);
      ctx.arc(x, y, dot, 0, TAU);
    }
  }
  ctx.fill();

  // Brillo que sigue al puntero.
  const g = ctx.createRadialGradient(f.glowX, f.glowY, 0, f.glowX, f.glowY, R * 0.9);
  g.addColorStop(0, "rgba(255,255,255,0.95)");
  g.addColorStop(0.5, "rgba(255,255,255,0.45)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(cx, cy);

  // 2. Pistas de circuito con un quiebre a 45° y una vía al final.
  const r0 = R * 0.26;
  const r1 = R * 1.02;
  const bend = R * 0.16;
  ctx.lineCap = "square";
  ctx.lineJoin = "miter";
  const angles: number[] = [];
  for (let i = 0; i < p.traces; i++) {
    const a = (i / p.traces) * TAU + TAU / (p.traces * 2);
    angles.push(a);
    const dir = i % 2 ? 1 : -1;
    const bx = Math.cos(a) * r1;
    const by = Math.sin(a) * r1;
    const ex = bx + Math.cos(a + (dir * Math.PI) / 4) * bend;
    const ey = by + Math.sin(a + (dir * Math.PI) / 4) * bend;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
    ctx.lineTo(bx, by);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = gray(1);
    ctx.lineWidth = lw;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ex, ey, R * 0.03, 0, TAU);
    ctx.fillStyle = gray(1);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ex, ey, R * 0.013, 0, TAU);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }
  // Paquetes de datos viajando hacia fuera.
  ctx.fillStyle = "#fff";
  const s = R * 0.022;
  angles.forEach((a, i) => {
    const u = (t * 0.22 + i * 0.37) % 1;
    const r = r0 + (r1 - r0) * u;
    ctx.fillRect(Math.cos(a) * r - s / 2, Math.sin(a) * r - s / 2, s, s);
  });

  // 3. Red neuronal: tres capas que giran despacio.
  ctx.save();
  ctx.rotate(p.spin * 0.2 + t * 0.06);
  const radii = [0.36, 0.52, 0.68].map((k) => k * R);
  const nodes = p.layers.map((n, li) =>
    Array.from({ length: n }, (_, j) => {
      const a = (j / n) * TAU + li * 0.13;
      return { x: Math.cos(a) * radii[li], y: Math.sin(a) * radii[li], a };
    }),
  );
  // Conexiones entre capas vecinas (solo las cercanas en ángulo).
  ctx.strokeStyle = gray(0.62);
  ctx.lineWidth = Math.max(0.75, R * 0.006);
  ctx.beginPath();
  for (let li = 0; li < 2; li++) {
    for (const a of nodes[li]) {
      for (const b of nodes[li + 1]) {
        let d = Math.abs(a.a - b.a) % TAU;
        if (d > Math.PI) d = TAU - d;
        if (d < (TAU / nodes[li].length) * 0.9) {
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
    }
  }
  ctx.stroke();
  // Neuronas: se activan en ola, capa por capa.
  for (let li = 0; li < 3; li++) {
    const nr = R * [0.034, 0.028, 0.022][li];
    nodes[li].forEach((n, j) => {
      const active = Math.sin(t * 2.4 - li * 1.3 + j * 0.9) > 0.35;
      ctx.beginPath();
      ctx.arc(n.x, n.y, nr + R * 0.012, 0, TAU);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(n.x, n.y, nr, 0, TAU);
      ctx.fillStyle = gray(1);
      ctx.fill();
      if (!active) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, nr * 0.5, 0, TAU);
        ctx.fillStyle = "#fff";
        ctx.fill();
      }
    });
  }
  ctx.restore();

  // 4. Anillo de código que gira: letras de papel sobre una banda de tinta.
  const rIn = R * 0.8;
  const rOut = R * 0.94;
  ctx.beginPath();
  ctx.arc(0, 0, rOut, 0, TAU);
  ctx.arc(0, 0, rIn, 0, TAU, true);
  ctx.fillStyle = gray(1);
  ctx.fill();
  ctx.strokeStyle = gray(1);
  ctx.lineWidth = Math.max(1, R * 0.008);
  for (const rr of [0.765, 0.975]) {
    ctx.beginPath();
    ctx.arc(0, 0, R * rr, 0, TAU);
    ctx.stroke();
  }
  const size = R * 0.072;
  const rText = (rIn + rOut) / 2;
  ctx.font = `700 ${size}px ${MONO}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  const count = Math.floor(TAU / ((size * 0.62) / rText));
  const start = p.spin - t * 0.05;
  for (let i = 0; i < count; i++) {
    const ch = p.code[i % p.code.length];
    if (ch === " ") continue;
    const a = start + i * (TAU / count);
    ctx.save();
    ctx.translate(Math.cos(a) * rText, Math.sin(a) * rText);
    ctx.rotate(a + Math.PI / 2);
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  }

  // 5. El chip: un procesador con pines, fijo al centro.
  const half = R * 0.19;
  const pinLen = R * 0.085;
  const pinW = R * 0.03;
  ctx.fillStyle = gray(1);
  for (let side = 0; side < 4; side++) {
    ctx.save();
    ctx.rotate((side * Math.PI) / 2);
    for (let k = 0; k < p.pins; k++) {
      const off = ((k + 0.5) / p.pins - 0.5) * half * 1.7;
      ctx.fillRect(half - R * 0.005, off - pinW / 2, pinLen, pinW);
    }
    ctx.restore();
  }
  const pad = R * 0.02;
  ctx.fillStyle = "#fff";
  ctx.fillRect(-half - pad, -half - pad, (half + pad) * 2, (half + pad) * 2);
  ctx.fillStyle = gray(1);
  ctx.fillRect(-half, -half, half * 2, half * 2);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = Math.max(1, R * 0.008);
  ctx.strokeRect(-half * 0.8, -half * 0.8, half * 1.6, half * 1.6);
  // Muesca de orientación.
  ctx.beginPath();
  ctx.arc(-half * 0.6, -half * 0.6, R * 0.018, 0, TAU);
  ctx.fillStyle = "#fff";
  ctx.fill();
  // Etiqueta </> con un cursor que parpadea.
  ctx.font = `700 ${R * 0.12}px ${MONO}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("</>", 0, 0);
  if (Math.floor(t * 1.6) % 2 === 0) ctx.fillRect(-R * 0.05, R * 0.085, R * 0.1, R * 0.02);
  ctx.restore();
}
