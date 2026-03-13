import Link from "next/link";
import ProcessSection from "@/components/ProcessSection";
import ProcesoHeroBackground from "@/components/ProcesoHeroBackground";
import { Button } from "@/components/ui/button";
import { ShieldCheck, TimerReset, Handshake } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proceso de Construcción | Construmax Piscinas",
  description:
    "Conoce el proceso profesional de Construmax: diseño, estructura, instalaciones, acabados y entrega con control de calidad.",
  alternates: {
    canonical: "/proceso",
  },
};

const processPillars = [
  {
    icon: ShieldCheck,
    title: "Calidad verificable",
    text: "Materiales premium y controles técnicos en cada etapa.",
  },
  {
    icon: TimerReset,
    title: "Plazos claros",
    text: "Cronograma realista con hitos y seguimiento continuo.",
  },
  {
    icon: Handshake,
    title: "Acompañamiento total",
    text: "Te asesoramos de principio a fin, sin letra chica.",
  },
];

export default function ProcesoPage() {
  return (
    <>
      <ProcesoHeroBackground />

      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-20 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2DD4BF] backdrop-blur md:px-4 md:py-1.5 md:text-xs">
            CÓMO TRABAJAMOS
          </p>

          <h1 className="mb-5 font-display text-[2rem] font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Nuestro proceso de{" "}
            <span className="text-[#2DD4BF]">
              construcción
            </span>
          </h1>

          <p
            className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-slate-300 md:text-xl"
            style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}
          >
            Transformamos tu idea en una obra impecable con un proceso
            optimizado durante más de 25 años, lo que garantiza que sea
            ordenado, transparente y enfocado en excelentes resultados.
          </p>

          <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="h-11 rounded-full bg-[#1D4ED8] px-6 font-semibold text-white hover:bg-[#374151]"
            >
              <Link href="/contacto">Quiero una propuesta</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-white/30 bg-white/5 px-6 font-semibold text-white hover:bg-white/15 hover:text-white"
            >
              <Link href="/proyectos">Ver proyectos realizados</Link>
            </Button>
          </div>
        </div>
      </section>

      <ProcessSection hideHeader disableBackgroundMedia />

      <section className="pb-16 pt-8 md:pb-20 md:pt-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2DD4BF]/90">
              Pilares del servicio
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {processPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#2DD4BF]/20 bg-gradient-to-br from-[#0A1428]/90 to-[#08131B]/85 p-5 text-slate-100 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.9)]"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#2DD4BF]/70 to-[#1D4ED8]/60" />

                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#F59E0B]">
                    <pillar.icon className="h-5 w-5" />
                  </div>

                  <h2 className="mb-1.5 text-lg font-semibold text-white">
                    {pillar.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-[#374151]/95 via-[#1D4ED8]/95 to-[#374151]/95 px-4 py-10 shadow-2xl shadow-black/35 md:rounded-3xl md:px-10 md:py-12">
            <div className="absolute inset-y-0 left-[-8%] w-[40%] bg-construmax-blue/20 blur-3xl" />
            <div className="absolute inset-y-0 right-[-8%] w-[40%] bg-[#2DD4BF]/20 blur-3xl" />

            <div className="relative z-10">
              <h2 className="mb-3 font-display text-2xl font-bold text-white md:mb-4 md:text-4xl">
                ¿Listo para comenzar tu proyecto?
              </h2>

              <p className="mx-auto mb-7 max-w-2xl text-sm text-slate-200 md:mb-8 md:text-base">
                El primer paso es una charla estratégica para definir alcance,
                tiempos y presupuesto. Te guiamos durante todo el proceso.
              </p>

              <Button
                asChild
                size="lg"
                className="btn-hover btn-gradient w-full rounded-full px-8 py-6 text-base font-bold text-white shadow-lg-blue hover:text-white sm:w-auto md:text-lg"
              >
                <Link href="/contacto">Iniciar Proyecto</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
