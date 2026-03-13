"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { site } from "@/data/site";
import { useScrollProgress } from "@/hooks";

type NavLink = { label: string; href: string };

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const { progress } = useScrollProgress();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Indicador activo (desktop)
  const navWrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({
    opacity: 0,
    transform: "translateX(0px)",
    width: 0,
  });

  const isHome = pathname === "/";

  const navItems: NavLink[] = useMemo(
    () => [
      { label: "Inicio", href: "/" },
      { label: "Servicios", href: "/servicios" },
      { label: "Proyectos", href: "/proyectos?view=list" },
      { label: "Proceso", href: "/proceso" },
      { label: "Blog", href: "/blog" },
      { label: "Contacto", href: "/contacto" },
    ],
    []
  );

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  }

  // Key activo para el indicador (desktop)
  const activeKey = useMemo(() => {
    if (pathname === "/") return "/";
    if (pathname?.startsWith("/servicios")) return "/servicios";
    if (pathname?.startsWith("/proyectos")) return "/proyectos";
    if (pathname?.startsWith("/proceso")) return "/proceso";
    if (pathname?.startsWith("/blog")) return "/blog";
    if (pathname?.startsWith("/contacto")) return "/contacto";
    return pathname || "/";
  }, [pathname]);

  // Scroll: transparente (sólo home) arriba, sólida al bajar + shrink suave
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú móvil al navegar
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // ESC para cerrar
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock scroll cuando mobile está abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const shouldBeTransparent = isHome && !scrolled && !mobileOpen;
  const shrink = scrolled;

  const NAVBAR_LOGO =
    "https://www.construmaxpiscinas.com/images/logo/svg/logo-navbar-mix.svg";

  function updateIndicator() {
    const wrap = navWrapRef.current;
    if (!wrap) return;

    const el = itemRefs.current[activeKey];
    if (!el) {
      setIndicatorStyle((s) => ({ ...s, opacity: 0, width: 0 }));
      return;
    }

    const wrapRect = wrap.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const left = Math.round(elRect.left - wrapRect.left);
    const width = Math.round(elRect.width);

    setIndicatorStyle({
      opacity: 1,
      transform: `translateX(${left}px)`,
      width,
    });
  }

  // Indicador: recalcular en cambios de ruta + resize
  useLayoutEffect(() => {
    updateIndicator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, shrink]);

  useEffect(() => {
    function onResize() {
      updateIndicator();
    }
    window.addEventListener("resize", onResize);

    const wrap = navWrapRef.current;
    let ro: ResizeObserver | null = null;

    if (wrap && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => updateIndicator());
      ro.observe(wrap);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[60] h-[3px] bg-white/[0.08]">
          <div
            className="h-full origin-left bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#F59E0B] shadow-[0_0_12px_rgba(45,212,191,0.55)] transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${Math.max(0, Math.min(progress, 1))})` }}
            aria-hidden
          />
        </div>

        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "h-20 border-b transition-all duration-500",
            shouldBeTransparent
              ? "border-transparent bg-transparent"
              : "border-white/10 bg-zinc-950/88 md:bg-zinc-950/60 md:backdrop-blur-xl",
            shrink &&
              !shouldBeTransparent &&
              "bg-zinc-950/94 md:bg-zinc-950/72 md:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.65)]"
          )}
        >
          <div
            className={cn(
              "mx-auto flex h-20 max-w-7xl items-center justify-between px-4 transition-all duration-300",
              shrink ? "py-3" : "py-4"
            )}
          >
            {/* Brand */}
            <Link href="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50 rounded-xl">
              <motion.span
                className={cn(
                  "block w-[230px] transition-all duration-300",
                  shrink ? "h-12" : "h-14"
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <img
                  src={NAVBAR_LOGO}
                  alt="Construmax"
                  width={230}
                  height={56}
                  className={cn(
                    "w-auto select-none",
                    shrink ? "h-12" : "h-14"
                  )}
                  draggable={false}
                  loading="eager"
                />
              </motion.span>
            </Link>

            {/* Desktop nav + indicador */}
            <div className="hidden lg:ml-10 lg:flex items-center gap-3 xl:ml-16">
              <div
                ref={navWrapRef}
                className="relative flex items-center gap-0.5"
              >
                {/* indicador animado */}
                <motion.span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -bottom-1 h-[2px] rounded-full",
                    "bg-gradient-to-r from-[#2DD4BF] to-[#1D4ED8] shadow-[0_0_14px_rgba(45,212,191,0.5)]"
                  )}
                  animate={{
                    x: parseFloat(indicatorStyle.transform?.toString().replace(/[^0-9.-]/g, "") || "0"),
                    width: indicatorStyle.width,
                    opacity: indicatorStyle.opacity,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />

                {navItems.map((item) => {
                  const link = item as NavLink;
                  const active = isActive(link.href);

                  return (
                    <motion.div
                      key={link.href}
                      onMouseEnter={() => {
                        if (!navWrapRef.current) return;
                        const node = itemRefs.current[link.href];
                        if (!node) return;

                        const wrapRect = navWrapRef.current.getBoundingClientRect();
                        const elRect = node.getBoundingClientRect();
                        const left = Math.round(elRect.left - wrapRect.left);
                        const width = Math.round(elRect.width);

                        setIndicatorStyle({
                          opacity: 1,
                          transform: `translateX(${left}px)`,
                          width,
                        });
                      }}
                      onMouseLeave={() => updateIndicator()}
                    >
                      <Link
                        href={link.href}
                        ref={(node) => {
                          itemRefs.current[link.href] = node;
                        }}
                        className={cn(
                          "relative rounded-2xl px-3 py-2.5 text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50",
                          active
                            ? "bg-white/[0.08] text-white"
                            : "text-white/80 hover:text-white hover:bg-white/[0.08]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Social Media Icons */}
              <div className="flex items-center gap-2">
                <motion.a
                  href={site.brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/construmaxsalta"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://wa.me/5493872782626"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </motion.a>
              </div>
              
              <MagneticButton
                href="/contacto"
                variant="primary"
                strength={0.4}
                className="px-6 py-3 text-base"
              >
                Pedir presupuesto
              </MagneticButton>
            </div>

            {/* Mobile toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-2xl p-2.5 text-white/80 hover:text-white hover:bg-white/[0.08] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50 text-xl"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ✕
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ☰
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.nav>

        {/* Mobile panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-b border-white/10 bg-zinc-950"
            >
              <div className="mx-auto max-w-6xl px-4 py-4">
                <div className="flex flex-col gap-1">
                  {/* Links */}
                  {navItems.map((item, index) => {
                      const link = item as NavLink;
                      const active = isActive(link.href);

                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            className={cn(
                              "block rounded-2xl px-4 py-3.5 text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50",
                              active
                                ? "bg-white/[0.08] text-white"
                                : "text-white/80 hover:text-white hover:bg-white/[0.08]"
                            )}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      );
                    })}

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3"
                  >
                    <Link
                      href="/contacto"
                      className={cn(
                        "block w-full rounded-2xl px-5 py-3.5 text-center text-base font-medium text-white transition",
                        "bg-[#1D4ED8]/90 hover:bg-[#1D4ED8]",
                        "ring-1 ring-white/10",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
                      )}
                    >
                      Pedir presupuesto
                    </Link>
                  </motion.div>

                  {/* Detalle pro sutil */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-white/70"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
                        Diseño premium
                      </span>
                      <span className="text-white/30">•</span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                        Presupuesto rápido
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Overlay mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
