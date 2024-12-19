import type { Metadata } from "next";
import localFont from "next/font/local";
import ApolloWrapper from "@/lib/ApolloWrapper";
import "./globals.css";
import { BannersProvider } from "@/lib/BannersContext";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <ApolloWrapper>
          <BannersProvider>
          {children}
          </BannersProvider>
        </ApolloWrapper>
      
      </body>
    </html>
  );
}
