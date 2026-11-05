import Link from "@/components/site-link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Approach,
  BrandComposition,
  Capabilities,
  ContactInvitation,
  TechnologyFeature,
} from "@/components/company-sections";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="c-main">
        {/* ── HERO SECTION: Pure Brand Elegance & Visual Magnetism ── */}
        <section className="c-shell c-hero-editorial">
          <div className="c-hero-copy">
            <h1 className="c-hero-title">
              Stop chasing work.<br />
              <em>Let your systems run it.</em>
            </h1>

            <p className="c-hero-lead">
              When work lives across scattered spreadsheets and endless messages, things get delayed. Kairologic builds clean, custom software where every task is assigned, tracked, and finished on time.
            </p>

            <div className="c-hero-actions">
              <Link className="c-button c-hero-btn-primary" href="#showcase">
                <span>See how it works</span>
                <ArrowRight size={16} />
              </Link>
              <Link className="c-text-link c-hero-link-sec" href="/contact">
                Talk to our team
              </Link>
            </div>

            {/* Creative 3-Pillar Micro Cards */}
            <div className="c-hero-proof-strip">
              <div className="c-proof-card">
                <div className="c-proof-icon-box">✓</div>
                <div className="c-proof-meta">
                  <strong>Organized Records</strong>
                  <span>Everything in one clear place</span>
                </div>
              </div>
              <div className="c-proof-card">
                <div className="c-proof-icon-box">⚡</div>
                <div className="c-proof-meta">
                  <strong>Clear Hand-offs</strong>
                  <span>Next task assigned automatically</span>
                </div>
              </div>
              <div className="c-proof-card">
                <div className="c-proof-icon-box">🔒</div>
                <div className="c-proof-meta">
                  <strong>Zero Missed Dates</strong>
                  <span>Deadlines tracked &amp; completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Pure Aesthetic Luminous Glass Brand Sculpture */}
          <div className="c-hero-visual-col">
            <BrandComposition />
          </div>
        </section>

        {/* ── INTRODUCTION ── */}
        <section className="c-introduction c-shell">
          <div className="c-intro-aside">
            <div className="c-intro-badge">
              <span className="c-intro-badge-dot" />
              <span>Kairologic Technologies</span>
            </div>
          </div>
          <div className="c-intro-main">
            <h2>
              Good systems begin<br />
              with how people work.
            </h2>
            <p>
              Every business has its own information, responsibilities and decisions. We build around that context, so the technology supports the way your team gets things done.
            </p>
            <Link href="/need-a-solution" className="c-text-link c-intro-link">
              <span>Need a solution</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ── SHOWCASE SECTION: Featured Workspace ── */}
        <section className="c-section c-technologies-home" id="showcase">
          <div className="c-shell">
            <div className="c-section-heading">
              <div>
                <p className="c-section-label">Our technologies</p>
                <h2>
                  See the work<br />
                  come together.
                </h2>
              </div>
              <p>
                A closer look at systems built for daily operations, verified approvals, and smooth team coordination.
              </p>
            </div>
            <TechnologyFeature />
          </div>
        </section>

        {/* ── CAPABILITIES ── */}
        <section className="c-section c-shell">
          <div className="c-section-heading">
            <div>
              <p className="c-section-label">What we do</p>
              <h2>
                Give your process<br />
                a working system.
              </h2>
            </div>
            <p>
              We connect the parts of everyday work that need to stay in step.
            </p>
          </div>
          <Capabilities />
        </section>

        <Approach />
        <ContactInvitation />
      </main>
      <Footer />
    </>
  );
}
