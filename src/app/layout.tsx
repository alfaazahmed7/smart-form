import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import LenisProvider from "@/components/providers/lenis-provider";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SmartForm",
    template: "%s | SmartForm",
  },
  description:
    "SmartForm is an interactive form builder and chatbot widget platform. Create forms, publish them as conversational experiences, collect responses, and manage submissions from one dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            {children}
            <Analytics />
          </LenisProvider>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}