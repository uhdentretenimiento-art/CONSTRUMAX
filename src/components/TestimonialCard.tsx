"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Star } from "lucide-react";

type TestimonialCardProps = {
  text: string;
  clientName: string;
  clientRole?: string;
  service?: string;
  projectType?: string;
  date?: string;
  stars?: number;
};

export default function TestimonialCard({
  text,
  clientName,
  clientRole,
  service,
  projectType,
  date,
  stars = 5,
}: TestimonialCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
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
    <article
      ref={cardRef}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.01]"
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 212, 191, 0.08), transparent 50%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 212, 191, 0.3), transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Stars with stagger animation */}
      <div className="mb-5 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="transition-transform duration-300"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <Star
              className={`h-4.5 w-4.5 transition-all duration-300 ${
                i < stars
                  ? "fill-[#F59E0B] text-[#F59E0B] group-hover:scale-110"
                  : "text-white/30"
              }`}
              style={{
                filter: i < stars ? "drop-shadow(0 0 4px rgba(245, 158, 11, 0.5))" : "none",
              }}
            />
          </div>
        ))}
      </div>

      <blockquote className="relative z-10 mb-6 text-sm leading-relaxed text-white/85 md:text-base group-hover:text-white/95 transition-colors duration-300">
        "{text}"
      </blockquote>

      {(projectType || date) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {projectType ? (
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80 transition-all duration-300 group-hover:bg-white/[0.15]">
              {projectType}
            </span>
          ) : null}
          {date ? (
            <span className="rounded-full border border-[#2DD4BF]/25 bg-[#2DD4BF]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2DD4BF] transition-all duration-300 group-hover:bg-[#2DD4BF]/20">
              {date}
            </span>
          ) : null}
        </div>
      )}

      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-medium text-white group-hover:text-[#2DD4BF] transition-colors duration-300">
              {clientName}
            </p>
            {clientRole ? (
              <p className="text-xs tracking-wide text-white/60">{clientRole}</p>
            ) : null}
          </div>
        </div>
        {service ? (
          <span className="rounded-full border border-[#2DD4BF]/25 bg-[#2DD4BF]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2DD4BF] transition-all duration-300 group-hover:bg-[#2DD4BF]/20">
            {service}
          </span>
        ) : null}
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute inset-x-6 bottom-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.5), transparent)`,
          opacity: isHovering ? 1 : 0,
        }}
      />
    </article>
  );
}
