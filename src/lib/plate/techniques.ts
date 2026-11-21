export type Technique = "porcelana" | "semitono" | "tramado" | "punto" | "riso";

/** Qué se imprime: el chip con la red neuronal o el editor de código. */
export type Motif = "chip" | "editor";

export const MOTIFS: { id: Motif; name: string }[] = [
  { id: "editor", name: "Editor" },
  { id: "chip", name: "Red neuronal" },
];

export const TECHNIQUES: { id: Technique; name: string; note: string }[] = [
  { id: "porcelana", name: "Porcelana", note: "cobalto, umbral y grano" },
  { id: "semitono", name: "Semitono", note: "puntos a 45°" },
  { id: "tramado", name: "Tramado", note: "Bayer 8×8, fotocopia" },
  { id: "punto", name: "Punto de cruz", note: "rejilla de 8 px, cinco hilos" },
  { id: "riso", name: "Risografía", note: "dos tintas desregistradas" },
];

export const techniqueName = (t: Technique) => TECHNIQUES.find((x) => x.id === t)?.name ?? t;
