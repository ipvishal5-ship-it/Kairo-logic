import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LexHero from "@/components/lex/Hero";
import ModuleTabs from "@/components/lex/ModuleTabs";
import SevenSteps from "@/components/lex/SevenSteps";
import WatchFiling from "@/components/lex/WatchFiling";
import ZeroInstallation from "@/components/lex/ZeroInstallation";
import DocumentIntegrity from "@/components/lex/DocumentIntegrity";
import ThreeSteps from "@/components/lex/ThreeSteps";
import LexFaq from "@/components/lex/LexFaq";
import ClosingBand from "@/components/lex/ClosingBand";
import { buildProductPageJsonLd, LEX_FAQS } from "@/lib/ops-lex-faqs";
import { SITE_CONFIG } from "@/lib/site-config";
import "./lex.css";

const canonicalUrl = `${SITE_CONFIG.url}/technologies/ecourt-filing`;
const pageTitle =
  "Kairologic Lex | Case Management, Liquid Text & E-court Filing | Kairologic Technologies";
const pageDescription =
  "Kairologic Lex is a complete legal intelligence suite: structured case management, multi-document Liquid Text workspace, and automated e-court filing — all in your web browser, nothing to install.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function EcourtFilingPage() {
  const jsonLd = buildProductPageJsonLd({
    siteUrl: SITE_CONFIG.url,
    path: "/technologies/ecourt-filing",
    name: "Kairologic Lex: Legal Intelligence Suite",
    serviceType:
      "Legal case management, multi-document workspace, and e-court filing automation",
    description: pageDescription,
    breadcrumbName: "Kairologic Lex",
    faqs: LEX_FAQS,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main" className="lex-page">
        {/* Breadcrumb */}
        <div className="wrap bc">
          <Link href="/technologies">Technologies</Link>
          <span>/</span>
          <b>Kairologic Lex</b>
        </div>

        {/* Hero ("Click RUN") */}
        <LexHero />

        {/* Three Module Tabs */}
        <ModuleTabs />

        {/* Seven careful steps */}
        <SevenSteps />

        {/* Watch a filing prepare itself */}
        <WatchFiling />

        {/* Zero installation */}
        <ZeroInstallation />

        {/* Built for document integrity */}
        <DocumentIntegrity />

        {/* Three steps */}
        <ThreeSteps />

        {/* Questions, answered FAQ */}
        <LexFaq />

        {/* Closing band */}
        <ClosingBand />
      </main>
      <Footer />
    </>
  );
}
