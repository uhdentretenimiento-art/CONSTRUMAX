"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingElement, GlowOrb } from "@/components/ui/FloatingElement";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useParallax } from "@/hooks";

export default function Hero() {
  const h = site.hero;

  const shouldReduceMotion = useReducedMotion();
  const imageY = useParallax(0.04);
  const contentOpacity = 1;
  const contentY = useParallax(-0.05);

  const quickStats = [
    { value: 25, suffix: "+", label: "Años de trayectoria" },
    { value: 500, suffix: "+", label: "Proyectos entregados" },
    { value: 10, suffix: " años", label: "Garantía de calidad" },
  ];

  const title = h.title;
  const premiumIndex = title.toLowerCase().lastIndexOf("premium");
  const titlePrefix = premiumIndex >= 0 ? title.slice(0, premiumIndex) : title;
  const titleSuffix = premiumIndex >= 0 ? title.slice(premiumIndex + "premium".length) : "";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const heroMobileImage = "https://www.construmaxpiscinas.com/images/hero/nuevo-hero-mobile.avif";
  const heroDesktopImage = h.image.src;

  return (
    <section className="relative min-h-screen w-full overflow-hidden -mt-16 pt-16">
      {/* Mobile Hero Image */}
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform md:hidden"
        style={{ y: shouldReduceMotion ? 0 : imageY }}
      >
        <Image
          src={heroMobileImage}
          alt={h.image.alt}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 0px"
          className="object-cover object-top"
        />
      </motion.div>

      {/* Desktop Hero Image */}
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform hidden md:block"
        style={{ y: shouldReduceMotion ? 0 : imageY }}
      >
        <Image
          src={heroDesktopImage}
          alt={h.image.alt}
          fill
          priority
          sizes="(max-width: 767px) 0px, 100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/85 via-zinc-950/70 to-zinc-950/95" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_12%_10%,rgba(45,212,191,0.18),transparent_60%),radial-gradient(55%_55%_at_86%_18%,rgba(29,78,216,0.16),transparent_62%)]" />

      {/* Floating Glow Orbs */}
      <GlowOrb
        className="absolute top-1/4 left-1/4"
        color="#2DD4BF"
        size={300}
        blur={120}
        duration={6}
      />
      <GlowOrb
        className="absolute bottom-1/3 right-1/4"
        color="#1D4ED8"
        size={400}
        blur={150}
        duration={8}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 pb-20 pt-12"
        style={{
          opacity: shouldReduceMotion ? 1 : contentOpacity,
          y: shouldReduceMotion ? 0 : contentY,
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <FloatingElement duration={4} distance={5}>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/75 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
                {h.badge}
              </span>
            </FloatingElement>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="max-w-3xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
          >
            {titlePrefix}
            {premiumIndex >= 0 ? (
              <span className="bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#2DD4BF] bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                premium
              </span>
            ) : null}
            {titleSuffix}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg leading-relaxed"
          >
            {h.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton
              href={h.ctaPrimary.href}
              variant="primary"
              strength={0.5}
              className="px-8 py-4 text-base"
            >
              {h.ctaPrimary.label}
            </MagneticButton>
            <MagneticButton
              href={h.ctaSecondary.href}
              variant="secondary"
              strength={0.4}
              className="px-8 py-4 text-base"
            >
              {h.ctaSecondary.label}
            </MagneticButton>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group rounded-2xl border border-white/12 bg-white/[0.05] p-4 backdrop-blur-md transition-all duration-300 hover:border-[#2DD4BF]/30 hover:bg-white/[0.08]"
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                />
                <p className="mt-1 text-xs text-white/60 group-hover:text-white/80 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
    </section>
  );
}
