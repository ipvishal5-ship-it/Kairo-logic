"use client";

import { useState } from "react";
import Link from "./site-link";
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  Zap, 
  QrCode, 
  Smartphone, 
  Layers, 
  Activity, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";

export default function ManufacturingChocolateShowcase() {
  const [activeFlavor, setActiveFlavor] = useState(0);

  const flavors = [
    {
      id: 0,
      tag: "THE 5-MINUTE QUOTE",
      title: "Quote Any Custom Machine in 5 Minutes.",
      hook: "Stop losing deals while competitors wait 3 days for spreadsheets. Pick specs, get the exact price, lock the margin.",
      statNumber: "5 Mins",
      statLabel: "Average quotation turnaround",
      colorAccent: "var(--c-green)",
      bgAccent: "rgba(24, 87, 70, 0.08)",
      visualHeader: "Live Instant Costing Engine",
      mockupData: {
        item: "High-Torque Helical Gearbox #G-40",
        specs: "Hardened Steel 42CrMo · 1,200 Nm Torque",
        cost: "₹ 4,85,000",
        status: "Margin Locked (28%)",
        delivery: "Delivery: 14 Business Days",
      },
    },
    {
      id: 1,
      tag: "THE FACTORY ON YOUR PHONE",
      title: "See What's Being Built Right Now.",
      hook: "No more walking the plant floor or asking 'is this done?'. See live machine progress, completed batches, and alerts on your phone.",
      statNumber: "100%",
      statLabel: "Plant floor visibility",
      colorAccent: "#0284c7",
      bgAccent: "rgba(2, 132, 199, 0.08)",
      visualHeader: "Plant Floor Active Monitor",
      mockupData: {
        item: "CNC Assembly Line 02",
        specs: "Running Batch #WO-842 · 850 of 1,000 Complete",
        cost: "Line Health: 99.4%",
        status: "Zero Quality Holds",
        delivery: "Estimated Finish: 4:30 PM Today",
      },
    },
    {
      id: 2,
      tag: "ONE QR SCAN FOR LIFE",
      title: "One Scan on the Machine. Zero Warranty Arguments.",
      hook: "Every machine gets a laser-etched QR tag. When the client needs service, one phone scan shows warranty, parts, and calls your technician.",
      statNumber: "1 Scan",
      statLabel: "For complete service history",
      colorAccent: "#d97706",
      bgAccent: "rgba(217, 119, 6, 0.08)",
      visualHeader: "Customer QR Asset Passport",
      mockupData: {
        item: "Installed Asset: Plant Unit Bayern #EQ-904",
        specs: "Installed: March 2026 · Under Full Warranty",
        cost: "Warranty: Active (18 Months Left)",
        status: "Direct Technician Assigned",
        delivery: "Spare Parts: 1-Click Dispatch",
      },
    },
  ];

  const current = flavors[activeFlavor];

  return (
    <div className="mfg-chocolate-wrap">
      {/* 1. UPPER VIEW BILLBOARD (The Mouth-Watering Hook) */}
      <section className="c-shell mfg-choco-hero">
        <div className="mfg-choco-eyebrow">
          <span className="mfg-choco-pulse" />
          <span>KAIROLOGIC MANUFACTURING CLOUD</span>
        </div>

        <h1 className="mfg-choco-headline">
          The 3 things every factory owner wants.<br />
          <em>Built into one visual system.</em>
        </h1>

        <p className="mfg-choco-sub">
          We don’t sell complicated ERP jargon or 200-page manuals. You get three clear tools that make your factory run faster and win more orders.
        </p>

        {/* 2. THE 3 "CHOCOLATE BOX" FLAVOR CARDS (Visual Category Picker) */}
        <div className="mfg-flavor-grid" role="tablist">
          {flavors.map((fl, idx) => (
            <div
              key={fl.tag}
              role="tab"
              aria-selected={idx === activeFlavor}
              className={`mfg-flavor-card ${idx === activeFlavor ? "is-selected" : ""}`}
              onClick={() => setActiveFlavor(idx)}
            >
              <div className="mfg-flavor-top">
                <span className="mfg-flavor-tag">{fl.tag}</span>
                <span className="mfg-flavor-num">0{idx + 1}</span>
              </div>
              <h3 className="mfg-flavor-title">{fl.title}</h3>
              <p className="mfg-flavor-hook">{fl.hook}</p>
              <div className="mfg-flavor-bottom">
                <span className="mfg-flavor-stat">{fl.statNumber}</span>
                <span className="mfg-flavor-stat-label">{fl.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THE LIVE VISUAL SHOWCASE (How That Flavor Looks in Action) */}
      <section className="mfg-interactive-stage c-shell">
        <div className="mfg-stage-card">
          <div className="mfg-stage-grid">
            
            {/* Left Column: What It Does For You */}
            <div className="mfg-stage-left">
              <span className="mfg-stage-pill">{current.tag}</span>
              <h2>{current.title}</h2>
              <p className="mfg-stage-desc">{current.hook}</p>

              <div className="mfg-perks-list">
                <div className="mfg-perk-item">
                  <div className="mfg-check-circle">✓</div>
                  <div>
                    <strong>Instant clarity for your whole team</strong>
                    <span>No waiting for emails, calls, or lost handwritten notes.</span>
                  </div>
                </div>

                <div className="mfg-perk-item">
                  <div className="mfg-check-circle">✓</div>
                  <div>
                    <strong>Designed for mobile &amp; tablet</strong>
                    <span>Works directly on the factory floor and on the owner's phone.</span>
                  </div>
                </div>

                <div className="mfg-perk-item">
                  <div className="mfg-check-circle">✓</div>
                  <div>
                    <strong>Zero training required</strong>
                    <span>Clean visual buttons that anyone can understand on day one.</span>
                  </div>
                </div>
              </div>

              <div className="mfg-stage-cta">
                <Link href="/contact" className="c-button">
                  See live demo for your factory <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right Column: High-Impact Visual Mockup Card */}
            <div className="mfg-stage-right">
              <div className="mfg-mockup-frame">
                <div className="mfg-mockup-header">
                  <div className="mfg-mockup-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="mfg-mockup-title">{current.visualHeader}</span>
                  <span className="mfg-live-badge">● LIVE SYNC</span>
                </div>

                <div className="mfg-mockup-body">
                  <div className="mfg-mockup-badge-row">
                    <span className="mfg-badge-highlight">{current.mockupData.status}</span>
                    <span className="mfg-badge-time">{current.mockupData.delivery}</span>
                  </div>

                  <strong className="mfg-mockup-item-name">{current.mockupData.item}</strong>
                  <p className="mfg-mockup-specs">{current.mockupData.specs}</p>

                  <div className="mfg-mockup-big-stat">
                    <span>STATUS &amp; VALUE</span>
                    <strong>{current.mockupData.cost}</strong>
                  </div>

                  <div className="mfg-mockup-action-strip">
                    <span className="mfg-mockup-check">✓ Verified by Kairologic</span>
                    <span className="mfg-mockup-btn">View Record →</span>
                  </div>
                </div>

                {/* Industrial Photo Backdrop Peek */}
                <div className="mfg-mockup-footer-photo">
                  <img
                    src="/images/hero-industrial-estate.webp"
                    alt="Connected factory"
                    className="mfg-footer-img"
                  />
                  <div className="mfg-footer-overlay">
                    <span>Connected Plant Operating System</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. THE VISUAL CONVEYOR BELT (Order -> Floor -> Customer) */}
      <section className="c-shell mfg-conveyor-section">
        <div className="c-section-heading">
          <div>
            <p className="c-section-label">The complete visual pipeline</p>
            <h2>From first customer handshake<br /><em>to lifelong after-sales service.</em></h2>
          </div>
          <p>
            Watch how work flows effortlessly without getting stuck in department bottlenecks.
          </p>
        </div>

        <div className="mfg-conveyor-track">
          
          <div className="mfg-conveyor-station">
            <div className="mfg-station-header">
              <span className="mfg-station-badge">STEP 01</span>
              <Clock size={20} className="text-green" />
            </div>
            <h3>Customer Quote</h3>
            <p>Customer sends inquiry. Sales clicks specs. Price &amp; margin are locked in 5 minutes.</p>
            <div className="mfg-station-foot">
              <span>Outcome: Deal Closed Fast</span>
            </div>
          </div>

          <div className="mfg-conveyor-arrow">→</div>

          <div className="mfg-conveyor-station is-highlight">
            <div className="mfg-station-header">
              <span className="mfg-station-badge">STEP 02</span>
              <Activity size={20} className="text-green" />
            </div>
            <h3>Factory Assembly</h3>
            <p>Shopfloor sees approved order on screen. Line builds with zero drawing mistakes.</p>
            <div className="mfg-station-foot">
              <span>Outcome: On-Time Delivery</span>
            </div>
          </div>

          <div className="mfg-conveyor-arrow">→</div>

          <div className="mfg-conveyor-station">
            <div className="mfg-station-header">
              <span className="mfg-station-badge">STEP 03</span>
              <QrCode size={20} className="text-green" />
            </div>
            <h3>QR Care &amp; Service</h3>
            <p>Client scans QR code on machine anytime. Warranty, service history, and 1-tap repair.</p>
            <div className="mfg-station-foot">
              <span>Outcome: Happy Repeat Client</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. BIG BOLD NUMBERS (No reading fatigue) */}
      <section className="mfg-bold-numbers c-shell">
        <div className="mfg-numbers-grid">
          <div className="mfg-num-card">
            <strong>5 Mins</strong>
            <h3>Instant Quotations</h3>
            <p>Send binding quotes before your competition even opens their Excel spreadsheet.</p>
          </div>

          <div className="mfg-num-card">
            <strong>Zero</strong>
            <h3>Lost Production Sheets</h3>
            <p>Every drawing, change request, and quantity is right on the floor team’s screen.</p>
          </div>

          <div className="mfg-num-card">
            <strong>1 Scan</strong>
            <h3>QR Customer Care</h3>
            <p>Customers love having their machine's manuals and warranty right on their phone.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

