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

  const pages: Array<{ path: string; changefreq: string; priority: string }> = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/servicios", changefreq: "monthly", priority: "0.9" },
    { path: "/proyectos", changefreq: "weekly", priority: "0.9" },
    { path: "/proceso", changefreq: "monthly", priority: "0.82" },
    { path: "/blog", changefreq: "weekly", priority: "0.86" },
    { path: "/contacto", changefreq: "monthly", priority: "0.8" },
    { path: "/privacidad", changefreq: "yearly", priority: "0.35" },
    { path: "/terminos", changefreq: "yearly", priority: "0.35" },
    { path: "/mapa-del-sitio", changefreq: "monthly", priority: "0.5" },
  ];

  const urls = pages
    .map((page) => {
      const url = `${SITE_URL}${page.path}`;
      return `<url><loc>${escapeXml(url)}</loc><lastmod>${now}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority>${altLinks(url)}</url>`;
    })
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
