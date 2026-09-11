import type { Metadata } from "next";
import { Cousine } from "next/font/google";
import { SiteFrame } from "@/components/layout/SiteFrame";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const cousine = Cousine({
  variable: "--font-cousine",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cyber-I | Information. Investigation. Intelligence.",
  description: "Intelligence analysis, investigations, digital forensics, cyber expertise, and strategic advisory.",
  icons: {
    icon: [{ url: "/images/brand/cyberi-site-icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${cousine.variable} font-sans antialiased`}><SiteFrame>{children}</SiteFrame></body>
    </html>
  );
}
