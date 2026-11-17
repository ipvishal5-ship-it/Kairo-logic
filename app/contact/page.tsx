import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Contact from "@/components/company-contact";
import { SITE_CONFIG } from "@/lib/site-config";
import { getContactPageJsonLd } from "@/lib/seo-schema";

const canonicalUrl = `${SITE_CONFIG.url}/contact`;
const title = "Contact Kairologic Technologies | Workflow Consultation";
const description =
  "Get in touch with Kairologic Technologies to discuss your business workflows, document automation, or request a focused 30-minute system walkthrough.";

export const metadata: Metadata = {
  title,
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

export default function ContactPage() {
  const jsonLd = getContactPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main" className="c-main">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
