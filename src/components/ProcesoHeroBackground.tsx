"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks";

const VIDEO_DESKTOP_WEBM =
  "https://www.construmaxpiscinas.com/videos/hero/video-proceso.webm";

const VIDEO_MOBILE_WEBM =
  "https://www.construmaxpiscinas.com/videos/hero/video-proceso-mobile.webm";

const VIDEO_MP4 =
  "https://www.construmaxpiscinas.com/videos/hero/video-proceso.mp4";

export default function ProcesoHeroBackground() {
  const { scrollY } = useScrollProgress();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    const video = videoRef.current;
    if (!video) return;

    video.load();

    void video.play().catch(() => {
      // If autoplay is blocked, the black background remains visible.
    });
  }, [isMobile]);

  // Scale + slight vertical drift for a smooth parallax feel while scrolling.
  const videoScale = Math.max(1.04, 1.14 - scrollY * 0.00006);
  const videoY = Math.min(36, scrollY * 0.045);
  const overlayOpacity = Math.max(0.72, 0.9 - scrollY * 0.00018);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 -z-40 bg-black"
        style={{ scale: videoScale, y: videoY }}
      >
        <video
          key={isMobile ? "mobile-webm" : "desktop"}
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? "metadata" : "auto"}
        >
          {isMobile ? (
            <source src={VIDEO_MOBILE_WEBM} type="video/webm" />
          ) : (
            <>
              <source src={VIDEO_DESKTOP_WEBM} type="video/webm" />
              <source src={VIDEO_MP4} type="video/mp4" />
            </>
          )}
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
