import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import StarsCanvas from "../components/canvas/StarCanvas";
import WrapProviders from "./WrapProviders";
import { Footer } from "../components/common/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Created with v0",
  generator: "meraj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="relative">
        <Toaster />
        <WrapProviders>
          <div className="fixed left-0 right-0 top-0 bottom-0 z-[-1] pointer-events-none">
            <StarsCanvas />
          </div>
          <div className="flex flex-col min-h-[100dvh] text-foreground">
            {/* <Header /> */}
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </WrapProviders>
      </body>
    </html>
  );
}
