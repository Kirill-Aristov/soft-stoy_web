import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Оптимизация для продакшена
  output: "export",

  // Сжатие изображений
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 год
  },

  // Сжатие
  compress: true,

  // Заголовки безопасности
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },

  // Редиректы
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Переписывание путей для будущих фич
  async rewrites() {
    return [
      {
        source: "/dashboard/:path*",
        destination: "/dashboard/:path*",
      },
      {
        source: "/profile/:path*",
        destination: "/profile/:path*",
      },
      {
        source: "/docs/:path*",
        destination: "/docs/:path*",
      },
    ];
  },

  // Webpack оптимизации
  webpack: (config, { dev, isServer }) => {
    // Оптимизация для продакшена
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      };
    }

    return config;
  },

  // Переменные окружения
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Настройки для статического экспорта (если нужно)
  trailingSlash: true,
};

export default nextConfig;
