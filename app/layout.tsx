import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  verification: {
    google: "4b4H3hr3KG4V1J6eRzWhNZDf84yIPAcR1x32o0EpF8U",
  },
  // Add these additional fields
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
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    "web development",
    "nextjs blog",
    "tech blog",
    "react blog platform",
    "developer blog",
    "programming tutorials",
    "software engineering",
    "coding tips",
    "web development tutorials",
    "frontend development",
    "cricket 07 guides",
    "gaming tutorials",
    "EA sports games",
    "cricket gaming",
    "game modifications",
    "offline AI",
    "chrome AI features",
    "browser AI",
    "web AI integration",
    "Gemini Nano",
    "MDX blog",
    "technical writing",
    "developer resources",
    "code tutorials",
    "tech guides",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[3.5rem]">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            {/* <SiteFooter /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
