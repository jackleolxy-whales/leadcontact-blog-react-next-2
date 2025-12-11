import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400","500","600","700"],
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leadcontact.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LeadContact Blog",
    template: "%s | LeadContact Blog",
  },
  description: "邮箱查找与数据丰富的最佳实践与指南",
  alternates: { canonical: "/" },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  openGraph: {
    type: "website",
    siteName: "LeadContact Blog",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadContact Blog",
    description: "邮箱查找与数据丰富的最佳实践与指南",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
