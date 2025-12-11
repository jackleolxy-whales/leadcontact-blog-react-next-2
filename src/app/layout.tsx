import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400","500","600","700"],
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leadcontact.ai";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LeadContact Blog",
    template: "%s | LeadContact Blog",
  },
  description: "Find verified emails, phone numbers & decision-makers — perfect for sales prospecting, lead generation & recruiting.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.ico?v=20251211", type: "image/x-icon" }],
    shortcut: [{ url: "/favicon.ico?v=20251211" }],
    apple: [{ url: "/favicon.ico?v=20251211" }],
  },
  openGraph: {
    type: "website",
    siteName: "LeadContact Blog",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadContact Blog",
    description: "Find verified emails, phone numbers & decision-makers — perfect for sales prospecting, lead generation & recruiting.",
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
      <head>
        <Script
          src="https://app.leadcontact.ai/monitor-lc.js"
          strategy="beforeInteractive"
        />
        <Script id="lc-init" strategy="afterInteractive">
          {`(function(){
            var w = window;
            if (w.LCTrack && typeof w.LCTrack.init === 'function') {
              w.LCTrack.init({ abbrev_name: 'LC Blog page' });
            }
          })();`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z57ZGZBS7X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z57ZGZBS7X');
          `}
        </Script>
        <link rel="icon" href="/favicon.ico?v=20251211" />
        <link rel="shortcut icon" href="/favicon.ico?v=20251211" />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
