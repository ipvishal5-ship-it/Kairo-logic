import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Kairologic Technology | Bring structure. Move work forward.",
  description:
    "Connected records, document automation and clear dashboards. Workflow implementation configured around your team.",
  openGraph: {
    title: "Kairologic Technology",
    description: "Bring structure. Move work forward.",
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
