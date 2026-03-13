"use client";

import {
  startTransition,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";

export default function HomeDeferredSections() {
  return (
    <>
      <DeferredSection
        minHeight={360}
        load={() => import("@/components/AboutProjectsParallaxGroup")}
      />
      <DeferredSection
        minHeight={260}
        load={() => import("@/components/ServicesSection")}
        componentProps={{ maxItems: 12 }}
      />
      <DeferredSection
        minHeight={220}
        load={() => import("@/components/ProcessSection")}
      />
      <DeferredSection
        minHeight={220}
        load={() => import("@/components/TestimonialsSection")}
      />
    </>
  );
}

type DeferredModule<TProps> = Promise<{ default: ComponentType<TProps> }>;

function DeferredSection<TProps extends object>({
  load,
  componentProps,
  minHeight,
}: {
  load: () => DeferredModule<TProps>;
  componentProps?: TProps;
  minHeight: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractionReady, setIsInteractionReady] = useState(false);
  const [LoadedComponent, setLoadedComponent] =
    useState<ComponentType<TProps> | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isInteractionReady) {
      return;
    }

    if (!("matchMedia" in window)) {
      setIsInteractionReady(true);
      return;
    }

    const requiresInteraction = window.matchMedia("(max-width: 767px)").matches;
    if (!requiresInteraction) {
      setIsInteractionReady(true);
      return;
    }

    const unlock = () => {
      setIsInteractionReady(true);
    };

    if (window.scrollY > 0) {
      unlock();
      return;
    }

    window.addEventListener("scroll", unlock, { passive: true, once: true });
    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("wheel", unlock, { passive: true, once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("scroll", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [isInteractionReady]);

  useEffect(() => {
    if (isVisible || !isInteractionReady) return;

    const target = placeholderRef.current;
    if (!target) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "64px 0px", threshold: 0.15 }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [isInteractionReady, isVisible]);

  useEffect(() => {
    if (!isVisible || LoadedComponent) {
      return;
    }

    let cancelled = false;

    load().then((module) => {
      if (cancelled) {
        return;
      }

      startTransition(() => {
        setLoadedComponent(() => module.default);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [LoadedComponent, isVisible, load]);

  if (LoadedComponent) {
    return <LoadedComponent {...(componentProps ?? ({} as TProps))} />;
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
