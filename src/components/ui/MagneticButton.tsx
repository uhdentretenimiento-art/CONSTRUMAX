"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  radius = 150,
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  void strength;
  void radius;

  const variants = {
    primary: "bg-[#1D4ED8]/90 hover:bg-[#1D4ED8] text-white ring-1 ring-white/10",
    secondary: "bg-white/[0.06] hover:bg-white/[0.10] text-white border border-white/15",
    outline: "border border-white/20 hover:bg-white/[0.05] text-white",
    ghost: "hover:bg-white/[0.05] text-white/80 hover:text-white",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition-colors overflow-hidden",
        variants[variant],
        className
      )}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 26,
      }}
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.98 }}
      style={{
        boxShadow: isHovering
          ? "0 12px 28px -18px rgba(37, 99, 235, 0.65), 0 0 0 1px rgba(255,255,255,0.10)"
          : "0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        }}
        animate={isHovering ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      <span className="relative z-10">{children}</span>
    </Component>
  );
}
