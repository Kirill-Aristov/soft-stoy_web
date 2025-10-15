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
  // Добавить для лучшего SEO
  trailingSlash: true, // добавляет слеш в конце URL
  generateEtags: false, // отключает ETags для статического экспорта

  // Опционально: для генерации sitemap.xml автоматически
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

export default nextConfig;
