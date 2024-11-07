import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "stitchwell",
  description: "All in one fashion design management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={inter?.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
