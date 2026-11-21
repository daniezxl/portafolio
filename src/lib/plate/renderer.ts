import { drawEditor, editorFromSeed, type EditorParams } from "./editor";
import { drawMotif, paramsFromSeed, type Framing, type MotifParams } from "./motif";
import type { Motif } from "./techniques";
import type { Technique } from "./techniques";

export interface PlateColors {
  paper: string;
  ink: string;
  cobalt: string;
  carmine: string;
  line: string;
  stitch: string[];
  dark: boolean;
}

type RGB = [number, number, number];

const BAYER_8 = (() => {
  const m = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
  ];
  return m.map((row) => row.map((v) => (v + 0.5) / 64));
})();

const colorCache = new Map<string, RGB>();
let probe: CanvasRenderingContext2D | null = null;
function toRGB(c: string): RGB {
  const hit = colorCache.get(c);
  if (hit) return hit;
  if (!probe) {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    probe = cv.getContext("2d", { willReadFrequently: true });
  }
  if (!probe) return [0, 0, 0];
  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = c;
  probe.fillRect(0, 0, 1, 1);
  const d = probe.getImageData(0, 0, 1, 1).data;
  const rgb: RGB = [d[0], d[1], d[2]];
  colorCache.set(c, rgb);
  return rgb;
}

const BLOCK = 16;

export class PlateRenderer {
  private ctx: CanvasRenderingContext2D;
  private mask = document.createElement("canvas");
  private mctx: CanvasRenderingContext2D;
  private work = document.createElement("canvas");
  private wctx: CanvasRenderingContext2D;
  private prev = document.createElement("canvas");
  private pctx: CanvasRenderingContext2D;
  private params: MotifParams;
  private editor: EditorParams;
  private blockRand: Float32Array = new Float32Array(0);
  w = 0;
  h = 0;
  dpr = 1;

  constructor(
    private canvas: HTMLCanvasElement,
    seed: number,
    private framing: Framing = "full",
  ) {
    this.ctx = canvas.getContext("2d")!;
    this.mctx = this.mask.getContext("2d", { willReadFrequently: true })!;
    this.wctx = this.work.getContext("2d")!;
    this.pctx = this.prev.getContext("2d")!;
    this.params = paramsFromSeed(seed);
    this.editor = editorFromSeed(seed);
  }

  resize(cssW: number, cssH: number, dpr: number) {
    this.w = Math.max(1, Math.round(cssW));
    this.h = Math.max(1, Math.round(cssH));
    this.dpr = Math.min(2, Math.max(1, dpr));
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.mask.width = this.w;
    this.mask.height = this.h;
    this.prev.width = this.canvas.width;
    this.prev.height = this.canvas.height;
    const bx = Math.ceil(this.w / BLOCK);
    const by = Math.ceil(this.h / BLOCK);
    this.blockRand = new Float32Array(bx * by);
    for (let i = 0; i < this.blockRand.length; i++) this.blockRand[i] = Math.random();
  }

  /** Guarda el cuadro actual para disolverlo hacia la siguiente técnica. */
  snapshot() {
    this.pctx.clearRect(0, 0, this.prev.width, this.prev.height);
    this.pctx.drawImage(this.canvas, 0, 0);
    for (let i = 0; i < this.blockRand.length; i++) this.blockRand[i] = Math.random();
  }

