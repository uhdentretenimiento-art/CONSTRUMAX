import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { projects, getProjectCover } from "@/data/projects";

const SITE_URL = "https://www.construmaxpiscinas.com";

type SitemapEntry = MetadataRoute.Sitemap[number];

function toAbs(path: string) {
  return `${SITE_URL}${path}`;
}

function createEntry(
  path: string,
  opts: {
    lastModified?: Date;
    changeFrequency?: SitemapEntry["changeFrequency"];
    priority?: number;
    images?: string[];
  } = {}
): SitemapEntry {
  return {
    url: toAbs(path),
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? "monthly",
    priority: opts.priority ?? 0.7,
    images: opts.images,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Rutas estáticas y de soporte
  const staticRoutes: MetadataRoute.Sitemap = [
    createEntry("/", { lastModified: now, changeFrequency: "weekly", priority: 1 }),
    createEntry("/servicios", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    }),
    createEntry("/proyectos", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    }),
    createEntry("/proceso", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.82,
    }),
    createEntry("/blog", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.86,
    }),
    createEntry("/contacto", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    createEntry("/privacidad", {
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.35,
    }),
    createEntry("/terminos", {
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.35,
    }),
    createEntry("/mapa-del-sitio", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.modifiedDate ?? b.date).getTime() -
        new Date(a.modifiedDate ?? a.date).getTime()
    )
    .map((post) =>
      createEntry(`/blog/${post.slug}`, {
        lastModified: new Date(post.modifiedDate ?? post.date),
        changeFrequency: "yearly",
        priority: 0.72,
        images: post.image ? [post.image] : undefined,
      })
    );

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) =>
    createEntry(`/proyectos/${project.id}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.78,
      images: getProjectCover(project) ? [getProjectCover(project)] : undefined,
    })
  );

  // Dedupe defensivo por URL
  const deduped = new Map<string, SitemapEntry>();
  for (const entry of [...staticRoutes, ...blogRoutes, ...projectRoutes]) {
    deduped.set(entry.url, entry);
  }

  return Array.from(deduped.values());
}
