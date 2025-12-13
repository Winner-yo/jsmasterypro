import type { Metadata } from "next";
import localFont from "next/font/local";
// eslint-disable-next-line import/order
import React, { ReactNode } from "react";
import Providers from "./providers";
import { auth } from "../auth";
import "./globals.css";

const inter = localFont({
  src: "/fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

const spaceGrotesk = localFont({
  src: "/fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 700",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description: `DevFlow is a task management app for developers for asking and answering programming questions.
  Get help from the community and share your knowledge with others. Explore programming topics,
  languages, frameworks, mobile development, algorithms, data structures and many more.`,
  icons: {
    icon: "/images/site-logo.svg",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        <Providers session={session ?? undefined}>{children}</Providers>
      </body>
    </html>
  );
}
export default RootLayout;