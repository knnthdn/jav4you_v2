import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


import Header from "@/components/Header";
import Footer from "@/components/Footer";


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
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
