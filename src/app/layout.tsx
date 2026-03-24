import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Manrope, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MetaPixelEvents from "@/components/MetaPixelEvents";

const Footer = dynamic(() => import("@/components/Footer"));
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

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
        url: "/api/storage/images/logo/png/construmax_vertical_color.png",
      },
    ],
  },
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/api/storage/images/favicon/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/api/storage/images/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/api/storage/images/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/api/storage/images/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/api/storage/images/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/api/storage/images/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

const SITE_URL = "https://www.construmaxpiscinas.com";
const META_PIXEL_ID = "2442032603257511";
const META_PIXEL_SCRIPT = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;
const IMAGE_PROTECTION_SCRIPT = `(function () {
  const handleDragStart = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('img, picture, video') || target.closest('img, picture, video')) {
      event.preventDefault();
    }
  };

  const handleContextMenu = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.tagName.toLowerCase() === 'img') {
      event.preventDefault();
    }
  };

  document.addEventListener('dragstart', handleDragStart);
  document.addEventListener('contextmenu', handleContextMenu);
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.NODE_ENV === "production";
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
            text: "Trabajamos principalmente en Salta y Jujuy. Consúltanos si tu proyecto está en otra zona.",
          },
        },
      ],
    },
  ];

  return (
    <html lang="es-AR" className="dark" suppressHydrationWarning>
      <head>
        {isProduction ? (
          <>
            <link rel="preconnect" href="https://www.construmaxpiscinas.com" crossOrigin="" />
            <link rel="dns-prefetch" href="https://www.construmaxpiscinas.com" />
            <Script id="meta-pixel" strategy="afterInteractive">
              {META_PIXEL_SCRIPT}
            </Script>
          </>
        ) : null}
      </head>
      <body className={`${manrope.variable} ${sora.variable} min-h-dvh antialiased`}>
        {isProduction ? (
          <>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
            <MetaPixelEvents />
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        <div className="pt-16">{children}</div>
        <Footer />
        <ScrollToTop />
        <Script id="image-protection" strategy="lazyOnload">
          {IMAGE_PROTECTION_SCRIPT}
        </Script>
      </body>
    </html>
  );
}

