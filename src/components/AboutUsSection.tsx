"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle2, Clock3, Users } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GlowOrb } from "@/components/ui/FloatingElement";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useParallax } from "@/hooks";

const features = [
  "10 años de garantía de calidad en cada obra.",
  "Materiales y accesorios de primeras marcas.",
  "Equipo profesional de arquitectos e ingenieros.",
  "Presupuestos cerrados sin costos ocultos.",
  "Cumplimiento real de plazos acordados.",
  "Asesoramiento técnico personalizado.",
];

const stats = [
  { icon: Award, value: 25, suffix: "+", label: "Años de experiencia" },
  { icon: Users, value: 500, suffix: "+", label: "Clientes satisfechos" },
  { icon: Clock3, value: 25, suffix: "", label: "Días promedio de obra" },
];

const ABOUT_IMAGE_DESKTOP =
  "https://www.construmaxpiscinas.com/images/index/about-nuevo.avif";
const ABOUT_IMAGE_MOBILE_384 =
  "https://www.construmaxpiscinas.com/images/index/about-nuevo-mobile-w384.avif";

export default function AboutUsSection() {
  const imageY = useParallax(-0.01);
  const contentY = useParallax(-0.007);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-24 text-white">
      {/* Glow Orbs */}
      <GlowOrb className="absolute top-1/4 -left-20 hidden md:block" color="#2DD4BF" size={400} blur={150} duration={7} />
      <GlowOrb className="absolute bottom-1/4 -right-20 hidden md:block" color="#1D4ED8" size={500} blur={180} duration={9} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        {/* Image Side */}
        <motion.div
          className="relative"
          style={{ y: imageY }}
        >
          <SpotlightCard
            className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] shadow-[0_30px_90px_-55px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            spotlightColor="45, 212, 191"
            spotlightSize={400}
            spotlightOpacity={0.1}
            tiltAmount={2}
          >
            <picture className="block">
              <source
                media="(min-width: 768px)"
                srcSet={ABOUT_IMAGE_DESKTOP}
                sizes="526px"
              />
              <source
                media="(max-width: 767px)"
                srcSet={ABOUT_IMAGE_MOBILE_384}
                sizes="(max-width: 767px) calc(100vw - 2rem)"
              />
              <img
                src={ABOUT_IMAGE_DESKTOP}
                alt="Proyecto de piscina premium de Construmax"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={526}
                height={526}
                className="h-[360px] w-full object-cover md:h-[480px]"
              />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
          </SpotlightCard>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto -mt-10 grid w-[94%] grid-cols-3 gap-3 rounded-2xl border border-white/12 bg-white/[0.06] p-4 shadow-[0_24px_80px_-60px_rgba(0,0,0,0.9)] backdrop-blur-xl md:gap-4 md:p-5"
          >
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-center group cursor-default"
              >
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07] text-[#2DD4BF] transition-all duration-300 group-hover:bg-[#2DD4BF]/20 group-hover:scale-110">
                  <item.icon className="h-5 w-5" />
                </div>
                <AnimatedCounter
                  value={item.value}
                  suffix={item.suffix}
                  className="text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent md:text-2xl"
                />
                <p className="text-[11px] text-white/60 md:text-xs">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          className="flex flex-col justify-center"
          style={{ y: contentY }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65"
          >
            Sobre nosotros
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="mt-4 text-4xl font-semibold leading-[1.1] md:text-5xl"
          >
            Diseñamos y construimos tu{" "}
            <span className="bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#2DD4BF] bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
              piscina ideal
            </span>{" "}
            con estándar premium
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
          >
            En Construmax combinamos experiencia, ingeniería y diseño para crear
            piscinas y espacios exteriores de alto nivel. Ejecutamos cada
            proyecto con foco en durabilidad, estética y valor a largo plazo.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="group flex items-start gap-2.5 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 backdrop-blur transition-all duration-300 cursor-default"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2DD4BF]/20 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-[#2DD4BF]" />
                </div>
                <p className="text-sm text-white/75 group-hover:text-white/90 transition-colors">
                  {feature}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton
              href="/contacto"
              variant="primary"
              strength={0.5}
              className="px-8 py-4"
            >
              Quiero mi presupuesto
            </MagneticButton>
            <MagneticButton
              href="/proyectos"
              variant="secondary"
              strength={0.4}
              className="px-8 py-4"
            >
              Ver proyectos
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
