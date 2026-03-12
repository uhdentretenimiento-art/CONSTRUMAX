"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  once?: boolean;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className,
  duration = 1.4,
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      if (!once) {
        setDisplayValue(0);
      }
      return;
    }

    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [duration, isInView, once, shouldReduceMotion, value]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}
