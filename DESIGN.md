---
name: Daniel Curiel
description: Cuaderno editorial de un ingeniero en sistemas, con una sola lámina impresa como firma.
colors:
  cobalt: "#1d35a3"
  cobalt-night: "#9aaaf6"
  carmine: "#a20926"
  carmine-night: "#e8786a"
  plate-carmine: "#b1102c"
  paper: "#f8f3e9"
  paper-surface: "#efe8db"
  ink-copy: "#2b2723"
  ink-heading: "#1a1714"
  ink-dim: "#675f57"
  ink-faint: "#716960"
  graphite: "#171615"
  graphite-surface: "#22201e"
  chalk-copy: "#e8e5df"
  chalk-heading: "#f4f1eb"
  chalk-dim: "#aaa59e"
  chalk-faint: "#918b83"
  plate-paper-night: "#ddd5c5"
  plate-ink: "#1d1a17"
  band-cobalt-night: "#14308c"
  band-paper: "#f3eee4"
  stitch-rose: "#bc5952"
  stitch-indigo: "#424c70"
  stitch-lilac: "#9496ab"
  stitch-moss: "#8aad50"
  stitch-umber: "#2a2522"
typography:
  display:
    fontFamily: "Charis SIL, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Charis SIL, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.65
  body:
    fontFamily: "Charis SIL, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  quote:
    fontFamily: "Charis SIL, Georgia, serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "0.005em"
  caption:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "20px"
  code:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.84em"
    fontWeight: 400
rounded:
  focus: "2px"
  plate: "3px"
  chip: "4px"
  item: "6px"
  block: "8px"
  dialog: "12px"
  pill: "999px"
spacing:
  gap-s: "4px"
  gap: "8px"
  gap-2x: "16px"
  gap-3x: "24px"
  gap-4x: "32px"
  gap-6x: "48px"
  gap-8x: "64px"
  gap-16x: "128px"
  side: "192px"
  content: "640px"
components:
  nav-link:
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
  nav-link-current:
    textColor: "{colors.ink-heading}"
  row:
    textColor: "{colors.ink-copy}"
    padding: "0.72em 0"
  tag:
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.chip}"
    padding: "0 6px"
  segmented-option:
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
  segmented-option-pressed:
    textColor: "{colors.ink-heading}"
  plate-press:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.plate}"
  band:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.band-paper}"
    padding: "76px 24px 36px"
  copy-email:
    textColor: "{colors.band-paper}"
    rounded: "{rounded.pill}"
    padding: "1px 10px"
  copy-email-copied:
    backgroundColor: "{colors.band-paper}"
    textColor: "{colors.cobalt}"
  command-menu:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-copy}"
    rounded: "{rounded.dialog}"
    width: "560px"
  command-item-selected:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink-heading}"
    rounded: "{rounded.item}"
    height: "38px"
  inline-code:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.carmine}"
    rounded: "{rounded.chip}"
  code-block:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink-copy}"
    rounded: "{rounded.block}"
    padding: "16px 18px"
---

# Design System: Daniel Curiel

## Overview

**Creative North Star: "Un motivo, muchas imprentas"**

El sitio es un cuaderno editorial silencioso: papel cálido, tinta de grafito, una columna de lectura de 640px flanqueada por dos márgenes de 192px, filas con filetes finos y subrayados de un píxel. Sobre ese cuaderno hay una sola pieza expresiva: la lámina, un medallón ornamental con siluetas de conejo que se reimprime en cinco técnicas (porcelana, semitono, tramado, punto de cruz, risografía). Todo lo demás calla para que la lámina y el texto hablen.

La densidad es de libro, no de panel: el texto corre a 17px con interlínea 1.65, los títulos se distinguen por peso antes que por tamaño, y la interfaz (navegación, metadatos, pies) baja a Geist de 13-14px en un gris tibio. El color es tinta, no pintura: cobalto como única tinta de acento, carmín reservado al código y a la risografía. El cierre de cada página es la excepción deliberada: una banda de cobalto empapada con borde festoneado de porcelana.

