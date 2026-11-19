import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LexHeroDiagram from "@/components/lex-hero-diagram";
import LexBeforeAfter from "@/components/lex-before-after";
import LexSections from "@/components/lex-sections";
import LexPillars from "@/components/lex-pillars";
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

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="wrap hero lex-hero">
          <div>
            <div className="eb">Kairologic Lex · Legal Intelligence Suite</div>
            <h1>
              Case management,
              <span>document intelligence,</span>
              <span>automated filing.</span>
            </h1>
            <p className="lead">
              One platform for every stage of legal recovery work — from the
              first case intake to the final court bundle. Manage cases,
              read across documents, and file in one click.
            </p>
            <div className="btns">
              <a className="btn" href="#pillars">
                Explore the three modules
              </a>
              <a className="lnk" href="#steps">
                See filing automation
              </a>
            </div>
            <div className="stats">
              <div>
                <b>3 Modules</b>
                <span>in one unified platform</span>
              </div>
              <div>
                <b>1 Click</b>
                <span>complete filing automated</span>
              </div>
              <div>
                <b>Zero Install</b>
                <span>runs in any web browser</span>
              </div>
            </div>
          </div>

          <LexHeroDiagram />
        </section>

        {/* ── Three Pillars ─────────────────────────────────────────────── */}
        <LexPillars />

        {/* ── Filing deep-dive (existing sections) ─────────────────────── */}
        <LexBeforeAfter />
        <LexSections />
      </main>
      <Footer />
    </>
  );
}
