import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
