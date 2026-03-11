import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Mail, Phone, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Construmax Piscinas",
  description:
    "Términos y condiciones de uso del sitio web y servicios de Construmax.",
  robots: { index: false, follow: false },
};

const lastUpdated = "27 de febrero de 2026";

const sections = [
  {
    title: "1. Aceptación de los Términos",
    blocks: [
      {
        type: "p",
        text: `Al acceder y utilizar este sitio web, aceptás estos Términos y Condiciones. Si no estás de acuerdo con alguno de los términos, te pedimos que no uses el sitio.`,
      },
    ],
  },
  {
    title: "2. Uso del Sitio Web",
    blocks: [
      {
        type: "p",
        text: "Te comprometés a utilizar el sitio de manera responsable y conforme a la ley. Está prohibido:",
      },
      {
        type: "ul",
        items: [
          "Usar el sitio con fines ilícitos o no autorizados.",
          "Interferir con el funcionamiento del sitio o sus sistemas.",
          "Intentar acceder a información restringida sin autorización.",
        ],
      },
    ],
  },
  {
    title: "3. Propiedad Intelectual",
    blocks: [
      {
        type: "p",
        text: `El contenido, diseño, textos, imágenes y logotipos del sitio son propiedad de CONSTRUMAX o se utilizan con autorización. No está permitida su reproducción total o parcial sin consentimiento previo.`,
      },
    ],
  },
  {
    title: "4. Presupuestos y Contratos",
    blocks: [
      {
        type: "p",
        text: `Los presupuestos brindados a través del sitio o por canales de contacto tienen carácter orientativo hasta su confirmación formal. El alcance, plazos y condiciones finales se establecen en el contrato o acuerdo correspondiente.`,
      },
    ],
  },
  {
    title: "5. Garantías",
    blocks: [
      {
        type: "p",
        text: `Las garantías aplicables dependen del servicio contratado y serán informadas de manera específica en cada presupuesto/contrato. El uso indebido, falta de mantenimiento o intervención de terceros puede afectar la cobertura.`,
      },
    ],
  },
  {
    title: "6. Limitación de Responsabilidad",
    blocks: [
      {
        type: "p",
        text: `CONSTRUMAX no será responsable por daños indirectos, pérdida de datos o interrupciones derivadas del uso del sitio. Nos esforzamos por mantener la información actualizada, pero puede haber errores u omisiones.`,
      },
    ],
  },
  {
    title: "7. Enlaces a Terceros",
    blocks: [
      {
        type: "p",
        text: `El sitio puede contener enlaces a sitios de terceros. CONSTRUMAX no controla ni es responsable por el contenido o prácticas de dichos sitios.`,
      },
    ],
  },
  {
    title: "8. Modificaciones",
    blocks: [
      {
        type: "p",
        text: `Podemos modificar estos términos en cualquier momento. Publicaremos la versión actualizada en esta página e indicaremos la fecha de última actualización.`,
      },
    ],
  },
  {
    title: "9. Ley Aplicable",
    blocks: [
      {
        type: "p",
        text: `Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Ante cualquier disputa, las partes se someterán a los tribunales competentes.`,
      },
    ],
  },
  {
    title: "10. Contacto",
    blocks: [
      {
        type: "p",
        text: `Si tenés dudas sobre estos Términos y Condiciones, podés contactarnos a través de:`,
      },
      {
        type: "ul",
        items: ["Email: info@construmaxpiscinas.com", "WhatsApp: +54 387 2782626"],
      },
    ],
  },
] as const;

export default function TerminosPage() {
  return (
    <main>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="absolute inset-0 -z-10 opacity-[0.35] bg-[radial-gradient(55%_55%_at_8%_14%,rgba(14,165,233,0.30),transparent_60%),radial-gradient(45%_45%_at_92%_88%,rgba(29,78,216,0.20),transparent_60%)]" />

        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#86EFAC]">
              Legal
            </p>

            <h1 className="mt-3 text-3xl font-semibold md:text-5xl">
              Términos y{" "}
              <span className="bg-gradient-to-r from-[#2DD4BF] to-[#1D4ED8] bg-clip-text text-transparent">
                Condiciones
              </span>
            </h1>

            <p className="mt-4 text-sm text-white/70">
              Última actualización: {lastUpdated}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
              <Scale className="h-3.5 w-3.5" />
              Condiciones de uso y alcance contractual
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-4xl rounded-3xl border border-[color:var(--cm-border)] bg-[color:var(--cm-card)] p-6 shadow-[0_24px_70px_-45px_rgba(2,6,23,0.55)] md:p-10">
          <div className="space-y-10">
            {sections.map((sec) => (
              <div key={sec.title}>
                <h2 className="text-xl font-semibold text-[color:var(--cm-text)]">
                  {sec.title}
                </h2>

                <div className="mt-4 space-y-4">
                  {sec.blocks.map((b, idx) => {
                    if (b.type === "p") {
                      return (
                        <p
                          key={idx}
                          className="text-sm leading-relaxed text-[color:var(--cm-muted)] md:text-[15px]"
                        >
                          {b.text}
                        </p>
                      );
                    }

                    return (
                      <ul
                        key={idx}
                        className="list-disc pl-5 text-sm leading-relaxed text-[color:var(--cm-muted)] space-y-2"
                      >
                        {b.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
              <FileText className="h-4 w-4" />
              Consultas sobre términos
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <a
                href="mailto:info@construmaxpiscinas.com"
                className="inline-flex items-center gap-2 transition hover:text-[#1D4ED8]"
              >
                <Mail className="h-4 w-4" />
                info@construmaxpiscinas.com
              </a>
              <a
                href="tel:+543872782626"
                className="inline-flex items-center gap-2 transition hover:text-[#1D4ED8]"
              >
                <Phone className="h-4 w-4" />
                +54 387 2782626
              </a>
            </div>

            <div className="mt-4">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#374151]"
              >
                Contactar al equipo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

