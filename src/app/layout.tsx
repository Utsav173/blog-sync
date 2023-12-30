import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
export const metadata: Metadata = {
  metadataBase: new URL("https://blog-sync.vercel.app"),
  title: "BlogSync",
  description:
    "Explore comprehensive tech and gaming tutorials on BlogSync, a Next.js-powered blogging platform. Learn step-by-step installation guides and discover unique content on various topics.",
  verification: {
    google: "4b4H3hr3KG4V1J6eRzWhNZDf84yIPAcR1x32o0EpF8U",
  },
  icons: {
    icon: "/favicon-96x96.png",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-icon-60x60.png",
  },
  keywords: [
    "blog",
    "nextjs",
    "blog-sync",
    "blog-sync-cricket",
    "blog-sync-football",
    "blog-sync-step-by-step",
    "blog-sync-cricket-07",
    "blog sync utsav khatri",
    "amazing install step to install cricket 07",
    "tech tutorials",
    "gaming tutorials",
    "installation guides",
    "step-by-step tutorials",
    "cricket 07 installation",
    "gaming installation guides",
    "unique content",
  ],
  openGraph: {
    images: "/android-icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-site-verification"
          content="4b4H3hr3KG4V1J6eRzWhNZDf84yIPAcR1x32o0EpF8U"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
