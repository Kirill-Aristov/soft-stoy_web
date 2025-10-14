import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // важно для статического экспорта — отключает /_next/image
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mc.yandex.ru",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
