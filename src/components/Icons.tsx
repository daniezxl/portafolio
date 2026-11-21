import type { SVGProps } from "react";

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M5 11 11 5M6 5h5v5" />
  </svg>
);

export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12.5 8h-9M7 4.5 3.5 8 7 11.5" />
  </svg>
);

export const LinkIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M6.8 9.2a2.6 2.6 0 0 0 3.7 0l2-2a2.6 2.6 0 0 0-3.7-3.7l-.8.8M9.2 6.8a2.6 2.6 0 0 0-3.7 0l-2 2a2.6 2.6 0 0 0 3.7 3.7l.8-.8" />
  </svg>
);

export const Search = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <circle cx="7" cy="7" r="4.2" />
    <path d="m10.2 10.2 3.3 3.3" />
  </svg>
);

export const CornerReturn = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12.5 3.5v4a2 2 0 0 1-2 2h-7M6 7 3.5 9.5 6 12" />
  </svg>
);

/** Conejo: el mismo dibujo que en la lámina, como glifo. */
export const Rabbit = (p: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} viewBox="0 0 32 32" aria-hidden {...p}>
    <g fill="currentColor">
      <ellipse cx="14" cy="21" rx="9" ry="7" />
      <ellipse cx="19" cy="17" rx="4.2" ry="4.6" />
      <circle cx="22" cy="13" r="4.6" />
      <ellipse cx="20" cy="5.6" rx="1.8" ry="5" transform="rotate(-15 20 5.6)" />
      <ellipse cx="24.2" cy="5.9" rx="1.7" ry="4.6" transform="rotate(12 24.2 5.9)" />
      <circle cx="5" cy="19" r="2.2" />
      <ellipse cx="18" cy="27" rx="5" ry="1.8" />
    </g>
  </svg>
);
