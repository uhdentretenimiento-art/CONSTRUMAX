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
    category: "Residencial premium",
    challenge:
      "Integrar piscina, solarium y entorno verde en un lote amplio, priorizando durabilidad y mantenimiento simple.",
    solution:
      "Diseno estructural en hormigon armado, circulaciones limpias y terminaciones premium con iluminacion integrada.",
    result:
      "Espacio exterior de alto impacto visual, listo para uso familiar y social con bajo costo operativo.",
    highlights: ["Hormigon armado", "Iluminacion LED", "Acabado premium"],
  },
  "club-ate": {
    category: "Institucional",
    challenge:
      "Resolver una piscina de uso intensivo con exigencia alta de seguridad y continuidad operativa.",
    solution:
      "Estructura reforzada, sistema de filtrado dimensionado para alto caudal y definicion clara de mantenimiento.",
    result:
      "Instalacion robusta para uso frecuente, con operacion estable y menor riesgo de paradas por fallas.",
    highlights: ["Uso intensivo", "Filtrado tecnico", "Operacion estable"],
  },
  "agropecuaria-el-guanaco-metan": {
    category: "Residencial",
    challenge:
      "Construir una piscina funcional en entorno rural, considerando clima y uso estacional extendido.",
    solution:
      "Proyecto a medida con equipamiento confiable y materiales de alta resistencia para exposicion exterior.",
    result:
      "Piscina durable y facil de mantener, integrada al paisaje y preparada para largo plazo.",
    highlights: ["Obra a medida", "Alta resistencia", "Mantenimiento simple"],
  },
};

function inferCategory(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("club") || lower.includes("hotel")) return "Institucional";
  if (lower.includes("eco") || lower.includes("village")) return "Residencial de entorno";
  return "Residencial";
}

export function getProjectCaseStudy(project: Project): ProjectCaseStudy {
  if (CASES[project.id]) return CASES[project.id];

  const category = inferCategory(project.title);
  return {
    category,
    challenge: `Adaptar el proyecto a las condiciones reales del lote en ${project.location}, manteniendo calidad premium y plazos claros.`,
    solution:
      "Diseno tecnico a medida, ejecucion por etapas y seleccion de materiales de primera linea.",
    result:
      "Obra terminada con alto valor estetico y tecnico, pensada para uso continuo y larga vida util.",
    highlights: ["Diseno a medida", "Ejecucion por etapas", "Terminacion premium"],
  };
}
