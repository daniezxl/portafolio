/**
 * Site content.
 *
 * Components read only from this module, `projects.ts` and `notes.ts`.
 *
 * Inline syntax available in any text:
 *   *italic*   **bold**   `code`   [link](/path-or-url)
 */

export const site = {
  name: "Daniel Curiel",
  fullName: "Daniel Jared Curiel Avalos",
  /** TODO: replace with the real domain when you publish (affects metadata, sitemap and OG only). */
  url: "https://danielcuriel.dev",
  description:
    "Computer Systems Engineer and CTO of Qubiko. I build AI products for real problems.",
  locale: "en-US",

  /** Line in the contact band. */
  contact: "If you're building something with software, AI or education that will reach real users, let's talk.",

  email: "danielmx.dev@gmail.com",
  emailPlaceholder: false,

  /**
   * External links. To link your CV, upload it to `public/cv.pdf` and add
   * { label: "CV (PDF)", href: "/cv.pdf" }.
   */
  links: [
    { label: "GitHub", href: "https://github.com/daniezxl" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-curiel" },
    { label: "Qubiko", href: "https://www.qubiko.com.mx/" },
  ] as { label: string; href: string; placeholder?: boolean }[],

  /** Bio in two lengths, like the toggle on leerob.com. */
  bio: {
    short: [
      "I'm a *Computer Systems* engineer who builds AI products end to end: interface, backend and data. I'm CTO and co-founder of [Qubiko](/projects/qubiko), where we've brought robotics to about a thousand kids.",
      "I like taking a real problem and turning it into software someone uses. Here are my [projects](/projects) and a few [notes](/notes).",
    ],
    long: [
      "I'm Daniel Jared Curiel Avalos, a *Computer Systems* engineer from the Instituto Tecnológico de Mexicali, in Baja California. I build complete products: frontend, backend, APIs, databases and the AI layer that connects them.",
      "I'm CTO and co-founder of [Qubiko](/projects/qubiko). You describe an idea and the platform gives you the 3D design, the code and the path to build it. It has about a thousand users and won first place at POSIBLE x Bécalos 2026.",
      "At the NASA Space Apps Challenge 2026 I built the 3D Mars, the NASA-data missions and the fallback network for [Taller de Don Rover](/projects/taller-de-don-rover): second place locally and a direct pass to the global round. Now I'm designing [EcoBC](/projects/ecobc), an open environmental map of Baja California.",
      "I think about product before code. Compiling isn't enough: it has to solve something for someone. I speak Spanish natively and conversational English.",
    ],
  },

  /** paco.me-style columns. `href` is optional. */
  columns: <
    { title: string; items: { title: string; href?: string; description: string; placeholder?: boolean }[] }[]
  >[
    {
      title: "Building",
      items: [
        {
          title: "EcoBC",
          href: "/projects/ecobc",
          description: "Baja California's air, beaches and wildfires on one map.",
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          title: "Qubiko",
          href: "/projects/qubiko",
          description: "Describe an idea, get the 3D design and the code.",
        },
        {
          title: "Taller de Don Rover",
          href: "/projects/taller-de-don-rover",
          description: "Save a Mars colony with real NASA data.",
        },
      ],
    },
    {
      title: "Recognition",
      items: [
        {
          title: "POSIBLE x Bécalos 2026",
          description: "First place with Qubiko.",
        },
        {
          title: "NASA Space Apps 2026",
          description: "Second place locally and a direct pass to the global round.",
        },
        {
          title: "CREO MX Rosarito 2026",
          description: "Third place statewide with Qubiko.",
        },
      ],
    },
  ],

  /** Topics: two-column list with square bullets, like leerob's notes. */
  topics: [
    "Frontend development",
    "Backend and API integration",
    "AI products",
    "UI/UX design",
    "Databases",
    "Software architecture",
    "STEM education and EdTech",
    "Tech entrepreneurship",
  ],

  /** Tools I use every day. */
  tools: [
    "C++",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Vite",
    "Tailwind CSS",
    "Three.js",
    "Firebase",
    "Supabase",
    "Vercel",
  ],

  /** paco.me's "Now" section. */
  now: [
    "Building new features for Qubiko and the foundation of EcoBC: downloading, cleaning and mapping air, beach and wildfire data for seven municipalities.",
    "*I don't just write software: I build technology that solves real-world problems.*",
  ],

  /** Mottos that rotate in the footer on each visit. */
  mottos: [
    "From problem to product.",
    "Read the whole error.",
    "Make it work, then make it clear.",
    "Build for someone specific.",
    "Measure before you optimize.",
  ],
} as const;

export type Site = typeof site;
