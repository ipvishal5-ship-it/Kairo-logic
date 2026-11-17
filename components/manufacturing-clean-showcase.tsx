"use client";

import { useState } from "react";
import Link from "./site-link";
import { ArrowRight, Check, ArrowDown, FileText, Factory, QrCode } from "lucide-react";

const flowStages = [
  {
    id: 0,
    tab: "01 Quoting",
    title: "Lock parts, price & delivery in 5 minutes.",
    summary: "Replaces 3-day spreadsheet calculations with instant pricing.",
    input: "Customer selects machine specifications & required tolerances.",
    system: "Kairologic calculates raw material costs, supplier rates, and reserves inventory.",
    outcome: "Accurate quote delivered to the client with protected margins.",
    metric: "5 Mins",
    metricLabel: "Quotation Turnaround",
    icon: FileText,
  },
  {
    id: 1,
    tab: "02 Assembly",
    title: "The floor team sees exact drawings on screen.",
    summary: "Replaces lost paper travelers and verbal misunderstandings.",
    input: "Approved customer order triggers the shopfloor work order automatically.",
    system: "Machine operators view live drawings, bill of materials, and batch checkpoints on tablet.",
    outcome: "Zero assembly rework. Line runs on schedule with live progress tracking.",
    metric: "100%",
    metricLabel: "Digital Work Order Accuracy",
    icon: Factory,
  },
  {
    id: 2,
    tab: "03 QR Service",
    title: "Every machine gets a permanent digital passport.",
    summary: "Replaces lost warranty papers and delayed service calls.",
    input: "Finished equipment receives a laser-etched QR code badge before dispatch.",
    system: "Customer or field engineer scans QR code with any smartphone camera.",
    outcome: "Instant access to manuals, active warranty status, and 1-tap service booking.",
    metric: "1 Scan",
    metricLabel: "For Lifelong Customer Care",
    icon: QrCode,
  },
];

