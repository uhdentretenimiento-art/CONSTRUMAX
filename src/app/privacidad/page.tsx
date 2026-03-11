import type { Metadata } from "next";
import Link from "next/link";
import { FileLock2, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad | Construmax Piscinas",
  description:
    "Política de privacidad de Construmax. Conocé cómo protegemos tus datos personales.",
  robots: { index: false, follow: false },
};

const lastUpdated = "27 de febrero de 2026";

const sections = [
  {
    title: "1. Introducción",
    blocks: [
      {
        type: "p",
        text: `En CONSTRUMAX, valoramos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu información cuando visitás nuestro sitio web o utilizás nuestros servicios.`,
      },
    ],
  },
  {
    title: "2. Información que Recopilamos",
    blocks: [
      { type: "p", text: "Podemos recopilar los siguientes tipos de información:" },
      {
        type: "ul",
        items: [
          "Información de contacto: Nombre, dirección de correo electrónico, número de teléfono y dirección.",
          "Información del proyecto: Detalles sobre tu proyecto de piscina, ubicación y requerimientos específicos.",
          "Información técnica: Dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia.",
        ],
      },
    ],
  },
  {
    title: "3. Cómo Usamos tu Información",
    blocks: [
      { type: "p", text: "La información recopilada se utiliza para:" },
      {
        type: "ul",
        items: [
          "Responder consultas y brindar presupuestos.",
          "Mejorar nuestros servicios y la experiencia en el sitio.",
          "Coordinar visitas, mediciones y comunicación sobre tu proyecto.",
          "Enviar información relacionada con nuestros servicios (si corresponde).",
        ],
      },
    ],
  },
  {
    title: "4. Protección de Datos",
    blocks: [
      {
        type: "p",
        text: `Implementamos medidas de seguridad razonables para proteger tu información personal contra accesos no autorizados, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por internet o almacenamiento electrónico es 100% seguro.`,
      },
    ],
  },
  {
    title: "5. Compartir Información",
    blocks: [
      {
        type: "p",
        text: `No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto cuando sea necesario para prestar el servicio (por ejemplo, proveedores vinculados a la obra) o cuando lo exija la ley.`,
      },
    ],
  },
  {
    title: "6. Tus Derechos",
    blocks: [
      {
        type: "p",
        text: "Tenés derecho a solicitar acceso, rectificación o eliminación de tus datos personales. Para ejercer estos derechos, podés contactarnos a través de los medios indicados en la sección de contacto.",
      },
    ],
  },
  {
    title: "7. Cookies",
    blocks: [
      {
        type: "p",
        text: `Nuestro sitio puede usar cookies para mejorar la experiencia del usuario. Podés configurar tu navegador para rechazar cookies, aunque esto podría afectar el funcionamiento de algunas partes del sitio.`,
      },
    ],
  },
  {
    title: "8. Cambios a esta Política",
    blocks: [
      {
        type: "p",
        text: `Podemos actualizar esta política de privacidad ocasionalmente. Publicaremos la versión actualizada en esta página e indicaremos la fecha de última actualización.`,
      },
    ],
  },
  {
    title: "9. Contacto",
    blocks: [
      {
        type: "p",
        text: `Si tenés dudas sobre esta política de privacidad, podés contactarnos a través de:`,
      },
      {
        type: "ul",
        items: ["Email: info@construmaxpiscinas.com", "WhatsApp: +54 387 2782626"],
      },
    ],
  },
] as const;

export default function PrivacidadPage() {
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
              Política de{" "}
              <span className="bg-gradient-to-r from-[#2DD4BF] to-[#1D4ED8] bg-clip-text text-transparent">
                Privacidad
              </span>
            </h1>

            <p className="mt-4 text-sm text-white/70">
              Última actualización: {lastUpdated}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
              <FileLock2 className="h-3.5 w-3.5" />
              Tratamiento de datos personales y uso del sitio
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
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
              Contacto legal
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
                Hacer una consulta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

