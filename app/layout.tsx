import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import "./corporate.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="en" className={`${bricolageGrotesque.variable} ${hankenGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={hankenGrotesk.className}>{children}</body>
    </html>
  );
}

