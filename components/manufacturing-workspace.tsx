"use client";

import { useState } from "react";
import { 
  Cpu, 
  Factory, 
  Layers, 
  Gauge, 
  Wrench, 
  ClipboardCheck, 
  FileSpreadsheet, 
  ShieldCheck, 
  Check, 
  Barcode, 
  Activity, 
  Clock 
} from "lucide-react";
import { BrandMark } from "./brand";

const views = [
  {
    label: "Production & Telemetry",
    icon: Factory,
    title: "Real-time shopfloor intelligence.",
    description: "Live machine metrics. Connected work orders.",
    rows: [
      {
        icon: Activity,
        title: "Work Order #WO-8429",
        detail: "Automated CNC Line 04 · 850 / 1,000 units completed",
        tag: "Active Line",
      },
      {
        icon: Gauge,
        title: "Spindle Vibration & Temp Telemetry",
        detail: "Sensors within nominal range · 99.4% line health",
        tag: "Telemetry Live",
      },
      {
        icon: ClipboardCheck,
        title: "Inline Quality Assurance",
        detail: "Tolerance variance < 0.02mm · Zero defect hold",
        tag: "QA Verified",
      },
    ],
  },
  {
    label: "Sales & Custom BOM",
    icon: Layers,
    title: "Instant quotes from real engineering data.",
    description: "Configured parts mapped directly to inventory.",
    rows: [
      {
        icon: FileSpreadsheet,
        title: "BOM Configuration #BM-104",
        detail: "Auto-synced with raw material costs & supplier lead time",
        tag: "Validated",
      },
      {
        icon: Barcode,
        title: "Sub-assembly Serialization",
        detail: "Component batches linked directly to customer order",
        tag: "Traceable",
      },
      {
        icon: Clock,
        title: "Automated Lead Time Engine",
        detail: "Calculated from current factory queue & part availability",
        tag: "Accurate",
      },
    ],
  },
  {
    label: "Field Service & SLA",
    icon: Wrench,
    title: "After-sales support that protects margins.",
    description: "Predictive maintenance and equipment history.",
    rows: [
      {
        icon: Barcode,
        title: "QR Asset Passport #EQ-552",
        detail: "Full service logs, manuals & warranty records on site",
        tag: "On-Site Sync",
      },
      {
        icon: Wrench,
        title: "Preventive Service Ticket #SR-318",
        detail: "Technician assigned · Spares requisition pre-approved",
        tag: "Assigned",
      },
      {
        icon: ShieldCheck,
        title: "Annual Maintenance SLA Tracking",
        detail: "Uptime guarantee: 99.0% · Current performance: 99.6%",
        tag: "SLA Compliant",
      },
    ],
  },
];

export default function ManufacturingWorkspace() {
  const [active, setActive] = useState(0);
  const view = views[active];

  return (
    <div className="digital-workspace" aria-label="Illustrative manufacturing workspace">
      <div className="digital-toolbar">
        <span>
          <span className="digital-k">
            <BrandMark className="digital-k-mark" />
          </span>{" "}
          MANUFACTURING CLOUD
        </span>
        <span>Connected Plant Setup</span>
      </div>

      <div className="digital-intro">
        <div className="digital-vault" aria-hidden="true">
          <Factory size={36} />
          <span>
            <Cpu size={16} />
          </span>
        </div>
        <div>
          <p>UNIFIED MANUFACTURING OPERATIONS</p>
          <h3>From sales quote to shopfloor delivery.</h3>
        </div>
      </div>

      <div
        className="digital-view-buttons"
        role="group"
        aria-label="Explore manufacturing workspace modules"
      >
        {views.map((v, i) => {
          const Icon = v.icon;
          return (
            <button
              key={v.label}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <Icon size={20} />
              {v.label}
            </button>
          );
        })}
      </div>

      <div className="digital-view" aria-live="polite">
        <div className="digital-view-heading">
          <h4>{view.title}</h4>
          <p>{view.description}</p>
        </div>

        <div className="digital-records">
          {view.rows.map((r) => {
            const Icon = r.icon;
            return (
              <div className="digital-record" key={r.title}>
                <span className="digital-record-icon">
                  <Icon size={23} />
                </span>
                <div>
                  <strong>{r.title}</strong>
                  <p>{r.detail}</p>
                </div>
                <span className="digital-record-tag">{r.tag}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="digital-security">
        <ShieldCheck size={19} />
        <span>Role-based access for Plant Managers, Sales &amp; Field Technicians.</span>
        <Check size={18} />
      </div>
    </div>
  );
}

