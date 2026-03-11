"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox, { type LightboxImageItem } from "@/components/Lightbox";
import VideoThumbnail from "@/components/VideoThumbnail";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

type MediaItem =
  | {
      type: "video";
      sources: { src: string; type: string }[];
    }
  | {
      type: "image";
      formats: any; // ImageFormats o lo que uses en normalizeMedia
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

function MiniaturaConFallback({ src }: { src: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-xs text-white/45">
        Miniatura no disponible
      </div>
    );
  }

  return (
    <img
      src={src}
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

const RESUME_DELAY_MS = 900;

export default function ProjectGalleryClient({
  title,
  normalizedMedia,
}: {
  title: string;
  normalizedMedia: MediaItem[];
}) {
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const prefersReducedMotion = usePrefersReducedMotion();
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

  // Tab visibility
  useEffect(() => {
    const onVis = () => setIsTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const handleThumbnailClick = useCallback((index: number) => {
    setActiveThumbIndex(index);
    swiperRef.current?.slideTo(index);
  }, []);

  // Swiper listeners para interacción
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

  // Auto-slide PRO (solo si la slide activa NO es video)
  useEffect(() => {
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
  ]);

  const active = normalizedMedia[activeThumbIndex];

  const lightboxImages = useMemo(() => {
    return normalizedMedia.flatMap((m): LightboxImageItem[] => {
      const alt = title || "";
      if (m.type === "video") {
        return (m as any).sources.map((s: any) => ({ src: s.src, alt }));
      }
      return [{ src: (m as any).formats, alt }];
    });
  }, [normalizedMedia, title]);

  return (
    <>
      {/* Media principal */}
      <div
        className="group relative aspect-video rounded-3xl bg-slate-900 shadow-2xl"
        style={{ maxWidth: "100%", width: "100%" }}
        onMouseEnter={interactionStart}
        onMouseLeave={interactionEnd}
        onTouchStart={interactionStart}
        onTouchEnd={interactionEnd}
        onPointerDown={interactionStart}
        onPointerUp={interactionEnd}
        onFocusCapture={interactionStart}
        onBlurCapture={interactionEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeThumbIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cursor-zoom-in rounded-3xl h-full"
            style={{ width: "100%", display: "block" }}
            onClick={() => {
              setCurrentImageIndex(activeThumbIndex);
              setLightboxOpen(true);
            }}
          >
            {active?.type === "video" ? (
              <video
                autoPlay
                muted
                playsInline
                className="w-full h-auto object-contain"
                onEnded={() =>
                  handleThumbnailClick((activeThumbIndex + 1) % normalizedMedia.length)
                }
              >
                {(active as any).sources.map((s: any) => (
                  <source key={s.src} src={s.src} type={s.type} />
                ))}
                Tu navegador no soporta el video.
              </video>
            ) : (
              <img
                src={(active as any)?.formats?.webp ?? (active as any)?.formats?.smWebp}
                alt={title}
                className="w-full h-auto object-contain"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation();
              handleThumbnailClick(
                activeThumbIndex === 0 ? normalizedMedia.length - 1 : activeThumbIndex - 1
              );
            }}
            className="pointer-events-auto rounded-full border border-white/15 bg-white/[0.08] p-3 text-white backdrop-blur-md transition hover:bg-white/[0.14]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            aria-label="Siguiente"
            onClick={(e) => {
              e.stopPropagation();
              handleThumbnailClick((activeThumbIndex + 1) % normalizedMedia.length);
            }}
            className="pointer-events-auto rounded-full border border-white/15 bg-white/[0.08] p-3 text-white backdrop-blur-md transition hover:bg-white/[0.14]"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Thumbs */}
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
          onSlideChange={(swiper) => setActiveThumbIndex(swiper.activeIndex)}
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
          {normalizedMedia.map((m, idx) => (
            <SwiperSlide key={idx}>
              <div
                onClick={() => handleThumbnailClick(idx)}
                className={[
                  "relative aspect-video overflow-hidden rounded-xl border-2 transition-all duration-300",
                  activeThumbIndex === idx
                    ? "border-[#2DD4BF] shadow-[0_0_0_1px_rgba(45,212,191,0.25),0_18px_45px_-30px_rgba(0,0,0,0.85)] scale-[1.02]"
                    : "border-white/10 opacity-70 hover:opacity-100",
                ].join(" ")}
              >
                {m.type === "video" ? (
                  <VideoThumbnail sources={(m as any).sources} className="absolute inset-0" />
                ) : (m as any).formats?.smWebp ? (
                  <MiniaturaConFallback src={(m as any).formats.smWebp} />
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

      <Lightbox
        images={lightboxImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}