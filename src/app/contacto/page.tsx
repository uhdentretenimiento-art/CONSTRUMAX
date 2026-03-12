import type { Metadata } from "next";
import ContactoPageClient from "./ContactoPageClient";

export const metadata: Metadata = {
  title: "Contacto - Solicitá tu Presupuesto Gratis",
  description:
    "Contáctanos para obtener un presupuesto personalizado sin compromiso. Atención en Salta, Jujuy y toda la región. Tel: +54 387 2782626",
  keywords: [
    "contacto",
    "presupuesto",
    "cotización",
    "piscinas Salta",
    "teléfono",
    "email",
  ],
  alternates: {
    canonical: "/contacto",
  },
};

export default function Contacto() {
  return <ContactoPageClient />;
}
