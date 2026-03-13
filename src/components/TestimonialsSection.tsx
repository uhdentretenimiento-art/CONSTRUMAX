"use client";

import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import TestimonialCard from "@/components/TestimonialCard";
import { site } from "@/data/site";
import { GlowOrb } from "@/components/ui/FloatingElement";
import { useParallax } from "@/hooks";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function TestimonialsSection() {
  const backgroundY = useParallax(-0.015);
  const visibleTestimonials = useMemo(() => site.testimonials.slice(0, 6), []);

  return (
    <section className="relative overflow-hidden py-24 text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950" />
      <motion.div
        className="absolute inset-0 -z-20 opacity-[0.55]"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_18%_10%,rgba(45,212,191,0.14),transparent_60%),radial-gradient(55%_55%_at_86%_20%,rgba(29,78,216,0.12),transparent_60%)]" />
      </motion.div>

      {/* Large quote decoration */}
      <div className="pointer-events-none absolute left-4 top-14 -z-10 select-none text-[180px] font-serif leading-none text-white/[0.04] md:text-[260px]">
        &ldquo;
      </div>

      {/* Glow Orbs */}
      <GlowOrb className="absolute top-1/3 -right-32 hidden md:block" color="#1D4ED8" size={400} blur={150} duration={6} />
      <GlowOrb className="absolute bottom-1/4 -left-32 hidden md:block" color="#2DD4BF" size={350} blur={130} duration={8} />

      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65"
          >
            Testimonios
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-4xl font-semibold leading-[1.1] md:text-5xl lg:text-6xl"
          >
            Lo que dicen nuestros{" "}
            <span className="bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#2DD4BF] bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
              clientes
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mt-5 max-w-3xl text-base text-white/75 md:text-lg"
          >
            Familias y empresas que confiaron en Construmax para transformar
            su espacio exterior en un proyecto duradero y de alto nivel.
          </motion.p>

        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${testimonial.location ?? ""}`}
              variants={itemVariants}
              custom={index}
            >
              <TestimonialCard
                text={testimonial.text}
                clientName={testimonial.name}
                clientRole={testimonial.location}
                service={testimonial.service}
                projectType={testimonial.projectType}
                date={testimonial.date}
                stars={5}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-white">
              +500 clientes satisfechos
            </p>
            <p className="text-xs text-white/60">
              4.9/5 estrellas promedio en Google Reviews
            </p>
          </div>
          <div className="hidden h-8 w-px bg-white/20 sm:block" />
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-white">4.9/5</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
