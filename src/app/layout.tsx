import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ImageProtectionProvider from "@/components/ImageProtectionProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.construmaxpiscinas.com"),
  title: {
    default: "Construmax Piscinas",
    template: "%s | Construmax Piscinas",
  },
  description: "Construcción, reparación y mantenimiento de piscinas en Salta.",
  openGraph: {
    title: "Construmax Piscinas",
    description:
      "Construcción, reparación y mantenimiento de piscinas en Salta.",
    url: "https://www.construmaxpiscinas.com",
    siteName: "Construmax Piscinas",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://www.construmaxpiscinas.com/images/logo/png/construmax_horizontal_color.png",
      },
    ],
  },
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "https://www.construmaxpiscinas.com/images/favicon/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "https://www.construmaxpiscinas.com/images/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "https://www.construmaxpiscinas.com/images/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://www.construmaxpiscinas.com/images/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "https://www.construmaxpiscinas.com/images/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "https://www.construmaxpiscinas.com/images/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

const SITE_URL = "https://www.construmaxpiscinas.com";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Construmax Piscinas",
      url: SITE_URL,
      inLanguage: "es-AR",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Construmax Piscinas",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo/png/construmax_horizontal_color.png`,
      image: `${SITE_URL}/images/logo/png/construmax_horizontal_color.png`,
      priceRange: "$$",
      telephone: "+54 387 2782626",
      email: "info@construmaxpiscinas.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pueyrredon 1323",
        addressLocality: "Salta",
        addressRegion: "Salta",
        addressCountry: "AR",
      },
      areaServed: [
        { "@type": "City", name: "Salta" },
        { "@type": "City", name: "Jujuy" },
      ],
      sameAs: [
        "https://www.facebook.com/construmaxsalta",
        "https://www.instagram.com/construmaxsalta",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+54 387 2782626",
          contactType: "customer service",
          email: "info@construmaxpiscinas.com",
          areaServed: "AR",
          availableLanguage: ["es"],
        },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
    },

    // Services (te ayuda a rankear por intención)
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Construcción de piscinas",
      provider: { "@type": "LocalBusiness", name: "Construmax Piscinas", url: SITE_URL },
      areaServed: { "@type": "AdministrativeArea", name: "Salta" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Mantenimiento de piscinas",
      provider: { "@type": "LocalBusiness", name: "Construmax Piscinas", url: SITE_URL },
      areaServed: { "@type": "AdministrativeArea", name: "Salta" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Reparación de piscinas",
      provider: { "@type": "LocalBusiness", name: "Construmax Piscinas", url: SITE_URL },
      areaServed: { "@type": "AdministrativeArea", name: "Salta" },
    },

    // FAQ global (lo ideal es después hacerlo por página también)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuánto cuesta construir una piscina?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El costo depende del tamaño, el terreno, el tipo de construcción y el equipamiento. En Construmax realizamos presupuestos personalizados.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto tarda la construcción de una piscina?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El tiempo varía según el proyecto. En promedio, una obra residencial puede tomar entre 30 y 45 días.",
          },
        },
        {
          "@type": "Question",
          name: "¿En qué zonas trabajan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trabajamos principalmente en Salta y Jujuy. Consultanos si tu proyecto está en otra zona.",
          },
        },
      ],
    },
  ];

  return (
    <html lang="es-AR" className="dark" suppressHydrationWarning>
      <body className={`${manrope.variable} ${sora.variable} min-h-dvh antialiased`}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ImageProtectionProvider>
          <Navbar />
          <div className="pt-16">{children}</div>
          <Footer />
          <ScrollToTop />
        </ImageProtectionProvider>
      </body>
    </html>
  );
}