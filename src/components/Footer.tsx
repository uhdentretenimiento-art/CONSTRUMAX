"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

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

      {/* Animated gradient line */}
      <motion.div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #2DD4BF, #1D4ED8, transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4 pt-16 pb-0">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 rounded-3xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-md md:p-10 relative overflow-hidden"
        >
          {/* Spotlight effect on hover */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_50%)]" />
          </div>

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2DD4BF]"
              >
                Sello Construmax
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-3 text-2xl font-semibold text-white md:text-3xl lg:text-4xl"
              >
                Tu proyecto puede ser el próximo{" "}
                <span className="bg-gradient-to-r from-[#2DD4BF] to-[#1D4ED8] bg-clip-text text-transparent">
                  caso destacado
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75"
              >
                Planificación técnica, ejecución cuidada y terminaciones premium
                para una piscina que mantenga valor con el paso de los años.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <MagneticButton
                href="/contacto"
                variant="primary"
                strength={0.5}
                className="px-8 py-4 text-base whitespace-nowrap"
              >
                Agendar visita técnica
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
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
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.facebook.com/construmaxsalta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar Facebook de Construmax"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#1D4ED8] hover:shadow-lg hover:shadow-[#1D4ED8]/30"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/construmaxsalta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar Instagram de Construmax"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#2DD4BF]/30 hover:shadow-lg hover:shadow-[#2DD4BF]/30"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/5493872782626"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp al +54 387 2782626"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#25D366]/30 hover:shadow-lg hover:shadow-[#25D366]/30"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Servicios
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#2DD4BF] to-transparent" />
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href="/servicios"
                    className="group inline-flex items-center gap-2 text-sm text-gray-300 transition-colors duration-300 hover:text-[#2DD4BF]"
                  >
                    <span className="h-px w-0 bg-[#2DD4BF] transition-all duration-300 group-hover:w-3" />
                    {service}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Enlaces
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#2DD4BF] to-transparent" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-gray-300 transition-colors duration-300 hover:text-[#2DD4BF]"
                  >
                    <span className="h-px w-0 bg-[#2DD4BF] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Contacto
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#2DD4BF] to-transparent" />
            </h3>
            <div className="space-y-4">
              <motion.a
                whileHover={{ x: 4 }}
                href="https://wa.me/5493872782626"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                aria-label="Escribir por WhatsApp al +54 387 2782626"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-[#1D4ED8] group-hover:shadow-lg group-hover:shadow-[#1D4ED8]/30">
                  <WhatsAppIcon className="h-4 w-4" />
                </div>
                <span className="text-sm">+54 387 2782626</span>
              </motion.a>

              <motion.a
                whileHover={{ x: 4 }}
                href="mailto:info@construmaxpiscinas.com"
                className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                aria-label="Enviar email a info@construmaxpiscinas.com"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-[#1D4ED8]/35 group-hover:shadow-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm">info@construmaxpiscinas.com</span>
              </motion.a>

              <motion.div
                whileHover={{ x: 4 }}
                className="group flex items-center gap-3 text-gray-300"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm">Pueyrredón 1323, Salta</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="border-t border-white/10 pt-8"
        >
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
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
