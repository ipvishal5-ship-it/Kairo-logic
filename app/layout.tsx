import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const jb = JetBrains_Mono({ variable: "--font-jb", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kairologic Technology — SARFAESI Intelligence",
  description:
    "One case. One record. One source of information — from data to recovery. Intelligent SARFAESI case management for Banks, NBFCs, HFCs & ARCs.",
  openGraph: {
    title: "Kairologic Technology — SARFAESI Intelligence",
    description:
      "One case. One record. One source of information — from data to recovery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} ${jb.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-text selection:bg-accent selection:text-white">{children}</body>
    </html>
  );
}
