import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Helloship — Real solutions. Shipped fast.",
  description:
    "Helloship is an AI-powered development studio that builds custom software, integrations, and automations for businesses that need the right solution — not a bigger team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable}`}
        style={{ fontFamily: "var(--font-dm-sans), -apple-system, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
