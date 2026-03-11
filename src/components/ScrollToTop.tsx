"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [bump, setBump] = useState(false);
  const wasVisible = useRef(false);

  useEffect(() => {
    function handleScroll() {
      const v = window.scrollY > 300;
      setVisible(v);

      // micro-bounce solo cuando pasa de oculto -> visible
      if (v && !wasVisible.current) {
        setBump(true);
        window.setTimeout(() => setBump(false), 420);
      }
      wasVisible.current = v;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollTop}
      aria-label="Volver arriba"
      className={`
        fixed bottom-6 right-6 z-50
        h-11 w-11 rounded-2xl
        border border-[color:var(--cm-border)]
        bg-[color:var(--cm-card)]
        text-[color:var(--cm-text)]
        shadow-md transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-lg
        ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }
        ${bump ? "animate-[cm-bump_420ms_ease-out]" : ""}
      `}
    >
      ↑

      {/* Keyframes inline (sin tocar config) */}
      <style jsx>{`
        @keyframes cm-bump {
          0% {
            transform: translateY(10px) scale(0.98);
          }
          55% {
            transform: translateY(-2px) scale(1.02);
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }
      `}</style>
    </button>
  );
}