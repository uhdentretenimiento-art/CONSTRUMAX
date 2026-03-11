import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";

const SITE_URL = "https://www.construmaxpiscinas.com";

export const metadata: Metadata = {
  title: "Mapa del sitio | Construmax Piscinas",
  description:
    "Explorá todas las secciones del sitio de Construmax Piscinas: servicios, proyectos, blog y páginas legales.",
  alternates: {
    canonical: `${SITE_URL}/mapa-del-sitio`,
  },
  openGraph: {
    title: "Mapa del sitio | Construmax Piscinas",
    description:
      "Acceso rápido a todo el contenido de Construmax Piscinas en una sola página.",
    url: `${SITE_URL}/mapa-del-sitio`,
    type: "website",
    locale: "es_AR",
  },
};

const coreLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/proceso", label: "Proceso" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

const legalLinks = [
  { href: "/privacidad", label: "Política de Privacidad" },
  { href: "/terminos", label: "Términos y Condiciones" },
  { href: "/sitemap-index.xml", label: "Sitemap Index XML (principal)" },
  { href: "/sitemap.xml", label: "Sitemap XML" },
  { href: "/sitemap-paginas.xml", label: "Sitemap Páginas XML" },
  { href: "/sitemap-blog.xml", label: "Sitemap Blog XML" },
  { href: "/sitemap-proyectos.xml", label: "Sitemap Proyectos XML" },
];

export default function SiteMapPage() {
  const getProjectHref = (project: (typeof projects)[number]) => {
    const candidate = (project as { slug?: string }).slug ?? project.id;
    return `/proyectos/${encodeURIComponent(String(candidate))}`;
  };

  return (
    <main className="relative isolate overflow-hidden bg-slate-950 pb-20 pt-24 md:pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.16),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(29,78,216,0.22),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(14,23,42,0.9),rgba(2,6,23,1))]"
      />

      <section className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-construmax-blue-light backdrop-blur md:px-4 md:py-1.5 md:text-xs">
            Navegación completa
          </p>
          <h1 className="font-display text-3xl font-bold text-white md:text-5xl">
            Mapa del sitio
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
            Encontrá rápidamente todas las páginas principales, artículos y
            proyectos de Construmax.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-white/15 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-sm md:rounded-3xl md:p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-white md:text-2xl">
              Secciones principales
            </h2>
            <ul className="space-y-2">
              {coreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-slate-200 transition-colors hover:text-construmax-blue-light"
                  >
                    <span aria-hidden="true">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/15 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-sm md:rounded-3xl md:p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-white md:text-2xl">
              Legal y técnico
            </h2>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-slate-200 transition-colors hover:text-construmax-blue-light"
                  >
                    <span aria-hidden="true">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-2">
          <section className="rounded-2xl border border-white/15 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-sm md:rounded-3xl md:p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-white md:text-2xl">
              Proyectos ({projects.length})
            </h2>
            <ul className="max-h-[380px] space-y-2 overflow-auto pr-1">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={getProjectHref(project)}
                    className="inline-flex items-center gap-2 text-sm text-slate-200 transition-colors hover:text-construmax-blue-light"
                  >
                    <span aria-hidden="true">→</span>
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/15 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-sm md:rounded-3xl md:p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-white md:text-2xl">
              Blog ({blogPosts.length})
            </h2>
            <ul className="max-h-[380px] space-y-2 overflow-auto pr-1">
              {blogPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-slate-200 transition-colors hover:text-construmax-blue-light"
                  >
                    <span aria-hidden="true">→</span>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
