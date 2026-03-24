"use client";

declare global {
  interface Window {
    fbq?: MetaPixelFn;
    _fbq?: MetaPixelFn;
  }
}

export type MetaLeadSource = "whatsapp_click" | "contact_form_success";
const META_PIXEL_SCRIPT_ID = "meta-pixel-sdk";

type MetaPixelFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: MetaPixelFn;
  loaded?: boolean;
  version?: string;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (!isBrowser()) return;
  if (typeof window.fbq !== "function") return;

  window.fbq("track", eventName, params);
}

export function initMetaPixel(pixelId: string) {
  if (!isBrowser()) return;
  if (typeof window.fbq === "function") return;

  if (!document.getElementById(META_PIXEL_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = META_PIXEL_SCRIPT_ID;
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  const fbq =
    window.fbq ??
    (((...args: unknown[]) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
        return;
      }

      fbq.queue.push(args);
    }) as MetaPixelFn);

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = fbq.queue || [];
  window.fbq = fbq;

  if (!window._fbq) {
    window._fbq = fbq;
  }

  window.fbq("init", pixelId);
}

export function trackMetaPageView() {
  trackMetaEvent("PageView");
}

export function trackMetaLead(
  source: MetaLeadSource,
  extraParams: Record<string, unknown> = {}
) {
  const basePayload =
    source === "contact_form_success"
      ? {
          content_name: "Formulario de contacto",
          content_category: "Formulario",
          source,
        }
      : {
          content_name: "Contacto WhatsApp",
          content_category: "Contacto",
          source,
        };

  trackMetaEvent("Lead", {
    ...basePayload,
    ...extraParams,
  });
}
