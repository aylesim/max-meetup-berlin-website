import Footer from "@/app/_components/footer";
import { CMS_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Max Berlin Network`,
  description: `Max community based in Berlin`,
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: `Max Berlin Network`,
    description: `Max community based in Berlin`,
    url: `https://maxberlin.network`,
    siteName: `Max Berlin Network`,
    images: [
      {
        url: `https://maxberlin.network/screen.png`, // Percorso assoluto all'immagine
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full h-full">
      <body className={`${inter.className} w-full h-full`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="min-h-screen w-full">{children}</div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
