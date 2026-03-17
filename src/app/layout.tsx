import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import dynamic from "next/dynamic";

const ChatBox = dynamic(() => import("@/components/ChatBox"), {
  ssr: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500"]
});

export const metadata: Metadata = {
  title: "Homely Care | Luxury Care Residences",
  description: "Experience the pinnacle of luxury care and support.",
  icons: {
    icon: [
      { url: "/homely-logo-v50.png?v=100" },
      { url: "/homely-favicon.png?v=100", sizes: "any" }
    ],
    shortcut: "/homely-favicon.png?v=100",
    apple: "/homely-favicon.png?v=100",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} data-version="1.0.3-stable-rebuild">
      <body className="antialiased bg-[#fdfcff] text-[#1c1c1c]">
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
          <ChatBox />
        </SmoothScroll>
      </body>
    </html>
  );
}
