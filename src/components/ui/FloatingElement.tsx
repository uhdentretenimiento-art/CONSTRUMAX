"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  duration = 3,
  distance = 10,
  delay = 0,
}: FloatingElementProps) {
  return (
    <div
      className={cn("animate-float-soft", className)}
      style={{
        ["--float-duration" as string]: `${duration}s`,
        ["--float-distance" as string]: `${distance}px`,
        ["--float-delay" as string]: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

interface GlowOrbProps {
  className?: string;
  color?: string;
  size?: number;
  blur?: number;
  duration?: number;
}

export function GlowOrb({
  className,
  color = "#2DD4BF",
  size = 200,
  blur = 100,
  duration = 4,
}: GlowOrbProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full animate-glow-orb",
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        ["--orb-duration" as string]: `${duration}s`,
      }}
    />
  );
}
