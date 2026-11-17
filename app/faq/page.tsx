import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { MANUFACTURING_FAQS } from "@/lib/manufacturing-data";
import {
  buildFaqPageJsonLd,
  GENERAL_FAQS,
  LEX_FAQS,
  OPS_FAQS,
} from "@/lib/ops-lex-faqs";
import { SITE_CONFIG } from "@/lib/site-config";
import "./faq.css";

const canonicalUrl = `${SITE_CONFIG.url}/faq`;

export const metadata: Metadata = {
  title: "FAQ | Kairologic Technologies",
  description:
    "Answers to common questions about how Kairologic configures workflows, Kairologic Ops (SARFAESI), Kairologic Lex (offline e-court filing), and Manufacturing Suite.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "FAQ | Kairologic Technologies",
    description:
      "Answers to common questions about Kairologic platforms, offline e-court filing, SARFAESI workflows, and factory workforce systems.",
    url: canonicalUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Kairologic Technologies",
    description:
      "Answers to common questions about Kairologic platforms, offline e-court filing, SARFAESI workflows, and factory workforce systems.",
  },
};

const FAQ_GROUPS = [
  {
    id: "general",
    title: "General & delivery",
    linkLabel: "See how we build →",
    linkHref: "/need-a-solution",
    items: GENERAL_FAQS,
  },
  {
    id: "ops",
    title: "Kairologic Ops (SARFAESI)",
    linkLabel: "Explore Kairologic Ops →",
    linkHref: "/technologies/workflow",
    items: OPS_FAQS,
  },
  {
    id: "lex",
    title: "Kairologic Lex (eCourt filing)",
    linkLabel: "Explore Kairologic Lex →",
    linkHref: "/technologies/ecourt-filing",
    items: LEX_FAQS,
  },
  {
    id: "manufacturing",
    title: "Kairologic Manufacturing",
    linkLabel: "Explore Manufacturing →",
    linkHref: "/technologies/manufacturing",
    items: MANUFACTURING_FAQS,
  },
] as const;

export default function FaqPage() {
  const allFaqs = [
    ...GENERAL_FAQS,
    ...OPS_FAQS,
    ...LEX_FAQS,
    ...MANUFACTURING_FAQS,
  ];
  const jsonLd = buildFaqPageJsonLd(allFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header activeNav="faq" />
      <main id="main" className="faq-page">
        <section className="wrap faq-hero">
          <div className="faq-eb">Frequently asked questions</div>
          <h1>
            Questions, <span>answered.</span>
          </h1>
          <p className="faq-lead">
            Straight answers about how we work, how each Kairologic platform is
            deployed, and how your team’s data stays under your control.
          </p>
          <nav className="faq-jumps" aria-label="FAQ categories">
            {FAQ_GROUPS.map((group) => (
              <a key={group.id} href={`#${group.id}`}>
                {group.title}
              </a>
            ))}
          </nav>
        </section>

        {FAQ_GROUPS.map((group) => (
          <section className="wrap fq" id={group.id} key={group.id}>
            <div className="fq-head">
              <h2>{group.title}</h2>
              <Link className="fq-link" href={group.linkHref}>
                {group.linkLabel}
              </Link>
            </div>
            <div className="fql">
              {group.items.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="cl">
          <div className="wrap">
            <div>
              <h2>Still have a specific question?</h2>
              <p>
                Tell us about your team’s workflow and we’ll show you how
                Kairologic fits.
              </p>
              <Link className="btn" href="/contact">
                Talk to our team
              </Link>
            </div>
            <div />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

