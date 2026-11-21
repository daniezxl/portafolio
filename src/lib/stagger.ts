import type { CSSProperties } from "react";

/** Retardo escalonado para la entrada de bloques (paco.me). */
export const stagger = (n: number) => ({ "--stagger": n }) as CSSProperties;
