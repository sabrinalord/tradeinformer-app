import type { Metadata } from "next";
import localFont from "next/font/local";
import ApolloWrapper from "@/lib/ApolloWrapper";
import "./globals.css";
import { BannersProvider } from "@/lib/BannersContext";
import { MenuItem, MenuResponse, WidgetData } from "./types";
import { cache } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "@/lib/fetchData";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SocialNavbar from "./components/SocialNavbar";
import Widget from "./components/Widget";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"




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


const headerMenuData: MenuResponse = await fetchHeaderMenu();
const menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];


const footerMenuData: MenuResponse = await fetchFooterMenu();
const footerMenuItems: MenuItem[] = footerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];


const fetchBanners = cache(async (): Promise<WidgetData[]> => {
  const apiUrl = `https://slothadmin.tradeinformer.com/wp-json/banner-ads/v1/list`;

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
          <Navbar headerItems={menuItems} />
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4 lg:mt-16">  
            <div className="col-span-1 sm:col-span-12 lg:col-span-3"></div>
            <div className="col-span-1 sm:col-span-12 lg:col-span-6 "> 
              <Widget type='desktop_billboard_top'></Widget>         
            </div> 
            <div className="col-span-1 sm:col-span-12 lg:col-span-3">         
               <SocialNavbar></SocialNavbar>
            </div>
          </div>
       
          {children}
          <Footer footerItems={footerMenuItems}></Footer>

          </BannersProvider>
        </ApolloWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
