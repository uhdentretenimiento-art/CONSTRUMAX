"use client";

import { ReactNode, useState } from "react";
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

  const sharedClassName = cn(
    "btn-premium relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-6 py-3 text-sm font-semibold transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    variants[variant],
    className
  );

  const sharedStyle = {
    boxShadow: isHovering
      ? "0 12px 28px -18px rgba(37, 99, 235, 0.65), 0 0 0 1px rgba(255,255,255,0.10)"
      : "0 0 0 1px rgba(255,255,255,0.04)",
  };

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={sharedClassName}
        style={sharedStyle}
      >
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={sharedClassName}
      style={sharedStyle}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
