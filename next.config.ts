import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/images/:path*",
        destination: "/api/storage/images/:path*",
      },
      {
        source: "/videos/:path*",
        destination: "/api/storage/videos/:path*",
      },
    ];
  },
  images: {
    qualities: [65, 70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.construmaxpiscinas.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
