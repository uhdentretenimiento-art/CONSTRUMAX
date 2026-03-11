"use client";

import { useEffect, useRef } from "react";

interface ProtectedImageOptions {
  showAlert?: boolean;
  alertMessage?: string;
}

/**
 * Hook para proteger imágenes contra drag, clic derecho y selección
 * Puede usarse en elementos específicos que requieran protección adicional
 * 
 * @example
 * const { ref } = useProtectedImage({ showAlert: true });
 * return <img ref={ref} src="..." alt="..." />;
 */
export function useProtectedImage({
  showAlert = false,
  alertMessage = "Esta imagen está protegida",
}: ProtectedImageOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Bloquear drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Bloquear contextmenu (clic derecho)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      if (showAlert) {
        alert(alertMessage);
      }
      return false;
    };

    element.addEventListener("dragstart", handleDragStart as unknown as EventListener);
    element.addEventListener("contextmenu", handleContextMenu as unknown as EventListener);

    return () => {
      element.removeEventListener("dragstart", handleDragStart as unknown as EventListener);
      element.removeEventListener("contextmenu", handleContextMenu as unknown as EventListener);
    };
  }, [showAlert, alertMessage]);

  return { ref };
}
