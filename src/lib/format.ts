import type { Block } from "@/content/types";
import { plain } from "@/components/Inline";

const monthYear = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const full = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const formatMonth = (iso: string) => monthYear.format(new Date(iso));
export const formatDate = (iso: string) => full.format(new Date(iso));

export const slugify = (s: string) =>
  plain(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function readingMinutes(blocks: Block[]) {
  let words = 0;
  for (const b of blocks) {
    const text =
      b.type === "list" ? b.items.join(" ") : b.type === "code" ? b.code : "text" in b ? b.text : "";
    words += plain(text).split(/\s+/).filter(Boolean).length;
  }
  return Math.max(1, Math.round(words / 200));
}

export function headings(blocks: Block[]) {
  return blocks
    .filter((b): b is Extract<Block, { type: "h2" | "h3" }> => b.type === "h2" || b.type === "h3")
    .map((b) => ({ id: b.id ?? slugify(b.text), text: plain(b.text), level: b.type === "h2" ? 2 : 3 }));
}
