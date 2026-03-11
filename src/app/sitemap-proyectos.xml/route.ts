import { projects, getProjectCover } from "@/data/projects";

const SITE_URL = "https://www.construmaxpiscinas.com";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function altLinks(url: string) {
  return [
    `<xhtml:link rel="alternate" hreflang="es-AR" href="${escapeXml(url)}" />`,
    `<xhtml:link rel="alternate" hreflang="es" href="${escapeXml(url)}" />`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(url)}" />`,
  ].join("");
}

export function GET() {
  const now = new Date().toISOString();

  const urls = projects
    .map((project) => {
      const url = `${SITE_URL}/proyectos/${project.id}`;
      const cover = getProjectCover(project);
      const image = cover
        ? `<image:image><image:loc>${escapeXml(cover)}</image:loc></image:image>`
        : "";

      return `<url><loc>${escapeXml(url)}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.78</priority>${altLinks(url)}${image}</url>`;
    })
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
