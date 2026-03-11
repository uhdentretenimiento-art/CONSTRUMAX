import type { Metadata } from "next";
import { projects } from "@/data/projects";
import StructuredData from "@/components/StructuredData";
import { getProjectsListSchema } from "@/lib/projectSchema";
import ProyectosClient from "./ProyectosClient";

const SITE_URL = "https://www.construmaxpiscinas.com";

export const metadata: Metadata = {
  title: "Proyectos | Construmax Piscinas",
  description:
    "Explorá proyectos reales de piscinas construidas por Construmax en Salta y el norte argentino.",
  alternates: {
    canonical: `${SITE_URL}/proyectos`,
  },
  openGraph: {
    title: "Proyectos | Construmax Piscinas",
    description:
      "Explorá proyectos reales de piscinas construidas por Construmax en Salta y el norte argentino.",
    url: `${SITE_URL}/proyectos`,
    siteName: "Construmax Piscinas",
    locale: "es_AR",
    type: "website",
  },
};

export default function ProyectosPage() {
  return (
    <>
      {/* ✅ SEO (PRO): ItemList del portfolio para Google */}
      <StructuredData data={getProjectsListSchema(projects)} />

      <ProyectosClient />
    </>
  );
}