import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cloth-store.vercel.app"),
  title: {
    default: "XIV — Elegant Vogue",
    template: "%s — XIV",
  },
  description:
    "XIV Collections 23–24. Ready-to-wear built from natural fibres, cut for a long life and shipped worldwide.",
  openGraph: {
    title: "XIV — Elegant Vogue",
    description:
      "XIV Collections 23–24. Ready-to-wear built from natural fibres, cut for a long life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body className="grain min-h-screen antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
