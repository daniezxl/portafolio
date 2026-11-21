import type { Figure, Project } from "./types";

/**
 * Proyectos. Estructura de cada página: resumen → El problema → Mi rol y
 * herramientas → Resultado → capturas. Los botones salen de `demo` y `repo`.
 * Datos verificados el 20 de noviembre de 2026 en los sitios, la app,
 * los repositorios y la prensa. Las capturas viven en `public/proyectos/`.
 */

const shot = (p: string, f: string, alt: string, label?: string, w = 1440, h = 900): Figure => ({
  src: `/proyectos/${p}/${f}`,
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
      "Robótica educativa con IA. Un niño describe un robot y recibe el diseño 3D, el código, el diagrama eléctrico y los pasos para construirlo con lo que tenga.",
    year: "En curso",
    role: "CTO y cofundador",
    team: "Diego Martínez (CEO) y Michelle Rodríguez (COO)",
    status: "En producción",
    stack: ["Frontend", "Backend", "Base de datos", "IA multimodelo"],
    technique: "riso",
    image: {
      src: "/proyectos/qubiko/desktop-inicio.png",
      alt: "Portada de qubiko.com.mx: «Crea cualquier cosa de STEM, desde donde estés».",
      width: 1440,
      height: 900,
    },
    demo: { label: "Probar la plataforma", href: "https://app.qubiko.com.mx" },
    repo: null,
    links: [{ label: "qubiko.com.mx", href: "https://www.qubiko.com.mx/" }],
    body: [
      { type: "h2", text: "El problema" },
      {
        type: "p",
        text: "Qubiko nació dando talleres gratuitos de robótica en colonias de Mexicali sin laboratorio. Con 30 niños y un solo kit, la mayoría miraba en lugar de construir, y un instructor no alcanzaba para todos. Aprender robótica dependía de tener un kit caro o un experto cerca.",
      },
      { type: "h2", text: "Mi rol y herramientas" },
      {
        type: "p",
        text: "Soy CTO y cofundador. Construí con Diego el frontend, el backend y la base de datos de la plataforma, y hoy implemento las funcionalidades nuevas. La plataforma combina:",
      },
      {
        type: "list",
        items: [
          "**IA que diseña el proyecto** alrededor de las piezas del alumno: cualquier kit, Arduino, ESP32, micro:bit o material reciclado.",
          "**Varios modelos de IA** (abiertos, OpenAI, Anthropic y Google) con respaldo automático: si uno falla, responde el siguiente.",
          "**Simuladores en el navegador** de circuitos, bloques y diseño 3D, para practicar sin gastar material.",
          "**Un tutor que pregunta** en lugar de dar la respuesta, y un panel para que el docente planee y dé seguimiento.",
        ],
      },
      {
        type: "figures",
        images: [
          shot("qubiko", "desktop-software.png", "Diseño 3D del chasis de un rover, exportable a STL.", "Diseño 3D"),
          shot("qubiko", "desktop-software-2.png", "Código del rover en C++ con alternativa en bloques.", "Código"),
        ],
      },
      { type: "h2", text: "Resultado" },
      {
        type: "list",
        items: [
          "**1er lugar en POSIBLE x Bécalos 2026**, con una beca de $50,000.",
          "**3er lugar estatal en CREO MX Rosarito 2026**, con $20,000 de incubación.",
          "**1,000+ alumnos formados, 15 escuelas aliadas y 200+ proyectos construidos**, según qubiko.com.mx.",
          "Seleccionada en Potencia UP LATAM (top 100), Santander X Explorer, NVIDIA Inception y Claude for Startups.",
        ],
      },
      {
        type: "figure",
        image: shot("qubiko", "desktop-app.png", "app.qubiko.com.mx: una caja para describir la idea y 11 agentes expertos."),
        caption: "app.qubiko.com.mx",
      },
      {
        type: "figures",
        images: [
          shot("qubiko", "desktop-hardware.png", "Qubiko Core, la placa de robótica diseñada en Mexicali.", "Qubiko Core, hecha en México"),
          shot("qubiko", "desktop-docentes.png", "Herramientas para el docente: planear con IA, Modo Clase y seguimiento.", "Panel docente"),
        ],
      },
      {
        type: "figures",
        images: [
          phone("qubiko", "mobile-inicio.png", "Portada de Qubiko en el celular.", "Móvil"),
          phone("qubiko", "mobile-software.png", "Código del proyecto en el celular.", "Móvil"),
        ],
      },
    ],
  },
  {
    slug: "taller-de-don-rover",
    title: "Taller de Don Rover",
    summary:
      "Un juego cooperativo que convierte el salón en una colonia en Marte. Cuatro alumnos, cada uno con un dato secreto, deciden juntos con datos reales de la NASA.",
    year: "2026",
    role: "Mundo 3D, misiones, red y UI/UX",
    team: "Equipo de tres, con Diego Martínez",
    status: "En línea",
    stack: ["React 19", "TypeScript", "Three.js", "PeerJS (WebRTC)", "Supabase", "Claude", "APIs de la NASA", "ESP32"],
    technique: "semitono",
    image: {
      src: "/proyectos/don-rover/desktop-inicio.png",
      alt: "Portada de Taller de Don Rover: «Aprende ciencia salvando una colonia en Marte».",
      width: 1440,
      height: 900,
    },
    demo: { label: "Jugar la demo", href: "https://tallerdedonrover.vercel.app/" },
    repo: { label: "Ver el código", href: "https://github.com/deimosvn/Taller-de-Don-Rover" },
    body: [
      { type: "h2", text: "El problema" },
      {
        type: "p",
        text: "Reto del NASA Space Apps Challenge 2026: un juego en el que estudiantes dirijan una base en Marte y equilibren energía, agua, comida y protección contra la radiación. Los niños saben qué es la radiación, pero casi nunca la usan para decidir. Y tenía que funcionar en un salón real: un proyector, celulares distintos y una red escolar que bloquea conexiones.",
      },
      { type: "h2", text: "Mi rol y herramientas" },
      {
        type: "p",
        text: "Fui uno de los dos desarrolladores (10 de 49 commits del repositorio). Construí:",
      },
      {
        type: "list",
        items: [
          "**El Marte 3D** en Three.js: el planeta, la colonia y los personajes, generados por código.",
          "**Las misiones de IX**, que se escriben con el clima espacial real de la NASA (DONKI, NTRS, OSDR) y Claude.",
          "**El canal de respaldo**: si la red bloquea WebRTC, el celular entra por Supabase Realtime sin que la partida se entere.",
          "**Los minijuegos, el modo libre** y una auditoría de UI/UX.",
        ],
      },
      {
        type: "p",
        text: "El juego corre en el navegador del profe; los celulares se conectan directo por WebRTC (PeerJS). La IA solo narra; los puntos y las consecuencias los calcula un motor con reglas fijas, así que es justo y sigue funcionando sin internet.",
      },
      {
        type: "figures",
        images: [
          shot("don-rover", "desktop-como.png", "Una misión en 3 pasos: el profe abre la misión, cada quien recibe su especialidad y deciden juntos.", "Cómo se juega"),
          shot("don-rover", "desktop-tripulacion.png", "Cuatro especialidades conectadas: hábitat, energía, agua y comida.", "Cuatro especialidades"),
        ],
      },
      { type: "h2", text: "Resultado" },
      {
        type: "list",
        items: [
          "**2.º lugar en la etapa local del NASA Space Apps Challenge 2026** y pase a la etapa global.",
          "Probado con niños: el equipo reporta hasta un 80 % más de retención frente a un taller teórico (resultado preliminar, sin metodología publicada).",
          "En línea y de código abierto: una clase de 40 minutos sin cuentas ni instalación, más un robot físico opcional en ESP32.",
        ],
      },
      {
        type: "figures",
        images: [
          shot("don-rover", "app-profe.png", "Consola del profesor para preparar la misión.", "Consola del profe"),
          shot("don-rover", "app-mundo.png", "El planeta Marte en 3D con la colonia MARS-01.", "Planeta 3D"),
        ],
      },
      {
        type: "figures",
        images: [
          phone("don-rover", "mobile-jugar.png", "Unirse a la misión con un código de cuatro letras.", "Unirse"),
          phone("don-rover", "mobile-libre.png", "Modo libre: armar el astronauta.", "Modo libre"),
          phone("don-rover", "mobile-inicio.png", "Portada en el celular.", "Portada"),
        ],
      },
      {
        type: "figures",
        images: [
          shot("don-rover", "foto-don-rover-consola.jpg", "Don Rover físico junto a la consola del profe.", "Don Rover físico", 1200, 993),
          shot("don-rover", "foto-celular-3d.jpg", "Un alumno juega en el Marte 3D desde su celular.", "Prueba con alumnos", 724, 900),
        ],
      },
    ],
  },
  {
    slug: "ecobc",
    title: "EcoBC",
    summary:
      "Aire, clima, playas, incendios y reportes ciudadanos de los siete municipios de Baja California en un solo mapa, con una API abierta.",
    year: "2026",
    role: "Autor",
    status: "En construcción",
    stack: ["Python 3.12", "FastAPI", "PostgreSQL 16", "PostGIS 3", "Redis", "Next.js", "Flutter"],
    technique: "punto",
    image: {
      src: "/proyectos/ecobc/boceto.svg",
      alt: "Boceto de EcoBC en construcción: mapa de los siete municipios, tarjetas de datos vacías y hoja de ruta.",
      width: 1600,
      height: 1000,
      caption: "Boceto: el producto todavía no tiene interfaz.",
    },
    demo: null,
    repo: { label: "Ver el repositorio", href: "https://github.com/daniezxl/EcoBC" },
    body: [
      { type: "h2", text: "El problema" },
      {
        type: "p",
        text: "Saber si el aire de Mexicali es seguro o si una playa es apta implica revisar varias fuentes con formatos distintos, y algunas (SINAICA, COFEPRIS) ni siquiera tienen API. San Quintín y San Felipe casi no tienen estaciones.",
      },
      { type: "h2", text: "Mi rol y herramientas" },
      {
        type: "p",
        text: "Es un proyecto personal. Definí el producto, investigué las fuentes (OpenAQ, NASA FIRMS, OpenWeatherMap, COFEPRIS, INEGI) y diseñé la arquitectura:",
      },
      {
        type: "list",
        items: [
          "**FastAPI en Python**, por su ecosistema para datos geoespaciales y para extraer tablas de PDF y HTML.",
          "**PostgreSQL con PostGIS** para responder «qué hay cerca de mí» en metros, con índices espaciales.",
          "**Workers en segundo plano con Redis**: el usuario nunca espera a una API externa, así se protegen las cuotas y el sitio sigue si una fuente se cae.",
          "**Next.js con MapLibre** en la web y **Flutter** en móvil, sobre la misma API.",
        ],
      },
      { type: "h2", text: "Resultado" },
      {
        type: "p",
        text: "Está en Fase 0: el repositorio tiene la visión, la arquitectura, el esquema de la base de datos y el plan del primer sprint, pero todavía no hay código. Lo siguiente es la primera API de aire y clima con datos reales de Tijuana, Mexicali y Ensenada.",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
