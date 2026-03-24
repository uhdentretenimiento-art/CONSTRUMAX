"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type MetaLeadSource = "whatsapp_click" | "contact_form_success";

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
