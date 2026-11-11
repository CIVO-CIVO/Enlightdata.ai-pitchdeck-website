import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/content";
import "./globals.css";

// Self-hosted copies of the Google Fonts files (latin, variable weight; SIL OFL 1.1, see app/fonts),
// so the build never depends on fetching from Google Fonts.
const inter = localFont({ src: "./fonts/inter-latin-wght.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });
const interTight = localFont({ src: "./fonts/inter-tight-latin-wght.woff2", variable: "--font-inter-tight", display: "swap", weight: "100 900" });
const mono = localFont({ src: "./fonts/jetbrains-mono-latin-wght.woff2", variable: "--font-jetbrains", display: "swap", weight: "100 800" });

// link previews need an absolute URL that resolves: the Vercel production domain when built there
const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : site.url;

const title = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  // investor pitch site — kept out of search engines until the founders decide otherwise
  robots: { index: false, follow: false },
  openGraph: { type: "website", siteName: site.name, title, description: site.description, url: "/", locale: "en_GB" },
  twitter: { card: "summary_large_image", title, description: site.description },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
