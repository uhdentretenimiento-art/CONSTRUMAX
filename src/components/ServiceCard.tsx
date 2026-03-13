"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Sparkles } from "lucide-react";

type ServiceCardVariant = "light" | "dark";
type ServiceIcon = React.ComponentType<{ className?: string }>;

interface ServiceCardProps {
  icon: ServiceIcon;
  title: string;
  description: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  isPopular?: boolean;
  variant?: ServiceCardVariant;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  iconBgColor,
  iconColor,
  isPopular = false,
  variant = "light",
}: ServiceCardProps) {
  const isDark = variant === "dark";
  
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

    // Calculate tilt (subtle)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
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
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={cardRef}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={[
        "group relative h-full cursor-pointer overflow-visible rounded-3xl transition-transform duration-300 hover:-translate-y-1.5",
        isDark
          ? "border border-white/12 bg-white/[0.05] backdrop-blur-xl"
          : "border border-slate-200/70 bg-white/70 backdrop-blur-xl",
        isDark
          ? "shadow-[0_18px_60px_-36px_rgba(0,0,0,0.75)] hover:shadow-[0_28px_90px_-46px_rgba(0,0,0,0.85)]"
          : "shadow-[0_14px_45px_-22px_rgba(2,6,23,0.35)] hover:shadow-[0_22px_70px_-30px_rgba(2,6,23,0.55)]",
      ].join(" ")}
    >
      {/* Badge "Más solicitado" como solapa */}
      {isPopular && (
        <div
          className={[
            "absolute left-1/2 -translate-x-1/2 -top-5 z-20 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md shadow-lg",
            isDark
              ? "border-[#F59E0B]/30 bg-[#F59E0B]/20 text-[#F59E0B]"
              : "border-[#F59E0B]/30 bg-[#F59E0B]/20 text-[#F59E0B]",
          ].join(" ")}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Más solicitado
        </div>
      )}

      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 212, 191, 0.1), transparent 50%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[rgba(45,212,191,0.2)] blur-3xl" />
        <div className="absolute -right-20 -top-24 h-52 w-52 rounded-full bg-[rgba(29,78,216,0.15)] blur-3xl" />
      </div>

      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 212, 191, 0.3), transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Icono en esquina superior derecha */}
      <div className="absolute right-7 top-7 z-10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[2deg]">
        <Icon
          className={[
            "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
            iconColor ?? (isDark ? "text-[#2DD4BF]" : "text-[#1D4ED8]"),
          ].join(" ")}
        />
      </div>

      <div className="relative z-10 p-7">
        <h3
          className={[
            "text-lg font-semibold transition-colors duration-300 pr-8",
            isDark
              ? "text-white group-hover:text-[#2DD4BF]"
              : "text-[#374151] group-hover:text-[#1D4ED8]",
          ].join(" ")}
        >
          {title}
        </h3>

        <p
          className={[
            "mt-2 text-sm leading-relaxed",
            isDark ? "text-white/70" : "text-slate-600",
          ].join(" ")}
        >
          {description}
        </p>

        <div
          className={[
            "mt-6 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300",
            isDark
              ? "text-[#2DD4BF]/80 group-hover:text-[#2DD4BF]"
              : "text-[#1D4ED8]/70 group-hover:text-[#1D4ED8]",
          ].join(" ")}
        >
          <span>Ver más</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </div>
  );
}