  render(
    technique: Technique,
    t: number,
    glow: { x: number; y: number },
    colors: PlateColors,
    transition = 1,
    motif: Motif = "chip",
  ) {
    const { w, h } = this;
    // Aún sin medir (o colapsado): no hay nada que imprimir.
    if (w < 2 || h < 2 || this.mask.width < 2 || this.canvas.width < 2) return;
    const frame = { t, glowX: w / 2 + glow.x * w * 0.25, glowY: h / 2 + glow.y * h * 0.25 };
    if (motif === "editor") drawEditor(this.mctx, w, h, this.editor, frame, this.framing);
    else drawMotif(this.mctx, w, h, this.params, frame, this.framing);
    const src = this.mctx.getImageData(0, 0, w, h).data;
    const ink = new Float32Array(w * h);
    for (let i = 0, j = 0; i < ink.length; i++, j += 4) ink[i] = 1 - src[j] / 255;

    const ctx = this.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.imageSmoothingEnabled = false;

    switch (technique) {
      case "porcelana":
        this.threshold(ink, colors.paper, colors.cobalt, 0.5, 0.36, true);
        break;
      case "tramado":
        this.dither(ink, colors);
        break;
      case "semitono":
        this.halftone(ink, colors);
        break;
      case "punto":
        this.stitch(ink, colors);
        break;
      case "riso":
        this.riso(ink, colors);
        break;
    }

    if (transition < 1) this.dissolve(transition);
  }

  /** Las celdas se encogen en láminas pequeñas para conservar el dibujo. */
  private get k() {
    return Math.min(1, Math.max(0.45, Math.min(this.w, this.h) / 440));
  }

  private blit(cw: number, ch: number) {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(this.work, 0, 0, cw, ch, 0, 0, this.canvas.width, this.canvas.height);
  }

  private threshold(ink: Float32Array, paperC: string, inkC: string, cut: number, noise: number, opaque: boolean) {
    const { w, h } = this;
    this.work.width = w;
    this.work.height = h;
    const img = this.wctx.createImageData(w, h);
    const d = img.data;
    const paper = toRGB(paperC);
    const tint = toRGB(inkC);
    for (let i = 0, j = 0; i < ink.length; i++, j += 4) {
      const v = ink[i] + (Math.random() - 0.5) * noise;
      let on = v > cut;
      const r = Math.random();
      if (on && r < 0.035) on = false; // tinta gastada
      else if (!on && r < 0.006 && ink[i] > 0.1) on = true; // salpicadura
      if (on) {
        d[j] = tint[0];
        d[j + 1] = tint[1];
        d[j + 2] = tint[2];
        d[j + 3] = 255;
      } else if (opaque) {
        d[j] = paper[0];
        d[j + 1] = paper[1];
        d[j + 2] = paper[2];
        d[j + 3] = 255;
      }
    }
    this.wctx.putImageData(img, 0, 0);
    if (opaque) this.blit(w, h);
  }

  private dither(ink: Float32Array, colors: PlateColors) {
    const { w, h } = this;
    const step = this.k < 0.75 ? 1 : 2;
    const cw = Math.ceil(w / step);
    const ch = Math.ceil(h / step);
    this.work.width = cw;
    this.work.height = ch;
    const img = this.wctx.createImageData(cw, ch);
    const d = img.data;
    const paper = toRGB(colors.paper);
    const tint = toRGB(colors.ink);
    const ox = Math.floor(Math.random() * 8);
    const oy = Math.floor(Math.random() * 8);
    for (let y = 0; y < ch; y++) {
      const row = BAYER_8[(y + oy) & 7];
      for (let x = 0; x < cw; x++) {
        const sx = Math.min(w - 1, x * step);
        const sy = Math.min(h - 1, y * step);
        const v = ink[sy * w + sx];
        const on = v > row[(x + ox) & 7];
        const c = on ? tint : paper;
        const j = (y * cw + x) * 4;
        d[j] = c[0];
        d[j + 1] = c[1];
        d[j + 2] = c[2];
        d[j + 3] = 255;
      }
    }
    this.wctx.putImageData(img, 0, 0);
    this.blit(cw, ch);
  }

