import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LexHeroDiagram from "@/components/lex-hero-diagram";
import LexBeforeAfter from "@/components/lex-before-after";
import LexSections from "@/components/lex-sections";
import { buildProductPageJsonLd, LEX_FAQS } from "@/lib/ops-lex-faqs";
import { SITE_CONFIG } from "@/lib/site-config";
import "./lex.css";

const canonicalUrl = `${SITE_CONFIG.url}/technologies/ecourt-filing`;
const pageTitle = "Kairologic Lex | E-court filing | Kairologic Technologies";
const pageDescription =
  "Merging, compressing, selective OCR, paginating every page, applying the bank seal, and splitting for the portal. Complete filing preparation running directly in your web browser on any device.";

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
    name: "Kairologic Lex: Cloud E-Court Filing Automation",
    serviceType: "Cloud-based legal document preparation and e-court filing service",
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
        <div className="wrap bc">
          <Link href="/technologies">Technologies</Link>
          <span>/</span>
          <b>E-court filing (Kairologic Lex)</b>
        </div>

        <section className="wrap hero lex-hero">
          <div>
            <div className="eb">Kairologic Lex · E-court filing automation</div>
            <h1>
              A day of filing work,
              <span>automated in one click.</span>
            </h1>
            <p className="lead">
              Merging, compressing, converting scans to searchable text,
              paginating every page, applying the bank seal and splitting
              for the portal. Open your browser, drop your case files,
              and let the web service process the entire filing in seconds.
            </p>
            <div className="btns">
              <a className="btn" href="#steps">
                See how it works
              </a>
              <a className="lnk" href="#ba">
                The manual routine, visualised
              </a>
            </div>
            <div className="stats">
              <div>
                <b>1 Click</b>
                <span>complete workflow automated</span>
              </div>
              <div>
                <b>Hands-Free</b>
                <span>runs unattended</span>
              </div>
              <div>
                <b>Zero Install</b>
                <span>runs in any web browser</span>
              </div>
            </div>
          </div>

          <LexHeroDiagram />
        </section>

        <LexBeforeAfter />
        <LexSections />
      </main>
      <Footer />
    </>
  );
}