export default function ManufacturingCleanShowcase() {
  const [activeStage, setActiveStage] = useState(0);
  const current = flowStages[activeStage];
  const Icon = current.icon;

  return (
    <div className="mfg-page-root">
      {/* ==================================================================
          BEAT 1: BALANCED EDITORIAL HERO
          ================================================================== */}
      <section className="c-shell mfg-hero-section">
        <div className="mfg-hero-grid">
          
          {/* Left: Punchy Editorial Copy */}
          <div className="mfg-hero-text">
            <div className="mfg-status-pill">
              <span className="mfg-status-dot" />
              <span>Kairologic Manufacturing Cloud</span>
            </div>

            <h1 className="mfg-headline">
              Connected systems for<br />
              the <em>modern factory.</em>
            </h1>

            <p className="mfg-subtext">
              From customer quote to shopfloor assembly and after-sales service—one clear digital record for your entire plant.
            </p>

            <div className="mfg-actions">
              <Link className="c-button" href="/contact">
                Talk to our manufacturing team
              </Link>
              <a className="c-text-link" href="#factory-flow">
                See the 3-step workflow ↓
              </a>
            </div>

            {/* Micro reassurance line */}
            <div className="mfg-micro-proof">
              <span>✓ Quoting in minutes</span>
              <span className="mfg-dot-sep">·</span>
              <span>✓ Paperless shopfloor</span>
              <span className="mfg-dot-sep">·</span>
              <span>✓ QR warranty care</span>
            </div>
          </div>

          {/* Right: Compact Framed Industrial Card */}
          <div className="mfg-hero-visual-card">
            <div className="mfg-visual-header">
              <img
                src="/images/hero-industrial-estate.webp"
                alt="Connected manufacturing plant facility"
                className="mfg-plant-photo"
                loading="lazy"
                width={600}
                height={400}
              />
              <div className="mfg-plant-overlay">
                <span className="mfg-live-badge">● Plant Floor Active</span>
              </div>
            </div>

            <div className="mfg-visual-body">
              <div className="mfg-status-row">
                <span className="mfg-row-tag">Order #4820</span>
                <strong>High-Precision Assembly</strong>
                <span className="mfg-row-badge is-green">On Schedule</span>
              </div>
              <div className="mfg-status-row">
                <span className="mfg-row-tag">Shopfloor</span>
                <strong>CNC Line 02 Running</strong>
                <span className="mfg-row-badge is-neutral">850 / 1,000</span>
              </div>
              <div className="mfg-status-row">
                <span className="mfg-row-tag">After-Sales</span>
                <strong>QR Passport Assigned</strong>
                <span className="mfg-row-badge is-mint">Warranty Active</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================================
          BEAT 2: THE SIGNATURE 3-STEP INTERACTIVE STAGE
          ================================================================== */}
      <section className="mfg-flow-section" id="factory-flow">
        <div className="c-shell">
          
          <div className="mfg-section-header">
            <p className="c-section-label">The everyday factory flow</p>
            <h2>Three steps. Zero lost handoffs.</h2>
            <p className="mfg-section-desc">
              Select a stage below to see how customer orders move directly to machines and into customer care.
            </p>
          </div>

          {/* 3 Interactive Switcher Tabs */}
          <div className="mfg-flow-tabs" role="tablist">
            {flowStages.map((st, idx) => (
              <button
                key={st.id}
                role="tab"
                aria-selected={idx === activeStage}
                className={`mfg-flow-tab ${idx === activeStage ? "is-active" : ""}`}
                onClick={() => setActiveStage(idx)}
              >
                <span className="mfg-tab-index">0{idx + 1}</span>
                <span className="mfg-tab-title">{st.tab.replace(/^[0-9]+\s*/, "")}</span>
              </button>
            ))}
          </div>

          {/* The Unified Interactive Board */}
          <div className="mfg-flow-board">
            
            {/* Top Stage Header */}
            <div className="mfg-board-top">
              <div className="mfg-board-intro">
                <div className="mfg-stage-icon">
                  <Icon size={24} />
                </div>
                <div>
                  <h3>{current.title}</h3>
                  <p>{current.summary}</p>
                </div>
              </div>

              <div className="mfg-board-kpi">
                <strong>{current.metric}</strong>
                <span>{current.metricLabel}</span>
              </div>
            </div>

            {/* 3 Clear Pillars: Input -> System -> Outcome */}
            <div className="mfg-pillars-grid">
              
              <div className="mfg-pillar-card">
                <span className="mfg-pillar-label">INPUT</span>
                <h4>What starts it</h4>
                <p>{current.input}</p>
              </div>

              <div className="mfg-pillar-card is-active-pillar">
                <span className="mfg-pillar-label">KAIROLOGIC ENGINE</span>
                <h4>What the system does</h4>
                <p>{current.system}</p>
              </div>

              <div className="mfg-pillar-card">
                <span className="mfg-pillar-label">BUSINESS RESULT</span>
                <h4>What you achieve</h4>
                <p>{current.outcome}</p>
              </div>

            </div>

            {/* Bottom Proof Strip */}
            <div className="mfg-board-footer">
              <Check size={16} />
              <span>Configured around your plant's existing work routines. No 200-page software manuals.</span>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================================
          BEAT 3: THE 3 ANCHOR BUSINESS OUTCOMES
          ================================================================== */}
      <section className="c-shell mfg-outcomes-section">
        <div className="mfg-section-header">
          <p className="c-section-label">Real business results</p>
          <h2>Numbers that make daily work calmer.</h2>
        </div>

        <div className="mfg-outcomes-grid">
          
          <div className="mfg-outcome-card">
            <span className="mfg-outcome-number">5 Mins</span>
            <h3>Quick Quotations</h3>
            <p>
              Send binding quotes and delivery dates in minutes. Win customer orders while competitors are still updating spreadsheets.
            </p>
          </div>

          <div className="mfg-outcome-card">
            <span className="mfg-outcome-number">100%</span>
            <h3>Digital Work Orders</h3>
            <p>
              Clear drawings and quantities right on the floor team's screen. Eliminate misread notes, scrap delays, and lost travelers.
            </p>
          </div>

          <div className="mfg-outcome-card">
            <span className="mfg-outcome-number">1 Scan</span>
            <h3>Instant Customer Care</h3>
            <p>
              A permanent QR code on every machine gives your customer their manual, warranty dates, and instant service booking.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
