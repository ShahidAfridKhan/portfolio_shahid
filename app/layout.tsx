import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";
import StarsWrapper from "@/components/main/stars-wrapper";
import ClientProviders from "@/components/main/client-providers";
import ThemeToggle from "@/components/main/theme-toggle";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      {/* Inline script to restore saved theme before first paint — prevents flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'light') document.documentElement.classList.add('light-mode');
                } catch(e){}
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "bg-black overflow-x-hidden",
          inter.className
        )}
        suppressHydrationWarning
      >
        <StarsWrapper />
        <ClientProviders />
        <Navbar />
        <ThemeToggle />
        {children}
        <Footer />

      </body>
    </html>
  );
}
