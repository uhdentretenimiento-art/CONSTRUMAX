"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MetaPixelEvents from "@/components/MetaPixelEvents";
import {
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookieConsent";
import { initMetaPixel, trackMetaPageView } from "@/lib/metaPixel";

const META_PIXEL_ID = "2442032603257511";

export default function MetaPixelBootstrap() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const hasInitialized = useRef(false);

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

    initMetaPixel(META_PIXEL_ID);
    hasInitialized.current = true;
  }, [consent]);

  useEffect(() => {
    if (consent !== "accepted") return;
    if (!hasInitialized.current) return;

    trackMetaPageView();
  }, [consent, pathname, searchParams]);

  if (consent !== "accepted") {
    return null;
  }

  return <MetaPixelEvents />;
}
