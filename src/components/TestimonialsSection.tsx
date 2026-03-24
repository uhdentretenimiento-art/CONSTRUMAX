"use client";

import { useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import { site } from "@/data/site";
import { GlowOrb } from "@/components/ui/FloatingElement";
import { useParallax } from "@/hooks";

export default function TestimonialsSection() {
  const [isDesktop, setIsDesktop] = useState(false);
  const backgroundY = useParallax(-0.015, isDesktop);
  const visibleTestimonials = useMemo(() => site.testimonials.slice(0, 6), []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative overflow-hidden py-24 text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950" />
      <div
        className="absolute inset-0 -z-20 opacity-[0.55]"
        style={{ transform: `translate3d(0, ${backgroundY}px, 0)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_18%_10%,rgba(45,212,191,0.14),transparent_60%),radial-gradient(55%_55%_at_86%_20%,rgba(29,78,216,0.12),transparent_60%)]" />
      </div>

      {/* Large quote decoration */}
      <div className="pointer-events-none absolute left-4 top-14 -z-10 select-none text-[180px] font-serif leading-none text-white/[0.04] md:text-[260px]">
        &ldquo;
      </div>

      {/* Glow Orbs */}
      <GlowOrb className="absolute top-1/3 -right-32 hidden md:block" color="#1D4ED8" size={400} blur={150} duration={6} />
      <GlowOrb className="absolute bottom-1/4 -left-32 hidden md:block" color="#2DD4BF" size={350} blur={130} duration={8} />

      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <Reveal className="text-center" distance={30} amount={0.3} duration={320}>
          <Reveal
            as="p"
            delay={0}
            duration={280}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65"
          >
            Testimonios
          </Reveal>

          <Reveal
            as="h2"
            delay={0}
            duration={300}
            className="mt-4 text-4xl font-semibold leading-[1.1] md:text-5xl lg:text-6xl"
          >
            Lo que dicen nuestros{" "}
            <span className="bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#2DD4BF] bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
              clientes
            </span>
          </Reveal>

          <Reveal
            as="p"
            delay={40}
            duration={300}
            className="mx-auto mt-5 max-w-3xl text-base text-white/75 md:text-lg"
          >
            Familias y empresas que confiaron en Construmax para transformar
            su espacio exterior en un proyecto duradero y de alto nivel.
          </Reveal>
        </Reveal>

        {/* Testimonials Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial, index) => (
            <Reveal
              key={`${testimonial.name}-${testimonial.location ?? ""}`}
              delay={index * 20}
              duration={300}
              distance={30}
              scaleFrom={0.95}
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
            </Reveal>
          ))}
        </div>

        {/* Trust indicators */}
        <Reveal
          className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row"
          delay={60}
          duration={300}
          distance={30}
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
        </Reveal>
      </div>
    </section>
  );
}

function Reveal({
  as,
  children,
  className,
  delay = 0,
  duration = 600,
  distance = 20,
  amount = 0.15,
  scaleFrom = 1,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number;
  scaleFrom?: number;
}) {
  const Component = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: amount, rootMargin: "160px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [amount]);

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0) scale(1)"
          : `translate3d(0, ${distance}px, 0) scale(${scaleFrom})`,
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
