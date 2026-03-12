"use client";

import Link from "next/link";
import { Award, CheckCircle2, Clock3, ShieldCheck, Users } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { icon: Award, value: 25, suffix: "+", label: "Años construyendo piscinas" },
  { icon: Users, value: 500, suffix: "+", label: "Clientes satisfechos" },
  { icon: Clock3, value: 25, suffix: "", label: "Días promedio de ejecución" },
];

const bullets = [
  "Proyecto integral con asesoramiento técnico y estético.",
  "Materiales premium y mano de obra especializada.",
  "Plazos claros y seguimiento durante toda la obra.",
  "Presupuesto cerrado con alcance definido desde el inicio.",
  "Garantía de calidad y soporte post-entrega.",
  "Experiencia comprobada en Salta y Jujuy.",
];

type ServicesTrustSectionProps = {
  inheritBackground?: boolean;
};

export default function ServicesTrustSection({
  inheritBackground = false,
}: ServicesTrustSectionProps) {
  return (
    <section className="relative overflow-hidden pb-24 pt-6 text-white">
      {!inheritBackground ? (
        <>
          <div className="absolute inset-0 -z-30 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950" />
          <div className="absolute inset-0 -z-20 opacity-[0.4] bg-[radial-gradient(55%_55%_at_12%_20%,rgba(29,78,216,0.10),transparent_60%),radial-gradient(45%_45%_at_88%_80%,rgba(45,212,191,0.14),transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-black/60 to-transparent" />
        </>
      ) : null}

      <div className="mx-auto max-w-6xl px-6">
        <AnimateOnScroll animationType="slide-up">
          <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_30px_100px_-70px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#2DD4BF]" />
                  Confianza Construmax
                </span>
                <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                  Un servicio premium respaldado por{" "}
                  <span className="text-[#2DD4BF]">experiencia real</span>
                </h2>
                <p className="mt-3 text-white/75">
                  No solo ejecutamos servicios: diseñamos soluciones durables,
                  eficientes y estéticas para que tu inversión se vea y funcione
                  mejor con el paso del tiempo.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-xl">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/12 bg-white/[0.03] p-4 text-center"
                  >
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.07] text-[#2DD4BF]">
                      <stat.icon className="h-4.5 w-4.5" />
                    </div>
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-2xl font-semibold text-white"
                    />
                    <p className="mt-1 text-xs text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
              {bullets.map((item, index) => (
                <AnimateOnScroll
                  key={item}
                  animationType="slide-up"
                  delay={index * 40}
                  className="flex items-start gap-2.5 rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 backdrop-blur"
                >
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#2DD4BF]" />
                  <p className="text-sm text-white/75">{item}</p>
                </AnimateOnScroll>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-2xl bg-[#1D4ED8]/90 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
              >
                Solicitar asesoramiento
              </Link>
              <Link
                href="/proyectos"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
              >
                Ver proyectos realizados
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
