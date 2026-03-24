import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    qualities: [65, 70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.construmaxpiscinas.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/svg/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/images/:path*",
          destination: "/api/storage/images/:path*",
        },
        {
          source: "/videos/:path*",
          destination: "/api/storage/videos/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
