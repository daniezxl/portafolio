import type { Technique } from "@/lib/plate/techniques";

/** Bloques de contenido para notas y proyectos. El texto admite *cursiva*, **negrita**, `código` y [enlaces](url). */
export type Block =
  | { type: "p"; text: string; aside?: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; code: string; lang?: string; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  /** Una imagen: captura, foto o diagrama servido desde `public/`. */
  | { type: "figure"; image: Figure; caption?: string; wide?: boolean }
  /** Varias imágenes lado a lado (p. ej. escritorio + móvil). */
  | { type: "figures"; images: Figure[]; caption?: string }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  /** Señala el estado de un dato: comprobado, interpretación o pendiente. */
  | { type: "callout"; tone: "verified" | "pending" | "note"; title?: string; text: string };

export interface Figure {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Texto corto bajo la imagen dentro de una galería. */
  label?: string;
}

export interface Note {
  slug: string;
  title: string;
  summary: string;
  /** Fecha ISO, p. ej. "2026-10-14". Opcional: sin fecha no se muestra. */
  date?: string;
  /** Técnica de impresión de la lámina que acompaña a la nota. */
  technique: Technique;
  /** true mientras la nota sea un borrador. Muestra la etiqueta «borrador». */
  placeholder?: boolean;
  body: Block[];
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  /** Con quién se hizo. */
  team?: string;
  /** Estado actual: «En producción», «Prototipo», «Planeación»… */
  status?: string;
  stack: string[];
  technique: Technique;
  /** Botón principal a la demo en vivo. `null` muestra «Demo en construcción». */
  demo?: { label: string; href: string } | null;
  /** Botón al código. `null` muestra «Código privado». */
  repo?: { label: string; href: string } | null;
  /** `placeholder: true` muestra «pendiente» junto al enlace hasta que pongas la URL real. */
  links?: { label: string; href: string; placeholder?: boolean }[];
  /** Captura o ilustración del proyecto, servida desde `public/`. */
  image?: { src: string; alt: string; width: number; height: number; caption?: string };
  /** true mientras el proyecto sea de ejemplo. Muestra la etiqueta «ejemplo». */
  placeholder?: boolean;
  body: Block[];
}
