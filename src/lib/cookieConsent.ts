export type CookieConsentValue = "accepted" | "rejected";

export const COOKIE_CONSENT_KEY = "cm_cookie_consent";
export const COOKIE_CONSENT_EVENT = "cm-cookie-consent-change";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function readCookieConsent(): CookieConsentValue | null {
  if (!isBrowser()) return null;

  const storedValue = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (storedValue === "accepted" || storedValue === "rejected") {
    return storedValue;
  }

  const cookieValue = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${COOKIE_CONSENT_KEY}=`))
    ?.split("=")[1];

  if (cookieValue === "accepted" || cookieValue === "rejected") {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, cookieValue);
    return cookieValue;
  }

  return null;
}

export function writeCookieConsent(value: CookieConsentValue) {
  if (!isBrowser()) return;

  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  document.cookie = `${COOKIE_CONSENT_KEY}=${value}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
  window.dispatchEvent(
    new CustomEvent<CookieConsentValue>(COOKIE_CONSENT_EVENT, {
      detail: value,
    })
  );
}
