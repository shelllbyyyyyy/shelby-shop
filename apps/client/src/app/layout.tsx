import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

import MyProvider from "@/components/provider/my-provider";
import ReduxProvider from "@/components/provider/redux-provider";

import { cn } from "@/lib/utils";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "shelby Shop",
  description: "E-Commerce simplified made by love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          rajdhani.className
        )}
      >
        <ReduxProvider>
          <MyProvider>{children}</MyProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
