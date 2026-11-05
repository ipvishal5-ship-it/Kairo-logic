import Link from "@/components/site-link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { EcourtHero } from "@/components/ecourt/EcourtHero";
import { OldVsNew } from "@/components/ecourt/OldVsNew";
import { FilingShowcase } from "@/components/ecourt/FilingShowcase";
import { SafetyPrivacy } from "@/components/ecourt/SafetyPrivacy";
import { EcourtCTA } from "@/components/ecourt/EcourtCTA";

export const metadata = {
  title: "Kairologic Lex — eCourt Filing Automation",
  description:
    "One click prepares a court filing: merge, cover page, OCR, compression, page numbering, bank seal and portal-ready splitting. Runs fully offline — documents never leave the office PC.",
};

export default function EcourtFilingPage() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden">
        <nav className="c-breadcrumb c-shell !text-slate-400 border-b border-slate-900/80 [&_a]:!text-slate-300 [&_a:hover]:!text-teal-300 [&_span]:!text-slate-600" aria-label="Breadcrumb">
          <Link href="/technologies">Technologies</Link>
          <span aria-hidden="true">/</span>
          <span>eCourt Filing (Kairologic Lex)</span>
        </nav>
        <EcourtHero />
        <OldVsNew />
        <FilingShowcase />
        <SafetyPrivacy />
        <EcourtCTA />
      </main>
      <Footer />
    </>
  );
}
