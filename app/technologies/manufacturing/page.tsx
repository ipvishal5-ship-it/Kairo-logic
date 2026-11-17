import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ManufacturingHeroDemo from "@/components/manufacturing-hero-demo";
import ManufacturingSections from "@/components/manufacturing-sections";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  getManufacturingJsonLd,
  MANUFACTURING_SEO,
} from "@/lib/manufacturing-data";
import "./mfg.css";

const canonicalUrl = `${SITE_CONFIG.url}${MANUFACTURING_SEO.path}`;

export const metadata: Metadata = {
  title: { absolute: MANUFACTURING_SEO.title },
  description: MANUFACTURING_SEO.description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: MANUFACTURING_SEO.title,
    description: MANUFACTURING_SEO.description,
    url: canonicalUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: MANUFACTURING_SEO.title,
    description: MANUFACTURING_SEO.description,
  },
};

export default function ManufacturingPage() {
  const jsonLd = getManufacturingJsonLd(SITE_CONFIG.url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main" className="mfg-page">
        <div className="wrap bc">
          <Link href="/technologies">Technologies</Link>
          <span>/</span>
          <b>Manufacturing Suite</b>
        </div>

        <section className="wrap mfg-hero">
          <div>
            <div className="eb">Kairologic Manufacturing</div>
            <h1>
              Your factory should run on a system,
              <span>not on one person.</span>
            </h1>
            <p className="lead">
              When one manager holds every worker record, shift and delivery in
              an Excel file, a single absence stops the work. Kairologic is
              factory workforce management built around your process: every
              worker, shift and task is recorded as it happens, so anyone with
              access can keep the factory running.
            </p>
            <div className="btns">
              <Link className="btn" href="/contact">
                Book a live demo
              </Link>
              <a className="lnk" href="#how">
                See how we build it ↓
              </a>
            </div>
          </div>

          <ManufacturingHeroDemo />
        </section>

        <ManufacturingSections />
      </main>
      <Footer />
    </>
  );
}
