import Link from "@/components/site-link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ShowcaseHero } from "@/components/manufacturing/ShowcaseHero";
import { BeforeAfter } from "@/components/manufacturing/BeforeAfter";
import { PlantWorkflow } from "@/components/manufacturing/PlantWorkflow";
import { WorkflowDiagram } from "@/components/manufacturing/WorkflowDiagram";
import { LiveDashboard } from "@/components/manufacturing/LiveDashboard";
import { InstantSearch } from "@/components/manufacturing/InstantSearch";
import { ClosingCTA } from "@/components/manufacturing/ClosingCTA";

export const metadata = {
  title: "Manufacturing Cloud — Sales & Service",
  description:
    "Connected sales quotation, shopfloor machine production, and after-sales service for modern manufacturing enterprises.",
};

export default function ManufacturingPage() {
  return (
    <>
      <Header />
      <main id="main" className="c-main">
        <nav className="c-breadcrumb c-shell" aria-label="Breadcrumb">
          <Link href="/technologies">Technologies</Link>
          <span aria-hidden="true">/</span>
          <span>Manufacturing Cloud</span>
        </nav>

        {/* ==================================================================
            CREATIVE HERO: FACTORY FLOOR VISUAL WITH GRADIENT MESH
            ================================================================== */}
        <section className="c-shell mfg-creative-hero">
          <div className="mfg-hero-gradient-mesh">
            <div className="mfg-hero-glow glow-1" />
            <div className="mfg-hero-glow glow-2" />
            <div className="mfg-hero-glow glow-3" />
          </div>

          <div className="mfg-hero-content">
            <div className="mfg-hero-badge">
              <span className="mfg-pulse-dot" /> Kairologic Manufacturing Cloud
            </div>
            <h1 className="mfg-hero-title">
              Your factory,<br />
              <em>one digital spine.</em>
            </h1>
            <p className="mfg-hero-subtitle">
              From quote to assembly to service — every machine, every order,
              every warranty on a single live thread. No silos. No paperwork
              delays.
            </p>

            <div className="mfg-hero-stats">
              <div className="mfg-stat">
                <span className="mfg-stat-number">5 Mins</span>
                <span className="mfg-stat-label">Quote turnaround</span>
              </div>
              <div className="mfg-stat">
                <span className="mfg-stat-number">100%</span>
                <span className="mfg-stat-label">Digital work orders</span>
              </div>
              <div className="mfg-stat">
                <span className="mfg-stat-number">1 Scan</span>
                <span className="mfg-stat-label">Lifelong machine care</span>
              </div>
            </div>

            <div className="mfg-hero-actions">
              <Link href="/contact" className="c-button c-button-primary">
                Talk to our manufacturing team
              </Link>
              <Link href="#factory-flow" className="c-button c-button-ghost">
                See the 3-step workflow
              </Link>
            </div>
          </div>

          <div className="mfg-hero-visual">
            <div className="mfg-machine-frame">
              <div className="mfg-conveyor">
                <div className="mfg-roller r1" />
                <div className="mfg-roller r2" />
                <div className="mfg-roller r3" />
                <div className="mfg-box box-1" />
                <div className="mfg-box box-2" />
                <div className="mfg-box box-3" />
              </div>
              <div className="mfg-robot-arm">
                <div className="mfg-arm-segment seg-1" />
                <div className="mfg-arm-segment seg-2" />
                <div className="mfg-arm-gripper" />
              </div>
              <div className="mfg-qr-badge">
                <div className="mfg-qr-corner tl" />
                <div className="mfg-qr-corner tr" />
                <div className="mfg-qr-corner bl" />
                <div className="mfg-qr-corner br" />
                <div className="mfg-qr-center" />
              </div>
            </div>
          </div>
        </section>

        <ShowcaseHero />
        <BeforeAfter />
        <PlantWorkflow />
        <WorkflowDiagram />
        <LiveDashboard />
        <InstantSearch />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}

