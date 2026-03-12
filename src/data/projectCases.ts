import type { Project } from "@/data/projects";

export type ProjectCaseStudy = {
  category: string;
  challenge: string;
  solution: string;
  result: string;
  highlights: string[];
};

const CASES: Record<string, ProjectCaseStudy> = {
  "chacras-de-santa-maria": {
    category: "Residencial Premium",
    challenge:
      "Actualizar la estética de una piscina existente sin modificar su estructura original.",
    solution:
      "Instalación de revestimiento símil piedra Bali con preparación completa de superficies y colocación técnica.",
    result:
      "Piscina renovada con estética moderna y efecto visual de agua profunda.",
    highlights: ["Piedra Bali", "Renovación estética", "Colocación técnica"],
  },
  "club-ate": {
    category: "Institucional",
    challenge:
      "Construir una piscina de gran escala destinada a uso deportivo y recreativo intensivo.",
    solution:
      "Diseño estructural de piscina olímpica con sistema de filtrado de alto rendimiento.",
    result:
      "Infraestructura acuática preparada para entrenamiento y actividades recreativas.",
    highlights: ["Escala olímpica", "Alto rendimiento", "Uso intensivo"],
  },
  "agropecuaria-el-guanaco-metan": {
    category: "Institucional",
    challenge:
      "Construir una piscina en un entorno natural con abundante vegetación y caída constante de hojas.",
    solution:
      "Implementación de sistema de desborde finlandés que dirige automáticamente hojas e impurezas hacia el sistema de filtrado.",
    result:
      "Piscina funcional de bajo mantenimiento perfectamente integrada al paisaje.",
    highlights: ["Desborde finlandés", "Bajo mantenimiento", "Integración paisajística"],
  },
  "hosteria-cabra-corral": {
    category: "Institucional",
    challenge:
      "Desarrollar un espacio acuático atractivo para huéspedes, con buena durabilidad y mantenimiento controlado.",
    solution:
      "Ejecución de piscina pensada para uso hotelero, con terminaciones resistentes y planteo técnico acorde a uso frecuente.",
    result:
      "Piscina integrada a la propuesta de hospedaje, con imagen cuidada y operación confiable.",
    highlights: ["Uso hotelero", "Terminación resistente", "Operación confiable"],
  },
  "grand-bourg-1": {
    category: "Residencial Premium",
    challenge:
      "Aprovechar la pendiente natural del terreno para crear una piscina con fuerte impacto visual sin comprometer la estabilidad estructural.",
    solution:
      "Diseño de piscina con desborde infinito, solárium flotante, banco con hidromasaje y sistema de filtrado subterráneo.",
    result:
      "Piscina premium con vista panorámica que integra diseño, confort y alto valor estético.",
    highlights: ["Desborde infinito", "Hidromasaje", "Vista panorámica"],
  },
  "el-prado-eco-village": {
    category: "Residencial de Entorno",
    challenge:
      "Diseñar una piscina funcional que se integre al jardín de una vivienda familiar.",
    solution:
      "Piscina compacta con playa húmeda, solárium y sistema de iluminación LED.",
    result:
      "Espacio recreativo moderno que mejora el uso del jardín y el confort exterior.",
    highlights: ["Playa húmeda", "Iluminación LED", "Uso familiar"],
  },
  "gral-guemes": {
    category: "Residencial",
    challenge:
      "Crear una piscina recreativa que combine espacios de reunión y relajación dentro del agua.",
    solution:
      "Diseño con mesa integrada y banco con hidromasaje para ampliar la experiencia de uso.",
    result:
      "Piscina recreativa ideal para reuniones sociales y momentos de descanso.",
    highlights: ["Mesa integrada", "Hidromasaje", "Uso social"],
  },
  "el-tipal-1": {
    category: "Residencial",
    challenge:
      "Actualizar una piscina existente con problemas estructurales y diseño poco funcional.",
    solution:
      "Reparación del vaso y rediseño de profundidades incorporando playa húmeda.",
    result:
      "Piscina renovada más segura, cómoda y adaptada al uso familiar.",
    highlights: ["Reparación estructural", "Playa húmeda", "Uso familiar"],
  },
  "el-tipal-2": {
    category: "Residencial",
    challenge:
      "Recuperar el estado estético y funcional de una piscina deteriorada por el paso del tiempo.",
    solution:
      "Preparación de superficies y aplicación de pintura especializada para piscinas.",
    result:
      "Piscina renovada con mejor apariencia y mayor durabilidad.",
    highlights: ["Pintura especializada", "Recuperación estética", "Mayor durabilidad"],
  },
  "el-tipal-3": {
    category: "Residencial",
    challenge:
      "Reemplazar una piscina de fibra de vidrio deteriorada que presentaba limitaciones de uso.",
    solution:
      "Construcción de una nueva piscina de material con diseño actualizado.",
    result:
      "Piscina más resistente, moderna y mejor integrada al entorno.",
    highlights: ["Nueva estructura", "Mayor resistencia", "Diseño actualizado"],
  },
  "san-salvador-de-jujuy": {
    category: "Institucional",
    challenge:
      "Resolver un proyecto de escala representativa con una propuesta durable y clara en su ejecución.",
    solution:
      "Diseño técnico a medida con materiales de primera línea y definición de obra pensada para uso exigente.",
    result:
      "Piscina ejecutada con presencia institucional, alta durabilidad y terminación premium.",
    highlights: ["Escala representativa", "Alta durabilidad", "Terminación premium"],
  },
};

function inferCategory(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("club") || lower.includes("hotel")) return "Institucional";
  if (lower.includes("eco") || lower.includes("village")) return "Residencial de Entorno";
  return "Residencial";
}

export function getProjectCaseStudy(project: Project): ProjectCaseStudy {
  if (CASES[project.id]) return CASES[project.id];

  const category = inferCategory(project.title);
  return {
    category,
    challenge: `Adaptar el proyecto a las condiciones reales del lote en ${project.location}, manteniendo calidad premium y plazos claros.`,
    solution:
      "Diseño técnico a medida, ejecución por etapas y selección de materiales de primera línea.",
    result:
      "Obra terminada con alto valor estético y técnico, pensada para uso continuo y larga vida útil.",
    highlights: ["Diseño a medida", "Ejecución por etapas", "Terminación premium"],
  };
}
