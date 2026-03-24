"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { Variants } from "framer-motion";
import {
  Droplet,
  Thermometer,
  Lightbulb,
  Palette,
  Activity,
  X,
  CheckCircle,
} from "lucide-react";

import ServiceCard from "@/components/ServiceCard";
import EquipmentIcon from "@/components/ui/EquipmentIcon";
import HydromassageIcon from "@/components/ui/HydromassageIcon";
import MaintenanceIcon from "@/components/ui/MaintenanceIcon";
import GeneralConstructionIcon from "@/components/ui/GeneralConstructionIcon";
import PoolConstructionIcon from "@/components/ui/PoolConstructionIcon";
import RemodelingIcon from "@/components/ui/RemodelingIcon";
import ThermalFloorsIcon from "@/components/ui/ThermalFloorsIcon";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlowOrb } from "@/components/ui/FloatingElement";
import { MotionProvider, m } from "@/components/ui/MotionProvider";
import { useParallax } from "@/hooks";

type ServiceIcon = React.ComponentType<{ className?: string }>;

interface Service {
  icon: ServiceIcon;
  title: string;
  fullTitle?: string;
  anchorId?: string;
  shortDescription: React.ReactNode;
  fullDescription: string;
  features: string[];
  benefits: string[];
  image?: string;
  iconBgColor?: string;
  iconColor?: string;
  isPopular?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
};

type ServicesSectionProps = {
  maxItems?: number;
  inheritBackground?: boolean;
};

