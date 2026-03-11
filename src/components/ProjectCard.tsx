"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ProjectImage } from "@/data/projects";
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
  const reduceMotion = useReducedMotion();
  const isDark = variant === "dark";
  const cover = images[0];
  const imageSrc = cover ? getProjectImageSrc(cover, { prefer: "avif", small: true }) : "";

  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    // Calculate tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || reduceMotion) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, reduceMotion]);



  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      whileHover={{ y: -8 }}
      animate={{
        rotateX: reduceMotion ? 0 : tilt.rotateX,
        rotateY: reduceMotion ? 0 : tilt.rotateY,
      }}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={[
        "group relative cursor-pointer overflow-hidden rounded-3xl",
        isDark
          ? "border border-white/12 bg-white/[0.05]"
          : "border border-slate-200/70 bg-white",
        "shadow-[0_18px_60px_-36px_rgba(0,0,0,0.75)]",
        "hover:shadow-[0_28px_90px_-46px_rgba(0,0,0,0.85)]",
      ].join(" ")}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 212, 191, 0.12), transparent 50%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="absolute left-4 top-4 z-10"
        >
          <span className="inline-flex items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-medium text-white/90">
            {categoryLabel}
          </span>
        </motion.div>

        {/* Hover overlay with result */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
            <p className="text-sm font-medium text-[#2DD4BF]">Resultado</p>
            <p className="mt-1 text-sm text-white/80 line-clamp-2">{resultSnippet}</p>
          </div>
        </motion.div>
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
          <motion.div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-all duration-300 group-hover:border-[#2DD4BF]/30 group-hover:bg-[#2DD4BF]/10"
            whileHover={{ scale: 1.1 }}
          >
            <svg
              className="h-4 w-4 text-white/60 transition-colors duration-300 group-hover:text-[#2DD4BF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Bottom border glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.5), transparent)`,
          opacity: isHovering ? 1 : 0,
        }}
      />
    </motion.div>
  );
}
