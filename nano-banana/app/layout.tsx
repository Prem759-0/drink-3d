import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nano Banana | Future of Freshness",
  description: "Premium cold-pressed juices. No preservatives, no compromises. Pure fruit, pure life.",
  keywords: ["nano banana", "cold pressed juice", "premium juice", "healthy drinks", "natural juice"],
  openGraph: {
    title: "Nano Banana | Future of Freshness",
    description: "Premium cold-pressed juices. Pure fruit, pure life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} antialiased`}>{children}</body>
    </html>
  );
}
