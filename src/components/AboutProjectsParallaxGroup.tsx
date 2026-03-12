"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AboutUsSection from "@/components/AboutUsSection";
import ProjectsSection from "@/components/ProjectsSection";
import { useParallax } from "@/hooks";

const ABOUT_BG_AVIF = "https://www.construmaxpiscinas.com/videos/hero/video-about.avif";
const ABOUT_BG_MP4 = "https://www.construmaxpiscinas.com/videos/hero/video-about.mp4";
const ABOUT_BG_WEBM = "https://www.construmaxpiscinas.com/videos/hero/video-about.webm";
const VIDEO_PLAYBACK_RATE = 0.67;

export default function AboutProjectsParallaxGroup() {
  const backgroundY = useParallax(-0.04);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setPlaybackRate = () => {
      video.defaultPlaybackRate = VIDEO_PLAYBACK_RATE;
      video.playbackRate = VIDEO_PLAYBACK_RATE;
    };

    setPlaybackRate();
    video.addEventListener("loadedmetadata", setPlaybackRate);
    video.addEventListener("play", setPlaybackRate);

    return () => {
      video.removeEventListener("loadedmetadata", setPlaybackRate);
      video.removeEventListener("play", setPlaybackRate);
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <motion.div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" style={{ y: backgroundY }}>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full scale-[1.08] object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={ABOUT_BG_AVIF}
        >
          <source src={ABOUT_BG_WEBM} type="video/webm" />
          <source src={ABOUT_BG_MP4} type="video/mp4" />
        </video>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/72 via-slate-950/60 to-black/78" />
      <div className="pointer-events-none absolute inset-0 -z-[9] opacity-[0.34] bg-[radial-gradient(60%_60%_at_18%_10%,rgba(45,212,191,0.16),transparent_60%),radial-gradient(55%_55%_at_86%_20%,rgba(29,78,216,0.14),transparent_60%)]" />

      <AboutUsSection />
      <ProjectsSection />
    </section>
  );
}