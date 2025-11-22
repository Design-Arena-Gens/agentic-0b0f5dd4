import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const display = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Rhythm Oasis | Algerian Dance Trainer",
  description:
    "Interactive rhythm lab that helps kids groove confidently to Algerian chaâbi, rai, and Amazigh beats."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-sand text-deepBlue font-body antialiased">
        {children}
      </body>
    </html>
  );
}
