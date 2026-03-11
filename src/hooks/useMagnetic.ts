"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface MagneticConfig {
  strength?: number;
  radius?: number;
}

export function useMagnetic({ strength = 0.3, radius = 100 }: MagneticConfig = {}) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInRange, setIsInRange] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        setIsInRange(true);
        const factor = 1 - distance / radius;
        setPosition({
          x: distanceX * strength * factor,
          y: distanceY * strength * factor,
        });
      } else {
        setIsInRange(false);
        setPosition({ x: 0, y: 0 });
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    setIsInRange(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isInRange ? "transform 0.15s ease-out" : "transform 0.4s ease-out",
  };

  return { ref, style, position, isInRange, onMouseLeave: handleMouseLeave };
}
