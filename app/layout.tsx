import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jav4You",
  description:
    "Jav4You is a free online platform that allows users to watch and download JAV videos directly from the internet. The website acts as a search engine for video, Once you find the JAV code you want, Jav4You will provides the video and option to download in different quality.",
  openGraph: {
    title: "Jav4You",
    description:
      "Jav4You is a free online platform that allows users to watch and download JAV videos directly from the internet. The website acts as a search engine for video, Once you find the JAV code you want, Jav4You will provides the video and option to download in different quality.",
    url: "https://jav4you.fun",
    siteName: "Jav4Fun",
    images: [
      {
        url: "https://i.ibb.co/kVpHqsy2/icon.png",
        width: 1200,
        height: 630,
        alt: "Jav4You Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TMHQ1NK0TP');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1E1E1E] flex flex-col h-screen`}
      >
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
