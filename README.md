# Daniel Curiel — portafolio

Cuaderno personal en Next.js. Toma la estructura editorial de leerob.com y paco.me y le suma una *lámina*: un editor de código y un chip con una red neuronal que se imprimen en el navegador con cinco técnicas (porcelana, semitono, tramado, punto de cruz y risografía), como en el video de referencia.

## Ejecutar

```powershell
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción (todas las rutas son estáticas)
npm run start
```

## Editar el contenido

Todo el texto vive en `src/content/`. Los componentes no contienen texto propio.

| Archivo | Qué contiene |
|---|---|
| `src/content/site.ts` | nombre, dominio, correo, enlaces, bio breve y extensa, columnas de la portada, temas, sección «Ahora», lemas del pie |
| `src/content/projects.ts` | proyectos; los que tienen `placeholder: true` muestran la etiqueta «ejemplo» |
| `src/content/notes.ts` | notas (texto de muestra) |

En cualquier texto puedes escribir `*cursiva*`, `**negrita**`, `` `código` `` y `[enlace](/ruta)`. Las notas y los proyectos se escriben como bloques (`p`, `h2`, `h3`, `list`, `code`, `quote`). Un `p` con `aside` muestra una nota al margen.

Cada nota y cada proyecto elige la técnica de su lámina con `technique`: `porcelana`, `semitono`, `tramado`, `punto` o `riso`. El dibujo cambia según el `slug`.

**Antes de publicar:** reemplaza el correo, los enlaces de `site.links`, el dominio de `site.url`, los proyectos de ejemplo, y agrega tu CV en `public/cv.pdf` (o quita ese enlace).

## Estructura

```
src/app/            páginas: inicio, /proyectos, /notas, 404, sitemap, robots, icono, imagen OG
src/components/     navegación, lámina, menú ⌘K, prosa con notas al margen, índice, tema, pie
src/lib/plate/      motor de la lámina: motif.ts (dibujo), renderer.ts (técnicas)
src/app/globals.css sistema de diseño: tokens claro/oscuro, retícula 192/640/192, componentes
```

## Interacciones

- **Lámina:** avanza sola cada 3 s alternando técnica y motivo; clic, Enter o ←/→ la reimprimen a mano con un disuelto por bloques. Se anima a 12 fps, se pausa fuera de pantalla y respeta «reducir movimiento».
- **⌘K / Ctrl K:** menú de comandos para ir a páginas, notas y proyectos, cambiar el tema, copiar el correo o reimprimir la lámina.
- **Bio Breve / Extensa**, filas que atenúan a sus vecinas, índice que sigue la lectura, anclas en los títulos, botón para copiar el correo y tema Sistema / Claro / Oscuro sin destello al cargar.
