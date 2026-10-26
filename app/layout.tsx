import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Kairologic Technology | One case. One record. Total control.",
  description:
    "Connected records, document automation and clear dashboards. Workflow implementation configured around your team.",
  openGraph: {
    title: "Kairologic Technology",
    description: "One case. One record. Total control.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
