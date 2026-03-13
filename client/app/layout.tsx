import { Navbar } from "@/components/Navbar";
import { DiagonalGrid } from "@/components/ui/diagonal-grid";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/auth-context";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frame Gen | AI YouTube Thumbnail Generator",
  description:
    "Generate irresistible, scroll-stopping thumbnails for YouTube, Instagram, and TikTok in seconds using advanced AI. No design skills needed.",
  keywords: [
    "AI thumbnail generator",
    "YouTube thumbnails",
    "Instagram reels",
    "TikTok thumbnails",
    "AI design tool",
    "CTR optimization",
  ],
  authors: [{ name: "Frame Gen Team" }],
  openGraph: {
    title: "Frame Gen | AI YouTube Thumbnail Generator",
    description:
      "Generate irresistible, scroll-stopping thumbnails in seconds.",
    url: "https://frame-gen.dxksh.tech",
    siteName: "Frame Gen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frame Gen | AI YouTube Thumbnail Generator",
    description:
      "Generate irresistible, scroll-stopping thumbnails in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", figtree.variable)}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {/* Diagonal Grid with Light Theme - global fixed background */}
            <DiagonalGrid />
            <Toaster />
            <Navbar />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
