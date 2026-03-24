"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export { m };

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
