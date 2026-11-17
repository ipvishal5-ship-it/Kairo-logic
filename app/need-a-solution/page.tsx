import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NeedSolutionPart1 from "@/components/need-solution-part1";
import NeedSolutionPart2 from "@/components/need-solution-part2";
import { SITE_CONFIG } from "@/lib/site-config";
import { getNeedSolutionPageJsonLd } from "@/lib/seo-schema";
import "./ns.css";

const canonicalUrl = `${SITE_CONFIG.url}/need-a-solution`;
const title = "Need a Solution | How Kairologic Configures Workflows";
const description =
  "Every organisation we work with started with the same sentence: 'there must be a better way to do this.' Scattered records, manual chasing, missed deadlines, no live view.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName: "Kairologic Technologies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function NeedSolutionPage() {
  const jsonLd = getNeedSolutionPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header activeNav="need-a-solution" />
      <main id="main" className="ns-page">
        <NeedSolutionPart1 />
        <NeedSolutionPart2 />
      </main>
      <Footer />
    </>
  );
}
