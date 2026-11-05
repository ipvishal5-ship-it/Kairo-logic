"use client";

import { Clock, Gauge, Barcode, ArrowUpRight } from "lucide-react";

const impacts = [
  {
    value: "45 Mins",
    title: "Instant BOM & Cost Lock",
    description: "Replace disconnected spreadsheets with automated engineering bill of materials and instant quotation.",
    icon: Clock,
  },
  {
    value: "99.4%",
    title: "Shopfloor Machine Uptime",
    description: "Stream live vibration, temperature, and cycle metrics directly to the order to eliminate plant downtime.",
    icon: Gauge,
  },
  {
    value: "100%",
    title: "Field Asset Traceability",
    description: "Laser-etched QR code passports connect warranty history, inspection certificates, and technician dispatch.",
    icon: Barcode,
  },
];

export default function ManufacturingImpact() {
  return (
    <section className="mfg-impact-section">
      <div className="container">
        <div className="mfg-impact-header">
          <p className="eyebrow">MEASURABLE BUSINESS OUTCOMES</p>
          <h2>
            Numbers that move the needle<br />
            <span>for manufacturing leadership.</span>
          </h2>
        </div>

        <div className="mfg-impact-grid">
          {impacts.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="mfg-impact-card">
                <div className="mfg-impact-top">
                  <span className="mfg-impact-value">{item.value}</span>
                  <div className="mfg-impact-icon">
                    <Icon size={24} />
                  </div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

