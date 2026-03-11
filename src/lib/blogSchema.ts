import type { BlogPost } from "@/data/blog";

const SITE_URL = "https://www.construmaxpiscinas.com";
const BRAND_NAME = "Construmax Piscinas";

export function getBlogPostJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const published = post.date;
  const modified = post.modifiedDate ?? post.date;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: url,
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : undefined,
    datePublished: published,
    dateModified: modified,
    author: {
      "@type": "Person",
      name: post.author || "Equipo CONSTRUMAX",
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo/png/construmax_horizontal_color.png`,
      },
    },
    keywords: post.tags?.join(", "),
    articleSection: post.category,
    inLanguage: "es-AR",
    url,
  };
}

export function getBlogPostBreadcrumbJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };
}