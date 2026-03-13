import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const Footer = () => {
  const serviceLinks = [
    "Construcción personalizada",
    "Mantenimiento",
    "Hidromasajes y Spa",
    "Reparación y remodelación",
    "Climatización",
    "Iluminación LED",
  ];

  const quickLinks = [
    { path: "/proyectos", label: "Proyectos" },
    { path: "/proceso", label: "Nuestro Proceso" },
    { path: "/blog", label: "Blog" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#1D4ED8]/20 blur-3xl"
      />
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-44 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2DD4BF]/70 to-transparent"
      />

      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #2DD4BF, #1D4ED8, transparent)",
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4 pt-16 pb-0">
        {/* CTA Banner */}
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-md md:p-10">
          {/* Spotlight effect on hover */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_50%)]" />
          </div>

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2DD4BF]">
                Sello Construmax
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
                Tu proyecto puede ser el próximo{" "}
                <span className="bg-gradient-to-r from-[#2DD4BF] to-[#1D4ED8] bg-clip-text text-transparent">
                  caso destacado
                </span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
                Planificación técnica, ejecución cuidada y terminaciones premium
                para una piscina que mantenga valor con el paso de los años.
              </p>
            </div>
            <div>
              <Link
                href="/contacto"
                className="inline-flex whitespace-nowrap rounded-2xl bg-[#1D4ED8]/90 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-[#1D4ED8]"
              >
                Agendar visita técnica
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 leading-normal">
              <span className="font-kurdis-condensed text-3xl inline-block py-1">
                <span className="inline-block bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#374151] bg-clip-text py-1 text-transparent">
                  CONSTRU
                </span>
                <span className="inline-block py-1 text-[#F59E0B]">
                  MAX
                </span>
              </span>
            </Link>

            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Más de{" "}
              <span className="font-semibold text-white">
                25 años de experiencia
              </span>
              , transformando espacios en oasis de relajación para tu hogar.
            </p>

            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/construmaxsalta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar Facebook de Construmax"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-lg hover:shadow-[#1D4ED8]/30"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/construmaxsalta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar Instagram de Construmax"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-[#2DD4BF]/30 hover:shadow-lg hover:shadow-[#2DD4BF]/30"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </a>

              <a
                href="https://wa.me/5493872782626"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp al +54 387 2782626"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-[#25D366]/30 hover:shadow-lg hover:shadow-[#25D366]/30"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Servicios
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#2DD4BF] to-transparent" />
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/servicios"
                    className="group inline-flex items-center gap-2 text-sm text-gray-300 transition-colors duration-300 hover:text-[#2DD4BF]"
                  >
                    <span className="h-px w-0 bg-[#2DD4BF] transition-all duration-300 group-hover:w-3" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Enlaces
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#2DD4BF] to-transparent" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-gray-300 transition-colors duration-300 hover:text-[#2DD4BF]"
                  >
                    <span className="h-px w-0 bg-[#2DD4BF] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Contacto
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#2DD4BF] to-transparent" />
            </h3>
            <div className="space-y-4">
              <a
                href="https://wa.me/5493872782626"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-gray-300 transition-all hover:translate-x-1 hover:text-white"
                aria-label="Escribir por WhatsApp al +54 387 2782626"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-[#1D4ED8] group-hover:shadow-lg group-hover:shadow-[#1D4ED8]/30">
                  <WhatsAppIcon className="h-4 w-4" />
                </div>
                <span className="text-sm">+54 387 2782626</span>
              </a>

              <a
                href="mailto:info@construmaxpiscinas.com"
                className="group flex items-center gap-3 text-gray-300 transition-all hover:translate-x-1 hover:text-white"
                aria-label="Enviar email a info@construmaxpiscinas.com"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-[#1D4ED8]/35 group-hover:shadow-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm">info@construmaxpiscinas.com</span>
              </a>

              <div className="group flex items-center gap-3 text-gray-300 transition-all hover:translate-x-1">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm">Pueyrredón 1323, Salta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()}{" "}
              <span
                className="font-kurdis-condensed text-white inline-block py-1"
                style={{ letterSpacing: "0.12em" }}
              >
                CONSTRUMAX
              </span>
              . Todos los derechos reservados.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {[
                { href: "/privacidad", label: "Política de Privacidad" },
                { href: "/terminos", label: "Términos y Condiciones" },
                { href: "/mapa-del-sitio", label: "Mapa del sitio" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#2DD4BF] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
