/**
 * Data de proyectos (Next.js friendly).
 * - Mantiene compatibilidad con tu código actual (images como string o ImageFormats)
 * - Incluye helpers para elegir la mejor URL (AVIF/WebP/SM)
 */

import portfolioAvifData from "../../portfolio-avif.json";

export interface ImageFormats {
  avif: string;
  webp: string;
  smAvif: string;
  smWebp: string;
      src768?: string;
      srcSet?: string;
}

export type ProjectImage = string | ImageFormats;

export interface Project {
  id: string;
  title: string;
  location: string;
  images: ProjectImage[];
}

type PortfolioItem = {
      id: string;
      thumb320: string;
      thumb480: string;
      src768: string;
      src1280: string;
      src1920: string;
      srcset: string;
};

/**
 * Devuelve la mejor URL para mostrar (prioriza AVIF/WebP, con opción de 'small').
 * - small=true -> usa smAvif/smWebp si existe
 */
export const getProjectImageSrc = (
  img: ProjectImage,
  opts?: { prefer?: "avif" | "webp"; small?: boolean }
) => {
  const prefer = opts?.prefer ?? "avif";
  const small = opts?.small ?? false;

  if (typeof img === "string") return img;

  if (small) {
    return prefer === "avif" ? img.smAvif || img.smWebp : img.smWebp || img.smAvif;
  }
  return prefer === "avif" ? img.avif || img.webp : img.webp || img.avif;
};

/** Cover por defecto: primera imagen */
export const getProjectCover = (
  project: Project,
  opts?: { prefer?: "avif" | "webp"; small?: boolean }
) => getProjectImageSrc(project.images[0], opts);

