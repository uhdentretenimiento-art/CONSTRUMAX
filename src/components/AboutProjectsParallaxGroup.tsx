"use client";

import { useEffect, useState } from "react";
import AboutUsSection from "@/components/AboutUsSection";
import ProjectsSection from "@/components/ProjectsSection";
import { useParallax } from "@/hooks";

const ABOUT_BG_DESKTOP =
  "https://www.construmaxpiscinas.com/videos/hero/video-about.webm";
const ABOUT_BG_MOBILE =
  "https://www.construmaxpiscinas.com/videos/hero/video-about-mobile.mp4";

export default function AboutProjectsParallaxGroup() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const backgroundY = useParallax(-0.04, isDesktop === true);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {isDesktop === true ? (
          <video
            className="absolute inset-0 h-full w-full scale-[1.15] object-cover"
            style={{ transform: `translateY(${backgroundY}px)` }}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={ABOUT_BG_DESKTOP} type="video/webm" />
          </video>
        ) : null}

        {isDesktop === false ? (
          <video
            className="absolute inset-0 h-full w-full scale-[1.03] object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={ABOUT_BG_MOBILE} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/72 via-slate-950/60 to-black/78" />
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.34] bg-[radial-gradient(60%_60%_at_18%_10%,rgba(45,212,191,0.16),transparent_60%),radial-gradient(55%_55%_at_86%_20%,rgba(29,78,216,0.14),transparent_60%)]" />

      <div className="relative z-30">
        <AboutUsSection />
        <ProjectsSection />
      </div>
    </section>
  );
}
