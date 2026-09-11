import type { Metadata } from "next";
import { Cousine } from "next/font/google";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";
import "./globals.css";

const cousine = Cousine({
  variable: "--font-cousine",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Cyber-I",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Cybersecurity",
  keywords: [
    "cyber investigation",
    "digital forensics",
    "cybersecurity consultancy",
    "information analysis",
    "cyber law",
    "cybersecurity training",
    "Mumbai",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${cousine.variable} font-sans antialiased`}><SiteFrame>{children}</SiteFrame></body>
    </html>
  );
}
