import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import ReduxProvider from "@/providers/ReduxProvider";
import ProductsInitializer from "@/components/ProductsInitializer";
import AuthInitializer from "@/components/AuthInitializer";
import Navbar from "@/components/navbar/Navbar";
import { getCategories } from "@/lib/getCategories";

import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "NishMee — Luxury Spiritual & Home Decor",
    template: "%s | NishMee",
  },
  description:
    "Discover premium handcrafted ceramic vases, marble dust decor, luxury showpieces, spiritual idols, Buddha & monk sculptures and elegant home decor pieces crafted for timeless interiors.",
  keywords: [
    "luxury home decor", "handcrafted ceramic vases", "marble dust decor",
    "spiritual idols", "buddha monk sculptures", "luxury showpieces",
    "divine collection", "handcraft idols", "home decor india",
    "premium ceramic decor", "luxury sculptures", "nishmee",
  ],
  authors: [{ name: "NishMee", url: "https://nishmee.com" }],
  creator: "NishMee",
  publisher: "NishMee",
  openGraph: {
    type: "website", locale: "en_IN", url: "https://nishmee.com",
    siteName: "NishMee", title: "NishMee — Luxury Spiritual & Home Decor",
    description: "Premium handcrafted ceramic vases, marble decor, spiritual idols & luxury showpieces designed for elegant modern living.",
    images: [{ url: "https://nishmee.com/images/LOGO.png", width: 1200, height: 630, alt: "NishMee — Luxury Home Decor" }],
  },
  twitter: {
    card: "summary_large_image", title: "NishMee — Luxury Spiritual & Home Decor",
    description: "Premium handcrafted ceramic vases, marble decor, spiritual idols & luxury showpieces.",
    images: ["https://nishmee.com/images/LOGO.png"], creator: "@nishmee",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://nishmee.com" },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  // SERVER SIDE — categories fetch
  const categories = await getCategories();

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#111827" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
      </head>
      <body className={`${poppins.variable} ${playfair.variable}`}>
        <ReduxProvider>
          <AuthInitializer />
          <ProductsInitializer />
          <Navbar initialCategories={categories} />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}