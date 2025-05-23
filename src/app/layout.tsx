import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Mayank T | Video Editor & Filmmaker",
  description: "Professional video editor and filmmaker specializing in creative content, short films, and event coverage.",
  keywords: "video editor, filmmaker, creative content, short films, event coverage, motion graphics",
  openGraph: {
    title: "Mayank T | Video Editor & Filmmaker",
    description: "Professional video editor and filmmaker specializing in creative content, short films, and event coverage.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${montserrat.variable} font-sans bg-dark text-light antialiased`}>
        {children}
      </body>
    </html>
  );
}
