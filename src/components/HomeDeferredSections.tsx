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
  const [LoadedComponent, setLoadedComponent] =
    useState<ComponentType<TProps> | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible) return;

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
      { rootMargin: "160px 0px" }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

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
