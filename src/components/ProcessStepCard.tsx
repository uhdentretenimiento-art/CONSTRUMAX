"use client";

import { useRef, useState, useCallback, useEffect, type ElementType } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Clock } from "lucide-react";

interface ProcessStepCardProps {
  stepNumber: number;
  icon: ElementType;
  title: string;
  description: string;
  duration?: string;
}

export default function ProcessStepCard({
  stepNumber,
  icon,
  title,
  description,
  duration,
}: ProcessStepCardProps) {
  const Icon = icon ?? HelpCircle;

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
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
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
    <motion.div
      ref={cardRef}
      whileHover={{ y: -6 }}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900/60 p-5 pt-6 backdrop-blur-xl transition-all duration-300 hover:border-[#2DD4BF]/60 hover:bg-slate-900/80 md:p-6 md:pt-7"
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 212, 191, 0.1), transparent 50%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 212, 191, 0.4), transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(94,234,212,0.16),transparent_60%)]" />

      <div className="relative z-10 mb-2 flex items-start justify-between gap-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#2DD4BF] md:text-xl">
          {title}
        </h3>

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="shrink-0 self-start pt-0.5 text-[#2DD4BF] transition-all duration-300"
        >
          <Icon className="block h-5 w-5 md:h-5.5 md:w-5.5" />
        </motion.div>
      </div>

      {/* Description */}
      <p className="relative text-sm leading-relaxed text-white/75 transition-colors duration-300 group-hover:text-white/85 md:text-base">
        {description}
      </p>

      {/* Duration */}
      {duration ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-all duration-300 group-hover:border-[#2DD4BF]/30 group-hover:bg-[#2DD4BF]/10 group-hover:text-[#2DD4BF]"
        >
          <Clock className="h-3 w-3" />
          {duration}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
