import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Layout from "@/features/Layout";
import { RoutingProvider } from "@/services/Routing";

import "@/styles/css/reset.css";
import "@/styles/css/global.css";
import "@/styles/css/color.css";
import "@/styles/css/custom-bootstrap.min.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "BOE",
  description: "BOE dashboard app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoutingProvider>
      <html lang="en">
        <header>
          <link
            rel="stylesheet"
            href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
          ></link>
        </header>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </RoutingProvider>
  );
}
