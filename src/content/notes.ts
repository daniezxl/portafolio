import type { Note } from "./types";

/**
 * Notes. Add `date: "YYYY-MM-DD"` to show the date and sort by it.
 * Sources checked on November 20, 2026.
 */

const QUBIKO =
  "[Qubiko](/projects/qubiko) is the educational robotics platform I co-founded with Diego Martínez (CEO) and Michelle Rodríguez (COO) in Mexicali. A student describes a robot and gets the 3D design, the code, the wiring diagram and the path to build it with whatever they have. It grew out of free workshops in neighborhoods without a lab, and today it funds them by selling licenses, kits and courses to schools.";

export const notes: Note[] = [
  {
    slug: "baja-innovation-day",
    title: "Qubiko at Baja Innovation Day",
    summary: "We presented Qubiko at Baja California's innovation summit in Tijuana.",
    technique: "porcelana",
    body: [
      {
        type: "p",
        text: "We presented Qubiko at **Baja Innovation Day** in Tijuana. It's the Baja California government's innovation summit: it brings students, entrepreneurs, companies, academia and the public together around artificial intelligence and technology.",
      },
      { type: "p", text: QUBIKO },
      {
        type: "p",
        text: "The fourth edition was held on October 15, 2026, in Tijuana, according to [Uniradio](https://www.uniradiobaja.com/reportajes-especiales/video-presenta-sei-bc-baja-innovation-day-2026-primer-congreso-nacional-industrias-creativas-n906968) and [Infobaja](https://www.infobaja.info/baja-innovation-day-reunira-expertos-en-ia-tecnologia-e-innovacion/).",
      },
    ],
  },
  {
    slug: "expo-emprendedores",
    title: "Qubiko at Expo Emprendedores",
    summary: "We brought Qubiko to an entrepreneurship expo in Monterrey.",
    technique: "riso",
    body: [
      { type: "p", text: "We brought Qubiko to **Expo Emprendedores** in Monterrey." },
      { type: "p", text: QUBIKO },
    ],
  },
  {
    slug: "press",
    title: "Qubiko in the press",
    summary: "What Baja California's media published about Qubiko.",
    technique: "tramado",
    body: [
      {
        type: "p",
        text: "Winning first place nationally at POSIBLE x Bécalos 2026 put Qubiko in Baja California's press. These are the stories.",
      },
      {
        type: "table",
        head: ["Outlet", "Story (in Spanish)", "Date"],
        rows: [
          [
            "El Imparcial",
            "[Jóvenes de Mexicali ganan primer lugar a nivel nacional con plataforma de IA para niños](https://www.elimparcial.com/mxl/mexicali/2026/10/19/jovenes-de-mexicali-ganan-primer-lugar-a-nivel-nacional-con-plataforma-de-ia-para-ninos/)",
            "Oct 19, 2026",
          ],
          [
            "Uniradio Informa",
            "[Destaca talento emprendedor de Baja California en Campamento Nacional Posible 2026](https://www.uniradiobaja.com/sociedad/destaca-talento-emprendedor-baja-california-campamento-nacional-posible-2026-n907450)",
            "Oct 2026",
          ],
          ["Qubiko blog", "[Qubiko gana el primer lugar de POSIBLE x Bécalos 2026](https://www.qubiko.com.mx/blog/qubiko-primer-lugar-posible-becalos.html)", "Oct 13, 2026"],
        ],
      },
      { type: "p", text: QUBIKO },
      {
        type: "p",
        text: "The prize was a 50,000-peso grant at the POSIBLE 2026 National Camp. As Qubiko's post puts it, we'll use it for the same thing that got us here: bringing robotics and AI to schools and communities it hasn't reached yet.",
      },
    ],
  },
  {
    slug: "canal-66",
    title: "Qubiko on Canal 66",
    summary: "We talked about Qubiko on Mexicali's local TV.",
    technique: "semitono",
    body: [
      {
        type: "p",
        text: "We presented Qubiko on **Canal 66**, Mexicali's local TV station. The message was the same as always: robotics, programming and AI education should be within reach of every kid, no matter where they live.",
      },
      { type: "p", text: QUBIKO },
      {
        type: "p",
        text: "Diego Martínez, Qubiko's CEO, shared it on LinkedIn and thanked the station's team.",
      },
    ],
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);

/** Dated notes first (newest on top); the rest keep their order. */
export const sortedNotes = () =>
  [...notes].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
