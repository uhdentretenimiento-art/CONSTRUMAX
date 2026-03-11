import type { Project, ImageFormats } from "@/data/projects";

const SITE_URL = "https://www.construmaxpiscinas.com";

function pickCoverFromImages(images: (string | ImageFormats)[]): string {
  const first = images?.[0];
  if (!first) return "";

  if (typeof first === "string") return first;

  // Preferimos webp grande si existe, sino smWebp
  return first.webp || first.smWebp || "";
}

export function getProjectSchema(project: Project) {
  const cover = pickCoverFromImages(project.images);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: `Proyecto de piscina realizado por Construmax en ${project.location}.`,
    image: cover ? [cover] : undefined,
    url: `${SITE_URL}/proyectos/${project.id}`,
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    creator: {
      "@type": "Organization",
      name: "Construmax Piscinas",
      url: SITE_URL,
    },
  };
}

export function getProjectsListSchema(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Proyectos realizados por Construmax Piscinas",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/proyectos/${project.id}`,
      name: project.title,
    })),
  };
}