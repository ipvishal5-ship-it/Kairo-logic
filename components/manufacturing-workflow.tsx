"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Check,
  Factory,
  Layers,
  Wrench,
  Play,
  Pause,
  RotateCcw,
  Activity,
  Cpu,
  FileCheck2,
  Gauge,
  Barcode,
  CalendarCheck
} from "lucide-react";

const chapters = [
  {
    label: "Configure",
    title: "The quote builds the BOM.",
    description: "Customer specifications automatically generate engineering parts, raw material requisitions and cost calculations.",
  },
  {
    label: "Manufacture",
    title: "Shopfloor telemetry stays in context.",
    description: "Live IoT machine metrics, cycle times and inline QA inspections bind directly to the batch traveler.",
  },
  {
    label: "Service",
    title: "Every machine carries its history.",
    description: "QR equipment passports link after-sales service tickets, parts warranty and SLA uptime to the original order.",
  },
];

const sources = [
  {
    label: "Custom Order Config",
    detail: "BOM & Tolerance specs",
    sub: "Automotive Precision Gearbox · Line 02",
    icon: Layers,
  },
  {
    label: "Live Machine Telemetry",
    detail: "Vibration & Temp streaming",
    sub: "99.4% OEE · Cycle time: 42s",
    icon: Gauge,
  },
  {
    label: "Field Asset Passport",
    detail: "QR code & Service warranty",
    sub: "Field tech assigned · SLA: 4hr response",
    icon: Wrench,
  },
];

export default function ManufacturingWorkflow() {
  const [step, setStep] = useState(0);
  const [source, setSource] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [prepared, setPrepared] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev === 2) {
          setPlaying(false);
          return 2;
        }
        return prev + 1;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [playing]);

  const currentChapter = chapters[step];

  function handleKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      setStep((s) => Math.min(2, s + 1));
    } else if (e.key === "ArrowLeft") {
      setStep((s) => Math.max(0, s - 1));
    }
  }

  return (
    <div
      className="workflow-demo"
      tabIndex={0}
      onKeyDown={handleKey}
      aria-label="Manufacturing workflow demonstration"
    >
      {/* Top Stepper Controls */}
      <div className="constellation-top">
        <div className="constellation-chapters" role="tablist">
          {chapters.map((ch, idx) => (
            <button
              key={ch.label}
              role="tab"
              aria-selected={idx === step}
              className={`constellation-chapter ${idx === step ? "is-active" : ""}`}
              onClick={() => {
                setStep(idx);
                setPlaying(false);
              }}
            >
              <span className="chapter-step">0{idx + 1}</span>
              <span className="chapter-label">{ch.label}</span>
            </button>
          ))}
        </div>

        <div className="constellation-playback">
          <button
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Pause animation" : "Play animation"}
            className="playback-button"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={() => {
              setStep(0);
              setPrepared(false);
              setPlaying(false);
            }}
            aria-label="Reset workflow"
            className="playback-button"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Main Workflow Viewport */}
      <div className="constellation-body">
        <div className="constellation-narrative">
          <h4>{currentChapter.title}</h4>
          <p>{currentChapter.description}</p>
        </div>

        {/* Dynamic Interactive Stage View */}
        <div className="constellation-stage">
          {step === 0 && (
            <div className="stage-panel fade-in">
              <div className="stage-header">
                <span className="stage-badge">PHASE 1: SALES &amp; BOM CONFIGURATION</span>
                <span className="stage-status">Live Pricing Validated</span>
              </div>
              <div className="stage-grid">
                <div className="stage-card">
                  <span className="card-tag">Customer Specs</span>
                  <strong>Client: Global Precision Drives</strong>
                  <p>Spec: 48mm Hardened Helical Gearbox</p>
                  <div className="card-meta">
                    <span>Batch: 5,000 units</span>
                    <span className="meta-highlight">Delivery: 18 Days</span>
                  </div>
                </div>
                <div className="stage-card highlight">
                  <span className="card-tag">Automated BOM Engine</span>
                  <strong>Bill of Materials #BM-4091</strong>
                  <p>Cast Iron Shell (Alloy 20) + CNC Hardened Pinion</p>
                  <div className="card-progress">
                    <div className="progress-bar" style={{ width: "100%" }} />
                  </div>
                  <span className="progress-label">Inventory &amp; Spares Reserved</span>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="stage-panel fade-in">
              <div className="stage-header">
                <span className="stage-badge">PHASE 2: SHOPFLOOR TELEMETRY &amp; QA</span>
                <span className="stage-status live-dot">CNC Line 02 Active</span>
              </div>
              <div className="stage-grid">
                <div className="stage-card">
                  <span className="card-tag">Machine Telemetry</span>
                  <strong>5-Axis Machining Center</strong>
                  <p>Spindle Speed: 12,400 RPM · Temp: 42°C (Optimal)</p>
                  <div className="telemetry-spark">
                    <span>Cycle Time: 42s/unit</span>
                    <span className="text-emerald">OEE: 99.4%</span>
                  </div>
                </div>
                <div className="stage-card highlight">
                  <span className="card-tag">Digital Quality Passport</span>
                  <strong>CMM Tolerance Inspection</strong>
                  <p>Variance: +0.008mm (Within 0.02mm ISO standard)</p>
                  <div className="card-meta">
                    <span>Laser Etched QR: #WO-8429-01</span>
                    <span className="meta-badge">Pass</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="stage-panel fade-in">
              <div className="stage-header">
                <span className="stage-badge">PHASE 3: FIELD SERVICE &amp; WARRANTY SLA</span>
                <span className="stage-status">Customer Deployment Live</span>
              </div>
              <div className="stage-grid">
                <div className="stage-card">
                  <span className="card-tag">Installed Asset Record</span>
                  <strong>Plant Asset #EQ-9042</strong>
                  <p>Location: Plant 3, Bayern · Operator QR Linked</p>
                  <div className="card-meta">
                    <span>Warranty: 24 Months</span>
                    <span className="meta-highlight">SLA: 4-Hour Response</span>
                  </div>
                </div>
                <div className="stage-card highlight">
                  <span className="card-tag">Predictive Maintenance</span>
                  <strong>Scheduled Inspection: Day 90</strong>
                  <p>Technician: Marcus Vance · Spares Pre-dispatched</p>
                  <div className="card-meta">
                    <span>Service Ticket #SR-1102</span>
                    <span className="meta-badge">Dispatched</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Source Inputs Strip */}
        <div className="constellation-sources">
          {sources.map((s, idx) => {
            const Icon = s.icon;
            return (
              <button
                key={s.label}
                className={`source-chip ${idx === step ? "is-selected" : ""}`}
                onClick={() => setStep(idx)}
              >
                <div className="source-icon">
                  <Icon size={18} />
                </div>
                <div className="source-info">
                  <strong>{s.label}</strong>
                  <span>{s.detail}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Proof Strip */}
      <div className="constellation-foot">
        <Check size={18} />
        <span>
          Every quotation, shopfloor machine log and service claim lives inside one traceable digital passport.
        </span>
      </div>
    </div>
  );
}

