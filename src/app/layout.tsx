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
  title: "Homely Health Care",
  description: "Homely Health Care provides the pinnacle of luxury home care, supported living, and complex care services. CQC rated 'Good' and dedicated to dignified, person-centred support.",
  metadataBase: new URL("https://www.homelyhealth.uk"),
  icons: {
    icon: "/logo-final.png",
    shortcut: "/logo-final.png",
    apple: "/logo-final.png",
  },
  openGraph: {
    title: "Homely Health Care | Luxury Care & Support",
    description: "Experience the pinnacle of luxury care and support with Homely Health Care. CQC regulated home care, live-in care, and supported living.",
    url: "https://www.homelyhealth.uk",
    siteName: "Homely Health Care",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homely Health Care",
    description: "Experience the pinnacle of luxury care and support.",
  },
  verification: {
    google: "2gIEfAVV_zjrsPYT1uKl1JUccbYoES_VtJflE5sU7GE",
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
