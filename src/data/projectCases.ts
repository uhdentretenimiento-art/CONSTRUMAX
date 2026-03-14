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
    category: "Residencial",
    challenge:
      "Construir una piscina funcional adaptada a un entorno urbano.",
    solution:
      "Construcción completa de piscina con impermeabilización estructural.",
    result:
      "Piscina moderna integrada al espacio exterior.",
    highlights: ["Entorno urbano", "Impermeabilización", "Piscina moderna"],
  },
  "grand-bourg-2": {
    category: "Residencial Premium",
    challenge:
      "Desarrollar una piscina moderna que se integre al entorno residencial y al espacio exterior del jardín.",
    solution:
      "Construcción completa de piscina con desarrollo estructural del vaso y revestimiento especializado para piscinas.",
    result:
      "Piscina moderna, funcional y perfectamente integrada al entorno del jardín.",
    highlights: ["Construcción completa", "Revestimiento", "Integración"],
  },
  "hotel-puscana-cachi": {
    category: "Institucional",
    challenge:
      "Construir una piscina que acompañe la estética del hotel y el paisaje natural de Cachi.",
    solution:
      "Construcción de piscina con revestimiento símil Bali y preparación completa de superficies.",
    result:
      "Piscina con estética natural y efecto visual profundo integrada al paisaje.",
    highlights: ["Símil Bali", "Paisaje natural", "Efecto visual"],
  },
  "joaquin-v-gonzalez": {
    category: "Residencial",
    challenge:
      "Desarrollar una piscina residencial funcional integrada al espacio exterior.",
    solution:
      "Construcción completa de piscina con estructura e impermeabilización.",
    result:
      "Piscina resistente y diseñada para uso familiar.",
    highlights: ["Uso familiar", "Impermeabilización", "Piscina resistente"],
  },
  "estacion-alvarado": {
    category: "Residencial",
    challenge:
      "Construir una piscina residencial integrada al entorno del jardín.",
    solution:
      "Desarrollo estructural completo con impermeabilización y terminaciones resistentes.",
    result:
      "Piscina funcional preparada para uso cotidiano.",
    highlights: ["Entorno", "Impermeabilización", "Uso cotidiano"],
  },
  "jardines-de-san-lorenzo": {
    category: "Residencial",
    challenge:
      "Construir una piscina segura en un terreno con características de suelo aluvional.",
    solution:
      "Desarrollo estructural adaptado al terreno y construcción completa del vaso de la piscina.",
    result:
      "Piscina estable y segura integrada al entorno residencial.",
    highlights: ["Suelo aluvional", "Estabilidad", "Entorno residencial"],
  },
  "la-almudena": {
    category: "Residencial",
    challenge:
      "Recuperar el estado estético y funcional de una piscina de fibra de vidrio cuya pintura se encontraba deteriorada por el paso del tiempo y la exposición constante al agua y a las condiciones climáticas.",
    solution:
      "Se realizó una renovación completa mediante limpieza profunda, preparación de superficies y aplicación de pintura especializada para piscinas, asegurando una correcta adherencia y mayor durabilidad del revestimiento.",
    result:
      "La piscina recuperó su aspecto original, con una terminación uniforme y resistente, prolongando su vida útil y mejorando su apariencia general.",
    highlights: ["Fibra de vidrio", "Renovación total", "Mayor durabilidad"],
  },
  "la-vertiente": {
    category: "Residencial Premium",
    challenge:
      "Diseñar una piscina que aproveche la vista del entorno y genere un impacto visual.",
    solution:
      "Construcción de piscina con sistema de desborde infinito y diseño estructural especializado.",
    result:
      "Piscina con efecto visual infinito integrada al paisaje.",
    highlights: ["Desborde infinito", "Impacto visual", "Paisaje"],
  },
  "los-psicologos": {
    category: "Residencial",
    challenge:
      "Crear una piscina adaptada al espacio disponible y a las necesidades del cliente.",
    solution:
      "Diseño personalizado y construcción completa de piscina residencial.",
    result:
      "Piscina única integrada al entorno del jardín.",
    highlights: ["Diseño personalizado", "Espacio disponible", "Entorno"],
  },
  "mirasoles": {
    category: "Residencial",
    challenge:
      "Diseñar una piscina con identidad propia que se adapte al estilo de la vivienda.",
    solution:
      "Construcción de piscina con diseño personalizado y terminaciones de alta calidad.",
    result:
      "Piscina moderna y funcional integrada al entorno residencial.",
    highlights: ["Diseño personalizado", "Alta calidad", "Entorno residencial"],
  },
  "san-lorenzo-1": {
    category: "Residencial",
    challenge:
      "Construir una piscina residencial integrada al entorno natural del jardín.",
    solution:
      "Construcción completa de piscina con estructura resistente e impermeabilización.",
    result:
      "Piscina funcional integrada al espacio exterior de la vivienda.",
    highlights: ["Entorno natural", "Estructura resistente", "Piscina funcional"],
  },
  "san-lorenzo-2": {
    category: "Residencial",
    challenge:
      "Recuperar una piscina antigua deteriorada por el paso del tiempo.",
    solution:
      "Reparación estructural y renovación completa de superficies.",
    result:
      "Piscina recuperada con estética renovada y mayor durabilidad.",
    highlights: ["Reparación", "Renovación", "Durabilidad"],
  },
  "san-luis-1": {
    category: "Residencial",
    challenge:
      "Construir una piscina residencial funcional adaptada al espacio disponible.",
    solution:
      "Construcción completa de piscina con estructura e impermeabilización.",
    result:
      "Piscina integrada al jardín pensada para uso familiar.",
    highlights: ["Uso familiar", "Estructura", "Jardín"],
  },
  "san-luis-2": {
    category: "Residencial",
    challenge:
      "Desarrollar una piscina residencial con diseño funcional y estética equilibrada.",
    solution:
      "Construcción estructural completa y terminaciones resistentes al agua.",
    result:
      "Piscina moderna integrada al espacio exterior.",
    highlights: ["Diseño funcional", "Terminación resistente", "Espacio exterior"],
  },
  "san-luis-3": {
    category: "Residencial",
    challenge:
      "Crear un espacio recreativo que integre piscina y área social.",
    solution:
      "Construcción de piscina junto a quincho con diseño integrado.",
    result:
      "Área de esparcimiento completa para reuniones y recreación.",
    highlights: ["Piscina", "Quincho", "Área social"],
  },
  "san-luis-4": {
    category: "Residencial",
    challenge:
      "Reparar una piscina deteriorada por el uso y el paso del tiempo.",
    solution:
      "Reacondicionamiento estructural y renovación de superficies.",
    result:
      "Piscina recuperada con mejor estética y funcionalidad.",
    highlights: ["Reacondicionamiento", "Superficies", "Funcionalidad"],
  },
  "vaqueros": {
    category: "Residencial",
    challenge:
      "Reemplazar piscinas antiguas que habían llegado al final de su vida útil.",
    solution:
      "Remoción de estructuras existentes y construcción de nuevas piscinas.",
    result:
      "Piscinas renovadas con mayor seguridad y durabilidad.",
    highlights: ["Reemplazo", "Seguridad", "Durabilidad"],
  },
  "villa-rebeca-1": {
    category: "Residencial",
    challenge:
      "Crear un espacio de esparcimiento que combine piscina y áreas de descanso.",
    solution:
      "Diseño y construcción de piscina integrada al entorno exterior.",
    result:
      "Sector recreativo funcional para uso familiar.",
    highlights: ["Esparcimiento", "Uso familiar", "Entorno exterior"],
  },
  "villa-rebeca-2": {
    category: "Residencial",
    challenge:
      "Actualizar la estética de una piscina existente sin modificar su estructura.",
    solution:
      "Preparación de superficies y aplicación de pintura especializada.",
    result:
      "Piscina renovada con estética moderna y mayor protección.",
    highlights: ["Pintura", "Protección", "Estética moderna"],
  },
  "zona-centro-1": {
    category: "Residencial",
    challenge:
      "Diseñar una piscina adaptada a las características de una propiedad urbana.",
    solution:
      "Proyecto de diseño personalizado y construcción completa.",
    result:
      "Piscina funcional optimizada para el espacio disponible.",
    highlights: ["Diseño personalizado", "Espacio disponible", "Entorno urbano"],
  },
  "zona-centro-2": {
    category: "Residencial",
    challenge:
      "Desarrollar una piscina práctica dentro de un entorno urbano.",
    solution:
      "Construcción completa de piscina adaptada al terreno.",
    result:
      "Piscina funcional integrada al espacio exterior.",
    highlights: ["Entorno urbano", "Terreno", "Espacio exterior"],
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
