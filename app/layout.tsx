import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import { jsonLd } from "@/lib/json-ld";

const manrope = localFont({
  src: [
    { path: "../public/fonts/manrope-wght--extralight.ttf", weight: "200" },
    { path: "../public/fonts/manrope-wght--light.ttf", weight: "300" },
    { path: "../public/fonts/manrope-wght--regular.ttf", weight: "400" },
    { path: "../public/fonts/manrope-wght--medium.ttf", weight: "500" },
    { path: "../public/fonts/manrope-wght--semibold.ttf", weight: "600" },
    { path: "../public/fonts/manrope-wght--bold.ttf", weight: "700" },
    { path: "../public/fonts/manrope-wght--extrabold.ttf", weight: "800" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

const sora = localFont({
  src: [
    { path: "../public/fonts/sora-wght--thin.ttf", weight: "100" },
    { path: "../public/fonts/sora-wght--extralight.ttf", weight: "200" },
    { path: "../public/fonts/sora-wght--light.ttf", weight: "300" },
    { path: "../public/fonts/sora-wght--regular.ttf", weight: "400" },
    { path: "../public/fonts/sora-wght--medium.ttf", weight: "500" },
    { path: "../public/fonts/sora-wght--semibold.ttf", weight: "600" },
    { path: "../public/fonts/sora-wght--bold.ttf", weight: "700" },
    { path: "../public/fonts/sora-wght--extrabold.ttf", weight: "800" },
  ],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PLAYZORA — Top Up Game Cepat & Aman",
    template: "%s — PLAYZORA",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: "PLAYZORA — Top Up Game Cepat & Aman",
    description: "Top up diamond, UC, dan CP untuk Mobile Legends, Free Fire, PUBG Mobile, Magic Chess Go Go, dan Call of Duty Mobile. Proses cepat 24 jam.",
    url: site.url,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "PLAYZORA — Top Up Game Cepat & Aman" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PLAYZORA — Top Up Game Cepat & Aman",
    description: "Top up diamond, UC, dan CP untuk 5 game populer. Proses cepat 24 jam.",
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${manrope.variable} ${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <meta name="theme-color" content={site.themeColor} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
