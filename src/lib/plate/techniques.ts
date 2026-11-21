export type Technique = "porcelana" | "semitono" | "tramado" | "punto" | "riso";

/** Qué se imprime: el chip con la red neuronal o el editor de código. */
export type Motif = "chip" | "editor";

export const MOTIFS: { id: Motif; name: string }[] = [
  { id: "editor", name: "Editor" },
  { id: "chip", name: "Neural network" },
];

export const TECHNIQUES: { id: Technique; name: string; note: string }[] = [
  { id: "porcelana", name: "Porcelain", note: "cobalt, threshold and grain" },
  { id: "semitono", name: "Halftone", note: "dots at 45°" },
  { id: "tramado", name: "Dither", note: "Bayer 8×8, photocopy" },
  { id: "punto", name: "Cross-stitch", note: "8 px grid, five threads" },
  { id: "riso", name: "Risograph", note: "two misregistered inks" },
];

export const techniqueName = (t: Technique) => TECHNIQUES.find((x) => x.id === t)?.name ?? t;