export default function ServicesSection({
  maxItems,
  inheritBackground = false,
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldLoadBgImage, setShouldLoadBgImage] = useState(false);
  const [selected, setSelected] = useState<Service | null>(null);
  const backgroundY = useParallax(-0.012, isDesktop);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (inheritBackground) {
      return;
    }

    const target = sectionRef.current;
    if (!target || shouldLoadBgImage) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setShouldLoadBgImage(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) {
          setShouldLoadBgImage(true);
          observer.disconnect();
        }
      },
      { rootMargin: "640px 0px", threshold: 0.01 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [inheritBackground, shouldLoadBgImage]);

  const services = useMemo<Service[]>(
    () => [
      {
        icon: PoolConstructionIcon,
        title: "Construcción personalizada",
        fullTitle: "Construcción personalizada de piscinas",
        anchorId: "construccion",
        shortDescription:
          "Diseño y construcción tradicional con los más altos estándares de calidad y experiencia comprobable que nos avalan.",
        fullDescription:
          "Construimos piscinas personalizadas adaptadas a tus necesidades y espacio disponible. Utilizamos materiales de primera calidad y técnicas constructivas probadas que garantizan durabilidad y resistencia. Nuestro equipo de arquitectos e ingenieros trabaja contigo desde el diseño inicial hasta la entrega final.",
        image: "https://www.construmaxpiscinas.com/images/hero/nuevo-hero.avif",
        features: [
          "Diseño 3D personalizado",
          "Materiales de alta calidad",
          "Sistema de filtración incluido",
          "Garantía de 10 años",
          "Asesoramiento técnico integral",
        ],
        benefits: [
          "Aumenta el valor de tu propiedad",
          "Espacio de recreación familiar",
          "Diseño adaptado a tu terreno",
          "Bajo mantenimiento a largo plazo",
        ],
        iconBgColor: "bg-[#1D4ED8]/12",
        iconColor: "text-[#86EFAC]",
        isPopular: true,
      },
      {
        icon: MaintenanceIcon,
        title: "Mantenimiento",
        anchorId: "mantenimiento",
        shortDescription:
          "Servicio integral de mantenimiento y reparación de sistemas de filtrado. Reparación de bombas, filtros y accesorios.",
        fullDescription:
          "Ofrecemos servicios completos de mantenimiento para mantener tu piscina en condiciones óptimas durante todo el año. Desde limpieza regular hasta reparaciones complejas de equipos de filtración.",
        image: "https://www.construmaxpiscinas.com/images/index/about-nuevo.avif",
        features: [
          "Limpieza semanal/quincenal",
          "Control de químicos",
          "Reparación de bombas y filtros",
          "Cambio de arena/zeolita",
          "Automatización de sistemas",
        ],
        benefits: [
          "Agua cristalina siempre",
          "Prolonga la vida de tu piscina",
          "Evita reparaciones costosas",
          "Tranquilidad para tu familia",
        ],
        iconBgColor: "bg-[#2DD4BF]/12",
        iconColor: "text-[#86EFAC]",
      },
      {
        icon: EquipmentIcon,
        title: "Equipamiento",
        anchorId: "equipamiento-profesional",
        shortDescription:
          "Venta e instalación de equipos profesionales: bombas, filtros, sistemas de control y automatización para tu piscina.",
        fullDescription:
          "Proveemos e instalamos equipamiento de primera calidad para garantizar el funcionamiento óptimo de tu piscina. Trabajamos con las mejores marcas del mercado y ofrecemos asesoramiento personalizado para elegir el equipo adecuado según tus necesidades.",
        image: "https://www.construmaxpiscinas.com/images/hero/nuevo-hero.avif",
        features: [
          "Bombas de filtrado de alta eficiencia",
          "Filtros de arena y cartucho",
          "Sistemas de control automático",
          "Dosificadores de cloro y pH",
          "Limpiafondos automáticos",
        ],
        benefits: [
          "Equipos de marcas líderes",
          "Mayor eficiencia energética",
          "Instalación profesional",
          "Garantía del fabricante",
        ],
        iconBgColor: "bg-[#1D4ED8]/12",
        iconColor: "text-[#86EFAC]",
      },
      {
        icon: HydromassageIcon,
        title: "Hidromasajes y Spa",
        anchorId: "hidromasajes",
        shortDescription:
          "Construcción de jacuzzi e hidromasajes para convertir tu hogar en un verdadero spa.",
        fullDescription:
          "Diseñamos y construimos hidromasajes y spa de lujo que transforman tu espacio en un oasis de relajación. Sistemas de hidromasaje terapéutico con múltiples jets configurables.",
        image: "https://www.construmaxpiscinas.com/images/hero/nuevo-hero.avif",
        features: [
          "Sistemas de hidromasaje terapéutico",
          "Control de temperatura digital",
          "Iluminación LED ambiental",
          "Aromaterapia integrada",
          "Diseños personalizados",
        ],
        benefits: [
          "Relajación muscular completa",
          "Mejora la circulación",
          "Reduce el estrés",
          "Aumenta el valor de tu propiedad",
        ],
        iconBgColor: "bg-[#2DD4BF]/12",
        iconColor: "text-[#86EFAC]",
        isPopular: true,
      },
      {
        icon: RemodelingIcon,
        title: "Reparación y remodelación",
        shortDescription:
          "Renovamos y modernizamos, adecuando un nuevo diseño a tu piscina existente con nuevos acabados.",
        fullDescription:
          "¿Tu piscina necesita una renovación? Ofrecemos servicios completos de remodelación para actualizar el aspecto y funcionalidad de tu piscina existente, sin necesidad de construir una nueva.",
        image: "https://www.construmaxpiscinas.com/images/index/about-nuevo.avif",
        features: [
          "Cambio de revestimiento",
          "Modernización de equipos",
          "Adición de iluminación LED",
          "Instalación de desborde",
          "Ampliación de la piscina",
        ],
        benefits: [
          "Aspecto nuevo sin construir",
          "Mejora la eficiencia energética",
          "Aumenta la seguridad",
          "Personalización total",
        ],
        iconBgColor: "bg-[#1D4ED8]/12",
        iconColor: "text-[#86EFAC]",
      },
      {
        icon: Thermometer,
        title: "Climatización",
        shortDescription:
          "Sistemas de calefacción para disfrutar tu piscina durante todo el año. Instalación de calderas y bombas de calor.",
        fullDescription:
          "Extiende la temporada de uso de tu piscina con nuestros sistemas de climatización. Ofrecemos soluciones eficientes para mantener el agua a la temperatura ideal, reduciendo costos operativos.",
        image: "https://www.construmaxpiscinas.com/images/hero/nuevo-hero.avif",
        features: [
          "Bombas de calor de alta eficiencia",
          "Calderas a gas",
          "Paneles solares térmicos",
          "Cobertores térmicos",
          "Control digital de temperatura",
        ],
        benefits: [
          "Usa tu piscina todo el año",
          "Ahorro energético",
          "Menor impacto ambiental",
          "Confort garantizado",
        ],
        iconBgColor: "bg-[#1D4ED8]/12",
        iconColor: "text-[#86EFAC]",
      },
      {
        icon: Lightbulb,
        title: "Iluminación LED",
        shortDescription:
          "Iluminación subacuática que transforma tu piscina en un espectáculo nocturno.",
        fullDescription:
          "Transforma tu piscina en un espectáculo visual con nuestras soluciones de iluminación LED. Colores vibrantes, control remoto y tecnología de bajo consumo para crear el ambiente perfecto.",
        image: "https://www.construmaxpiscinas.com/images/hero/nuevo-hero.avif",
        features: [
          "Luces LED sumergibles",
          "Control por app/remoto",
          "Múltiples colores y efectos",
          "Bajo consumo energético",
          "Fácil instalación",
        ],
        benefits: [
          "Ambiente mágico nocturno",
          "Mayor seguridad por la noche",
          "Destaca tu piscina",
          "Larga duración",
        ],
        iconBgColor: "bg-[#2DD4BF]/12",
        iconColor: "text-[#86EFAC]",
      },
      {
        icon: ThermalFloorsIcon,
        title: "Pisos atérmicos",
        shortDescription:
          "Bordes y solárium atérmicos/antideslizantes para confort y seguridad.",
        fullDescription:
          "Nuestros pisos atérmicos y antideslizantes son la solución perfecta para el área alrededor de tu piscina. No absorben el calor del sol, manteniéndose frescos incluso en los días más calurosos.",
        image: "https://www.construmaxpiscinas.com/images/index/about-nuevo.avif",
        features: [
          "Material atérmico avanzado",
          "Acabado antideslizante",
          "Resistente a químicos",
          "Diseños estéticos",
          "Fácil limpieza",
        ],
        benefits: [
          "Caminá descalzo sin quemarte",
          "Mayor seguridad alrededor",
          "Reduce accidentes",
          "Estética premium",
        ],
        iconBgColor: "bg-[#1D4ED8]/12",
        iconColor: "text-[#86EFAC]",
      },
      {
        icon: Droplet,
        title: "Cascadas",
        shortDescription:
          "Cascadas decorativas e instalación de opciones en acero inoxidable.",
        fullDescription:
          "Agregá un toque de elegancia y relajación con nuestras cascadas decorativas. Diseños personalizados que se integran perfectamente con tu piscina y paisajismo.",
        image: "https://www.construmaxpiscinas.com/images/hero/nuevo-hero.avif",
        features: [
          "Cascadas de acero inoxidable",
          "Diseños de piedra natural",
          "Efectos de cortina de agua",
          "Iluminación integrada",
          "Bomba de recirculación",
        ],
        benefits: [
          "Sonido relajante de agua",
          "Elemento decorativo único",
          "Aeración natural del agua",
          "Ambiente spa en casa",
        ],
        iconBgColor: "bg-[#2DD4BF]/12",
        iconColor: "text-[#86EFAC]",
      },
      {
        icon: Palette,
        title: "Revestimientos",
        shortDescription: (
          <>
            Piedra bali, símil bali y símil venecita. Sistemas de{" "}
            <strong className="font-semibold text-white">
              desborde infinito
            </strong>{" "}
            y finlandés.
          </>
        ),
        fullDescription:
          "Ofrecemos una amplia variedad de revestimientos de alta calidad para el interior de tu piscina. Desde clásicas venecitas hasta modernos sistemas de desborde infinito que crean un efecto visual impresionante.",
        image: "https://www.construmaxpiscinas.com/images/hero/nuevo-hero.avif",
        features: [
          "Venecitas de colores variados",
          "Piedra Bali natural",
          "Símil Bali porcelánico",
          "Sistema desborde infinito",
          "Sistema finlandés",
        ],
        benefits: [
          "Estética personalizada",
          "Mayor durabilidad",
          "Fácil mantenimiento",
          "Valor agregado a tu propiedad",
        ],
        iconBgColor: "bg-[#1D4ED8]/12",
        iconColor: "text-[#86EFAC]",
        isPopular: true,
      },
      {
        icon: Activity,
        title: "Nado contracorriente",
        shortDescription:
          "Permite nadar sin fin en un espacio reducido, ideal para entrenamiento y beneficios cardiovasculares.",
        fullDescription:
          "El sistema de nado contracorriente permite nadar de forma continua en un espacio reducido. Ideal para ejercicio cardiovascular, entrenamiento de resistencia y terapia física.",
        image: "https://www.construmaxpiscinas.com/images/index/about-nuevo.avif",
        features: [
          "Generador de corriente ajustable",
          "Múltiples niveles de intensidad",
          "Instalación en piscinas existentes",
          "Bajo consumo energético",
          "Control remoto",
        ],
        benefits: [
          "Ejercicio completo en casa",
          "Ideal para terapia física",
          "No necesitas piscina grande",
          "Entrenamiento profesional",
        ],
        iconBgColor: "bg-[#2DD4BF]/12",
        iconColor: "text-[#86EFAC]",
      },
      {
        icon: GeneralConstructionIcon,
        title: "Construcción en general",
        shortDescription: "Quinchos, fogoneros, pérgolas y ampliaciones.",
        fullDescription:
          "Complementamos tu piscina con construcciones adicionales que crean el ambiente perfecto para el entretenimiento al aire libre. Desde quinchos completos hasta pérgolas elegantes.",
        image: "https://www.construmaxpiscinas.com/images/hero/nuevo-hero.avif",
        features: [
          "Quinchos con parrilla",
          "Fogoneros y hogares",
          "Pérgolas de madera/aluminio",
          "Ampliaciones de vivienda",
          "Decking y solárium",
        ],
        benefits: [
          "Espacio de entretenimiento completo",
          "Aumenta metros cuadrados",
          "Diseño integrado con piscina",
          "Aumenta valor de propiedad",
        ],
        iconBgColor: "bg-[#1D4ED8]/12",
        iconColor: "text-[#86EFAC]",
      },
    ],
    []
  );

  const visibleServices = maxItems ? services.slice(0, maxItems) : services;
  const isFeaturedMode = typeof maxItems === "number";

  return (
    <MotionProvider>
      <>
      <section ref={sectionRef} className="relative overflow-hidden py-24 text-white">
        {/* Background */}
        {!inheritBackground ? (
          <>
            <div className="absolute inset-0 -z-50 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950" />
            <div
              className="absolute inset-0 -z-40 bg-cover bg-center opacity-10"
              style={{
                backgroundImage: shouldLoadBgImage
                  ? "url(https://www.construmaxpiscinas.com/images/index/img-servicios-section.avif)"
                  : "none",
              }}
            />
            <m.div
              className="absolute inset-0 -z-30 opacity-[0.55]"
              style={{ y: backgroundY }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_18%_10%,rgba(45,212,191,0.16),transparent_60%),radial-gradient(55%_55%_at_86%_20%,rgba(29,78,216,0.14),transparent_60%)]" />
            </m.div>
            <div className="absolute inset-x-0 bottom-0 -z-20 h-32 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        ) : null}

        {/* Glow Orbs */}
        {!inheritBackground ? (
          <>
            <GlowOrb className="absolute top-1/4 -right-32 hidden md:block" color="#1D4ED8" size={400} blur={150} duration={8} />
            <GlowOrb className="absolute bottom-1/3 -left-32 hidden md:block" color="#2DD4BF" size={350} blur={130} duration={6} />
          </>
        ) : null}

        <div className="mx-auto max-w-6xl px-6 text-center">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65"
            >
              {isFeaturedMode ? "Servicios destacados" : "Nuestros servicios"}
            </m.p>

            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.35 }}
              className="mt-4 text-4xl font-semibold md:text-5xl lg:text-6xl"
            >
              Soluciones {isFeaturedMode ? "clave" : "completas"} para tu{" "}
              <span className="bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#2DD4BF] bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                piscina
              </span>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04, duration: 0.35 }}
              className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg"
            >
              {isFeaturedMode
                ? "Una selección de servicios de alto impacto para construir o renovar tu proyecto con estándar premium."
                : "Una propuesta integral para diseñar, construir y mantener tu piscina con ejecución técnica y terminaciones de alto nivel."}
            </m.p>
          </m.div>

          {/* Services Grid */}
          <m.div
            className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {visibleServices.map((service, index) => (
              <m.div
                key={index}
                variants={itemVariants}
                id={service.anchorId}
                className={service.anchorId ? "scroll-mt-24" : undefined}
                onClick={() => setSelected(service)}
              >
                <ServiceCard
                  variant="dark"
                  icon={service.icon}
                  title={service.title}
                  description={service.shortDescription}
                  iconBgColor={service.iconBgColor}
                  iconColor={service.iconColor}
                />
              </m.div>
            ))}
          </m.div>

          {/* View All Button */}
          {isFeaturedMode ? (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.3 }}
              className="mt-12 text-center"
            >
              <MagneticButton
                href="/servicios"
                variant="secondary"
                strength={0.4}
                className="px-8 py-4"
              >
                Ver todos los servicios
              </MagneticButton>
            </m.div>
          ) : null}
        </div>
      </section>

      {/* Service Detail Modal */}
      {selected && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <m.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/12 bg-zinc-950/85 shadow-[0_30px_120px_-70px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_15%_10%,rgba(45,212,191,0.18),transparent_55%),radial-gradient(65%_65%_at_85%_18%,rgba(29,78,216,0.16),transparent_60%)]" />

              <button
                type="button"
                aria-label="Cerrar"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setSelected(null);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(null);
                }}
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/90 transition hover:bg-white/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.07]">
                  <selected.icon className="h-7 w-7 text-[#2DD4BF]" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-semibold text-white">
                    {selected.fullTitle || selected.title}
                  </h3>
                  {selected.isPopular && (
                    <p className="mt-1 text-sm text-[#2DD4BF]">
                      Más solicitado
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 pt-1 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Descripción */}
                <div>
                  <p className="text-white/75 text-base leading-relaxed">
                    {selected.fullDescription}
                  </p>
                </div>
                
                {/* Imagen */}
                {selected.image && (
                  <div className="relative h-72 lg:h-auto rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={selected.image}
                      alt={selected.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>

              <div className="mt-10">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <CheckCircle className="h-5 w-5 text-[#2DD4BF]" />
                  Características
                </h4>
                <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {selected.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/75">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <CheckCircle className="h-5 w-5 text-[#1D4ED8]" />
                  Beneficios
                </h4>
                <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {selected.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/75">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1D4ED8]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
                <MagneticButton
                  href="/contacto"
                  variant="primary"
                  strength={0.4}
                  className="flex-1 justify-center py-4"
                >
                  Solicitar presupuesto
                </MagneticButton>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setSelected(null)}
                  className="rounded-2xl border-white/15 bg-white/[0.04] text-white/85 hover:bg-white/[0.07] hover:text-white px-6 py-4"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
      </>
    </MotionProvider>
  );
}

