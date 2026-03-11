"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks";

const POSTER =
  "https://www.construmaxpiscinas.com/images/hero/poster-proceso.avif";

const VIDEO_AVIF =
  "https://www.construmaxpiscinas.com/videos/hero/video-proceso.avif";

const VIDEO_MP4 =
  "https://www.construmaxpiscinas.com/videos/hero/video-proceso.mp4";

export default function ProcesoHeroBackground() {
  const { scrollY } = useScrollProgress();

  // Scale + slight vertical drift for a smooth parallax feel while scrolling.
  const videoScale = Math.max(1.04, 1.14 - scrollY * 0.00006);
  const videoY = Math.min(36, scrollY * 0.045);
  const overlayOpacity = Math.max(0.72, 0.9 - scrollY * 0.00018);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-50">
        <Image
          src={POSTER}
          alt="Proceso Construmax"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <motion.div
        className="pointer-events-none fixed inset-0 -z-40"
        style={{ scale: videoScale, y: videoY }}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
        >
          <source src={VIDEO_AVIF} type="video/avif" />
          <source src={VIDEO_MP4} type="video/mp4" />
        </video>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed inset-0 -z-30 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="pointer-events-none fixed inset-0 -z-20 opacity-75 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(45,212,191,0.24),transparent_60%),radial-gradient(55%_55%_at_85%_20%,rgba(29,78,216,0.2),transparent_60%)]" />
    </>
  );
}
