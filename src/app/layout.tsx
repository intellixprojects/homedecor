import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import ReduxProvider from "@/providers/ReduxProvider";
import ProductsInitializer from "@/components/ProductsInitializer";

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
  title: "Nish Mee",
  description: "Luxury Ceremic & Marble Decor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable}`}
      >
        <ReduxProvider>
          <ProductsInitializer />
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}