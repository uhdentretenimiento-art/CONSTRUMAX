"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface TiltConfig {
  max?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
  glarePosition: { x: number; y: number };
  glareOpacity: number;
}

export function useTilt({
  max = 10,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  glare = true,
  maxGlare = 0.15,
}: TiltConfig = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glarePosition: { x: 50, y: 50 },
    glareOpacity: 0,
  });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setState({
        rotateX,
        rotateY,
        scale,
        glarePosition: { x: glareX, y: glareY },
        glareOpacity: maxGlare,
      });
    },
    [max, scale, maxGlare]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setState({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      glarePosition: { x: 50, y: 50 },
      glareOpacity: 0,
    });
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
    transform: `perspective(${perspective}px) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) scale3d(${state.scale}, ${state.scale}, ${state.scale})`,
    transition: isHovering ? `transform ${speed}ms ease-out` : `transform ${speed}ms ease-out`,
  };

  const glareStyle = glare
    ? {
        background: `radial-gradient(circle at ${state.glarePosition.x}% ${state.glarePosition.y}%, rgba(255,255,255,${state.glareOpacity}), transparent 50%)`,
        opacity: state.glareOpacity > 0 ? 1 : 0,
        transition: `opacity ${speed}ms ease-out`,
      }
    : undefined;

  return { ref, style, glareStyle, isHovering };
}
