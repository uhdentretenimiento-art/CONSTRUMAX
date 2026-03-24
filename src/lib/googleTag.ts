"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type GoogleLeadSource = "whatsapp_click" | "contact_form_success";

const GOOGLE_TAG_SCRIPT_ID = "google-tag-sdk";

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
}

export function initGoogleTag(tagIds: string[]) {
  if (!isBrowser()) return;

  const ids = tagIds.filter(Boolean);
  if (ids.length === 0) return;

  if (!document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GOOGLE_TAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ids[0]}`;
    document.head.appendChild(script);
  }

  ensureDataLayer();

  if (typeof window.gtag !== "function") {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };

    window.gtag("js", new Date());
  }

  ids.forEach((id) => {
    window.gtag?.("config", id, {
      send_page_view: false,
    });
  });
}

export function trackGooglePageView(pagePath: string) {
  if (!isBrowser()) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    page_path: pagePath,
  });
}

export function trackGoogleLead(
  source: GoogleLeadSource,
  extraParams: Record<string, unknown> = {}
) {
  if (!isBrowser()) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "generate_lead", {
    source,
    ...extraParams,
  });
}
