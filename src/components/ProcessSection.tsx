"use client";

import { motion } from "framer-motion";
import ProcessStepCard from "@/components/ProcessStepCard";
import {
  ClipboardList,
  Building2,
  Droplets,
  Wrench,
  Paintbrush,
  CheckCircle2,
} from "lucide-react";
import ExcavatorIcon from "@/components/ui/ExcavatorIcon";
import { GlowOrb } from "@/components/ui/FloatingElement";
import { useScrollProgress } from "@/hooks";
import { useEffect, useRef, useState } from "react";

const VIDEO_DESKTOP_WEBM =
  "https://www.construmaxpiscinas.com/videos/hero/video-proceso.webm";

const VIDEO_MOBILE_WEBM =
  "https://www.construmaxpiscinas.com/videos/hero/video-proceso-mobile.webm";

const VIDEO_MP4 =
  "https://www.construmaxpiscinas.com/videos/hero/video-proceso.mp4";

type ProcessSectionProps = {
  hideHeader?: boolean;
  disableBackgroundMedia?: boolean;
};

export default function ProcessSection({
  hideHeader = false,
  disableBackgroundMedia = false,
}: ProcessSectionProps) {
  const { scrollY } = useScrollProgress();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const videoScale = Math.max(1, 1.08 - scrollY * 0.00006);
  const overlayOpacity = Math.max(0.7, 0.9 - scrollY * 0.00015);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();

    void video.play().catch(() => {
      // If autoplay is blocked, the black background remains visible.
    });
  }, [isDesktop]);

  const steps = [
    {
      stepNumber: 1,
      icon: ClipboardList,
      title: "Diseño y planificación",
      description:
        "Relevamos tu terreno, definimos objetivos y diseñamos una propuesta técnica y estética a medida.",
      duration: "2 a 4 días",
    },
    {
      stepNumber: 2,
      icon: ExcavatorIcon,
      title: "Excavación",
      description:
        "Ejecutamos movimiento de suelo según el proyecto y el tipo de terreno, con control de cotas y seguridad.",
      duration: "1 a 3 días",
    },
    {
      stepNumber: 3,
      icon: Building2,
      title: "Estructura",
      description:
        "Armado estructural y hormigonado bajo criterios de ingeniería para garantizar máxima resistencia.",
      duration: "5 a 8 días",
    },
    {
      stepNumber: 4,
      icon: Droplets,
      title: "Impermeabilización",
      description:
        "Aplicamos sistemas de sellado y protección para asegurar estanqueidad y larga vida útil.",
      duration: "2 a 3 días",
    },
    {
      stepNumber: 5,
      icon: Wrench,
      title: "Instalaciones",
      description:
        "Instalamos filtrado, cañerías, jets, tableros y opciones de climatización o hidromasaje.",
      duration: "3 a 5 días",
    },
    {
      stepNumber: 6,
      icon: Paintbrush,
      title: "Acabados",
      description:
        "Aplicamos revestimientos premium y terminaciones finales para una estética impecable.",
      duration: "4 a 6 días",
    },
    {
      stepNumber: 7,
      icon: CheckCircle2,
      title: "Entrega",
      description:
        "Ponemos en marcha, verificamos cada sistema y te entregamos tu piscina lista para disfrutar.",
      duration: "1 día",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      className={[
        "relative overflow-hidden text-white",
        hideHeader ? "pb-16 pt-2 md:pb-20 md:pt-4" : "py-16 md:py-24",
      ].join(" ")}
    >
      {!disableBackgroundMedia ? (
        <>
          {/* Video with parallax */}
          <motion.div
            className="absolute inset-0 -z-30 bg-black"
            style={{ scale: videoScale }}
          >
            <video
              key={isDesktop ? "desktop" : "mobile-webm"}
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              {isDesktop ? (
                <>
                  <source src={VIDEO_DESKTOP_WEBM} type="video/webm" />
                  <source src={VIDEO_MP4} type="video/mp4" />
                </>
              ) : (
                <source src={VIDEO_MOBILE_WEBM} type="video/webm" />
              )}
            </video>
          </motion.div>
        </>
      ) : null}

      {!disableBackgroundMedia ? (
        <>
          {/* Overlays */}
          <motion.div
            className="absolute inset-0 -z-20 bg-black"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-0 -z-10 hidden opacity-70 md:block bg-[radial-gradient(60%_60%_at_20%_10%,rgba(94,234,212,0.22),transparent_60%),radial-gradient(55%_55%_at_85%_20%,rgba(29,78,216,0.18),transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Glow Orbs */}
          <GlowOrb className="absolute top-1/4 -left-20 hidden md:block" color="#2DD4BF" size={400} blur={150} duration={8} />
          <GlowOrb className="absolute bottom-1/4 -right-20 hidden md:block" color="#1D4ED8" size={450} blur={180} duration={10} />
        </>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        {!hideHeader ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10 text-center md:mb-16"
          >
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2DD4BF]"
            >
              Nuestro proceso
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
            >
              De la idea a la{" "}
              <span className="bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#2DD4BF] bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                realidad
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base"
            >
              Transformamos tu idea en una obra impecable con un proceso
              optimizado durante más de 25 años, lo que garantiza que sea
              ordenado, transparente y enfocado en excelentes resultados.
            </motion.p>
          </motion.div>
        ) : null}

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
            className="pointer-events-none absolute left-[18px] top-0 hidden h-full w-px bg-gradient-to-b from-[#2DD4BF]/70 via-white/25 to-transparent origin-top sm:block lg:left-1/2"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.stepNumber}
                variants={itemVariants}
                custom={index}
              >
                <ProcessStepCard {...step} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {!hideHeader ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/20 bg-black/30 px-6 py-4 text-center md:mt-12 md:bg-white/10 md:backdrop-blur"
          >
            <p className="text-sm text-white/80 md:text-base">
              <span className="inline-flex items-center gap-2 text-[#2DD4BF]">
                <CheckCircle2 className="h-4 w-4" />
                <strong className="font-semibold">Plazo promedio total:</strong>
              </span>{" "}
              <strong className="font-semibold text-white">25 a 35 días</strong>{" "}
              <span className="text-white/60">
                (según dimensiones, equipamiento y condiciones del terreno)
              </span>
            </p>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
