import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ChatBox from "@/components/ChatBox";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} data-version="1.0.2-large-globe">
      <body className="antialiased bg-[#fdfcff] text-[#1c1c1c]">
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
          <ChatBox />
        </SmoothScroll>

        {/* Global SVG Filter for Pure Alpha (Black to Transparent) */}
        <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
          <svg>
            <filter id="blackToAlpha">
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        1.5 1.5 1.5 0 -0.1"
              />
            </filter>
          </svg>
        </div>
      </body>
    </html>
  );
}
