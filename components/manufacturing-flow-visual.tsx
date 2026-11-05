"use client";

import { useState } from "react";
import { 
  Layers, 
  Gauge, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Barcode 
} from "lucide-react";

const stations = [
  {
    id: 1,
    eyebrow: "STAGE 01 · SALES & ENGINEERING",
    title: "Instant BOM & Cost Lock",
    lead: "Turn 3-day RFQs into 45-minute guaranteed commitments.",
    hook: "Customer specifications automatically build the Bill of Materials, reserve raw materials and calculate accurate delivery dates.",
    metricValue: "45 Mins",
    metricLabel: "Quotation Turnaround",
    icon: Layers,
    badgeText: "Zero Pricing Errors",
    points: [
      "Direct CAD & ERP inventory sync",
      "Dynamic material price calculation",
      "Instant engineering feasibility check"
    ]
  },
  {
    id: 2,
    eyebrow: "STAGE 02 · SHOPFLOOR & TELEMETRY",
    title: "Live Machine Line Pulse",
    lead: "Direct sensor telemetry bound to the work order.",
    hook: "Real-time spindle vibration, temperature and cycle times stream from machines into the digital traveler—eliminating paper logs.",
    metricValue: "99.4%",
    metricLabel: "Line OEE Performance",
    icon: Gauge,
    badgeText: "Inline QA Verified",
    points: [
      "Automated cycle time & scrap counter",
      "Sub-micron tolerance verification",
      "Instant bottleneck & downtime alerts"
    ]
  },
  {
    id: 3,
    eyebrow: "STAGE 03 · FIELD SERVICE & SLA",
    title: "QR Asset Passport & Service SLA",
    lead: "Turn after-sales warranty into a high-margin recurring engine.",
    hook: "Every finished machine carries a permanent laser-etched QR code linking service history, manuals, and automated technician dispatch.",
    metricValue: "-42%",
    metricLabel: "Resolution Time (MTTR)",
    icon: Wrench,
    badgeText: "SLA Guaranteed",
    points: [
      "One-tap on-site technician dispatch",
      "Live warranty & spare parts validation",
      "Predictive preventive maintenance alerts"
    ]
  }
];

export default function ManufacturingFlowVisual() {
  const [active, setActive] = useState(0);
  const current = stations[active];
  const Icon = current.icon;

  return (
    <div className="mfg-flow-container" aria-label="Visual manufacturing workflow">
      {/* Station Selector Bar */}
      <div className="mfg-flow-nav" role="tablist">
        {stations.map((st, idx) => (
          <button
            key={st.id}
            role="tab"
            aria-selected={idx === active}
            className={`mfg-flow-nav-btn ${idx === active ? "is-active" : ""}`}
            onClick={() => setActive(idx)}
          >
            <div className="mfg-flow-btn-top">
              <span className="mfg-flow-step">0{st.id}</span>
              <span className="mfg-flow-btn-badge">{st.badgeText}</span>
            </div>
            <strong>{st.title}</strong>
          </button>
        ))}
      </div>

      {/* Main Visual Display Card */}
      <div className="mfg-flow-card">
        <div className="mfg-flow-grid">
          
          {/* Left Column: Bold Value Proposition */}
          <div className="mfg-flow-copy">
            <span className="mfg-eyebrow-accent">{current.eyebrow}</span>
            <h3>{current.title}</h3>
            <p className="mfg-lead-text">{current.lead}</p>
            <p className="mfg-hook-text">{current.hook}</p>

            <div className="mfg-checklist">
              {current.points.map((pt) => (
                <div key={pt} className="mfg-check-item">
                  <CheckCircle2 size={18} className="text-mint" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Heroic Metric Billboard & Visual Badge */}
          <div className="mfg-flow-billboard">
            <div className="mfg-billboard-inner">
              <div className="mfg-billboard-icon">
                <Icon size={36} />
              </div>

              <div className="mfg-big-metric">
                <span className="mfg-metric-num">{current.metricValue}</span>
                <span className="mfg-metric-label">{current.metricLabel}</span>
              </div>

              <div className="mfg-billboard-footer">
                <span className="mfg-pulse-ring" />
                <span>Active Enterprise Standard</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Flow Indicator Dots */}
      <div className="mfg-flow-footer">
        <span className="text-muted">Explore the complete value chain:</span>
        <div className="mfg-flow-dots">
          {stations.map((st, idx) => (
            <button
              key={st.id}
              className={`mfg-dot ${idx === active ? "is-active" : ""}`}
              onClick={() => setActive(idx)}
              aria-label={`Jump to stage ${st.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

