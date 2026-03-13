export const site = {
  brand: {
    name: "Construmax Piscinas",
    city: "Salta",
    country: "Argentina",
    email: "info@construmaxpiscinas.com",
    instagramUrl: "https://www.instagram.com/construmaxsalta",
  },

  hero: {
    badge: "Construcción de piscinas en Salta",
    title: "Piscinas de autor. Ingeniería y acabados premium.",
    subtitle:
      "Ejecución técnica, materiales de primera y garantía real en cada obra.",
    image: {
      src: "https://www.construmaxpiscinas.com/images/hero/nuevo-hero.avif",
      alt: "Piscina residencial premium construida por Construmax",
    },
    ctaPrimary: { label: "Pedir presupuesto", href: "/contacto" },
    ctaSecondary: { label: "Ver proyectos", href: "/proyectos" },
  },
  
  services: [
    {
      title: "Construcción de Piscinas",
      description:
        "Diseño y construcción de piscinas de hormigón armado totalmente personalizadas.",
    },
    {
      title: "Remodelación y Reparaciones",
      description:
        "Restauración, filtrado, pérdidas, impermeabilización y mejoras estructurales.",
    },
    {
      title: "Equipamiento",
      description:
        "Venta e instalación de bombas, filtros, sistemas de control y automatización profesional.",
    },
    {
      title: "Equipamiento e Iluminación",
      description:
        "Bombas, sistemas LED, calefacción, hidromasajes y automatización.",
    },
  ],

  testimonials: [
    {
      name: "Carlos Rodríguez",
      text: "Impecable trabajo. Cumplieron tiempos y presupuesto. La piscina tiene 3 años y funciona perfecto.",
      location: "Salta Capital",
      service: "Construcción",
      projectType: "Piscina residencial",
      date: "Abr 2025",
    },
    {
      name: "María González",
      text: "Excelente atención y asesoramiento. Nos acompañaron desde el diseño hasta la entrega final.",
      location: "Salta Capital",
      service: "Construcción",
      projectType: "Piscina con solárium",
      date: "Dic 2024",
    },
    {
      name: "Juan Ramos",
      text: "Profesionales desde el primer contacto. Ordenados, prolijos y muy claros en cada etapa.",
      location: "San Lorenzo",
      service: "Construcción",
      projectType: "Piscina de hormigón",
      date: "Jun 2025",
    },
    {
      name: "Roberto Martínez",
      text: "La mejor inversión para mi casa. Ya pasaron 2 años y la disfrutamos todo el verano sin problemas.",
      location: "Vaqueros",
      service: "Construcción",
      projectType: "Piscina familiar",
      date: "Ene 2024",
    },
    {
      name: "Lucía Fernández",
      text: "Remodelaron una piscina antigua y quedó como nueva. El resultado superó nuestras expectativas.",
      location: "Tres Cerritos",
      service: "Remodelación",
      projectType: "Remodelación integral",
      date: "Ago 2025",
    },
    {
      name: "Federico López",
      text: "Muy buena ejecución técnica y cumplimiento de plazos. Destaco la calidad de terminaciones.",
      location: "Jardín, San Lorenzo",
      service: "Construcción",
      projectType: "Piscina + iluminación LED",
      date: "Mar 2025",
    },
    {
      name: "Andrea P.",
      text: "Atención rápida y soluciones concretas. Quedamos muy conformes con la climatización e iluminación.",
      location: "La Calderilla",
      service: "Equipamiento",
      projectType: "Actualizacion de equipamiento",
      date: "Nov 2025",
    },
    {
      name: "Gabriel Suárez",
      text: "Trabajaron con seriedad de principio a fin. Recomendables por experiencia y compromiso.",
      location: "Jujuy Capital",
      service: "Remodelación",
      projectType: "Revestimiento y filtrado",
      date: "Jul 2024",
    },
  ],
  
  highlights: [
    { title: "Más de 25 años", desc: "Experiencia comprobada en Salta y zona." },
    { title: "Hormigón armado", desc: "Estructuras durables y a medida." },
    {
      title: "Atención personalizada",
      desc: "Asesoramiento y cotización sin cargo.",
    },
  ],
} as const;
