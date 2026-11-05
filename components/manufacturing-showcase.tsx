"use client";

import {
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
  LockKeyhole,
  History,
  Factory,
  Cpu,
  Gauge
} from "lucide-react";
import ManufacturingHeroVisual from "./manufacturing-hero-visual";
import ManufacturingFlowVisual from "./manufacturing-flow-visual";
import ManufacturingImpact from "./manufacturing-impact";
import Reveal from "./reveal";

export default function ManufacturingShowcase() {
  return (
    <>
      {/* 1. Hero Section: Cinematic Industrial Visual + Punchy Bold Copy */}
      <section className="hero firm-hero" id="home">
        <div className="container firm-hero-grid">
          <div className="firm-hero-copy">
            <p className="eyebrow">KAIROLOGIC MANUFACTURING CLOUD</p>
            <h1>
              <span>Your plant, connected.</span>
              <span className="hero-accent">From quote to field service.</span>
            </h1>
            <p className="firm-intro">
              The digital operating system for precision manufacturers.
            </p>
            <p className="firm-description">
              Stop losing margins between sales spreadsheets, paper work orders, and delayed warranty claims. Kairologic connects customer RFQs, machine telemetry, and field servicing into one live operational flow.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Schedule a plant demo <ArrowUpRight size={21} />
              </a>
              <a className="hero-secondary" href="#flow">
                See the workflow <ArrowDown size={20} />
              </a>
            </div>
            <div className="firm-service">
              <span className="signal-dot" /> Live Telemetry <i /> Automated BOM <i /> QR Asset Passports
            </div>
          </div>
          
          {/* Real Industrial Photography with Floating HUD Telemetry */}
          <div className="firm-visual">
            <ManufacturingHeroVisual />
          </div>
        </div>
      </section>

      {/* 2. Visual Workflow Engine: Interactive Station Pipeline */}
      <section className="workflow section" id="flow">
        <div className="container">
          <div className="mfg-section-title">
            <p className="eyebrow">AUTOMATED VALUE CHAIN WORKFLOW</p>
            <h2>
              Zero disconnected handoffs.<br />
              <span>One continuous operational rhythm.</span>
            </h2>
            <p>
              Experience how customer specifications instantly build the engineering BOM, trigger CNC telemetry, and bind to laser-etched field passports.
            </p>
          </div>

          <ManufacturingFlowVisual />
        </div>
      </section>

      {/* 3. Heroic Impact Billboard: Big Numbers That Hook Decision-Makers */}
      <ManufacturingImpact />

      {/* 4. Industrial Control & Compliance Layer */}
      <section className="control section" id="security">
        <div className="container control-grid">
          <Reveal className="control-statement">
            <p className="eyebrow">ENGINEERED FOR PLANT-GRADE RELIABILITY</p>
            <h2>
              Connected data.
              <br />
              <span>Considered control.</span>
            </h2>
            <p>
              We configure your records, machine sensors, and field service workflows around your exact manufacturing footprint. Then test with your team and ensure an effortless transition.
            </p>
            <a className="text-link" href="#contact">
              Discuss your factory architecture <ArrowUpRight size={21} />
            </a>
            <div className="implementation-path">
              <span>Plant Audit</span>
              <i />
              <span>BOM &amp; IoT Sync</span>
              <i />
              <span>Team Handover</span>
            </div>
          </Reveal>

          <Reveal className="control-ledger">
            <div className="ledger-heading">
              <span>
                <ShieldCheck size={24} /> THE INDUSTRIAL CONTROL LAYER
              </span>
              <i className="signal-dot" />
            </div>

            <article>
              <span className="ledger-rail" />
              <ShieldCheck size={26} />
              <div>
                <h3>Role-based plant permissions.</h3>
                <p>Strict segregation between Machine Operators, QA Leads, and Sales.</p>
              </div>
            </article>

            <article>
              <span className="ledger-rail" />
              <LockKeyhole size={26} />
              <div>
                <h3>ISO 9001 compliance audit trail.</h3>
                <p>Auditable tolerance checks, calibration logs, and defect holds.</p>
              </div>
            </article>

            <article>
              <span className="ledger-rail" />
              <History size={26} />
              <div>
                <h3>100% Component pedigree.</h3>
                <p>End-to-end serialization from raw material mill certificate to customer delivery.</p>
              </div>
            </article>

            <p className="control-note">
              Configured directly to your ERP, PLC/SCADA standards, and certified for enterprise industrial audits.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