const baseProjects: Project[] = [
      {
            id: "agropecuaria-el-guanaco-metan",
            title: "Agropecuaria El Guanaco",
            location: "Metán, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/responsive/1920w/agropecuaria-el-guanaco-metan-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/responsive/1280w/agropecuaria-el-guanaco-metan-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/thumbnails/480w/sm-agropecuaria-el-guanaco-metan-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/thumbnails/320w/sm-agropecuaria-el-guanaco-metan-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/responsive/1920w/agropecuaria-el-guanaco-metan-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/responsive/1280w/agropecuaria-el-guanaco-metan-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/thumbnails/480w/sm-agropecuaria-el-guanaco-metan-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/thumbnails/320w/sm-agropecuaria-el-guanaco-metan-002-320w.avif"
                  }
            
            ],
      },
      {
            id: "chacras-de-santa-maria",
            title: "Chacras de Santa María",
            location: "San Lorenzo, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/responsive/1920w/chacras-de-santa-maria-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/responsive/1280w/chacras-de-santa-maria-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/thumbnails/480w/sm-chacras-de-santa-maria-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/thumbnails/320w/sm-chacras-de-santa-maria-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/responsive/1920w/chacras-de-santa-maria-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/responsive/1280w/chacras-de-santa-maria-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/thumbnails/480w/sm-chacras-de-santa-maria-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/thumbnails/320w/sm-chacras-de-santa-maria-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/responsive/1920w/chacras-de-santa-maria-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/responsive/1280w/chacras-de-santa-maria-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/thumbnails/480w/sm-chacras-de-santa-maria-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/thumbnails/320w/sm-chacras-de-santa-maria-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/responsive/1920w/chacras-de-santa-maria-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/responsive/1280w/chacras-de-santa-maria-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/thumbnails/480w/sm-chacras-de-santa-maria-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/chacras-de-santa-maria/thumbnails/320w/sm-chacras-de-santa-maria-004-320w.avif"
                  }
            
            ],
      },
      {
            id: "club-ate",
            title: "Club ATE",
            location: "Salta Capital",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/club-ate/responsive/1920w/club-ate-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/club-ate/responsive/1280w/club-ate-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/club-ate/thumbnails/480w/sm-club-ate-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/club-ate/thumbnails/320w/sm-club-ate-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/club-ate/responsive/1920w/club-ate-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/club-ate/responsive/1280w/club-ate-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/club-ate/thumbnails/480w/sm-club-ate-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/club-ate/thumbnails/320w/sm-club-ate-002-320w.avif"
                  }
            
            ],
      },
      {
            id: "el-prado-eco-village",
            title: "El Prado Eco Village",
            location: "Salta Capital",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1920w/el-prado-eco-village-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1280w/el-prado-eco-village-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/480w/sm-el-prado-eco-village-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/320w/sm-el-prado-eco-village-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1920w/el-prado-eco-village-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1280w/el-prado-eco-village-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/480w/sm-el-prado-eco-village-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/320w/sm-el-prado-eco-village-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1920w/el-prado-eco-village-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1280w/el-prado-eco-village-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/480w/sm-el-prado-eco-village-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/320w/sm-el-prado-eco-village-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1920w/el-prado-eco-village-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1280w/el-prado-eco-village-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/480w/sm-el-prado-eco-village-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/320w/sm-el-prado-eco-village-004-320w.avif"
                  }
            
            ],
      },
      {
            id: "el-tipal-1",
            title: "El Tipal I",
            location: "San Lorenzo, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/responsive/1920w/el-tipal-1-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/responsive/1280w/el-tipal-1-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/thumbnails/480w/sm-el-tipal-1-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/thumbnails/320w/sm-el-tipal-1-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/responsive/1920w/el-tipal-1-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/responsive/1280w/el-tipal-1-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/thumbnails/480w/sm-el-tipal-1-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/thumbnails/320w/sm-el-tipal-1-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/responsive/1920w/el-tipal-1-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/responsive/1280w/el-tipal-1-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/thumbnails/480w/sm-el-tipal-1-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/thumbnails/320w/sm-el-tipal-1-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/responsive/1920w/el-tipal-1-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/responsive/1280w/el-tipal-1-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/thumbnails/480w/sm-el-tipal-1-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-1/thumbnails/320w/sm-el-tipal-1-004-320w.avif"
                  }
            
            ],
      },
      {
            id: "el-tipal-2",
            title: "El Tipal II",
            location: "San Lorenzo, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/responsive/1920w/el-tipal-2-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/responsive/1280w/el-tipal-2-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/thumbnails/480w/sm-el-tipal-2-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/thumbnails/320w/sm-el-tipal-2-001-320w.avif"
                  }
            
            ],
      },
      {
            id: "el-tipal-3",
            title: "El Tipal III",
            location: "San Lorenzo, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/responsive/1920w/el-tipal-3-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/responsive/1280w/el-tipal-3-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/thumbnails/480w/sm-el-tipal-3-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/thumbnails/320w/sm-el-tipal-3-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/responsive/1920w/el-tipal-3-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/responsive/1280w/el-tipal-3-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/thumbnails/480w/sm-el-tipal-3-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/thumbnails/320w/sm-el-tipal-3-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/responsive/1920w/el-tipal-3-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/responsive/1280w/el-tipal-3-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/thumbnails/480w/sm-el-tipal-3-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-3/thumbnails/320w/sm-el-tipal-3-003-320w.avif"
                  }
            
            ],
      },
      {
            id: "gral-guemes",
            title: "General Güemes",
            location: "General Güemes, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/responsive/1920w/gral-guemes-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/responsive/1280w/gral-guemes-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/thumbnails/480w/sm-gral-guemes-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/thumbnails/320w/sm-gral-guemes-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/responsive/1920w/gral-guemes-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/responsive/1280w/gral-guemes-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/thumbnails/480w/sm-gral-guemes-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/thumbnails/320w/sm-gral-guemes-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/responsive/1920w/gral-guemes-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/responsive/1280w/gral-guemes-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/thumbnails/480w/sm-gral-guemes-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/gral-guemes/thumbnails/320w/sm-gral-guemes-004-320w.avif"
                  }
            
            ],
      },
      {
            id: "grand-bourg-1",
            title: "Grand Bourg I",
            location: "Salta Capital",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1920w/grand-bourg-1-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1280w/grand-bourg-1-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/480w/sm-grand-bourg-1-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/320w/sm-grand-bourg-1-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1920w/grand-bourg-1-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1280w/grand-bourg-1-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/480w/sm-grand-bourg-1-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/320w/sm-grand-bourg-1-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1920w/grand-bourg-1-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1280w/grand-bourg-1-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/480w/sm-grand-bourg-1-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/320w/sm-grand-bourg-1-004-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1920w/grand-bourg-1-005-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1280w/grand-bourg-1-005-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/480w/sm-grand-bourg-1-005-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/320w/sm-grand-bourg-1-005-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1920w/grand-bourg-1-006-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1280w/grand-bourg-1-006-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/480w/sm-grand-bourg-1-006-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/320w/sm-grand-bourg-1-006-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1920w/grand-bourg-1-007-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1280w/grand-bourg-1-007-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/480w/sm-grand-bourg-1-007-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/320w/sm-grand-bourg-1-007-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1920w/grand-bourg-1-008-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1280w/grand-bourg-1-008-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/480w/sm-grand-bourg-1-008-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/320w/sm-grand-bourg-1-008-320w.avif"
                  }
            
            ],
      },
      {
            id: "grand-bourg-2",
            title: "Grand Bourg II",
            location: "Salta Capital",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/responsive/1920w/grand-bourg-2-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/responsive/1280w/grand-bourg-2-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/thumbnails/480w/sm-grand-bourg-2-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/thumbnails/320w/sm-grand-bourg-2-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/responsive/1920w/grand-bourg-2-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/responsive/1280w/grand-bourg-2-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/thumbnails/480w/sm-grand-bourg-2-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/thumbnails/320w/sm-grand-bourg-2-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/responsive/1920w/grand-bourg-2-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/responsive/1280w/grand-bourg-2-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/thumbnails/480w/sm-grand-bourg-2-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-2/thumbnails/320w/sm-grand-bourg-2-004-320w.avif"
                  }
            
            ],
      },
      {
            id: "hosteria-cabra-corral",
            title: "Hostería Cabra Corral",
            location: "Coronel Moldes, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/responsive/1920w/hosteria-cabra-corral-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/responsive/1280w/hosteria-cabra-corral-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/thumbnails/480w/sm-hosteria-cabra-corral-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/thumbnails/320w/sm-hosteria-cabra-corral-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/responsive/1920w/hosteria-cabra-corral-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/responsive/1280w/hosteria-cabra-corral-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/thumbnails/480w/sm-hosteria-cabra-corral-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/thumbnails/320w/sm-hosteria-cabra-corral-002-320w.avif"
                  }
            
            ],
      },
      {
            id: "hotel-puscana-cachi",
            title: "Hotel Puscana",
            location: "Cachi, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/responsive/1920w/hotel-puscana-cachi-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/responsive/1280w/hotel-puscana-cachi-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/thumbnails/480w/sm-hotel-puscana-cachi-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/thumbnails/320w/sm-hotel-puscana-cachi-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/responsive/1920w/hotel-puscana-cachi-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/responsive/1280w/hotel-puscana-cachi-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/thumbnails/480w/sm-hotel-puscana-cachi-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/thumbnails/320w/sm-hotel-puscana-cachi-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/responsive/1920w/hotel-puscana-cachi-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/responsive/1280w/hotel-puscana-cachi-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/thumbnails/480w/sm-hotel-puscana-cachi-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/thumbnails/320w/sm-hotel-puscana-cachi-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/responsive/1920w/hotel-puscana-cachi-005-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/responsive/1280w/hotel-puscana-cachi-005-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/thumbnails/480w/sm-hotel-puscana-cachi-005-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/thumbnails/320w/sm-hotel-puscana-cachi-005-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/responsive/1920w/hotel-puscana-cachi-006-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/responsive/1280w/hotel-puscana-cachi-006-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/thumbnails/480w/sm-hotel-puscana-cachi-006-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/hotel-puscana-cachi/thumbnails/320w/sm-hotel-puscana-cachi-006-320w.avif"
                  }
            
            ],
      },
      {
            id: "jardines-de-san-lorenzo",
            title: "Jardines de San Lorenzo",
            location: "San Lorenzo, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/responsive/1920w/jardines-de-san-lorenzo-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/responsive/1280w/jardines-de-san-lorenzo-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/thumbnails/480w/sm-jardines-de-san-lorenzo-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/thumbnails/320w/sm-jardines-de-san-lorenzo-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/responsive/1920w/jardines-de-san-lorenzo-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/responsive/1280w/jardines-de-san-lorenzo-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/thumbnails/480w/sm-jardines-de-san-lorenzo-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/thumbnails/320w/sm-jardines-de-san-lorenzo-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/responsive/1920w/jardines-de-san-lorenzo-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/responsive/1280w/jardines-de-san-lorenzo-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/thumbnails/480w/sm-jardines-de-san-lorenzo-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/thumbnails/320w/sm-jardines-de-san-lorenzo-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/responsive/1920w/jardines-de-san-lorenzo-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/responsive/1280w/jardines-de-san-lorenzo-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/thumbnails/480w/sm-jardines-de-san-lorenzo-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/jardines-de-san-lorenzo/thumbnails/320w/sm-jardines-de-san-lorenzo-004-320w.avif"
                  }
            
            ],
      },
      {
            id: "joaquin-v-gonzalez",
            title: "Joaquín V. González",
            location: "Joaquín V. González, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/responsive/1920w/joaquin-v-gonzalez-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/responsive/1280w/joaquin-v-gonzalez-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/thumbnails/480w/sm-joaquin-v-gonzalez-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/thumbnails/320w/sm-joaquin-v-gonzalez-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/responsive/1920w/joaquin-v-gonzalez-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/responsive/1280w/joaquin-v-gonzalez-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/thumbnails/480w/sm-joaquin-v-gonzalez-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/thumbnails/320w/sm-joaquin-v-gonzalez-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/responsive/1920w/joaquin-v-gonzalez-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/responsive/1280w/joaquin-v-gonzalez-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/thumbnails/480w/sm-joaquin-v-gonzalez-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/thumbnails/320w/sm-joaquin-v-gonzalez-004-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/responsive/1920w/joaquin-v-gonzalez-005-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/responsive/1280w/joaquin-v-gonzalez-005-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/thumbnails/480w/sm-joaquin-v-gonzalez-005-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/thumbnails/320w/sm-joaquin-v-gonzalez-005-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/responsive/1920w/joaquin-v-gonzalez-006-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/responsive/1280w/joaquin-v-gonzalez-006-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/thumbnails/480w/sm-joaquin-v-gonzalez-006-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/joaquin-v-gonzalez/thumbnails/320w/sm-joaquin-v-gonzalez-006-320w.avif"
                  }
            
            ],
      },
      {
            id: "la-almudena",
            title: "La Almudena",
            location: "San Lorenzo, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/la-almudena/responsive/1920w/la-almudena-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/la-almudena/responsive/1280w/la-almudena-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/la-almudena/thumbnails/480w/sm-la-almudena-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/la-almudena/thumbnails/320w/sm-la-almudena-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/la-almudena/responsive/1920w/la-almudena-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/la-almudena/responsive/1280w/la-almudena-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/la-almudena/thumbnails/480w/sm-la-almudena-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/la-almudena/thumbnails/320w/sm-la-almudena-002-320w.avif"
                  }
            
            ],
      },
      {
            id: "la-vertiente",
            title: "La Vertiente",
            location: "Rosario de Lerma, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/la-vertiente/responsive/1920w/la-vertiente-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/la-vertiente/responsive/1280w/la-vertiente-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/la-vertiente/thumbnails/480w/sm-la-vertiente-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/la-vertiente/thumbnails/320w/sm-la-vertiente-001-320w.avif"
                  }
            
            ],
      },
      {
            id: "los-psicologos",
            title: "Barrio Los Psicólogos",
            location: "Salta Capital",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/los-psicologos/responsive/1920w/los-psicologos-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/los-psicologos/responsive/1280w/los-psicologos-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/los-psicologos/thumbnails/480w/sm-los-psicologos-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/los-psicologos/thumbnails/320w/sm-los-psicologos-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/los-psicologos/responsive/1920w/los-psicologos-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/los-psicologos/responsive/1280w/los-psicologos-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/los-psicologos/thumbnails/480w/sm-los-psicologos-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/los-psicologos/thumbnails/320w/sm-los-psicologos-002-320w.avif"
                  }
            
            ],
      },
      {
            id: "mirasoles",
            title: "Los Mirasoles",
            location: "Salta Capital",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/responsive/1920w/mirasoles-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/responsive/1280w/mirasoles-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/thumbnails/480w/sm-mirasoles-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/thumbnails/320w/sm-mirasoles-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/responsive/1920w/mirasoles-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/responsive/1280w/mirasoles-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/thumbnails/480w/sm-mirasoles-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/thumbnails/320w/sm-mirasoles-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/responsive/1920w/mirasoles-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/responsive/1280w/mirasoles-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/thumbnails/480w/sm-mirasoles-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/thumbnails/320w/sm-mirasoles-004-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/responsive/1920w/mirasoles-005-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/responsive/1280w/mirasoles-005-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/thumbnails/480w/sm-mirasoles-005-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/mirasoles/thumbnails/320w/sm-mirasoles-005-320w.avif"
                  }
            
            ],
      },
      {
            id: "san-lorenzo-1",
            title: "San Lorenzo I",
            location: "San Lorenzo, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/responsive/1920w/san-lorenzo-1-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/responsive/1280w/san-lorenzo-1-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/thumbnails/480w/sm-san-lorenzo-1-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/thumbnails/320w/sm-san-lorenzo-1-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/responsive/1920w/san-lorenzo-1-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/responsive/1280w/san-lorenzo-1-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/thumbnails/480w/sm-san-lorenzo-1-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/thumbnails/320w/sm-san-lorenzo-1-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/responsive/1920w/san-lorenzo-1-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/responsive/1280w/san-lorenzo-1-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/thumbnails/480w/sm-san-lorenzo-1-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/thumbnails/320w/sm-san-lorenzo-1-004-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/responsive/1920w/san-lorenzo-1-005-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/responsive/1280w/san-lorenzo-1-005-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/thumbnails/480w/sm-san-lorenzo-1-005-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-1/thumbnails/320w/sm-san-lorenzo-1-005-320w.avif"
                  }
            
            ],
      },
      {
            id: "san-lorenzo-2",
            title: "San Lorenzo II",
            location: "San Lorenzo, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/responsive/1920w/san-lorenzo-2-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/responsive/1280w/san-lorenzo-2-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/thumbnails/480w/sm-san-lorenzo-2-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/thumbnails/320w/sm-san-lorenzo-2-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/responsive/1920w/san-lorenzo-2-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/responsive/1280w/san-lorenzo-2-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/thumbnails/480w/sm-san-lorenzo-2-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/thumbnails/320w/sm-san-lorenzo-2-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/responsive/1920w/san-lorenzo-2-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/responsive/1280w/san-lorenzo-2-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/thumbnails/480w/sm-san-lorenzo-2-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/thumbnails/320w/sm-san-lorenzo-2-004-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/responsive/1920w/san-lorenzo-2-005-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/responsive/1280w/san-lorenzo-2-005-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/thumbnails/480w/sm-san-lorenzo-2-005-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/thumbnails/320w/sm-san-lorenzo-2-005-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/responsive/1920w/san-lorenzo-2-006-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/responsive/1280w/san-lorenzo-2-006-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/thumbnails/480w/sm-san-lorenzo-2-006-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-lorenzo-2/thumbnails/320w/sm-san-lorenzo-2-006-320w.avif"
                  }
            
            ],
      },
      {
            id: "san-luis-1",
            title: "San Luis I",
            location: "San Luis, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-1/responsive/1920w/san-luis-1-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-1/responsive/1280w/san-luis-1-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-1/thumbnails/480w/sm-san-luis-1-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-1/thumbnails/320w/sm-san-luis-1-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-1/responsive/1920w/san-luis-1-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-1/responsive/1280w/san-luis-1-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-1/thumbnails/480w/sm-san-luis-1-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-1/thumbnails/320w/sm-san-luis-1-002-320w.avif"
                  }
            
            ],
      },
      {
            id: "san-luis-2",
            title: "San Luis II",
            location: "San Luis, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/responsive/1920w/san-luis-2-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/responsive/1280w/san-luis-2-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/thumbnails/480w/sm-san-luis-2-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/thumbnails/320w/sm-san-luis-2-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/responsive/1920w/san-luis-2-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/responsive/1280w/san-luis-2-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/thumbnails/480w/sm-san-luis-2-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/thumbnails/320w/sm-san-luis-2-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/responsive/1920w/san-luis-2-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/responsive/1280w/san-luis-2-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/thumbnails/480w/sm-san-luis-2-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/thumbnails/320w/sm-san-luis-2-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/responsive/1920w/san-luis-2-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/responsive/1280w/san-luis-2-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/thumbnails/480w/sm-san-luis-2-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/thumbnails/320w/sm-san-luis-2-004-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/responsive/1920w/san-luis-2-005-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/responsive/1280w/san-luis-2-005-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/thumbnails/480w/sm-san-luis-2-005-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-2/thumbnails/320w/sm-san-luis-2-005-320w.avif"
                  }
            
            ],
      },
      {
            id: "san-luis-3",
            title: "San Luis III",
            location: "San Luis, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-3/responsive/1920w/san-luis-3-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-3/responsive/1280w/san-luis-3-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-3/thumbnails/480w/sm-san-luis-3-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-3/thumbnails/320w/sm-san-luis-3-001-320w.avif"
                  }
            
            ],
      },
      {
            id: "san-luis-4",
            title: "San Luis IV",
            location: "San Luis, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/1920w/san-luis-4-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/1280w/san-luis-4-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/480w/sm-san-luis-4-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/320w/sm-san-luis-4-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/1920w/san-luis-4-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/1280w/san-luis-4-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/480w/sm-san-luis-4-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/320w/sm-san-luis-4-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/1920w/san-luis-4-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/1280w/san-luis-4-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/480w/sm-san-luis-4-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/320w/sm-san-luis-4-003-320w.avif"
                  }
            
            ],
      },
      {
            id: "san-salvador-de-jujuy",
            title: "San Salvador de Jujuy",
            location: "Jujuy",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/responsive/1920w/san-salvador-de-jujuy-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/responsive/1280w/san-salvador-de-jujuy-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/thumbnails/480w/sm-san-salvador-de-jujuy-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/thumbnails/320w/sm-san-salvador-de-jujuy-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/responsive/1920w/san-salvador-de-jujuy-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/responsive/1280w/san-salvador-de-jujuy-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/thumbnails/480w/sm-san-salvador-de-jujuy-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/thumbnails/320w/sm-san-salvador-de-jujuy-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/responsive/1920w/san-salvador-de-jujuy-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/responsive/1280w/san-salvador-de-jujuy-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/thumbnails/480w/sm-san-salvador-de-jujuy-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/thumbnails/320w/sm-san-salvador-de-jujuy-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/responsive/1920w/san-salvador-de-jujuy-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/responsive/1280w/san-salvador-de-jujuy-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/thumbnails/480w/sm-san-salvador-de-jujuy-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/thumbnails/320w/sm-san-salvador-de-jujuy-004-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/responsive/1920w/san-salvador-de-jujuy-005-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/responsive/1280w/san-salvador-de-jujuy-005-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/thumbnails/480w/sm-san-salvador-de-jujuy-005-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/san-salvador-de-jujuy/thumbnails/320w/sm-san-salvador-de-jujuy-005-320w.avif"
                  }
            
            ],
      },
      {
            id: "vaqueros",
            title: "Vaqueros",
            location: "La Caldera, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1920w/vaqueros-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1280w/vaqueros-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/480w/sm-vaqueros-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/320w/sm-vaqueros-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1920w/vaqueros-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1280w/vaqueros-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/480w/sm-vaqueros-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/320w/sm-vaqueros-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1920w/vaqueros-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1280w/vaqueros-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/480w/sm-vaqueros-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/320w/sm-vaqueros-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1920w/vaqueros-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1280w/vaqueros-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/480w/sm-vaqueros-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/320w/sm-vaqueros-004-320w.avif"
                  }
            
            ],
      },
      {
            id: "villa-rebeca-1",
            title: "Villa Rebeca I",
            location: "San Luis, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/responsive/1920w/villa-rebeca-1-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/responsive/1280w/villa-rebeca-1-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/thumbnails/480w/sm-villa-rebeca-1-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/thumbnails/320w/sm-villa-rebeca-1-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/responsive/1920w/villa-rebeca-1-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/responsive/1280w/villa-rebeca-1-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/thumbnails/480w/sm-villa-rebeca-1-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/thumbnails/320w/sm-villa-rebeca-1-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/responsive/1920w/villa-rebeca-1-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/responsive/1280w/villa-rebeca-1-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/thumbnails/480w/sm-villa-rebeca-1-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/thumbnails/320w/sm-villa-rebeca-1-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/responsive/1920w/villa-rebeca-1-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/responsive/1280w/villa-rebeca-1-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/thumbnails/480w/sm-villa-rebeca-1-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/thumbnails/320w/sm-villa-rebeca-1-004-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/responsive/1920w/villa-rebeca-1-005-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/responsive/1280w/villa-rebeca-1-005-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/thumbnails/480w/sm-villa-rebeca-1-005-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-1/thumbnails/320w/sm-villa-rebeca-1-005-320w.avif"
                  }
            
            ],
      },
      {
            id: "villa-rebeca-2",
            title: "Villa Rebeca II",
            location: "San Luis, Salta",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-2/responsive/1920w/villa-rebeca-2-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-2/responsive/1280w/villa-rebeca-2-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-2/thumbnails/480w/sm-villa-rebeca-2-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-2/thumbnails/320w/sm-villa-rebeca-2-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-2/responsive/1920w/villa-rebeca-2-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-2/responsive/1280w/villa-rebeca-2-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-2/thumbnails/480w/sm-villa-rebeca-2-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/villa-rebeca-2/thumbnails/320w/sm-villa-rebeca-2-002-320w.avif"
                  }
            
            ],
      },
      {
            id: "zona-centro-1",
            title: "Zona Centro I",
            location: "Salta Capital",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-1/responsive/1920w/zona-centro-1-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-1/responsive/1280w/zona-centro-1-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-1/thumbnails/480w/sm-zona-centro-1-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-1/thumbnails/320w/sm-zona-centro-1-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-1/responsive/1920w/zona-centro-1-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-1/responsive/1280w/zona-centro-1-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-1/thumbnails/480w/sm-zona-centro-1-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-1/thumbnails/320w/sm-zona-centro-1-003-320w.avif"
                  }
            
            ],
      },
      {
            id: "zona-centro-2",
            title: "Zona Centro II",
            location: "Salta Capital",
            images: [
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1920w/zona-centro-2-001-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1280w/zona-centro-2-001-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/480w/sm-zona-centro-2-001-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/320w/sm-zona-centro-2-001-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1920w/zona-centro-2-002-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1280w/zona-centro-2-002-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/480w/sm-zona-centro-2-002-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/320w/sm-zona-centro-2-002-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1920w/zona-centro-2-003-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1280w/zona-centro-2-003-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/480w/sm-zona-centro-2-003-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/320w/sm-zona-centro-2-003-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1920w/zona-centro-2-004-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1280w/zona-centro-2-004-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/480w/sm-zona-centro-2-004-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/320w/sm-zona-centro-2-004-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1920w/zona-centro-2-005-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1280w/zona-centro-2-005-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/480w/sm-zona-centro-2-005-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/320w/sm-zona-centro-2-005-320w.avif"
                  },
                  {
                        "avif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1920w/zona-centro-2-006-1920w.avif",
                        "webp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/responsive/1280w/zona-centro-2-006-1280w.avif",
                        "smAvif": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/480w/sm-zona-centro-2-006-480w.avif",
                        "smWebp": "https://www.construmaxpiscinas.com/images/portfolio/zona-centro-2/thumbnails/320w/sm-zona-centro-2-006-320w.avif"
                  }
            
            ],
      },
];

const portfolioByProject = portfolioAvifData as Record<string, PortfolioItem[]>;

const mappedImages = (projectId: string): ProjectImage[] | null => {
      const items = portfolioByProject[projectId];
      if (!items?.length) return null;

      return items.map((item) => ({
            avif: item.src1920,
            webp: item.src1280,
            smAvif: item.thumb480,
            smWebp: item.thumb320,
            src768: item.src768,
            srcSet: item.srcset,
      }));
};

export const projects: Project[] = baseProjects.map((project) => {
      const imagesFromPortfolio = mappedImages(project.id);
      if (!imagesFromPortfolio) return project;

      return {
            ...project,
            images: imagesFromPortfolio,
      };
});

// updated: 2026-03-10
