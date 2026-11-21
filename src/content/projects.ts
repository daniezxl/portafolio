import type { Figure, Project } from "./types";

/**
 * Projects. Each page: summary → The problem → My role and tools → Result →
 * screenshots. The buttons come from `demo` and `repo`.
 * Facts checked on November 20, 2026 against the sites, the app, the
 * repositories and the press. Screenshots live in `public/projects/`.
 */

const shot = (p: string, f: string, alt: string, label?: string, w = 1440, h = 900): Figure => ({
  src: `/projects/${p}/${f}`,
  alt,
  width: w,
  height: h,
  label,
});
const phone = (p: string, f: string, alt: string, label?: string) => shot(p, f, alt, label, 780, 1688);

export const projects: Project[] = [
  {
    slug: "qubiko",
    title: "Qubiko",
    summary:
      "Educational robotics with AI. A kid describes a robot and gets the 3D design, the code, the wiring diagram and the steps to build it with whatever they have.",
    year: "Ongoing",
    role: "CTO and co-founder",
    team: "Diego Martínez (CEO) and Michelle Rodríguez (COO)",
    status: "In production",
    stack: ["Frontend", "Backend", "Database", "Multi-model AI"],
    technique: "riso",
    image: {
      src: "/projects/qubiko/desktop-inicio.png",
      alt: "qubiko.com.mx home page: «Crea cualquier cosa de STEM, desde donde estés» (Create anything STEM, wherever you are).",
      width: 1440,
      height: 900,
    },
    demo: { label: "Try the platform", href: "https://app.qubiko.com.mx" },
    repo: null,
    links: [{ label: "qubiko.com.mx", href: "https://www.qubiko.com.mx/" }],
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "Qubiko started as free robotics workshops in Mexicali neighborhoods with no lab. With 30 kids and a single kit, most of them watched instead of building, and one instructor couldn't reach everyone. Learning robotics depended on having an expensive kit or an expert nearby.",
      },
      { type: "h2", text: "My role and tools" },
      {
        type: "p",
        text: "I'm CTO and co-founder. With Diego I built the platform's frontend, backend and database, and today I ship the new features. The platform combines:",
      },
      {
        type: "list",
        items: [
          "**AI that designs the project** around the student's parts: any kit, Arduino, ESP32, micro:bit or recycled material.",
          "**Several AI models** (open models, OpenAI, Anthropic and Google) with automatic fallback: if one fails, the next one answers.",
          "**In-browser simulators** for circuits, blocks and 3D design, to practice without spending material.",
          "**A tutor that asks questions** instead of giving the answer, and a dashboard for teachers to plan and track progress.",
        ],
      },
      {
        type: "figures",
        images: [
          shot("qubiko", "desktop-software.png", "3D design of a rover chassis, exportable to STL.", "3D design"),
          shot("qubiko", "desktop-software-2.png", "The rover's code in C++ with a blocks alternative.", "Code"),
        ],
      },
      { type: "h2", text: "Result" },
      {
        type: "list",
        items: [
          "**1st place at POSIBLE x Bécalos 2026**, with a $50,000 MXN grant.",
          "**3rd place statewide at CREO MX Rosarito 2026**, with $20,000 MXN in incubation.",
          "**1,000+ students trained, 15 partner schools and 200+ projects built**, according to qubiko.com.mx.",
          "Selected for Potencia UP LATAM (top 100), Santander X Explorer, NVIDIA Inception and Claude for Startups.",
        ],
      },
      {
        type: "figure",
        image: shot("qubiko", "desktop-app.png", "app.qubiko.com.mx: a box to describe the idea and 11 expert agents."),
        caption: "app.qubiko.com.mx",
      },
      {
        type: "figures",
        images: [
          shot("qubiko", "desktop-hardware.png", "Qubiko Core, the robotics board designed in Mexicali.", "Qubiko Core, made in Mexico"),
          shot("qubiko", "desktop-docentes.png", "Teacher tools: plan with AI, Class Mode and progress tracking.", "Teacher dashboard"),
        ],
      },
      {
        type: "figures",
        images: [
          phone("qubiko", "mobile-inicio.png", "Qubiko's home page on a phone.", "Mobile"),
          phone("qubiko", "mobile-software.png", "A project's code on a phone.", "Mobile"),
        ],
      },
    ],
  },
  {
    slug: "taller-de-don-rover",
    title: "Taller de Don Rover",
    summary:
      "A co-op game that turns the classroom into a Mars colony. Four students, each with a secret piece of data, decide together using real NASA data.",
    year: "2026",
    role: "3D world, missions, networking and UI/UX",
    team: "Team of three, with Diego Martínez",
    status: "Live",
    stack: ["React 19", "TypeScript", "Three.js", "PeerJS (WebRTC)", "Supabase", "Claude", "NASA APIs", "ESP32"],
    technique: "semitono",
    image: {
      src: "/projects/don-rover/desktop-inicio.png",
      alt: "Taller de Don Rover home page: «Aprende ciencia salvando una colonia en Marte» (Learn science by saving a colony on Mars).",
      width: 1440,
      height: 900,
    },
    demo: { label: "Play the demo", href: "https://tallerdedonrover.vercel.app/" },
    repo: { label: "View the code", href: "https://github.com/deimosvn/Taller-de-Don-Rover" },
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "A NASA Space Apps Challenge 2026 challenge: a game where students run a base on Mars and balance energy, water, food and radiation protection. Kids know what radiation is, but they rarely use it to make decisions. And it had to work in a real classroom: one projector, mismatched phones and a school network that blocks connections.",
      },
      { type: "h2", text: "My role and tools" },
      {
        type: "p",
        text: "I was one of the two developers (10 of the repository's 49 commits). I built:",
      },
      {
        type: "list",
        items: [
          "**The 3D Mars** in Three.js: the planet, the colony and the characters, all generated in code.",
          "**IX's missions**, written from NASA's real space-weather data (DONKI, NTRS, OSDR) and Claude.",
          "**The fallback channel**: if the network blocks WebRTC, the phone joins through Supabase Realtime without the game noticing.",
          "**The minigames, free mode** and a UI/UX audit.",
        ],
      },
      {
        type: "p",
        text: "The game runs in the teacher's browser; phones connect directly over WebRTC (PeerJS). The AI only narrates; points and consequences come from a fixed-rule engine, so it's fair and keeps working offline.",
      },
      {
        type: "figures",
        images: [
          shot("don-rover", "desktop-como.png", "A mission in 3 steps: the teacher opens it, everyone gets a specialty and they decide together.", "How to play"),
          shot("don-rover", "desktop-tripulacion.png", "Four connected specialties: habitat, energy, water and food.", "Four specialties"),
        ],
      },
      { type: "h2", text: "Result" },
      {
        type: "list",
        items: [
          "**2nd place in the local round of the NASA Space Apps Challenge 2026** and a pass to the global round.",
          "Tested with kids: the team reports up to 80% more retention than a lecture-style workshop (preliminary result, no published methodology).",
          "Live and open source: a 40-minute class with no accounts or installs, plus an optional physical ESP32 robot.",
        ],
      },
      {
        type: "figures",
        images: [
          shot("don-rover", "app-profe.png", "The teacher's console to set up the mission.", "Teacher console"),
          shot("don-rover", "app-mundo.png", "Planet Mars in 3D with the MARS-01 colony.", "3D planet"),
        ],
      },
      {
        type: "figures",
        images: [
          phone("don-rover", "mobile-jugar.png", "Joining the mission with a four-letter code.", "Join"),
          phone("don-rover", "mobile-libre.png", "Free mode: building the astronaut.", "Free mode"),
          phone("don-rover", "mobile-inicio.png", "Home page on a phone.", "Home"),
        ],
      },
      {
        type: "figures",
        images: [
          shot("don-rover", "foto-don-rover-consola.jpg", "The physical Don Rover next to the teacher's console.", "Physical Don Rover", 1200, 993),
          shot("don-rover", "foto-celular-3d.jpg", "A student plays on the 3D Mars from their phone.", "Testing with students", 724, 900),
        ],
      },
    ],
  },
  {
    slug: "ecobc",
    title: "EcoBC",
    summary:
      "Air, weather, beaches, wildfires and citizen reports for Baja California's seven municipalities on one map, with an open API.",
    year: "2026",
    role: "Author",
    status: "In progress",
    stack: ["Python 3.12", "FastAPI", "PostgreSQL 16", "PostGIS 3", "Redis", "Next.js", "Flutter"],
    technique: "punto",
    image: {
      src: "/projects/ecobc/boceto.svg",
      alt: "Sketch of EcoBC under construction: a map of the seven municipalities, empty data cards and a roadmap.",
      width: 1600,
      height: 1000,
      caption: "Sketch: the product doesn't have an interface yet.",
    },
    demo: null,
    repo: { label: "View the repository", href: "https://github.com/daniezxl/EcoBC" },
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "Finding out whether Mexicali's air is safe or a beach is fit for swimming means checking several sources in different formats, and some (SINAICA, COFEPRIS) don't even have an API. San Quintín and San Felipe have almost no monitoring stations.",
      },
      { type: "h2", text: "My role and tools" },
      {
        type: "p",
        text: "It's a personal project. I defined the product, researched the sources (OpenAQ, NASA FIRMS, OpenWeatherMap, COFEPRIS, INEGI) and designed the architecture:",
      },
      {
        type: "list",
        items: [
          "**FastAPI in Python**, for its ecosystem for geospatial data and for extracting tables from PDF and HTML.",
          "**PostgreSQL with PostGIS** to answer «what's near me» in meters, with spatial indexes.",
          "**Background workers with Redis**: users never wait on an external API, quotas stay protected and the site keeps working if a source goes down.",
          "**Next.js with MapLibre** on the web and **Flutter** on mobile, on top of the same API.",
        ],
      },
      { type: "h2", text: "Result" },
      {
        type: "p",
        text: "It's in Phase 0: the repository has the vision, the architecture, the database schema and the first sprint plan, but no code yet. Next up is the first air and weather API with real data from Tijuana, Mexicali and Ensenada.",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
