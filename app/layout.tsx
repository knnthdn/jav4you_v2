import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";

import Header from "@/components/Header";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
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
        className={`${roboto.className} antialiased bg-[#161618] flex flex-col min-[450px]:px-2 sm:max-w-screen-md md:mx-auto lg:max-w-screen-lg lg:px-4 xl:max-w-screen-xl 2xl:max-w-screen-2xl`}
      >
        <Header />

        <main className="flex-1 w-full h-fit flex flex-col gap-2">
          {children}
        </main>
      </body>
    </html>
  );
}
