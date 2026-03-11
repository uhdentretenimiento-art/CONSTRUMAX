import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto - Solicitá tu Presupuesto Gratis",
  description:
    "Contactanos para obtener un presupuesto personalizado sin compromiso. Atención en Salta, Jujuy y toda la región. Tel: +54 387 2782626",
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
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 text-white">
        <div className="absolute inset-0 -z-30 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950" />
        <div className="absolute inset-0 -z-20 opacity-[0.55] bg-[radial-gradient(60%_60%_at_18%_10%,rgba(45,212,191,0.16),transparent_60%),radial-gradient(55%_55%_at_86%_20%,rgba(29,78,216,0.14),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/65 md:text-sm">
            CONTACTO
          </p>

          <h1 className="mb-6 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            Hablemos de tu{" "}
            <span className="bg-gradient-to-r from-[#1D4ED8] to-[#2DD4BF] bg-clip-text text-transparent">
              proyecto
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            Estamos listos para ayudarte a hacer realidad la piscina de tus
            sueños. Contactanos y recibí un presupuesto personalizado sin
            compromiso.
          </p>

          {/* Quick Info Cards */}
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Teléfono */}
            <a
              href="https://wa.me/5493872782626"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp al +54 387 2782626"
              className="block rounded-3xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_20px_70px_-55px_rgba(0,0,0,0.85)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
            >
              <Phone className="mx-auto mb-3 h-8 w-8 text-[#2DD4BF]" />
              <h3 className="mb-1 font-semibold text-white">Teléfono</h3>
              <span className="text-white/80 transition-colors hover:text-[#2DD4BF]">
                +54 387 2782626
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:info@construmaxpiscinas.com"
              aria-label="Enviar correo a info@construmaxpiscinas.com"
              className="block rounded-3xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_20px_70px_-55px_rgba(0,0,0,0.85)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
            >
              <Mail className="mx-auto mb-3 h-8 w-8 text-[#2DD4BF]" />
              <h3 className="mb-1 font-semibold text-white">Email</h3>
              <span className="text-white/80 transition-colors hover:text-[#2DD4BF]">
                info@construmaxpiscinas.com
              </span>
            </a>

            {/* Ubicación */}
            <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_20px_70px_-55px_rgba(0,0,0,0.85)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.06]">
              <MapPin className="mx-auto mb-3 h-8 w-8 text-[#2DD4BF]" />
              <h3 className="mb-1 font-semibold text-white">Ubicación</h3>
              <p className="text-sm text-white/75">
                Pueyrredon 1323, Salta
              </p>
            </div>

            {/* Horario */}
            <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_20px_70px_-55px_rgba(0,0,0,0.85)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.06]">
              <Clock className="mx-auto mb-3 h-8 w-8 text-[#2DD4BF]" />
              <h3 className="mb-1 font-semibold text-white">Horario</h3>
              <p className="text-sm text-white/75">
                Lun-Vie: 9:00 - 18:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />
    </>
  );
}