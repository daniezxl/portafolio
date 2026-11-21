"use client";

import { useEffect, useState } from "react";

/** Lema distinto en cada visita, como el pie de paco.me. */
export function Motto({ mottos }: { mottos: readonly string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => setI(Math.floor(Math.random() * mottos.length)), [mottos.length]);
  return <span className="band-motto">{mottos[i]}</span>;
}
