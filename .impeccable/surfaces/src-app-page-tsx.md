---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface: personal portfolio (home + notes + projects + colophon)

Mode: Experience on home (the printed plate leads), Read on notes and project pages.
Audience: recruiters and peers skimming in under a minute, then opening one project or note.
Constraints: content is placeholder (src/content), Spanish, light/dark, reduced motion, keyboard access.

## Direction contract

THESIS: One motif, many printing techniques. A single radial programming/AI emblem (a processor chip with circuit traces carrying data packets, three rotating layers of neurons firing in waves, a ring of code, expanding signal waves) is reprinted as porcelain, halftone, dither, cross-stitch and riso, the way the reference video reprints its symbol scene after scene. Everything else is the quiet notebook of leerob/paco. Refuses the student-portfolio template (hero headline, avatar, skill bars, card grid).

OWN-WORLD: Paper ground #F3EEE4 / graphite #1B1A19, warm ink text, cobalt #1D35A3 as the only ink accent, carmine #A20926 for code and riso. Charis SIL for reading at 17px, Geist for meta at 13-14px, headings at body size distinguished by weight on home; detail pages (notes, projects, colophon) take one display step, a 26px title, because they are Read surfaces with a single h1. In dark mode the plate stays a printed sheet (paper #DDD5C5, same cobalt and carmine inks) lying on the graphite page. Paco 192/640/192 grid, Lee rows with sibling dimming, hairlines, fine underlines. Paper grain over everything. Closes in a drenched cobalt band with a scalloped porcelain edge.

STORY: The visitor learns who Daniel is (systems engineering student, backend + AI), sees the plate print itself, opens a project or note, and leaves through the cobalt contact band.

FIRST VIEWPORT: Left gutter: sticky nav (Inicio, Proyectos, Notas, Colofon, Buscar). Center 640px: name, Bio row with Breve/Extensa toggle, two short paragraphs, then the plate canvas centred inside the 640 column (8:5 at desktop, square on mobile), at the user's request with a Geist caption naming the technique and the reprint control. Primary action: open a project/note from the rows directly below.

FORM: pinned by user brief (leerob.com + paco.me + reference video fusion), position 1 of 1; the user pin beats the roll. seed:03ab9985b6e86c61

Signature interaction: click/Enter/arrow keys on the plate reprints it in the next technique through a block-dissolve, boiling at 12 fps like stop-motion print; pointer moves the light on the plate. Motion grammar: Paco staggered 10px enter, 0.24s underline transitions, Lee sibling dim on lists.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
