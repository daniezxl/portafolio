# Daniel Curiel — portfolio

A personal notebook in Next.js. It takes the editorial structure of leerob.com and paco.me and adds a *plate*: a code editor and a chip with a neural network, printed in the browser with five techniques (porcelain, halftone, dither, cross-stitch and risograph).

## Run

```powershell
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (every route is static)
npm run start
```

## Edit the content

All text lives in `src/content/`. Components hold no copy of their own.

| File | What's in it |
|---|---|
| `src/content/site.ts` | name, domain, email, links, short and long bio, home columns, topics, "Now" section, footer mottos |
| `src/content/projects.ts` | projects: summary, problem, role and tools, result, demo and code buttons |
| `src/content/notes.ts` | notes |

Any text accepts `*italic*`, `**bold**`, `` `code` `` and `[link](/path)`. Notes and projects are written as blocks (`p`, `h2`, `h3`, `list`, `code`, `quote`, `figure`, `figures`, `table`, `callout`). A `p` with `aside` shows a sidenote.

Each note and project picks its plate technique with `technique`: `porcelana`, `semitono`, `tramado`, `punto` or `riso`. The drawing changes with the `slug`.

**Before publishing:** set the real domain in `site.url`, and add your CV at `public/cv.pdf` if you want to link it.

## Structure

```
src/app/            pages: home, /projects, /notes, 404, sitemap, robots, icon, OG image
src/components/     navigation, plate, ⌘K menu, prose with sidenotes, table of contents, theme, footer
src/lib/plate/      plate engine: motif.ts and editor.ts (drawings), renderer.ts (techniques)
src/app/globals.css design system: light/dark tokens, 192/640/192 grid, components
public/projects/    project screenshots
```

## Interactions

- **Plate:** advances every 3 s, alternating technique and motif; click, Enter or ←/→ reprint it by hand with a block dissolve. It animates at 12 fps, pauses off-screen and respects "reduce motion".
- **⌘K / Ctrl K:** command menu to jump to pages, notes and projects, switch theme, copy the email or reprint the plate.
- **Short / Long bio**, rows that dim their neighbors, a table of contents that follows your reading, heading anchors, a copy-email button and a System / Light / Dark theme with no flash on load.
