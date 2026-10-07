import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

const montserratSans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aldair Rutte | Sacrament Meetings",
    template: "%s | Sacrament Meetings",
  },
  description: "Find the ward's latest sacrament meetings and upcoming dates.",
  metadataBase: new URL('https://sacrament-meetings-iota-one.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"
      className={`${montserratSans.variable} h-full antialiased`}
    >
      <body className="max-w-300 mx-auto min-h-full flex flex-col">
        <SessionProvider>
          <Header />

          {children}
          
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
