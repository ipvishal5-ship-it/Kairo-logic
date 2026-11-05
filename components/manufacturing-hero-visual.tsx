"use client";

import { Activity, ShieldCheck, Factory, Gauge, ArrowUpRight } from "lucide-react";

export default function ManufacturingHeroVisual() {
  return (
    <div className="mfg-hero-visual" aria-label="Live industrial telemetry showcase">
      {/* Background Industrial Image with Cinematic HUD Grade */}
      <div className="mfg-visual-frame">
        <img
          src="/images/hero-industrial-estate.webp"
          alt="Modern connected manufacturing plant"
          className="mfg-visual-img"
        />
        <div className="mfg-visual-overlay" />

        {/* Live Status Badge */}
        <div className="mfg-live-tag">
          <span className="mfg-live-dot" />
          <span>FACTORY IOT MESH · ACTIVE</span>
        </div>

        {/* Floating Telemetry HUD Card 1 */}
        <div className="mfg-hud-card mfg-hud-top-left">
          <div className="mfg-hud-header">
            <Activity size={16} className="text-emerald" />
            <span>CNC LINE 02 TELEMETRY</span>
          </div>
          <div className="mfg-hud-metric">
            <strong>99.4%</strong>
            <span>OEE Availability</span>
          </div>
          <div className="mfg-hud-bar">
            <div className="mfg-hud-progress" style={{ width: "94%" }} />
          </div>
        </div>

        {/* Floating Telemetry HUD Card 2 */}
        <div className="mfg-hud-card mfg-hud-top-right">
          <div className="mfg-hud-header">
            <ShieldCheck size={16} className="text-cyan" />
            <span>TOLERANCE QA</span>
          </div>
          <div className="mfg-hud-metric">
            <strong>0.008 mm</strong>
            <span>CMM Inspection Pass</span>
          </div>
          <span className="mfg-badge-pass">ZERO DEFECT HOLD</span>
        </div>

        {/* Bottom Connected Banner */}
        <div className="mfg-hud-bottom">
          <div className="mfg-bottom-info">
            <Factory size={20} className="text-mint" />
            <div>
              <strong>Order #WO-8429 · Automated BOM Synced</strong>
              <p>5,000 Units · Precision Helical Gearbox · Automated Dispatch</p>
            </div>
          </div>
          <span className="mfg-bottom-chip">Ready for Delivery</span>
        </div>
      </div>
    </div>
  );
}

