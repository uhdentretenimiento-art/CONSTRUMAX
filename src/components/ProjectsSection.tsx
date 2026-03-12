"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { GlowOrb } from "@/components/ui/FloatingElement";

type FeaturedImage = {
  id: string;
  thumb320: string;
  thumb480: string;
  src1280: string;
  srcset: string;
};

const featuredImages: FeaturedImage[] = [
  {
    id: "el-tipal-2-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/thumbnails/320w/sm-el-tipal-2-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/thumbnails/480w/sm-el-tipal-2-001-480w.avif",
    src1280:
      "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/responsive/1280w/el-tipal-2-001-1280w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/responsive/768w/el-tipal-2-001-768w.avif 768w, https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/responsive/1280w/el-tipal-2-001-1280w.avif 1280w, https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/responsive/1920w/el-tipal-2-001-1920w.avif 1920w",
  },
  {
    id: "hosteria-cabra-corral-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/thumbnails/320w/sm-hosteria-cabra-corral-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/thumbnails/480w/sm-hosteria-cabra-corral-001-480w.avif",
    src1280:
      "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/responsive/1280w/hosteria-cabra-corral-001-1280w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/responsive/768w/hosteria-cabra-corral-001-768w.avif 768w, https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/responsive/1280w/hosteria-cabra-corral-001-1280w.avif 1280w, https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/responsive/1920w/hosteria-cabra-corral-001-1920w.avif 1920w",
  },
  {
    id: "club-ate-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/club-ate/thumbnails/320w/sm-club-ate-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/club-ate/thumbnails/480w/sm-club-ate-001-480w.avif",
    src1280:
      "https://www.construmaxpiscinas.com/images/portfolio/club-ate/responsive/1280w/club-ate-001-1280w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/club-ate/responsive/768w/club-ate-001-768w.avif 768w, https://www.construmaxpiscinas.com/images/portfolio/club-ate/responsive/1280w/club-ate-001-1280w.avif 1280w, https://www.construmaxpiscinas.com/images/portfolio/club-ate/responsive/1920w/club-ate-001-1920w.avif 1920w",
  },
  {
    id: "grand-bourg-1-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/320w/sm-grand-bourg-1-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/480w/sm-grand-bourg-1-001-480w.avif",
    src1280:
      "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1280w/grand-bourg-1-001-1280w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/768w/grand-bourg-1-001-768w.avif 768w, https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1280w/grand-bourg-1-001-1280w.avif 1280w, https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/1920w/grand-bourg-1-001-1920w.avif 1920w",
  },
  {
    id: "agropecuaria-el-guanaco-metan-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/thumbnails/320w/sm-agropecuaria-el-guanaco-metan-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/thumbnails/480w/sm-agropecuaria-el-guanaco-metan-001-480w.avif",
    src1280:
      "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/responsive/1280w/agropecuaria-el-guanaco-metan-001-1280w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/responsive/768w/agropecuaria-el-guanaco-metan-001-768w.avif 768w, https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/responsive/1280w/agropecuaria-el-guanaco-metan-001-1280w.avif 1280w, https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/responsive/1920w/agropecuaria-el-guanaco-metan-001-1920w.avif 1920w",
  },
  {
    id: "vaqueros-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/320w/sm-vaqueros-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/480w/sm-vaqueros-001-480w.avif",
    src1280:
      "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1280w/vaqueros-001-1280w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/768w/vaqueros-001-768w.avif 768w, https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1280w/vaqueros-001-1280w.avif 1280w, https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/1920w/vaqueros-001-1920w.avif 1920w",
  },
  {
    id: "el-prado-eco-village-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/320w/sm-el-prado-eco-village-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/480w/sm-el-prado-eco-village-001-480w.avif",
    src1280:
      "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1280w/el-prado-eco-village-001-1280w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/768w/el-prado-eco-village-001-768w.avif 768w, https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1280w/el-prado-eco-village-001-1280w.avif 1280w, https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/1920w/el-prado-eco-village-001-1920w.avif 1920w",
  },
  {
    id: "san-luis-4-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/320w/sm-san-luis-4-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/480w/sm-san-luis-4-001-480w.avif",
    src1280:
      "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/1280w/san-luis-4-001-1280w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/768w/san-luis-4-001-768w.avif 768w, https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/1280w/san-luis-4-001-1280w.avif 1280w, https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/1920w/san-luis-4-001-1920w.avif 1920w",
  },
];

function FeaturedProjectsStrip({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex w-max shrink-0 gap-1 pr-1 md:gap-1.5 md:pr-1.5"
      aria-hidden={ariaHidden}
    >

      {featuredImages.map((image) => (
        <div
          key={`${ariaHidden ? "dup" : "base"}-${image.id}`}
          className="group relative aspect-[16/9] w-[78vw] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30 sm:w-[58vw] lg:w-[44vw] xl:w-[38vw]"
        >
          <picture>
            <source media="(max-width: 640px)" srcSet={image.thumb320} />
            <img
              src={image.thumb480 || image.src1280}
              srcSet={image.srcset}
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 58vw, (max-width: 1280px) 44vw, 38vw"
              alt={`Proyecto destacado ${image.id}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </picture>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="relative overflow-hidden pb-12 pt-24 text-white">
      <GlowOrb
        className="absolute top-1/3 -left-32"
        color="#2DD4BF"
        size={400}
        blur={150}
        duration={8}
      />
      <GlowOrb
        className="absolute bottom-1/4 -right-32"
        color="#1D4ED8"
        size={450}
        blur={180}
        duration={10}
      />

      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <p className="mb-4 block text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
            Nuestro portafolio
          </p>
          <h2 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
            Proyectos{" "}
            <span className="animate-gradient-shift bg-[length:200%_auto] bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#2DD4BF] bg-clip-text text-transparent">
              destacados
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 34,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <FeaturedProjectsStrip />
            <FeaturedProjectsStrip ariaHidden />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Link
            href="/proyectos"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-8 py-3 text-base font-semibold text-white transition hover:bg-white/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
          >
            Ver todos los proyectos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}