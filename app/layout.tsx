import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { CollectionProvider } from "@/context/CollectionContext";
import { SettingsProvider } from "@/context/SettingsContext";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TinyStepsArtLTD",
  description: "Modern Vintage Junk Journal Kits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-charcoal dark:text-stone-200 font-display transition-colors duration-300">
        <ProductProvider>
          <CollectionProvider>
            <CartProvider>
              <SettingsProvider>
                {children}
                <CartDrawer />
              </SettingsProvider>
            </CartProvider>
          </CollectionProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
