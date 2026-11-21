/**
 * Contenido del sitio.
 *
 * Los componentes leen únicamente de este módulo, de `projects.ts` y de
 * `notes.ts`. Lo que siga marcado con `placeholder: true` muestra la
 * etiqueta «ejemplo» o «pendiente» en pantalla.
 *
 * Sintaxis en línea disponible en cualquier texto:
 *   *cursiva*   **negrita**   `código`   [enlace](/ruta-o-url)
 */

export const site = {
  name: "Daniel Curiel",
  fullName: "Daniel Jared Curiel Avalos",
  /** PENDIENTE: cambia por tu dominio real cuando publiques (solo afecta metadatos, sitemap y OG). */
  url: "https://danielcuriel.dev",
  description:
    "Ingeniero en Sistemas Computacionales y CTO de Qubiko. Construyo productos con IA para problemas reales.",
  locale: "es-MX",

  /** Frase de la banda de contacto. */
  contact: "Si estás construyendo algo con software, IA o educación que vaya a llegar a usuarios reales, hablemos.",

  /** Correo de contacto. */
  email: "danielmx.dev@gmail.com",
  emailPlaceholder: false,

  /**
   * Enlaces externos. Para enlazar tu CV, súbelo a `public/cv.pdf` y añade
   * { label: "CV (PDF)", href: "/cv.pdf" }.
   */
  links: [
    { label: "GitHub", href: "https://github.com/daniezxl" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-curiel" },
    { label: "Qubiko", href: "https://www.qubiko.com.mx/" },
  ] as { label: string; href: string; placeholder?: boolean }[],

  /** Bio en dos longitudes, como el selector de leerob.com. */
  bio: {
    short: [
      "Soy ingeniero en *Sistemas Computacionales* y construyo productos con IA de punta a punta: interfaz, backend y datos. Soy CTO y cofundador de [Qubiko](/proyectos/qubiko), donde llevamos la robótica a cerca de mil niñas y niños.",
      "Me gusta tomar un problema real y convertirlo en software que alguien usa. Aquí están mis [proyectos](/proyectos) y algunas [notas](/notas).",
    ],
    long: [
      "Soy Daniel Jared Curiel Avalos, ingeniero en *Sistemas Computacionales* por el Instituto Tecnológico de Mexicali, en Baja California. Construyo productos completos: frontend, backend, APIs, bases de datos y la capa de inteligencia artificial que los conecta.",
      "Soy CTO y cofundador de [Qubiko](/proyectos/qubiko). Describes una idea y la plataforma te devuelve el diseño 3D, el código y la ruta para construirla. Tiene cerca de mil usuarios y ganó el primer lugar en POSIBLE x Bécalos 2026.",
      "En el NASA Space Apps Challenge 2026 construí el Marte 3D, las misiones con datos de la NASA y la red de respaldo de [Taller de Don Rover](/proyectos/taller-de-don-rover): segundo lugar local y pase directo a la etapa global. Ahora diseño [EcoBC](/proyectos/ecobc), un mapa ambiental abierto de Baja California.",
      "Pienso en producto antes que en código. Que algo compile no basta: tiene que resolverle algo a alguien. Hablo español nativo e inglés conversacional.",
    ],
  },

  /** Columnas al estilo paco.me. `href` es opcional. */
  columns: <
    { title: string; items: { title: string; href?: string; description: string; placeholder?: boolean }[] }[]
  >[
    {
      title: "Construyendo",
      items: [
        {
          title: "EcoBC",
          href: "/proyectos/ecobc",
          description: "Aire, playas e incendios de Baja California en un mapa.",
        },
      ],
    },
    {
      title: "Proyectos",
      items: [
        {
          title: "Qubiko",
          href: "/proyectos/qubiko",
          description: "Describe una idea, recibe el diseño 3D y el código.",
        },
        {
          title: "Taller de Don Rover",
          href: "/proyectos/taller-de-don-rover",
          description: "Salvar una colonia en Marte con datos de la NASA.",
        },
      ],
    },
    {
      title: "Reconocimientos",
      items: [
        {
          title: "POSIBLE x Bécalos 2026",
          description: "Primer lugar con Qubiko.",
        },
        {
          title: "NASA Space Apps 2026",
          description: "Segundo lugar local y pase directo a la etapa global.",
        },
        {
          title: "CREO MX Rosarito 2026",
          description: "Tercer lugar estatal con Qubiko.",
        },
      ],
    },
  ],

  /** Temas: lista de dos columnas con viñeta cuadrada, como las notas de leerob. */
  topics: [
    "Desarrollo frontend",
    "Backend e integración de APIs",
    "Productos con inteligencia artificial",
    "Diseño UI/UX",
    "Bases de datos",
    "Arquitectura de software",
    "Educación STEM y EdTech",
    "Emprendimiento tecnológico",
  ],

  /** Herramientas que uso a diario. */
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

  /** Sección "Ahora" de paco.me. */
  now: [
    "Construyo funcionalidades nuevas para Qubiko y la base de EcoBC: descargar, limpiar y ubicar en el mapa datos de aire, playas e incendios de siete municipios.",
    "*No solo desarrollo software: construyo soluciones tecnológicas para problemas del mundo real.*",
  ],

  /** Lemas que rotan en el pie de página en cada visita. */
  mottos: [
    "Del problema al producto.",
    "Lee el error completo.",
    "Primero que funcione, después que sea claro.",
    "Construye para alguien concreto.",
    "Mide antes de optimizar.",
  ],
} as const;

export type Site = typeof site;
