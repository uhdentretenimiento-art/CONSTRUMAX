"use client";

import { motion } from "framer-motion";
import ServicesSection from "@/components/ServicesSection";
import ServicesTrustSection from "@/components/ServicesTrustSection";
import { GlowOrb } from "@/components/ui/FloatingElement";
import { useParallax } from "@/hooks";

export default function ServicesPageContent() {
  const backgroundY = useParallax(-0.012);

  return (
    <div className="relative overflow-hidden text-white">
      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950" />
      <div
        className="absolute inset-0 -z-40 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url(https://www.construmaxpiscinas.com/images/index/img-servicios-section.avif)",
        }}
      />
      <motion.div
        className="absolute inset-0 -z-30 opacity-[0.55]"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_18%_10%,rgba(45,212,191,0.16),transparent_60%),radial-gradient(55%_55%_at_86%_20%,rgba(29,78,216,0.14),transparent_60%)]" />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 -z-20 h-32 bg-gradient-to-t from-black/60 to-transparent" />

      <GlowOrb
        className="absolute top-[12%] -right-32"
        color="#1D4ED8"
        size={400}
        blur={150}
        duration={8}
      />
      <GlowOrb
        className="absolute top-[42%] -left-32"
        color="#2DD4BF"
        size={350}
        blur={130}
        duration={6}
      />
      <GlowOrb
        className="absolute bottom-[10%] right-[8%]"
        color="#2DD4BF"
        size={280}
        blur={120}
        duration={7}
      />

      <ServicesSection inheritBackground />
      <ServicesTrustSection inheritBackground />
    </div>
  );
}
