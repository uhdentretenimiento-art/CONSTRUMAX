"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import { useParallax } from "@/hooks";

export default function ContactoPageClient() {
  const backgroundY = useParallax(-0.035);

  return (
    <main className="relative isolate overflow-hidden bg-slate-950 text-white">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.16),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(29,78,216,0.22),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(14,23,42,0.9),rgba(2,6,23,1))]" />
        <div className="absolute left-0 top-0 h-[620px] w-[620px] rounded-full bg-[#1D4ED8]/18 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[560px] w-[560px] rounded-full bg-[#2DD4BF]/10 blur-3xl" />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:42px_42px]"
      />

      <section className="relative overflow-hidden py-20">
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
            sueños. Contáctanos y recibí un presupuesto personalizado sin
            compromiso.
          </p>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
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

            <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_20px_70px_-55px_rgba(0,0,0,0.85)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.06]">
              <MapPin className="mx-auto mb-3 h-8 w-8 text-[#2DD4BF]" />
              <h3 className="mb-1 font-semibold text-white">Ubicación</h3>
              <p className="text-sm text-white/75">Pueyrredon 1323, Salta</p>
            </div>

            <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_20px_70px_-55px_rgba(0,0,0,0.85)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.06]">
              <Clock className="mx-auto mb-3 h-8 w-8 text-[#2DD4BF]" />
              <h3 className="mb-1 font-semibold text-white">Horario</h3>
              <p className="text-sm text-white/75">Lun-Vie: 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
