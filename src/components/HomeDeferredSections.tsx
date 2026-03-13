"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const AboutProjectsParallaxGroup = dynamic(
  () => import("@/components/AboutProjectsParallaxGroup"),
  { ssr: false }
);
const ServicesSection = dynamic(() => import("@/components/ServicesSection"), {
  ssr: false,
});
const ProcessSection = dynamic(() => import("@/components/ProcessSection"), {
  ssr: false,
});
const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection"),
  { ssr: false }
);

export default function HomeDeferredSections() {
  return (
    <>
      <DeferredSection minHeight={360}>
        <AboutProjectsParallaxGroup />
      </DeferredSection>
      <DeferredSection minHeight={260}>
        <ServicesSection maxItems={12} />
      </DeferredSection>
      <DeferredSection minHeight={220}>
        <ProcessSection />
      </DeferredSection>
      <DeferredSection minHeight={220}>
        <TestimonialsSection />
      </DeferredSection>
    </>
  );
}

function DeferredSection({
  children,
  minHeight,
}: {
  children: React.ReactNode;
  minHeight: number;
}) {
  const [mounted, setMounted] = useState(false);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mounted) return;

    const target = placeholderRef.current;
    if (!target) return;

    if (!("IntersectionObserver" in window)) {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px 0px" }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  if (mounted) {
    return <>{children}</>;
  }

  return (
    <div
      ref={placeholderRef}
      style={{ minHeight }}
      aria-hidden
      className="w-full"
    />
  );
}
