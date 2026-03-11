import { blogPosts } from "@/data/blog";

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
  const posts = blogPosts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.modifiedDate ?? b.date).getTime() -
        new Date(a.modifiedDate ?? a.date).getTime()
    );

  const urls = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const lastmod = new Date(post.modifiedDate ?? post.date).toISOString();
      const image = post.image
        ? `<image:image><image:loc>${escapeXml(post.image)}</image:loc></image:image>`
        : "";

      return `<url><loc>${escapeXml(url)}</loc><lastmod>${lastmod}</lastmod><changefreq>yearly</changefreq><priority>0.72</priority>${altLinks(url)}${image}</url>`;
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
