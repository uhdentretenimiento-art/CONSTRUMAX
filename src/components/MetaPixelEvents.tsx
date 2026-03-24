"use client";

import { useEffect } from "react";
import { trackMetaLead } from "@/lib/metaPixel";

function isWhatsAppHref(href: string) {
  return (
    href.includes("wa.me/") ||
    href.includes("api.whatsapp.com/") ||
    href.includes("whatsapp.com/")
  );
}

export default function MetaPixelEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest("a");

      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.href || "";

      if (!isWhatsAppHref(href)) return;

      trackMetaLead("whatsapp_click", {
        link_url: href,
        link_text: link.textContent?.trim() || "WhatsApp",
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
