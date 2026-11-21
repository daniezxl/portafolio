import type { Metadata, Viewport } from "next";
import { Charis_SIL, Geist, Geist_Mono } from "next/font/google";
import { CommandMenu, type CommandEntry } from "@/components/CommandMenu";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import { sortedNotes } from "@/content/notes";
import { projects } from "@/content/projects";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const serif = Charis_SIL({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-reading",
  display: "swap",
});
const sans = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-ui", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.fullName }],
  openGraph: { type: "website", locale: "es_MX", siteName: site.name, title: site.name, description: site.description },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f3e9" },
    { media: "(prefers-color-scheme: dark)", color: "#171615" },
  ],
};

const commands: CommandEntry[] = [
  { group: "Páginas", label: "Inicio", href: "/" },
  { group: "Páginas", label: "Proyectos", href: "/proyectos" },
  { group: "Páginas", label: "Notas", href: "/notas" },
  ...sortedNotes().map((n) => ({ group: "Notas", label: n.title, href: `/notas/${n.slug}` })),
  ...projects.map((p) => ({ group: "Proyectos", label: p.title, hint: p.year, href: `/proyectos/${p.slug}` })),
  { group: "Acciones", label: "Reimprimir la lámina", action: "reprint" as const },
  { group: "Acciones", label: "Copiar correo", hint: site.email, action: "copy-email" as const },
  { group: "Acciones", label: "Tema claro", action: "theme-light" as const },
  { group: "Acciones", label: "Tema oscuro", action: "theme-dark" as const },
  { group: "Acciones", label: "Tema del sistema", action: "theme-system" as const },
  ...site.links.map((l) => ({ group: "Enlaces", label: l.label, href: l.href })),
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
      data-theme="light"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        <div className="edge edge-top" aria-hidden="true" />
        {children}
        <Footer />
        <div className="edge edge-bottom" aria-hidden="true" />
        <CommandMenu entries={commands} email={site.email} />
      </body>
    </html>
  );
}
