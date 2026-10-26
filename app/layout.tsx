import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Kairologic Technology | Cases organised. Teams aligned.",
  description:
    "Connected records, document automation and clear dashboards. Workflow implementation configured around your team.",
  openGraph: {
    title: "Kairologic Technology",
    description: "Cases organised. Teams aligned.",
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
