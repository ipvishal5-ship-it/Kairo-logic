import "./globals.css";
import "./corporate.css";

export const metadata = {
  title: { default: "Kairologic Technologies | Technology built around your work", template: "%s | Kairologic Technologies" },
  description:
    "Business systems, document workflows and connected information. Kairologic Technologies designs and configures technology around the way your team works.",
  openGraph: {
    title: "Kairologic Technologies",
    description: "Technology built around your work.",
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
