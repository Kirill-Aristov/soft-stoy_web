import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
import "../shared/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DOCIM - Система управления строительной документацией",
    template: "%s | DOCIM",
  },
  description:
    "Профессиональная платформа для автоматизации процессов создания, согласования и контроля разработки строительной документации. Интегрированное решение для архитекторов, инженеров и строительных компаний.",
  keywords: [
    "строительная документация",
    "проектная документация",
    "автоматизация строительства",
    "DOCIM",
    "электронный документооборот",
    "инженерные проекты",
    "строительное проектирование",
    "управление проектами",
    "CAD системы",
    "BIM технологии",
  ],
  authors: [{ name: "ООО СофтСтрой Проект" }],
  creator: "ООО СофтСтрой Проект",
  publisher: "ООО СофтСтрой Проект",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://soft-stroypro.ru/",
    siteName: "DOCIM",
    title: "DOCIM - Система управления строительной документацией",
    description:
      "Профессиональная платформа для автоматизации процессов создания, согласования и контроля разработки строительной документации.",
  },
  twitter: {
    card: "summary",
    title: "DOCIM - Система управления строительной документацией",
    description:
      "Профессиональная платформа для автоматизации процессов создания, согласования и контроля разработки строительной документации.",
  },
  alternates: {
    canonical: "https://soft-stroypro.ru/",
  },
  icons: {
    icon: "/ico.ico",
    shortcut: "/ico.ico",
    apple: "/ico.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        {/* Yandex.Metrika counter */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104583132', 'ym');
              ym(104583132, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <Image
              src="https://mc.yandex.ru/watch/104583132"
              width={1}
              height={1}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
