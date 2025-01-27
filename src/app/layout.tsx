import Footer from "@/app/_components/footer";
import { CMS_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Max Berlin Network`,
  description: `Max community based in Berlin`,
  openGraph: {
    title: `Max Berlin Network`,
    description: `Max community based in Berlin`,
    url: `https://maxberlin.network`,
    siteName: `Max Berlin Network`,
    images: [
      {
        url: `/screen.png`, // This is the preview image
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
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
