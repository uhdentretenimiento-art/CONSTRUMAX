import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog de Piscinas - Consejos, Tendencias y Guías | Construmax",
  description:
    "Descubre consejos sobre construcción, mantenimiento y diseño de piscinas. Artículos de CONSTRUMAX con más de 25 años de experiencia.",
  keywords: ["blog", "consejos", "tendencias", "guías", "mantenimiento"],
  openGraph: {
    title: "Blog de Piscinas | Construmax",
    description:
      "Consejos, guías y tendencias sobre construcción y mantenimiento de piscinas.",
    url: "https://www.construmaxpiscinas.com/blog",
    siteName: "Construmax",
    locale: "es_AR",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative isolate overflow-hidden bg-slate-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.16),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(29,78,216,0.22),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(14,23,42,0.9),rgba(2,6,23,1))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:42px_42px]"
      />
      {children}
    </main>
  );
}
