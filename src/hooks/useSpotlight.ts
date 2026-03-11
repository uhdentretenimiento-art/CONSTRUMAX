"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface SpotlightConfig {
  size?: number;
  opacity?: number;
  color?: string;
}

export function useSpotlight({
  size = 400,
  opacity = 0.15,
  color = "255, 255, 255",
}: SpotlightConfig = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
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

  const style = {
    background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, rgba(${color}, ${opacity}), transparent 50%)`,
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.3s ease-out",
  };

  return { ref, style, position, isVisible };
}
