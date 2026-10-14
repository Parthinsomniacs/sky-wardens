import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/gyByhwUxId8gMEwcGFU.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const boldonse = localFont({
  src: "./fonts/ZgNQjPxGPbbJUZemjB37jGA.woff2",
  variable: "--font-boldonse",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sky Wardens Private Limited | Aerospace & Defence", // | Advanced Systems & Petrochemical
    template: "%s | Sky Wardens",
  },
  description:
    "Strategic industrial capability across aerospace and defence sectors.", // across aerospace, defence, advanced systems, and petrochemical sectors.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${boldonse.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScroll>
          <Header />
          <main className="pageMain flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
