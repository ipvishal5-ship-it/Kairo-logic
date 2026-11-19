import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Capabilities, ContactInvitation, TechnologyFeature } from "@/components/company-sections";
import { SITE_CONFIG } from "@/lib/site-config";
import { getTechnologiesPageJsonLd } from "@/lib/seo-schema";

const canonicalUrl = `${SITE_CONFIG.url}/technologies`;

export const metadata: Metadata = {
  title: "Our Technologies | Kairologic Technologies",
  description:
    "Explore Kairologic's operational platforms: Kairologic Ops for SARFAESI tracking, Kairologic Lex for case management, Liquid Text, and e-court filing automation, and Manufacturing Suite for shop-floor tracking.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Our Technologies | Kairologic Technologies",
    description:
      "Explore Kairologic's operational platforms: Kairologic Ops for SARFAESI tracking, Kairologic Lex for case management, Liquid Text, and e-court filing automation, and Manufacturing Suite for shop-floor tracking.",
    url: canonicalUrl,
    siteName: "Kairologic Technologies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Technologies | Kairologic Technologies",
    description:
      "Explore Kairologic's operational platforms: Kairologic Ops for SARFAESI tracking, Kairologic Lex for case management, Liquid Text, and e-court filing automation, and Manufacturing Suite for shop-floor tracking.",
  },
};

export default function Technologies() {
  const jsonLd = getTechnologiesPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main" className="c-main">
        <section className="c-shell c-page-hero">
          <div>
            <p className="c-section-label">Our technologies</p>
            <h1>
              Bring the work<br />
              <em>into view.</em>
            </h1>
          </div>
          <p>
            Business information, document workflows and team reporting, configured around the way your organization operates.
          </p>
        </section>
        <section className="c-shell c-catalogue">
          <TechnologyFeature />
        </section>
        <section className="c-section c-shell">
          <div className="c-section-heading">
            <div>
              <p className="c-section-label">The capabilities behind it</p>
              <h2>
                A connected foundation<br />
                for daily work.
              </h2>
            </div>
            <p>The setup starts with your process and the information your team needs.</p>
          </div>
          <Capabilities />
        </section>
        <ContactInvitation />
      </main>
      <Footer />
    </>
  );
}
