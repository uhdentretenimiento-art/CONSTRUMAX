"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookieConsent";

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setConsent(readCookieConsent());
  }, []);

  const handleConsent = (value: CookieConsentValue) => {
    writeCookieConsent(value);
    setConsent(value);
    setPreferencesOpen(false);
  };

  const showBanner = consent === null || preferencesOpen;

  return (
    <>
      {showBanner ? (
        <div className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-6">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-white/12 bg-slate-950/95 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_90%_at_0%_100%,rgba(45,212,191,0.16),transparent_55%),radial-gradient(45%_80%_at_100%_0%,rgba(29,78,216,0.18),transparent_60%)]" />

            <div className="relative grid gap-6 p-5 md:grid-cols-[1.7fr_1fr] md:p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#2DD4BF]" />
                  Preferencias de cookies
                </div>

                <h2 className="mt-4 text-xl font-semibold md:text-2xl">
                  Usamos cookies esenciales y de medicion
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/72 md:text-[15px]">
                  Las esenciales mantienen el sitio operativo. Las de medicion
                  nos permiten analizar visitas y registrar conversiones de
                  marketing, como Meta Pixel, solo si das tu consentimiento.
                </p>

                <div className="mt-4 text-sm text-white/60">
                  Mas informacion en{" "}
                  <Link
                    href="/privacidad"
                    className="font-medium text-[#2DD4BF] transition hover:text-white"
                  >
                    Politica de Privacidad
                  </Link>
                  .
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Cookies de medicion y marketing
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">
                      Activan Meta Pixel para medir visitas, formularios y
                      clicks en WhatsApp.
                    </p>
                  </div>
                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${
                      consent === "accepted" ? "bg-[#2DD4BF]" : "bg-white/20"
                    }`}
                  />
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => handleConsent("accepted")}
                    className="rounded-2xl bg-[#1D4ED8] text-white hover:bg-[#2563EB]"
                  >
                    Aceptar medicion
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={() => handleConsent("rejected")}
                    className="rounded-2xl border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:text-white"
                  >
                    Solo esenciales
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {consent !== null ? (
        <button
          type="button"
          onClick={() => setPreferencesOpen(true)}
          className="fixed bottom-4 left-4 z-[70] inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/92 px-3 py-2 text-sm font-medium text-slate-700 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.45)] backdrop-blur transition hover:border-slate-300 hover:text-slate-950"
          aria-label="Abrir preferencias de cookies"
        >
          <Settings2 className="h-4 w-4" />
          Cookies
        </button>
      ) : null}
    </>
  );
}
