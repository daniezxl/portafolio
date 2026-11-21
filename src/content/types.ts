import type { Technique } from "@/lib/plate/techniques";

/** Content blocks for notes and projects. Text supports *italic*, **bold**, `code` and [links](url). */
export type Block =
  | { type: "p"; text: string; aside?: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; code: string; lang?: string; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  /** One image: a screenshot, photo or diagram served from `public/`. */
  | { type: "figure"; image: Figure; caption?: string; wide?: boolean }
  /** Several images side by side (e.g. desktop + mobile). */
  | { type: "figures"; images: Figure[]; caption?: string }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  /** Flags the status of a fact: verified, note or pending. */
  | { type: "callout"; tone: "verified" | "pending" | "note"; title?: string; text: string };

export interface Figure {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short text under the image inside a gallery. */
  label?: string;
}

export interface Note {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, e.g. "2026-10-14". Optional: hidden when missing. */
  date?: string;
  /** Printing technique of the plate that goes with the note. */
  technique: Technique;
  body: Block[];
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  /** Who it was built with. */
  team?: string;
  /** Current status: "In production", "Prototype", "Planning"… */
  status?: string;
  stack: string[];
  technique: Technique;
  /** Primary button to the live demo. `null` shows "Demo in progress". */
  demo?: { label: string; href: string } | null;
  /** Button to the code. `null` shows "Private code". */
  repo?: { label: string; href: string } | null;
  /** `placeholder: true` shows "pending" next to the link until you add the real URL. */
  links?: { label: string; href: string; placeholder?: boolean }[];
  /** Project screenshot or illustration, served from `public/`. */
  image?: { src: string; alt: string; width: number; height: number; caption?: string };
  /** true while the project is an example. Shows the "example" tag. */
  placeholder?: boolean;
  body: Block[];
}
