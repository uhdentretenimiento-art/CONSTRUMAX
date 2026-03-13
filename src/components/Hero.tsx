import Link from "next/link";
import { site } from "@/data/site";

const HERO_MOBILE_IMAGE =
  "https://www.construmaxpiscinas.com/images/hero/nuevo-hero-mobile.avif";

export default function Hero() {
  const h = site.hero;

  const quickStats = [
    { value: "25+", label: "Años de trayectoria" },
    { value: "500+", label: "Proyectos entregados" },
    { value: "10 años", label: "Garantía de calidad" },
  ];

  const title = h.title;
  const premiumIndex = title.toLowerCase().lastIndexOf("premium");
  const titlePrefix = premiumIndex >= 0 ? title.slice(0, premiumIndex) : title;
  const titleSuffix =
    premiumIndex >= 0 ? title.slice(premiumIndex + "premium".length) : "";

  return (
    <section className="relative min-h-screen w-full overflow-hidden -mt-16 pt-16">
      <div aria-hidden className="absolute inset-0">
        <picture className="block h-full w-full">
          <source media="(min-width: 768px)" srcSet={h.image.src} />
          <img
            src={HERO_MOBILE_IMAGE}
            alt={h.image.alt}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={1040}
            height={975}
            className="h-full w-full object-cover object-top md:object-cover"
          />
        </picture>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/88 via-zinc-950/76 to-zinc-950/95" />
      <div className="absolute inset-0 hidden md:block bg-[radial-gradient(60%_60%_at_12%_10%,rgba(45,212,191,0.18),transparent_60%),radial-gradient(55%_55%_at_86%_18%,rgba(29,78,216,0.16),transparent_62%)]" />

      <div
        aria-hidden
        className="absolute left-1/4 top-1/4 hidden h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.24)_0%,transparent_70%)] blur-[120px] lg:block"
      />
      <div
        aria-hidden
        className="absolute bottom-1/3 right-1/4 hidden h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.22)_0%,transparent_70%)] blur-[150px] lg:block"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 pb-20 pt-12">
        <div>
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/75 md:bg-white/[0.06] md:backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
              {h.badge}
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {titlePrefix}
            {premiumIndex >= 0 ? (
              <span className="bg-gradient-to-r from-[#2DD4BF] via-[#1D4ED8] to-[#2DD4BF] bg-clip-text text-transparent">
                premium
              </span>
            ) : null}
            {titleSuffix}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {h.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={h.ctaPrimary.href}
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-[#1D4ED8]/90 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-[#1D4ED8]"
            >
              {h.ctaPrimary.label}
            </Link>
            <Link
              href={h.ctaSecondary.href}
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/[0.10]"
            >
              {h.ctaSecondary.label}
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/12 bg-black/30 p-4 md:bg-white/[0.05] md:backdrop-blur-md"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
    </section>
  );
}
