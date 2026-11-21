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
  openGraph: { type: "website", locale: "en_US", siteName: site.name, title: site.name, description: site.description },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f3e9" },
    { media: "(prefers-color-scheme: dark)", color: "#171615" },
  ],
};

const commands: CommandEntry[] = [
  { group: "Pages", label: "Home", href: "/" },
  { group: "Pages", label: "Projects", href: "/projects" },
  { group: "Pages", label: "Notes", href: "/notes" },
  ...sortedNotes().map((n) => ({ group: "Notes", label: n.title, href: `/notes/${n.slug}` })),
  ...projects.map((p) => ({ group: "Projects", label: p.title, hint: p.year, href: `/projects/${p.slug}` })),
  { group: "Actions", label: "Reprint the plate", action: "reprint" as const },
  { group: "Actions", label: "Copy email", hint: site.email, action: "copy-email" as const },
  { group: "Actions", label: "Light theme", action: "theme-light" as const },
  { group: "Actions", label: "Dark theme", action: "theme-dark" as const },
  { group: "Actions", label: "System theme", action: "theme-system" as const },
  ...site.links.map((l) => ({ group: "Links", label: l.label, href: l.href })),
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
      data-theme="light"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#content">
          Skip to content
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
