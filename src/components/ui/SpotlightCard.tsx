"use client";

import { ReactNode, useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  spotlightOpacity?: number;
  tiltAmount?: number;
  scale?: number;
  borderGlow?: boolean;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "45, 212, 191", // cyan-400
  spotlightSize = 300,
  spotlightOpacity = 0.15,
  tiltAmount = 5,
  scale = 1.01,
  borderGlow = true,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });

      // Calculate tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -tiltAmount;
      const rotateY = ((x - centerX) / centerX) * tiltAmount;
      setTilt({ rotateX, rotateY });
    },
    [tiltAmount]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
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
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovering ? scale : 1})`,
        transformStyle: "preserve-3d",
        transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotlightColor}, ${spotlightOpacity}), transparent 50%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Border glow on hover */}
      {borderGlow && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-inherit transition-opacity duration-300"
          style={{
            background: `radial-gradient(${spotlightSize * 0.8}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotlightColor}, 0.4), transparent 40%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
