const SITE_URL = "https://www.construmaxpiscinas.com";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const now = new Date().toISOString();

  const sitemapUrls = [
    `${SITE_URL}/sitemap-paginas.xml`,
    `${SITE_URL}/sitemap-blog.xml`,
    `${SITE_URL}/sitemap-proyectos.xml`,
  ];

  const body = sitemapUrls
    .map(
      (url) =>
        `<sitemap><loc>${escapeXml(url)}</loc><lastmod>${now}</lastmod></sitemap>`
    )
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
