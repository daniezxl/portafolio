import type { Note } from "./types";

/**
 * Notas. Las que tienen `placeholder: true` se muestran con la etiqueta
 * «borrador»: completa las partes marcadas como pendientes y borra la marca.
 * Agrega `date: "AAAA-MM-DD"` para mostrar la fecha y ordenar.
 *
 * Fuentes consultadas el 20 de noviembre de 2026. Lo que no se pudo
 * verificar en fuentes públicas está marcado como pendiente.
 */

const QUBIKO =
  "[Qubiko](/proyectos/qubiko) es la plataforma de robótica educativa que fundé con Diego Martínez (CEO) y Michelle Rodríguez (COO) en Mexicali. Un alumno describe un robot y recibe el diseño 3D, el código, el diagrama eléctrico y la ruta para construirlo con lo que tenga. Nació de talleres gratuitos en colonias sin laboratorio, y hoy los sostiene vendiendo licencias, kits y cursos a colegios.";

export const notes: Note[] = [
  {
    slug: "baja-innovation-day",
    title: "Qubiko en Baja Innovation Day",
    summary: "Presentamos Qubiko en el encuentro de innovación de Baja California, en Tijuana.",
    technique: "porcelana",
    placeholder: true,
    body: [
      {
        type: "p",
        text: "Presentamos Qubiko en **Baja Innovation Day**, en Tijuana. Es el encuentro de innovación del gobierno de Baja California: reúne a estudiantes, emprendedores, empresas, academia y público general alrededor de la inteligencia artificial y la tecnología.",
      },
      { type: "p", text: QUBIKO },
      {
        type: "callout",
        tone: "verified",
        text: "La edición 2026 (la cuarta) se anunció para el 15 de octubre de 2026 en Tijuana, según [Uniradio](https://www.uniradiobaja.com/reportajes-especiales/video-presenta-sei-bc-baja-innovation-day-2026-primer-congreso-nacional-industrias-creativas-n906968) e [Infobaja](https://www.infobaja.info/baja-innovation-day-reunira-expertos-en-ia-tecnologia-e-innovacion/).",
      },
      {
        type: "callout",
        tone: "pending",
        text: "Ninguna fuente pública menciona a Qubiko en el evento. Falta confirmar la edición y la fecha, qué presentamos (stand, demo o pitch), quién del equipo participó y qué cambió en el producto después.",
      },
    ],
  },
  {
    slug: "expo-emprendedores",
    title: "Qubiko en Expo Emprendedores",
    summary: "Llevamos Qubiko a una exposición de emprendimiento en Monterrey.",
    technique: "riso",
    placeholder: true,
    body: [
      { type: "p", text: "Llevamos Qubiko a **Expo Emprendedores**, en Monterrey." },
      { type: "p", text: QUBIKO },
      {
        type: "callout",
        tone: "pending",
        text: "No encontré la expo en fuentes públicas. En Monterrey existe «Expo Emprende Regio» (13 al 15 de noviembre, Plaza Zaragoza), pero no hay evidencia de que sea el mismo evento. Falta el nombre exacto, la fecha, el formato y un enlace.",
      },
    ],
  },
  {
    slug: "la-cronica",
    title: "Qubiko en la prensa",
    summary: "Lo que publicaron los medios de Baja California sobre Qubiko.",
    technique: "tramado",
    placeholder: true,
    body: [
      {
        type: "p",
        text: "El primer lugar nacional en POSIBLE x Bécalos 2026 llevó a Qubiko a la prensa de Baja California. Estas son las notas que se pueden verificar.",
      },
      {
        type: "table",
        head: ["Medio", "Nota", "Fecha"],
        rows: [
          [
            "El Imparcial",
            "[Jóvenes de Mexicali ganan primer lugar a nivel nacional con plataforma de IA para niños](https://www.elimparcial.com/mxl/mexicali/2026/10/19/jovenes-de-mexicali-ganan-primer-lugar-a-nivel-nacional-con-plataforma-de-ia-para-ninos/)",
            "19 oct. 2026",
          ],
          [
            "Uniradio Informa",
            "[Destaca talento emprendedor de Baja California en Campamento Nacional Posible 2026](https://www.uniradiobaja.com/sociedad/destaca-talento-emprendedor-baja-california-campamento-nacional-posible-2026-n907450)",
            "oct. 2026",
          ],
          ["Blog de Qubiko", "[Qubiko gana el primer lugar de POSIBLE x Bécalos 2026](https://www.qubiko.com.mx/blog/qubiko-primer-lugar-posible-becalos.html)", "13 oct. 2026"],
        ],
      },
      { type: "p", text: QUBIKO },
      {
        type: "p",
        text: "El premio fue una beca de 50,000 pesos en el Campamento Nacional POSIBLE 2026. Según la nota de Qubiko, la usaremos para lo mismo que nos trajo hasta aquí: llevar robótica e IA a escuelas y comunidades donde todavía no llega.",
      },
      {
        type: "callout",
        tone: "pending",
        text: "La nota en La Crónica no aparece en búsquedas públicas. Falta el enlace o una foto de la publicación, con la fecha.",
      },
    ],
  },
  {
    slug: "canal-66",
    title: "Qubiko en Canal 66",
    summary: "Hablamos de Qubiko en la televisión local de Mexicali.",
    technique: "semitono",
    placeholder: true,
    body: [
      {
        type: "p",
        text: "Presentamos Qubiko en **Canal 66**, la televisión local de Mexicali. El mensaje fue el mismo de siempre: que la educación en robótica, programación e inteligencia artificial sea accesible para niñas, niños y jóvenes, sin importar dónde vivan.",
      },
      { type: "p", text: QUBIKO },
      {
        type: "callout",
        tone: "verified",
        text: "Diego Martínez, CEO de Qubiko, lo publicó en LinkedIn agradeciendo al equipo del canal.",
      },
      {
        type: "callout",
        tone: "pending",
        text: "Falta el programa, la fecha de emisión, quién participó y el enlace al video.",
      },
    ],
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);

/** Las notas con fecha van primero (más recientes arriba); las demás conservan su orden. */
export const sortedNotes = () =>
  [...notes].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
