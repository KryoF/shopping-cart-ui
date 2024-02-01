import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/global.css";

import CartProvider from "@/context/cartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OnlineShop",
  description: "Technical Interview Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <CartProvider>
            {children}
          </CartProvider>
        </main>
      </body>
    </html>
  );
}
