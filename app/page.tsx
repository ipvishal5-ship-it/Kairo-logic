import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "@/components/header";
import HomeHero from "@/components/home-hero";
import Footer from "@/components/footer";
import StatementSection from "@/components/statement-section";
import ShowcaseStages from "@/components/showcase-stages";
import ApproachSection from "@/components/approach-section";
import ClosingBand from "@/components/closing-band";
import { SITE_CONFIG } from "@/lib/site-config";
import { getHomePageJsonLd } from "@/lib/seo-schema";

const MorphStory = dynamic(() => import("@/components/morph-story"));

export const metadata: Metadata = {
  title: "Kairologic Technologies | Technology built around your work",
  description:
    "Business systems, document workflows and connected information. Kairologic Technologies configures technology around the way your team works.",
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: "Kairologic Technologies | Technology built around your work",
    description:
      "Business systems, document workflows and connected information. Kairologic Technologies configures technology around the way your team works.",
    url: SITE_CONFIG.url,
    siteName: "Kairologic Technologies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairologic Technologies | Technology built around your work",
    description:
      "Business systems, document workflows and connected information. Kairologic Technologies configures technology around the way your team works.",
  },
};

export default function Home() {
  const jsonLd = getHomePageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <HomeHero />
      <main id="main" className="c-main">
        <StatementSection />
        <ShowcaseStages />
        <MorphStory />
        <ApproachSection />
        <ClosingBand />
      </main>
      <Footer />
    </>
  );
}
