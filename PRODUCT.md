# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript, chosen by the user. Styling with plain CSS and design tokens (custom properties); no UI kit. Deploy target not decided (Vercel is the natural fit).

## Users

- Recruiters, engineering leads, founders and partners evaluating Daniel Curiel: they skim in under a minute, then open one or two projects or notes to judge depth.
- Peers and classmates who arrive from a shared link to read a note or check a project.

## Product Purpose

Personal portfolio and notebook of Daniel Curiel, presented as an engineer in Computer Systems (Ingeniería en Sistemas Computacionales, Instituto Tecnológico de Mexicali), CTO and co-founder of Qubiko, building AI products end to end. It presents who he is, what he is building, selected projects and written notes, and how to reach him. Success: a reader understands his focus (backend + AI) in the first screen and finds one project or note worth opening.

## Positioning

A portfolio that reads like an editorial notebook rather than a template: minimal, typographic, written in his own voice, with a single generative print-art signature that is his own.

## Operating Context

Read on laptop and phone, often from a link in a CV, LinkedIn message or GitHub profile. Content language: Spanish.

## Capabilities and Constraints

- Pages: home, projects index, notes index and note detail, 404.
- All biographical content, projects, notes and links are **placeholders** until the user supplies real ones; they live in a single content module so they can be replaced without touching components.
- Light and dark themes; respects `prefers-reduced-motion`.

## Brand Commitments

- Name: Daniel Curiel.
- Binding references chosen by the user: the minimal editorial systems of leerob.com and paco.me, fused with the print-technique aesthetic of the user's reference video (halftone, cobalt porcelain ornament, dither, cross-stitch grid, carmine riso, radial ornament with rabbit silhouettes). These are references for structure and feel, not content to copy.

## Evidence on Hand

User-provided: Qubiko (CTO/co-founder, ~1,000 users, 1st place POSIBLE x Bécalos 2026, Baja Innovation Day, Expo Emprendedores, La Crónica, Canal 66; screenshot public/proyectos/qubiko.png), Taller de Don Rover (NASA Space Apps 2026, 2nd place local, pass to global; screenshot public/proyectos/taller-de-don-rover.webp), EcoBC (in construction; illustrative sketch public/proyectos/ecobc.svg). Event dates and details are not provided; notes about them stay marked as drafts.

Copy voice: concise and information-dense, like leerob.com and paco.me.

## Product Principles

1. Reading first: text, rhythm and hierarchy carry the page; decoration never competes with content.
2. One signature, used with restraint: the print-art piece is the only expressive element.
3. Honest content: placeholders stay obviously replaceable; nothing invented is presented as fact.
4. Fast and quiet: static rendering, no heavy dependencies, motion that is short and optional.

## Accessibility & Inclusion

WCAG AA contrast in both themes, keyboard access for every interaction (including the command menu and the art piece), reduced-motion support.
