"use client";

import { useEffect } from "react";

/**
 * Componente global que proporciona protección de imágenes a nivel de documento
 * Bloquea drag, contextmenu (clic derecho) y selección en todos los img, picture, video tags
 * 
 * Debería envolver todo el contenido en el layout raíz
 */
export default function ImageProtectionProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  useEffect(() => {
    const handleImageDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      
      // Proteger img, picture, video (las etiquetas más comunes para media)
      if (
        target.matches("img, picture, video") ||
        target.closest("img, picture, video")
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleImageContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Bloquear menú contextual en img tags
      if (target.tagName.toLowerCase() === "img") {
        e.preventDefault();
        return false;
      }
    };

    // Listeners globales para protección
    document.addEventListener("dragstart", handleImageDragStart as EventListener);
    document.addEventListener("contextmenu", handleImageContextMenu as EventListener);

    return () => {
      document.removeEventListener("dragstart", handleImageDragStart as EventListener);
      document.removeEventListener("contextmenu", handleImageContextMenu as EventListener);
    };
  }, []);

  return <>{children ?? null}</>;
}
