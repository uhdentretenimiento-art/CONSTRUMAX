import { Metadata } from "next";
import ServicesSection from "@/components/ServicesSection";
import ServicesTrustSection from "@/components/ServicesTrustSection";

export const metadata: Metadata = {
  title: "Servicios | Construmax Piscinas",
  description:
    "Construcción, mantenimiento, climatización, iluminación LED y más servicios para piscinas en Salta.",
  keywords: [
    "servicios piscinas",
    "mantenimiento piscinas",
    "climatización piscinas",
  ],
  openGraph: {
    title: "Servicios Construmax",
    description: "Servicios premium para tu piscina.",
    url: "https://www.construmaxpiscinas.com/servicios",
    type: "website",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <ServicesSection />
      <ServicesTrustSection />
    </>
  );
}
