"use client";

import { useState, type KeyboardEvent } from "react";
import {
  Factory,
  Layers,
  Wrench,
  Check,
  TrendingUp,
  Clock,
  ShieldCheck,
  Cpu,
  BarChart3
} from "lucide-react";

const roles = [
  {
    label: "Plant Operations",
    icon: Factory,
    title: "Line productivity & machine health at a glance.",
    text: "Monitor real-time line throughput, OEE, downtime alerts and batch bottlenecks before shipments fall behind.",
    selected: 0,
    metrics: [
      { label: "Overall Equipment Effectiveness", value: "92.8%", sub: "+4.2% vs previous quarter" },
      { label: "Unplanned Line Downtime", value: "< 1.4%", sub: "Predictive alerts active" },
      { label: "On-Time Order Dispatch", value: "98.6%", sub: "Across 4 active plants" },
    ],
  },
  {
    label: "Sales & Engineering",
    icon: Layers,
    title: "Accurate quotes without back-and-forth delays.",
    text: "Configure complex machinery, validate tolerances against engineering rules, and deliver binding lead times in minutes.",
    selected: 1,
    metrics: [
      { label: "Average Quotation Turnaround", value: "45 Mins", sub: "Down from 3 business days" },
      { label: "BOM Configuration Accuracy", value: "100%", sub: "Direct ERP & CAD sync" },
      { label: "Win Rate on Custom RFQs", value: "+28%", sub: "First-to-quote advantage" },
    ],
  },
  {
    label: "Field Service & SLA",
    icon: Wrench,
    title: "High-margin warranty and after-sales service.",
    text: "Equip service engineers with complete machine history, digital service manuals, and real-time parts availability on mobile.",
    selected: 2,
    metrics: [
      { label: "Mean Time to Resolution (MTTR)", value: "-42%", sub: "QR asset passport scan" },
      { label: "First-Visit Fix Rate", value: "91.5%", sub: "Pre-allocated spare parts" },
      { label: "Contract Renewal Rate", value: "96.2%", sub: "Guaranteed SLA uptime" },
    ],
  },
];

const stages = [
  { label: "RFQ & Config", count: "14 Orders" },
  { label: "BOM & Material", count: "28 Work Orders" },
  { label: "CNC & Assembly", count: "42 Active" },
  { label: "Quality QA", count: "19 In Inspection" },
  { label: "Dispatched", count: "128 Completed" },
];

export default function ManufacturingPortfolio() {
  const [role, setRole] = useState(0);
  const currentRole = roles[role];

  function handleKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      setRole((r) => (r + 1) % 3);
    } else if (e.key === "ArrowLeft") {
      setRole((r) => (r + 2) % 3);
    }
  }

  return (
    <div
      className="portfolio-layout"
      tabIndex={0}
      onKeyDown={handleKey}
      aria-label="Manufacturing role-based visibility dashboard"
    >
      {/* Role Navigation Tabs */}
      <div className="portfolio-tabs" role="tablist">
        {roles.map((r, idx) => {
          const Icon = r.icon;
          return (
            <button
              key={r.label}
              role="tab"
              aria-selected={idx === role}
              className={`portfolio-tab ${idx === role ? "is-active" : ""}`}
              onClick={() => setRole(idx)}
            >
              <Icon size={18} />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Role Main Display */}
      <div className="portfolio-view">
        <div className="portfolio-header">
          <div>
            <span className="small-label">ROLE-SPECIFIC INTELLIGENCE</span>
            <h3>{currentRole.title}</h3>
          </div>
          <p>{currentRole.text}</p>
        </div>

        {/* Live KPI Metric Cards */}
        <div className="portfolio-metrics-grid">
          {currentRole.metrics.map((m) => (
            <div key={m.label} className="portfolio-kpi-card">
              <span className="kpi-label">{m.label}</span>
              <strong className="kpi-value">{m.value}</strong>
              <span className="kpi-sub">{m.sub}</span>
            </div>
          ))}
        </div>

        {/* Shopfloor Pipeline Progress Rail */}
        <div className="portfolio-pipeline-container">
          <div className="pipeline-header">
            <span>PLANT-WIDE EXECUTION VELOCITY</span>
            <span>Real-time Work Order Pipeline</span>
          </div>
          <div className="pipeline-stages">
            {stages.map((st, i) => (
              <div key={st.label} className="pipeline-stage-item">
                <div className="pipeline-marker">
                  <span className="pipeline-dot" />
                  <span className="pipeline-step-num">0{i + 1}</span>
                </div>
                <div className="pipeline-info">
                  <strong>{st.label}</strong>
                  <span>{st.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

