import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import Layout from "@/features/Layout";
import { RoutingProvider } from "@/services/Routing";

import "@/styles/css/reset.css";
import "@/styles/css/global.css";
import "@/styles/css/color.css";
import "@/styles/css/custom-bootstrap.min.css";

const robotoFont = Roboto({
  variable: "--roboto",
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
      <NuqsAdapter>
        <html lang="en">
          <head>
            <link
              rel="stylesheet"
              href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
            />
          </head>
          <body className={`${robotoFont.variable}`}>
            <Layout>{children}</Layout>
          </body>
        </html>
      </NuqsAdapter>
    </RoutingProvider>
  );
}
