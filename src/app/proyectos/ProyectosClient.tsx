"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectSuggestions from "@/components/ProjectSuggestions";
import { projects } from "@/data/projects";
import Lightbox, { type LightboxImageItem } from "@/components/Lightbox";
import VideoThumbnail from "@/components/VideoThumbnail";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useParallax } from "@/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { normalizeMedia } from "@/lib/media";
import { getProjectCaseStudy } from "@/data/projectCases";
import { getProjectDescription } from "@/data/projectDescriptions";
import styles from "./ProyectosClient.module.css";

const RESUME_DELAY_MS = 900;
const PROJECTS_HERO_BG =
  "/api/storage/images/hero/hero-proyectos.avif";
const PROJECTS_HERO_BG_MOBILE =
  "/api/storage/images/hero/hero-proyectos-mobile.avif";
const PROJECTS_LIST_EVENT = "projects:show-list";

const getUniqueCities = () => {
  const cities = projects.map((p) => p.location.split(",")[0].trim());
  return [...new Set(cities)].sort();
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);

    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return reduced;
}

function MiniaturaConFallback({
  src,
  srcSet,
  sizes,
}: {
  src?: string;
  srcSet?: string;
  sizes?: string;
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-200 text-xs text-slate-400">
        Miniatura no disponible
      </div>
    );
  }

  return (
     
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      className="h-full w-full object-cover"
      alt="Miniatura"
      width="400"
      height="225"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
    />
  );
}