En oscuro el cuaderno pasa a una mesa de grafito, pero la lámina sigue siendo una hoja impresa (papel #ddd5c5, mismas tintas) apoyada encima. El grano de papel cubre todo el sitio en ambos temas.

**Key Characteristics:**
- Retícula 192 / 640 / 192 con navegación fija en el margen izquierdo.
- Serif de lectura (Charis SIL) para el contenido; Geist solo para interfaz y metadatos.
- Una tinta de acento (cobalto), usada en puntos, marcadores, subrayado activo y foco.
- Filetes de 1px y subrayados finos en lugar de tarjetas y rellenos.
- La lámina impresa es la única pieza expresiva; anima a 12 fps como estampado en stop-motion.
- Grano de papel fijo sobre toda la página.

## Colors

Papel crudo y tinta de grafito, con una tinta cobalto de porcelana y un carmín de risografía usados con avaricia.

### Primary
- **Cobalto de porcelana** (`cobalt`): la única tinta de acento. Marca la página actual (cuadro de 5px), el apartado activo del índice (4px), viñetas de temas, hover de subrayados y flechas externas, la llamada de nota al margen, el filete de citas, el foco (2px) y el caret. En oscuro se aclara a `cobalt-night` para conservar contraste sobre grafito. También es el fondo de la banda de cierre.

### Secondary
- **Carmín de risografía** (`carmine`, `carmine-night` en oscuro): texto del código en línea y segunda tinta de la lámina (`plate-carmine` en la lámina clara). No aparece en la interfaz fuera de esos dos usos.

### Tertiary
- **Hilos del punto de cruz** (`stitch-rose`, `stitch-indigo`, `stitch-lilac`, `stitch-moss`, `stitch-umber`): paleta exclusiva de la técnica punto de cruz dentro del lienzo. Idénticos en ambos temas. No se usan en la interfaz.

### Neutral
- **Papel** (`paper`): fondo de la página clara y de la lámina; también el `theme-color` claro.
- **Papel de mesa** (`paper-surface`): fondo de bloques de código, código en línea y el elemento seleccionado del menú de comandos.
- **Tinta de copia** (`ink-copy`): texto corrido. **Tinta de título** (`ink-heading`): títulos, negritas, título de fila, estado activo de controles.
- **Tinta atenuada** (`ink-dim`): toda la interfaz en Geist: navegación, metadatos, fechas, pies de lámina, leyendas. **Tinta tenue** (`ink-faint`): viñetas de prosa, anclas de encabezado, iconos externos en reposo, barra de desplazamiento.
- **Grafito** (`graphite`) y **grafito de mesa** (`graphite-surface`): sus equivalentes oscuros; `chalk-copy`, `chalk-heading`, `chalk-dim` y `chalk-faint` sustituyen a las tintas.
- **Filete** (`--line`, rgb(43 39 35 / 0.13) en claro, rgb(232 229 223 / 0.11) en oscuro) y **subrayado** (`--underline`, 0.32 / 0.3 de alfa): divisores, bordes de chips y de bloques, subrayado de enlaces en reposo.
- **Papel de banda** (`band-paper`): texto sobre la banda de cobalto; `band-cobalt-night` es el fondo de la banda en oscuro.

### Named Rules
**La regla de la tinta única.** El cobalto es la única tinta de acento de la interfaz. Aparece en marcas pequeñas (puntos de 4-5px, filetes de 1px, subrayados, foco), nunca como relleno de botones o tarjetas. La banda de cierre es la única superficie empapada.

**La regla del carmín cautivo.** El carmín vive en el código y en la lámina. Si aparece en un control, un título o un estado de interfaz, está mal.

**La regla de la hoja sobre la mesa.** En oscuro la página cambia; la lámina no. Las superficies que muestran la lámina conservan papel claro (`plate-paper-night`) y tintas de imprenta.

## Typography

**Display Font:** Charis SIL 700 (con Iowan Old Style, Palatino, Georgia)
**Body Font:** Charis SIL 400 e itálica (misma pila)
**Label/Mono Font:** Geist (con system-ui) para interfaz; Geist Mono (con ui-monospace) para código, `kbd` y valores hexadecimales

**Character:** Una serif de libro, robusta y legible, lleva todo lo que se lee; una sans neutra y pequeña lleva todo lo que se opera. La pareja separa contenido de interfaz sin necesidad de color.

### Hierarchy
- **Display** (700, 26px, 1.25, -0.012em; 23px en móvil): un único título por página de detalle (notas, proyectos, colofón) y el título de la banda de cierre.
- **Headline** (700, 17px, 1.65): el nombre en la portada y los títulos de sección; mismo tamaño que el cuerpo, distinguidos solo por peso. Los subtítulos de prosa (h3) bajan a itálica 400.
- **Body** (400, 17px, 1.65): todo el texto corrido, en la columna de 640px (unos 70-75 caracteres). Descripciones secundarias a 16px / 1.55 en `ink-dim`.
- **Quote** (itálica 400, 19px, 1.55): citas en prosa, en `ink-heading`, con filete cobalto a la izquierda.
- **Label** (Geist 400, 14px, 20px, 0.005em): navegación, controles segmentados, enlaces de la banda, menú de comandos.
- **Caption** (Geist 400, 13px, 20px): fechas y metadatos con cifras tabulares, pies de lámina, notas al margen (1.55), leyendas de código, ficha de proyecto. Encabezados de grupo y del índice a 12px.
- **Code** (Geist Mono, 0.84em; 15.5px / 1.7 en bloque, 14px en móvil): sin ligaduras.

### Named Rules
**La regla del peso antes que el tamaño.** En la portada y dentro de la prosa, la jerarquía se hace con peso e itálica a 17px. El único salto de tamaño es el título de 26px de las páginas de lectura.

**La regla de las dos voces.** Charis SIL para lo que se lee, Geist para lo que se opera. Un dato de interfaz en serif o un párrafo en sans rompe el sistema.

## Layout

Retícula de tres columnas: margen izquierdo de 192px (navegación fija, índice de la nota), columna de contenido de 640px y margen derecho de 192px (notas al margen, ficha del proyecto), con 24px entre columnas y un ancho de página de 1072px. La página arranca a 96px del borde superior y termina con 128px de aire antes de la banda. La banda de cierre repite la misma retícula y alinea su contenido en la columna central.

El ritmo vertical usa la escala `gap` (4/8/16/24/32/48/64/128): 64px antes de cada título de sección, 16px después; 32-48px alrededor de portadas de lámina. En prosa, 1.1em entre bloques y 2.2em antes de cada encabezado.

En la portada la lámina ocupa la columna central de 640px (proporción 8:5), centrada en la retícula simétrica. Entre 768 y 1139px la retícula pasa a 150px + 640px: el margen derecho baja bajo el contenido y las notas al margen se vuelven notas en línea con filete izquierdo. Por debajo de 768px la página es una sola columna (20px de margen), la navegación se vuelve una fila horizontal, la lámina pasa a cuadrada, las tres columnas de la portada se convierten en un carrusel con snap y el índice de la nota desaparece.

Un desenfoque progresivo de 64px (32px en móvil) cubre el borde superior al desplazarse.

## Elevation & Depth

El sistema es plano. La profundidad se cuenta con filetes de 1px y con el grano de papel, no con sombras. Solo dos objetos se levantan: la lámina, que es una hoja impresa apoyada en la página, y el menú de comandos, que es un diálogo sobre ella.

### Shadow Vocabulary
- **Hoja apoyada** (`box-shadow: 0 0 0 1px var(--line), 0 18px 40px -28px var(--shadow)`): solo la lámina de la portada.
- **Canto de hoja** (`box-shadow: 0 0 0 1px var(--line)`): portadas de lámina, miniaturas de proyectos y especímenes; `inset` en las muestras de color.
- **Diálogo** (`box-shadow: 0 30px 70px -24px var(--shadow), 0 4px 14px -6px var(--shadow)`): menú de comandos, sobre un velo rgb(20 18 16 / 0.32) con desenfoque de 2px.

### Named Rules
**La regla del papel plano.** Nada de la interfaz proyecta sombra. Las sombras pertenecen a objetos físicos (la hoja impresa) o a un diálogo que flota; filas, chips y controles se separan con filetes.

## Shapes

Esquinas casi rectas, como papel cortado: 3px en láminas y muestras, 4px en chips, `kbd` y código en línea, 6px en elementos del menú de comandos, 8px en bloques de código y 12px en el diálogo. Las únicas formas redondas son las píldoras (botón de copiar correo y aviso), a 999px. Los marcadores de estado son cuadrados (puntos de 4-5px, viñetas `square`), nunca círculos. La única silueta ornamental de la interfaz es el borde festoneado de la banda de cobalto (semicírculos de 24px) con doble filete punteado debajo, y el conejo de 22px que hace de marca en la navegación y de cursor sobre la lámina.

## Components

### Navegación
Discreta y fija, como la meta de paco.me.
- **Estilo:** columna izquierda pegajosa con el conejo cobalto de 22px arriba y enlaces en Label `ink-dim`, interlínea 26px.
- **Estados:** hover y página actual pasan a `ink-heading`; la actual lleva un cuadro cobalto de 5px colgado a la izquierda. El conejo se eleva 3px y gira -4° en hover.
- **Buscar:** último elemento de la lista, abre el menú de comandos, muestra el atajo en `kbd` (oculto en móvil).
- **Móvil:** fila horizontal con el conejo a la izquierda, sin cuadro de página actual.

### Enlaces
- Heredan el color del texto, subrayado de 1px en `--underline` con desfase de 2.5px; en hover el subrayado pasa a cobalto en 0.24s. Los externos llevan una flecha de 14px en `ink-faint` que se vuelve cobalto y se desplaza 1px en diagonal.

### Filas (Escritos, Proyectos)
La lista de leerob.com.
- **Estructura:** título en `ink-heading` y fecha o metadato en Caption a la derecha con cifras tabulares, filete de 1px arriba y entre filas, 0.72em de relleno vertical. Las filas de proyecto suman una miniatura cuadrada de lámina de 96px (72px en móvil).
- **Estado:** al pasar sobre la lista, las hermanas bajan a 0.55 de opacidad en 0.3s y la fila señalada se queda en 1.

### Controles segmentados (Breve/Extensa, tema, técnica)
- **Estilo:** palabras en Label `ink-dim` separadas 14px, sin caja ni fondo.
- **Estado:** hover y pulsado pasan a `ink-heading`; el pulsado gana un subrayado a 6px (el selector de técnica lo dibuja en cobalto). Dentro de la banda usan `--band-dim` / `band-paper`.

### Chips
- **Marca de ejemplo** ("ejemplo", "pendiente"): Geist 11px / 18px, borde de 1px en filete, radio 4px, `ink-dim`. Señala contenido de relleno; es un aviso de honestidad, no decoración.
- **`kbd`:** Geist Mono 11px, borde de filete, radio 4px.

### Código
- **En línea:** Geist Mono en carmín sobre `paper-surface`, radio 4px.
- **Bloque:** `paper-surface`, borde de filete, radio 8px, 16px 18px de relleno; leyenda debajo en Caption con el lenguaje en mono `ink-faint`.

### Prosa y notas al margen
- Citas en itálica de 19px con filete cobalto. Encabezados con ancla que aparece en hover. Notas al margen en Caption `ink-dim` dentro del margen derecho, con número cobalto 500; bajo 1140px se pliegan en línea con filete izquierdo.

### Menú de comandos
- **Contenedor:** diálogo de 560px máx., fondo de página, borde de filete, radio 12px, sombra de diálogo; entra en 0.18s con -6px y escala 0.985.
- **Campo:** 52px de alto, sin borde propio, filete inferior, texto Geist 15px.
- **Elementos:** 38px, radio 6px, Label; el seleccionado toma `paper-surface` y `ink-heading`. Grupos en 12px `ink-dim`.

### La lámina (componente firma)
Un lienzo que imprime uno de dos motivos de developer en una de cinco técnicas: un editor de código (código que se escribe solo, números de línea, minimapa, terminal, llaves gigantes y lluvia de caracteres) o un chip con una red neuronal (pistas de circuito con paquetes de datos, neuronas que se activan en ola, anillo de código y ondas de señal). En portada avanza solo cada 3 s, alternando técnica y motivo.
- **Marco:** hoja de papel con radio 3px y sombra de hoja apoyada; 8:5 dentro de la columna de 640px en escritorio, cuadrada en móvil. El cursor es el conejo cobalto.
- **Interacción:** clic, Enter o flechas reimprimen en la siguiente técnica con un fundido por bloques; el puntero mueve la luz de la lámina. Anima a 12 fps; con movimiento reducido dibuja un solo fotograma.
- **Pie:** Caption con el nombre de la técnica en `ink-heading` 500, su nota técnica y el selector segmentado de técnicas.
- **Variantes:** portada de nota o proyecto (640:150), miniatura cuadrada de fila y espécimen de colofón; todas con canto de hoja.

### Banda de cobalto (cierre)
- **Estilo:** fondo cobalto empapado con texto `band-paper`, borde superior festoneado y doble filete punteado; 76px 24px 36px de relleno (64px 20px 28px en móvil). Título en Display, enlaces Label con flecha, pie en Caption con el lema en itálica serif de 15px, el selector de tema y el año.
- **Copiar correo:** píldora con borde `--band-line`; hover con velo blanco al 10%; al copiar se invierte a papel sobre cobalto.

## Do's and Don'ts

### Do:
- **Do** mantener la retícula 192 / 640 / 192 con 24px de separación y poner la navegación y los índices en el margen izquierdo, las notas y fichas en el derecho.
- **Do** escribir el contenido en Charis SIL a 17px / 1.65 y la interfaz en Geist a 13-14px en `ink-dim`.
- **Do** separar listas y bloques con filetes de 1px (`--line`) y atenuar las hermanas a 0.55 en hover.
- **Do** usar el cobalto solo en marcas pequeñas: cuadros de 4-5px, filetes, subrayado activo, foco de 2px con desfase de 3px.
- **Do** mostrar la lámina siempre como hoja impresa (papel claro, radio 3px, canto de filete), también en oscuro.
- **Do** marcar todo contenido de relleno con el chip "ejemplo" o "pendiente".
- **Do** animar entradas con 10px de subida, 0.7s y escalonado de 90ms con `--ease-out`, y desactivar todo movimiento con `prefers-reduced-motion`.
- **Do** cerrar cada página con la banda de cobalto festoneada.

### Don't:
- **Don't** usar la plantilla de portafolio estudiantil: titular de héroe, avatar, barras de habilidades o retícula de tarjetas.
- **Don't** añadir una segunda pieza expresiva junto a la lámina; la lámina (editor o red neuronal) es la única firma.
- **Don't** usar el carmín ni los hilos del punto de cruz fuera del código y la lámina.
- **Don't** rellenar botones o tarjetas con cobalto; la banda de cierre es la única superficie empapada.
- **Don't** poner sombras en filas, chips o controles; solo la hoja impresa y el diálogo se levantan.
- **Don't** subir títulos de sección por encima de 17px; el salto a 26px es exclusivo del título único de las páginas de lectura y de la banda.
- **Don't** usar marcadores redondos para estados; los puntos son cuadrados.

## Notas abiertas

Límites conocidos del build entregado. No son reglas ni deben heredarse.

- El ornamento de la banda de cobalto es sencillo (festón y doble filete punteado).
- Punto de cruz es la técnica más débil a tamaño de miniatura.
- El conejo de la navegación en oscuro usa el cobalto aclarado (`cobalt-night`), no la tinta de imprenta.
