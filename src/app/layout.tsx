import type { Metadata } from "next";
import localFont from "next/font/local";
import ApolloWrapper from "@/lib/ApolloWrapper";
import "./globals.css";
import { BannersProvider } from "@/lib/BannersContext";
import { WidgetData } from "./types";
import { cache } from "react";


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
  title: "TradeInformer",
  description: "TradeInformer is the leading website for forex broker, CFD and retail trading industry news, providing in-depth analysis, research, interviews, and more",
};


const fetchBanners = cache(async (): Promise<WidgetData[]> => {
  const apiUrl = `https://tradeinformer.com/wp-json/banner-ads/v1/list`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch banners: ${res.statusText}`);
    }

    const banners: WidgetData[] = await res.json();
    return banners;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return []; // Return an empty array as a fallback
  }
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const banners = await fetchBanners();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <ApolloWrapper>
          <BannersProvider banners={banners}>
          {children}
          </BannersProvider>
        </ApolloWrapper>
      
      </body>
    </html>
  );
}