  private dots(ink: Float32Array, color: string, cell: number, angle: number, dx: number, dy: number, gain: number, ceiling = 2) {
    const { w, h, dpr } = this;
    const ctx = this.ctx;
    const cx = w / 2;
    const cy = h / 2;
    const ca = Math.cos(angle);
    const sa = Math.sin(angle);
    const n = Math.ceil(Math.hypot(w, h) / cell / 2) + 1;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = -n; i <= n; i++) {
      for (let j = -n; j <= n; j++) {
        const x = cx + (i * ca - j * sa) * cell;
        const y = cy + (i * sa + j * ca) * cell;
        if (x < -cell || y < -cell || x > w + cell || y > h + cell) continue;
        const sx = Math.min(w - 1, Math.max(0, Math.round(x)));
        const sy = Math.min(h - 1, Math.max(0, Math.round(y)));
        const raw = ink[sy * w + sx];
        const v = (raw > ceiling ? 0.12 : raw) * gain;
        if (v <= 0.02) continue;
        const r = cell * 0.72 * Math.sqrt(Math.min(1, v)) * (0.94 + Math.random() * 0.12);
        ctx.moveTo(x + dx + r, y + dy);
        ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2);
      }
    }
    ctx.fill();
    ctx.restore();
  }

  private halftone(ink: Float32Array, colors: PlateColors) {
    const ctx = this.ctx;
    ctx.fillStyle = colors.paper;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.dots(ink, colors.carmine, Math.max(3, 5 * this.k), Math.PI / 4, 0, 0, 1);
  }

  private stitch(ink: Float32Array, colors: PlateColors) {
    const { w, h, dpr } = this;
    const ctx = this.ctx;
    const cell = Math.max(4, Math.round(8 * this.k));
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h / cell);
    const pal = colors.stitch;
    ctx.save();
    ctx.fillStyle = colors.paper;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.scale(dpr, dpr);
    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        const x = gx * cell;
        const y = gy * cell;
        const sx = Math.min(w - 1, x + cell / 2);
        const sy = Math.min(h - 1, y + cell / 2);
        const v = ink[Math.floor(sy) * w + Math.floor(sx)];
        if (v < 0.11) continue;
        const ang = Math.atan2(sy - h / 2, sx - w / 2);
        const sector = Math.floor(((ang + Math.PI) / (Math.PI * 2)) * 12);
        let idx: number;
        if (v > 0.8) idx = sector % 2 === 0 ? 4 : 1;
        else if (v > 0.45) idx = sector % 3 === 0 ? 1 : 0;
        else idx = sector % 2 === 0 ? 3 : 2;
        if (Math.random() < 0.03) idx = (idx + 1) % pal.length; // hilo que tiembla
        ctx.fillStyle = pal[idx];
        ctx.fillRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
      }
    }
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 1 / dpr;
    ctx.beginPath();
    for (let gx = 0; gx <= cols; gx++) {
      ctx.moveTo(gx * cell, 0);
      ctx.lineTo(gx * cell, h);
    }
    for (let gy = 0; gy <= rows; gy++) {
      ctx.moveTo(0, gy * cell);
      ctx.lineTo(w, gy * cell);
    }
    ctx.stroke();
    ctx.restore();
  }

  private riso(ink: Float32Array, colors: PlateColors) {
    const ctx = this.ctx;
    ctx.fillStyle = colors.paper;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // Tinta 1: carmín en puntos, desregistrada.
    const jx = 3 + Math.round(Math.random() * 2 - 1);
    const jy = -2 + Math.round(Math.random() * 2 - 1);
    ctx.globalAlpha = 0.92;
    this.dots(ink, colors.carmine, Math.max(3, 5 * this.k), Math.PI / 12, jx, jy, 1, 0.6);
    // Tinta 2: cobalto sólido con grano, sobreimpreso.
    this.threshold(ink, colors.paper, colors.cobalt, 0.6, 0.3, false);
    ctx.globalAlpha = 0.86;
    ctx.globalCompositeOperation = "multiply";
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.work, 0, 0, this.w, this.h, 0, 0, this.canvas.width, this.canvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }

  /** Disolución por bloques, como el pixelado entre escenas del video. */
  private dissolve(p: number) {
    const bx = Math.ceil(this.w / BLOCK);
    const s = BLOCK * this.dpr;
    for (let i = 0; i < this.blockRand.length; i++) {
      if (this.blockRand[i] <= p) continue;
      const x = (i % bx) * s;
      const y = Math.floor(i / bx) * s;
      this.ctx.drawImage(this.prev, x, y, s, s, x, y, s, s);
    }
  }
}
