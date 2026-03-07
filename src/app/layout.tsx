import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Baloo_2 } from "next/font/google";
import "@/lib/fontawesome";
import "@/app/globals.css";
import { siteConfig } from "@/config/site";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body"
});

const displayFont = Baloo_2({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  weight: ["600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
