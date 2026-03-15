"use client";

import type { ImageFormats, ProjectImage } from "@/data/projects";
import { getProjectImageSrc } from "@/data/projects";

interface ProjectCardProps {
  index: number;
  images: ProjectImage[];
  location: string;
  title: string;
  categoryLabel: string;
  resultSnippet: string;
  onClick: () => void;
  variant?: "light" | "dark";
}

export default function ProjectCard({
  index,
  images,
  location,
  title,
  categoryLabel,
  resultSnippet,
  onClick,
  variant = "dark",
}: ProjectCardProps) {
  const isDark = variant === "dark";
  const cover = images[0];
  const imageSrc = cover ? getProjectImageSrc(cover, { prefer: "avif", small: true }) : "";
  const imageSrcSet =
    cover && typeof cover !== "string" ? buildCardSrcSet(cover) : undefined;

  return (
    <div
      onClick={onClick}
      className={[
        "group relative cursor-pointer overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-2",
        isDark
          ? "border border-white/12 bg-white/[0.05]"
          : "border border-slate-200/70 bg-white",
        "shadow-[0_18px_60px_-36px_rgba(0,0,0,0.75)]",
        "hover:shadow-[0_28px_90px_-46px_rgba(0,0,0,0.85)]",
      ].join(" ")}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            srcSet={imageSrcSet}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading={index < 3 ? "eager" : "lazy"}
            decoding={index < 3 ? "sync" : "async"}
            fetchPriority={index < 3 ? "high" : "auto"}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center text-sm text-white/60">
            <div className="px-6">
              <p className="font-medium text-white/80">Fotos proximamente</p>
              <p className="mt-1 text-xs text-white/50">Este proyecto se agrego al catalogo y espera sus imagenes.</p>
            </div>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-medium text-white/90">
            {categoryLabel}
          </span>
        </div>

        {/* Hover overlay with result */}
        <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
            <p className="text-sm font-medium text-[#2DD4BF]">Resultado</p>
            <p className="mt-1 text-sm text-white/80 line-clamp-2">{resultSnippet}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              className={[
                "text-lg font-semibold transition-colors duration-300 group-hover:text-[#2DD4BF]",
                isDark ? "text-white" : "text-slate-900",
              ].join(" ")}
            >
              {title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/60">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          </div>
          
          {/* Arrow indicator */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-all duration-300 group-hover:scale-110 group-hover:border-[#2DD4BF]/30 group-hover:bg-[#2DD4BF]/10">
            <svg
              className="h-4 w-4 text-white/60 transition-colors duration-300 group-hover:text-[#2DD4BF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(45,212,191,0.5),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

function buildCardSrcSet(image: ImageFormats) {
  const entries = [
    image.smWebp ? `${image.smWebp} 320w` : undefined,
    image.smAvif ? `${image.smAvif} 480w` : undefined,
    image.src768 ? `${image.src768} 768w` : undefined,
    image.webp ? `${image.webp} 1280w` : undefined,
  ];

  const srcSet = entries.filter(Boolean).join(", ");
  return srcSet || undefined;
}
