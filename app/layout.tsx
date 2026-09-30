import type { Metadata } from "next";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vidavideo.xyz"),

  title: {
    default: "VIDA WEB | Professional Website Development",
    template: "%s | VIDA WEB",
  },

  description:
    "VIDA WEB creates modern, responsive and professional websites for businesses, creators and startups.",

  keywords: [
    "website development",
    "web development",
    "professional website",
    "business website",
    "website development India",
    "website developer",
    "VIDA WEB",
  ],

  authors: [
    {
      name: "VIDA WEB",
    },
  ],

  creator: "VIDA WEB",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.vidavideo.xyz/",
  },

  openGraph: {
    title: "VIDA WEB | Professional Website Development",
    description:
      "Modern websites for businesses, creators and startups.",
    url: "https://www.vidavideo.xyz/",
    siteName: "VIDA WEB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />

        <Analytics />
      </body>
    </html>
  );
}