import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galería de Proyectos | Piscinas Construmax",
  description: "Nuestros mejores trabajos realizados en Salta y Jujuy.",
  openGraph: {
    title: "Galería de Proyectos | Construmax",
    description: "Nuestros mejores trabajos realizados en Salta y Jujuy.",
    url: "https://www.construmaxpiscinas.com/proyectos",
    type: "website",
    locale: "es_AR",
  },
};

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}