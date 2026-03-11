"use client";

import { useEffect, useMemo, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Acepta:
 * - string (url)
 * - ImageFormats (obj con webp/smWebp/avif/smAvif, etc)
 */
type AnyImageFormats = Record<string, any>;

export type LightboxImageItem = {
  src: string | AnyImageFormats;
  alt?: string;
};

type Props = {
  images: LightboxImageItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (nextIndex: number) => void;
};

function pickBestSrc(src: string | AnyImageFormats): string {
  if (!src) return "";
  if (typeof src === "string") return src;

  // Prioridad típica (ajustable):
  return (
    src.webp ||
    src.avif ||
    src.lgWebp ||
    src.lgAvif ||
    src.smWebp ||
    src.smAvif ||
    src.jpg ||
    src.jpeg ||
    src.png ||
    ""
  );
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: Props) {
  const safeImages = useMemo(() => images?.filter(Boolean) ?? [], [images]);

  const hasMany = safeImages.length > 1;

  const goPrev = useCallback(() => {
    if (!hasMany) return;
    const next = (currentIndex - 1 + safeImages.length) % safeImages.length;
    onIndexChange?.(next);
  }, [currentIndex, hasMany, onIndexChange, safeImages.length]);

  const goNext = useCallback(() => {
    if (!hasMany) return;
    const next = (currentIndex + 1) % safeImages.length;
    onIndexChange?.(next);
  }, [currentIndex, hasMany, onIndexChange, safeImages.length]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(!!mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // Esc + lock scroll
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKeyDown);

    // lock scroll
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [goNext, goPrev, isOpen, onClose]);

  const active = safeImages[currentIndex];
  const activeSrc = active ? pickBestSrc(active.src) : "";
  const activeAlt = active?.alt ?? "";

  // Autoplay: slide infinito mientras está abierto
  useEffect(() => {
    if (!isOpen) return;
    if (!hasMany) return;
    if (!activeSrc) return;
    if (prefersReducedMotion) return;

    const id = window.setTimeout(() => {
      goNext();
    }, 4200);

    return () => window.clearTimeout(id);
  }, [activeSrc, goNext, hasMany, isOpen, prefersReducedMotion]);

  // SSR safety (portal)
  const canPortal = typeof window !== "undefined" && typeof document !== "undefined";
  if (!canPortal) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <button
            aria-label="Cerrar lightbox"
            className="absolute inset-0 cursor-zoom-out bg-black/70"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="relative z-[1000] mx-4 w-full max-w-6xl"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
              {/* Top bar */}
              <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between gap-3 p-3">
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
                  {safeImages.length > 0 ? `${currentIndex + 1} / ${safeImages.length}` : "—"}
                </div>

                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white/90 backdrop-blur transition hover:bg-white/20"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main media */}
              <div className="relative flex max-h-[80vh] items-center justify-center bg-black">
                {activeSrc ? (
                  <img
                    src={activeSrc}
                    alt={activeAlt}
                    className="h-auto w-auto max-h-full max-w-full object-contain"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                    Imagen no disponible
                  </div>
                )}

                {/* Nav */}
                {hasMany && (
                  <>
                    <button
                      aria-label="Anterior"
                      onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      aria-label="Siguiente"
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption */}
              {activeAlt ? (
                <div className="border-t border-white/10 bg-black/60 px-5 py-4 text-sm text-white/80">
                  {activeAlt}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}