export default function ProyectosClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProject, setSelectedProject] =
    useState<(typeof projects)[0] | null>(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);

  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const prefersReducedMotion = usePrefersReducedMotion();
  const backgroundY = useParallax(-0.08);

  const swiperRef = useRef<SwiperType | null>(null);
  const resumeTimerRef = useRef<number | null>(null);

  const swiperEventsRef = useRef<{
    swiper: SwiperType | null;
    onStart: (() => void) | null;
    onEnd: (() => void) | null;
  }>({ swiper: null, onStart: null, onEnd: null });

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const interactionStart = useCallback(() => {
    clearResumeTimer();
    setIsUserInteracting(true);
  }, [clearResumeTimer]);

  const interactionEnd = useCallback(() => {
    clearResumeTimer();
    resumeTimerRef.current = window.setTimeout(() => {
      setIsUserInteracting(false);
      resumeTimerRef.current = null;
    }, RESUME_DELAY_MS);
  }, [clearResumeTimer]);

  const cities = useMemo(() => getUniqueCities(), []);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.location.toLowerCase().includes(q);

      const matchesCity =
        selectedCity === "all" ||
        project.location.toLowerCase().includes(selectedCity.toLowerCase());

        return matchesSearch && matchesCity;
      })
      .sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));
  }, [searchTerm, selectedCity]);

  const currentProjectIndex = useMemo(() => {
    if (!selectedProject) return -1;
    return filteredProjects.findIndex((project) => project.id === selectedProject.id);
  }, [filteredProjects, selectedProject]);

  const previousProject =
    currentProjectIndex > 0 ? filteredProjects[currentProjectIndex - 1] : null;
  const nextProject =
    currentProjectIndex >= 0 && currentProjectIndex < filteredProjects.length - 1
      ? filteredProjects[currentProjectIndex + 1]
      : null;

  useEffect(() => {
    if (selectedProject) {
      setActiveThumbIndex(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleShowList = () => {
      setSelectedProject(null);
      setLightboxOpen(false);
      setCurrentImageIndex(0);
      setActiveThumbIndex(0);
    };

    window.addEventListener(PROJECTS_LIST_EVENT, handleShowList);
    return () => window.removeEventListener(PROJECTS_LIST_EVENT, handleShowList);
  }, []);

  // Tab visibility
  useEffect(() => {
    const onVis = () => setIsTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const normalizedMedia = useMemo(() => {
    if (!selectedProject) return [];
    return normalizeMedia(selectedProject.images);
  }, [selectedProject]);

  const handleThumbnailClick = useCallback((index: number) => {
    setActiveThumbIndex(index);
    swiperRef.current?.slideTo(index);
  }, []);

  // ✅ Bridge desde Lightbox: actualiza índice (flechas/prev/next)
  useEffect(() => {
    const onSetIndex = (e: Event) => {
      const ev = e as CustomEvent<{ index: number }>;
      const next = ev.detail?.index;
      if (typeof next !== "number") return;

      setCurrentImageIndex(next);
      handleThumbnailClick(next);
    };

    window.addEventListener("__lb_set_index__" as any, onSetIndex);
    return () => window.removeEventListener("__lb_set_index__" as any, onSetIndex);
  }, [handleThumbnailClick]);

  const attachSwiperListeners = useCallback(
    (swiper: SwiperType) => {
      const prev = swiperEventsRef.current;
      if (prev.swiper && prev.onStart && prev.onEnd) {
        prev.swiper.off("touchStart", prev.onStart);
        prev.swiper.off("sliderMove", prev.onStart);
        prev.swiper.off("touchEnd", prev.onEnd);
        prev.swiper.off("transitionEnd", prev.onEnd);
      }

      const onStart = () => interactionStart();
      const onEnd = () => interactionEnd();

      swiper.on("touchStart", onStart);
      swiper.on("sliderMove", onStart);
      swiper.on("touchEnd", onEnd);
      swiper.on("transitionEnd", onEnd);

      swiperEventsRef.current = { swiper, onStart, onEnd };
    },
    [interactionEnd, interactionStart]
  );

  useEffect(() => {
    return () => {
      clearResumeTimer();
      const cur = swiperEventsRef.current;
      if (cur.swiper && cur.onStart && cur.onEnd) {
        cur.swiper.off("touchStart", cur.onStart);
        cur.swiper.off("sliderMove", cur.onStart);
        cur.swiper.off("touchEnd", cur.onEnd);
        cur.swiper.off("transitionEnd", cur.onEnd);
      }
    };
  }, [clearResumeTimer]);

  useEffect(() => {
    if (!selectedProject) return;
    if (prefersReducedMotion) return;
    if (!isTabVisible) return;
    if (isUserInteracting) return;
    if (lightboxOpen) return;
    if (normalizedMedia.length <= 1) return;

    const active = normalizedMedia[activeThumbIndex];
    if (!active || active.type === "video") return;

    const id = window.setTimeout(() => {
      handleThumbnailClick((activeThumbIndex + 1) % normalizedMedia.length);
    }, 4500);

    return () => window.clearTimeout(id);
  }, [
    activeThumbIndex,
    handleThumbnailClick,
    isTabVisible,
    isUserInteracting,
    lightboxOpen,
    normalizedMedia,
    prefersReducedMotion,
    selectedProject,
  ]);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-30 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 -top-[10%] -bottom-[10%] scale-[1.12] bg-cover bg-center bg-no-repeat md:hidden"
          style={{
            y: backgroundY,
            backgroundImage: `url(${PROJECTS_HERO_BG_MOBILE})`,
          }}
        />
        <motion.div
          className="absolute inset-x-0 -top-[10%] -bottom-[10%] hidden scale-[1.12] bg-cover bg-center bg-no-repeat md:block"
          style={{
            y: backgroundY,
            backgroundImage: `url(${PROJECTS_HERO_BG})`,
          }}
        />
      </div>

      <div className={`pointer-events-none absolute inset-0 -z-20 ${styles.overlay}`} />
      <div className={`pointer-events-none absolute inset-0 -z-10 ${styles.glow}`} />

      <div className="relative z-10">
      {/* Header */}
      {!selectedProject ? (
        <section className="relative overflow-hidden pb-12 pt-18 text-white md:pt-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <AnimateOnScroll animationType="slide-up">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                Portafolio
              </p>

              <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
                Nuestro <span className={styles.accentText}>portafolio</span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-white/70">
                Descubrí la calidad de nuestras construcciones a través de proyectos
                terminados.
              </p>
            </AnimateOnScroll>

            <div className={`mx-auto mt-10 max-w-3xl rounded-3xl p-3 ${styles.glassPanel}`}>
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                  <Input
                    placeholder="Buscar proyectos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-9 text-white ${styles.searchInput}`}
                  />
                </div>

                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className={`w-full text-white md:w-56 ${styles.selectTrigger}`}>
                    <SelectValue placeholder="Ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ciudades</SelectItem>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Body */}
      <section
        className={[
          "min-h-[400px] pb-24 text-white",
          selectedProject ? "pt-5 md:pt-7" : "",
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-4">
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="mx-auto max-w-5xl"
              >
                <div className="mb-8">
                  <div className="text-left">
                    <h2 className="text-3xl font-semibold text-white">
                      {selectedProject.title}
                    </h2>
                    <span className="mt-1 flex items-center gap-1 text-white/60">
                      <MapPin className="h-4 w-4" /> {selectedProject.location}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                      {selectedProject ? (() => {
                        const cs = getProjectCaseStudy(selectedProject);
                        return (
                          <div className={`rounded-3xl p-5 ${styles.glassPanel}`}>
                            <div className="mb-4 flex items-center justify-between gap-4">
                              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                                Caso de estudio
                              </p>
                              <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 ${styles.glassTag}`}>
                                {cs.category}
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div className={`rounded-2xl p-4 ${styles.detailBox}`}>
                                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${styles.sectionLabel}`}>Desafío</p>
                                <p className="mt-2 text-sm leading-relaxed text-white/75">{cs.challenge}</p>
                              </div>
                              <div className={`rounded-2xl p-4 ${styles.detailBox}`}>
                                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${styles.sectionLabel}`}>Solución</p>
                                <p className="mt-2 text-sm leading-relaxed text-white/75">{cs.solution}</p>
                              </div>
                              <div className={`rounded-2xl p-4 ${styles.detailBox}`}>
                                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${styles.sectionLabel}`}>Resultado</p>
                                <p className="mt-2 text-sm leading-relaxed text-white/75">{cs.result}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })() : null}

                      <div className="mt-4">
                        <ProjectSuggestions
                          currentProjectId={selectedProject.id}
                          limit={4}
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Media principal */}
                      <div
                        className="group relative aspect-[16/9] overflow-hidden rounded-3xl bg-slate-900 shadow-2xl"
                        onMouseEnter={interactionStart}
                        onMouseLeave={interactionEnd}
                        onTouchStart={interactionStart}
                        onTouchEnd={interactionEnd}
                        onPointerDown={interactionStart}
                        onPointerUp={interactionEnd}
                        onFocusCapture={interactionStart}
                        onBlurCapture={interactionEnd}
                      >
                        {normalizedMedia.length > 0 ? (
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeThumbIndex}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="h-full w-full cursor-zoom-in"
                              onClick={() => {
                                setCurrentImageIndex(activeThumbIndex);
                                setLightboxOpen(true);
                              }}
                            >
                              {normalizedMedia[activeThumbIndex]?.type === "video" ? (
                                <video
                                  autoPlay
                                  muted
                                  playsInline
                                  className="h-full w-full object-contain"
                                  onEnded={() =>
                                    handleThumbnailClick(
                                      (activeThumbIndex + 1) % normalizedMedia.length
                                    )
                                  }
                                >
                                  {normalizedMedia[activeThumbIndex].sources.map((s) => (
                                    <source key={s.src} src={s.src} type={s.type} />
                                  ))}
                                  Tu navegador no soporta el video.
                                </video>
                              ) : (
                                <img
                                  src={
                                    normalizedMedia[activeThumbIndex]?.formats?.webp ??
                                    normalizedMedia[activeThumbIndex]?.formats?.smAvif ??
                                    normalizedMedia[activeThumbIndex]?.formats?.smWebp
                                  }
                                  srcSet={
                                    normalizedMedia[activeThumbIndex]?.formats?.srcSet
                                  }
                                  sizes="(max-width: 1024px) 100vw, 72vw"
                                  alt={selectedProject.title}
                                  className="h-full w-full object-contain"
                                  loading="lazy"
                                  decoding="async"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                            </motion.div>
                          </AnimatePresence>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 text-center text-white/60">
                            <div>
                              <p className="text-base font-semibold text-white/80">Fotos proximamente</p>
                              <p className="mt-2 text-sm leading-relaxed text-white/55">
                                Estacion Alvarado ya figura en proyectos. Solo falta cargar sus imagenes.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Controls */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            aria-label="Anterior"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleThumbnailClick(
                                activeThumbIndex === 0
                                  ? normalizedMedia.length - 1
                                  : activeThumbIndex - 1
                              );
                            }}
                            className={`pointer-events-auto rounded-full border border-white/15 p-3 text-white backdrop-blur-md transition ${styles.carouselButton}`}
                            disabled={normalizedMedia.length === 0}
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>

                          <button
                            aria-label="Siguiente"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleThumbnailClick(
                                (activeThumbIndex + 1) % normalizedMedia.length
                              );
                            }}
                            className={`pointer-events-auto rounded-full border border-white/15 p-3 text-white backdrop-blur-md transition ${styles.carouselButton}`}
                            disabled={normalizedMedia.length === 0}
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      {/* Thumbs */}
                      {normalizedMedia.length > 0 ? (
                        <div
                          className="py-2"
                          onMouseEnter={interactionStart}
                          onMouseLeave={interactionEnd}
                          onTouchStart={interactionStart}
                          onTouchEnd={interactionEnd}
                        >
                          <Swiper
                            onSwiper={(swiper) => {
                              swiperRef.current = swiper;
                              attachSwiperListeners(swiper);
                            }}
                            onSlideChange={(swiper) =>
                              setActiveThumbIndex(swiper.activeIndex)
                            }
                            modules={[FreeMode, Navigation]}
                            spaceBetween={12}
                            slidesPerView={3}
                            breakpoints={{
                              640: { slidesPerView: 4 },
                              1024: { slidesPerView: 6 },
                            }}
                            freeMode
                            className="rounded-xl"
                          >
                            {normalizedMedia.map((media, idx) => (
                              <SwiperSlide key={idx}>
                                <div
                                  onClick={() => handleThumbnailClick(idx)}
                                  className={[
                                    "relative aspect-video overflow-hidden rounded-xl border-2 transition-all",
                                    activeThumbIndex === idx
                                      ? styles.activeThumb
                                      : "border-white/10 opacity-70 hover:opacity-100",
                                  ].join(" ") }
                                >
                                  {media.type === "video" ? (
                                    <VideoThumbnail
                                      sources={media.sources}
                                      className="absolute inset-0"
                                    />
                                  ) : media.formats?.smAvif || media.formats?.smWebp ? (
                                    <MiniaturaConFallback
                                      src={media.formats.smAvif ?? media.formats.smWebp}
                                      srcSet={
                                        [
                                          media.formats.smWebp
                                            ? `${media.formats.smWebp} 320w`
                                            : undefined,
                                          media.formats.smAvif
                                            ? `${media.formats.smAvif} 480w`
                                            : undefined,
                                        ]
                                          .filter(Boolean)
                                          .join(", ") || undefined
                                      }
                                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 160px"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-xs text-white/45">
                                      Miniatura no disponible
                                    </div>
                                  )}
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {selectedProject ? (() => {
                    const description = getProjectDescription(selectedProject);
                    return (
                      <div className="space-y-6">
                        <div className={`rounded-3xl p-5 ${styles.glassPanel}`}>
                          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                            <div className="space-y-3 text-sm leading-relaxed text-white/75">
                              <div className="mb-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                                  Descripcion del proyecto
                                </p>
                                {description.heading ? (
                                  <p className="mt-2 text-base font-semibold text-white/88">
                                    {description.heading}
                                  </p>
                                ) : null}
                              </div>

                              {description.paragraphs.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                              ))}
                            </div>

                            <div className={`rounded-2xl p-4 ${styles.detailBox}`}>
                              <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${styles.sectionLabel}`}>
                                Caracteristicas
                              </p>
                              <ul className="mt-3 space-y-2 text-sm text-white/75">
                                {description.features.map((feature) => (
                                  <li key={feature} className="flex items-start gap-2">
                                    <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${styles.featureDot}`} />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                          {previousProject ? (
                            <button
                              aria-label={`Ver proyecto anterior: ${previousProject.title}`}
                              onClick={() => setSelectedProject(previousProject)}
                              className={`flex w-fit items-center gap-2 font-semibold hover:underline ${styles.accentText}`}
                            >
                              <ChevronLeft className="h-5 w-5" /> Anterior
                            </button>
                          ) : (
                            <span className="text-sm font-semibold text-white/30">
                              Anterior
                            </span>
                          )}

                          <Link
                            href="/proyectos"
                            prefetch={false}
                            onClick={() => setSelectedProject(null)}
                            className={`inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-2 font-semibold text-white/90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50 lg:justify-self-center ${styles.portfolioLink}`}
                          >
                            Ver portafolio completo
                          </Link>

                          {nextProject ? (
                            <button
                              aria-label={`Ver proyecto siguiente: ${nextProject.title}`}
                              onClick={() => setSelectedProject(nextProject)}
                              className={`flex w-fit items-center gap-2 font-semibold hover:underline lg:justify-self-end ${styles.accentText}`}
                            >
                              Siguiente <ChevronRight className="h-5 w-5" />
                            </button>
                          ) : (
                            <span className="text-sm font-semibold text-white/30 lg:justify-self-end">
                              Siguiente
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })() : null}

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project, index) => (
                  (() => {
                    const cs = getProjectCaseStudy(project);
                    return (
                  <ProjectCard
                    key={project.id}
                    index={index}
                    images={project.images}
                    location={project.location}
                    title={project.title}
                    categoryLabel={cs.category}
                    resultSnippet={cs.result}
                    onClick={() => setSelectedProject(project)}
                    variant="dark"
                  />
                    );
                  })()
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

        <Lightbox
          images={normalizedMedia.flatMap((media): LightboxImageItem[] => {
            const alt = selectedProject?.title || "";
            if (media.type === "video")
              return media.sources.map((s) => ({ src: s.src, alt }));
            return [{ src: media.formats, alt }];
          })}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={(next) => {
            setCurrentImageIndex(next);
            handleThumbnailClick(next);
          }}
        />
      </div>
    </section>
  );
}

