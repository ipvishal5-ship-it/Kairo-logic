import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import AnalyticsTracker from "@/components/analytics-tracker";
import { SITE_CONFIG } from "@/lib/site-config";
import { getOrganizationJsonLd } from "@/lib/seo-schema";
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

const googleSiteVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Kairologic Technologies | Technology built around your work",
    template: "%s | Kairologic Technologies",
  },
  description:
    "Business systems, document workflows and connected information. Kairologic Technologies designs and configures technology around the way your team works.",
  keywords: [
    "Business workflow automation",
    "SARFAESI management software",
    "eCourt filing automation",
    "Manufacturing execution software",
    "Document workflow systems",
    "Legal tech India",
    "Business process automation India",
    "Enterprise workflow platform",
  ],
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: "Kairologic Technologies | Technology built around your work",
    description:
      "Business systems, document workflows and connected information configured around the way your team works.",
    url: SITE_CONFIG.url,
    siteName: "Kairologic Technologies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairologic Technologies | Technology built around your work",
    description:
      "Business systems, document workflows and connected information configured around the way your team works.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = getOrganizationJsonLd();

  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${hankenGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className={hankenGrotesk.className}>
        {children}
        <Analytics />
        <SpeedInsights />
        <AnalyticsTracker
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          clarityId={process.env.NEXT_PUBLIC_CLARITY_ID}
        />
      </body>
    </html>
  );
}
