"use client";

import Link from "next/link";

import { GlowOrb } from "@/components/ui/FloatingElement";

type FeaturedImage = {
  id: string;
  thumb320: string;
  thumb480: string;
  srcset: string;
};

const featuredImages: FeaturedImage[] = [
  {
    id: "el-tipal-2-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/thumbnails/320w/sm-el-tipal-2-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/thumbnails/480w/sm-el-tipal-2-001-480w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/thumbnails/320w/sm-el-tipal-2-001-320w.avif 320w, https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/thumbnails/480w/sm-el-tipal-2-001-480w.avif 480w, https://www.construmaxpiscinas.com/images/portfolio/el-tipal-2/responsive/768w/el-tipal-2-001-768w.avif 768w",
  },
  {
    id: "hosteria-cabra-corral-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/thumbnails/320w/sm-hosteria-cabra-corral-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/thumbnails/480w/sm-hosteria-cabra-corral-001-480w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/thumbnails/320w/sm-hosteria-cabra-corral-001-320w.avif 320w, https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/thumbnails/480w/sm-hosteria-cabra-corral-001-480w.avif 480w, https://www.construmaxpiscinas.com/images/portfolio/hosteria-cabra-corral/responsive/768w/hosteria-cabra-corral-001-768w.avif 768w",
  },
  {
    id: "club-ate-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/club-ate/thumbnails/320w/sm-club-ate-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/club-ate/thumbnails/480w/sm-club-ate-001-480w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/club-ate/thumbnails/320w/sm-club-ate-001-320w.avif 320w, https://www.construmaxpiscinas.com/images/portfolio/club-ate/thumbnails/480w/sm-club-ate-001-480w.avif 480w, https://www.construmaxpiscinas.com/images/portfolio/club-ate/responsive/768w/club-ate-001-768w.avif 768w",
  },
  {
    id: "grand-bourg-1-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/320w/sm-grand-bourg-1-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/480w/sm-grand-bourg-1-001-480w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/320w/sm-grand-bourg-1-001-320w.avif 320w, https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/thumbnails/480w/sm-grand-bourg-1-001-480w.avif 480w, https://www.construmaxpiscinas.com/images/portfolio/grand-bourg-1/responsive/768w/grand-bourg-1-001-768w.avif 768w",
  },
  {
    id: "agropecuaria-el-guanaco-metan-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/thumbnails/320w/sm-agropecuaria-el-guanaco-metan-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/thumbnails/480w/sm-agropecuaria-el-guanaco-metan-001-480w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/thumbnails/320w/sm-agropecuaria-el-guanaco-metan-001-320w.avif 320w, https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/thumbnails/480w/sm-agropecuaria-el-guanaco-metan-001-480w.avif 480w, https://www.construmaxpiscinas.com/images/portfolio/agropecuaria-el-guanaco-metan/responsive/768w/agropecuaria-el-guanaco-metan-001-768w.avif 768w",
  },
  {
    id: "vaqueros-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/320w/sm-vaqueros-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/480w/sm-vaqueros-001-480w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/320w/sm-vaqueros-001-320w.avif 320w, https://www.construmaxpiscinas.com/images/portfolio/vaqueros/thumbnails/480w/sm-vaqueros-001-480w.avif 480w, https://www.construmaxpiscinas.com/images/portfolio/vaqueros/responsive/768w/vaqueros-001-768w.avif 768w",
  },
  {
    id: "el-prado-eco-village-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/320w/sm-el-prado-eco-village-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/480w/sm-el-prado-eco-village-001-480w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/320w/sm-el-prado-eco-village-001-320w.avif 320w, https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/thumbnails/480w/sm-el-prado-eco-village-001-480w.avif 480w, https://www.construmaxpiscinas.com/images/portfolio/el-prado-eco-village/responsive/768w/el-prado-eco-village-001-768w.avif 768w",
  },
  {
    id: "san-luis-4-001",
    thumb320:
      "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/320w/sm-san-luis-4-001-320w.avif",
    thumb480:
      "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/480w/sm-san-luis-4-001-480w.avif",
    srcset:
      "https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/320w/sm-san-luis-4-001-320w.avif 320w, https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/thumbnails/480w/sm-san-luis-4-001-480w.avif 480w, https://www.construmaxpiscinas.com/images/portfolio/san-luis-4/responsive/768w/san-luis-4-001-768w.avif 768w",
  },
];

function FeaturedProjectsStrip({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex w-max shrink-0 gap-1 pr-1 md:gap-1.5 md:pr-1.5"
      aria-hidden={ariaHidden}
    >
      {featuredImages.map((image, index) => (
        <div
          key={`${ariaHidden ? "dup" : "base"}-${image.id}`}
          className="group relative aspect-[16/9] w-[78vw] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30 sm:w-[58vw] lg:w-[44vw] xl:w-[38vw]"
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={image.thumb320} />
            <source media="(min-width: 768px)" srcSet={image.thumb480} />
            <img
              src={image.thumb320}
              sizes="(max-width: 767px) 320px, (max-width: 1024px) 58vw, (max-width: 1280px) 566px, 566px"
              alt={`Proyecto destacado ${image.id}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={480}
              height={270}
              loading={!ariaHidden && index === 0 ? "eager" : "lazy"}
              fetchPriority={!ariaHidden && index === 0 ? "high" : "auto"}
              decoding={!ariaHidden && index === 0 ? "sync" : "async"}
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
        className="absolute top-1/3 -left-32 hidden md:block"
        color="#2DD4BF"
        size={400}
        blur={150}
        duration={8}
      />
      <GlowOrb
        className="absolute bottom-1/4 -right-32 hidden md:block"
        color="#1D4ED8"
        size={450}
        blur={180}
        duration={10}
      />

      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <p className="mb-4 block text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
            Nuestro portafolio
          </p>
          <h2 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
            Proyectos{" "}
            <span className="animate-gradient-shift bg-[length:200%_auto] bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#2DD4BF] bg-clip-text text-transparent">
              destacados
            </span>
          </h2>
        </div>

        <div className="relative">
          <div className="animate-projects-marquee flex w-max">
            <FeaturedProjectsStrip />
            <FeaturedProjectsStrip ariaHidden />
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/proyectos"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-8 py-3 text-base font-semibold text-white transition hover:bg-white/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
          >
            Ver todos los proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
