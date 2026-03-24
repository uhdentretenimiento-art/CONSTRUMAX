import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { normalizeMedia } from "@/lib/media";
import StructuredData from "@/components/StructuredData";
import ProjectGalleryClient from "@/components/ProjectGalleryClient";
import { getProjectCaseStudy } from "@/data/projectCases";

const SITE_URL = "https://www.construmaxpiscinas.com";

type Params = { slug: string };

function toAbsoluteUrl(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function findProjectBySlug(slug: string) {
  const byId = projects.find((p) => String(p.id) === slug);
  if (byId) return byId;

  const bySlugField = projects.find((p: any) =>
    p?.slug ? String(p.slug) === slug : false
  );
  if (bySlugField) return bySlugField;

  const byTitle = projects.find((p) => slugify(p.title) === slug);
  if (byTitle) return byTitle;

  const byLoc = projects.find((p) => slugify(p.location) === slug);
  if (byLoc) return byLoc;

  return null;
}

function pickBestOgImage(project: any) {
  const media = normalizeMedia(project.images as unknown[]);
  const firstImage = media.find((m) => m.type !== "video");
  if (!firstImage) return null;

  const formats = firstImage.formats as any;
  const best =
    formats?.avif ?? formats?.webp ?? formats?.smAvif ?? formats?.smWebp ?? null;

  return best ? toAbsoluteUrl(best) : null;
}

function getGalleryImages(project: any) {
  const media = normalizeMedia(project.images as unknown[]);
  return media
    .filter((m) => m.type !== "video")
    .map((m) => {
      const formats = m.formats as any;
      const best =
        formats?.webp ?? formats?.avif ?? formats?.smWebp ?? formats?.smAvif ?? null;
      return best ? toAbsoluteUrl(best) : null;
    })
    .filter(Boolean) as string[];
}

function getProjectUrl(slug: string) {
  return `${SITE_URL}/proyectos/${slug}`;
}

function getBreadcrumbsSchema(projectTitle: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Proyectos",
        item: `${SITE_URL}/proyectos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: projectTitle,
        item: getProjectUrl(slug),
      },
    ],
  };
}

function getProjectSchema(project: any, slug: string) {
  const images = getGalleryImages(project);
  const url = getProjectUrl(slug);

  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      url,
      description: `Proyecto realizado por Construmax Piscinas en ${project.location}.`,
      inLanguage: "es-AR",
      publisher: {
        "@type": "Organization",
        name: "Construmax Piscinas",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: toAbsoluteUrl(
            "/api/storage/images/logo/png/construmax_horizontal_color.png"
          ),
        },
      },
      about: [{ "@type": "Thing", name: "Construcción de piscinas" }],
      image: images.slice(0, 10),
    },
    images.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: `Galería — ${project.title}`,
          url,
          associatedMedia: images.map((img, i) => ({
            "@type": "ImageObject",
            contentUrl: img,
            thumbnailUrl: img,
            name: `${project.title} — Foto ${i + 1}`,
            caption: `${project.title} — ${project.location}`,
          })),
        }
      : null,
  ].filter(Boolean);
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: String((p as any).slug ?? p.id ?? slugify(p.title)),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} | Proyectos`;
  const description = `Proyecto de Construmax Piscinas en ${project.location}. Mirá fotos y detalles del trabajo realizado.`;
  const ogImage = pickBestOgImage(project);
  const url = getProjectUrl(slug);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Construmax Piscinas",
      locale: "es_AR",
      type: "article",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProyectoDetallePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = findProjectBySlug(slug);
  if (!project) notFound();

  const normalizedMedia = normalizeMedia(project.images as unknown[]);
  const caseStudy = getProjectCaseStudy(project);

  return (
    <>
      <StructuredData data={getBreadcrumbsSchema(project.title, slug)} />
      <StructuredData data={getProjectSchema(project, slug)} />

      <section className="relative overflow-hidden pb-10 pt-28 text-white">
        <div className="absolute inset-0 -z-30 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950" />
        <div className="absolute inset-0 -z-20 opacity-[0.55] bg-[radial-gradient(60%_60%_at_18%_10%,rgba(45,212,191,0.16),transparent_60%),radial-gradient(55%_55%_at_86%_20%,rgba(29,78,216,0.14),transparent_60%)]" />

        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                Proyecto
              </p>
              <h1 className="mt-3 text-3xl font-semibold md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-3 text-white/60">{project.location}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/proyectos"
                prefetch={false}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
              >
                Volver a proyectos
              </Link>

              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-2xl bg-[#1D4ED8]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
              >
                Pedir presupuesto
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24 text-white">
        <div className="absolute inset-0 -z-30 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950" />
        <div className="absolute inset-0 -z-20 opacity-[0.35] bg-[radial-gradient(55%_55%_at_12%_20%,rgba(29,78,216,0.10),transparent_60%),radial-gradient(45%_45%_at_88%_80%,rgba(45,212,191,0.14),transparent_60%)]" />

        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <div className="mb-4 flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    Caso de estudio
                  </p>
                  <span className="w-fit rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                    {caseStudy.category}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {caseStudy.highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#2DD4BF]/25 bg-[#2DD4BF]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2DD4BF]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <ProjectGalleryClient
                title={project.title}
                normalizedMedia={normalizedMedia as any}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    Desafío
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    Solución
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {caseStudy.solution}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    Resultado
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {caseStudy.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
