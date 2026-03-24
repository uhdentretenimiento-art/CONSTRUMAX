"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookieConsent";
import { initGoogleTag, trackGooglePageView } from "@/lib/googleTag";

const GOOGLE_ANALYTICS_ID = "G-3JFSF7PXEW";
const GOOGLE_ADS_ID = "AW-18039242026";

export default function GoogleTagBootstrap() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const hasInitialized = useRef(false);

  const tagIds = useMemo(
    () => [GOOGLE_ANALYTICS_ID, GOOGLE_ADS_ID].filter(Boolean),
    []
  );

  useEffect(() => {
    setConsent(readCookieConsent());

    const handleConsentChange = (
      event: Event | CustomEvent<CookieConsentValue>
    ) => {
      if (event instanceof CustomEvent) {
        setConsent(event.detail);
        return;
      }

      setConsent(readCookieConsent());
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    };
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;
    if (hasInitialized.current) return;
    if (tagIds.length === 0) return;

    initGoogleTag(tagIds);
    hasInitialized.current = true;
  }, [consent, tagIds]);

  useEffect(() => {
    if (consent !== "accepted") return;
    if (!hasInitialized.current) return;

    const pagePath = searchParams?.size
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    trackGooglePageView(pagePath);
  }, [consent, pathname, searchParams]);

  return null;
}
