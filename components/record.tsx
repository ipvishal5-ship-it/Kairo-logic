"use client";
import { useState } from "react";
import { ArrowRight, Check, FileText, MapPin } from "lucide-react";
import Image from "next/image";
import { Reveal } from "./motion-primitives";
import { handleTabKeys } from "./tab-navigation";
const stages = [
  {
    name: "Borrower & loan",
    title: "Start with the complete picture.",
    description:
      "Borrower, loan and secured property details, linked to one case.",
    document: "Loan & security details",
    action: "Review the case record",
    status: "Case record created",
  },
  {
    name: "Legal proceedings",
    title: "Keep every proceeding in context.",
    description:
      "Legal status, court information and supporting documents stay with the case.",
    document: "Legal case documents",
    action: "Review legal status",
    status: "Legal review in progress",
  },
  {
    name: "Section 13",
    title: "From case data to the right notice.",
    description:
      "Prepare demand and possession notices using information already in the record.",
    document: "Demand Notice · Section 13(2)",
    action: "Prepare the next notice",
    status: "Notice preparation",
  },
  {
    name: "Section 14",
    title: "See the order. Know the next step.",
    description:
      "Keep the application and court order together, ready for the possession team.",
    document: "Section 14 Order.pdf",
    action: "Coordinate physical possession",
    status: "Order received",
  },
  {
    name: "Possession",
    title: "The field update meets the case file.",
    description:
      "Property photographs, location and possession records, captured in one place.",
    document: "Inventory & Panchnama",
    action: "Review field evidence",
    status: "Possession update received",
  },
  {
    name: "Auction & sale",
    title: "A clear view through to sale.",
    description:
      "Follow the asset into auction with the relevant records available to your team.",
    document: "Auction & sale records",
    action: "Review auction progress",
    status: "Auction preparation",
  },
  {
    name: "Recovery & closure",
    title: "Close the loop on recovery.",
    description:
      "Keep the recovery outcome and closure record connected to the full case history.",
    document: "Recovery & closure record",
    action: "Review the final outcome",
    status: "Closure review",
  },
];
export default function Record() {
  const [active, setActive] = useState(3);
  const stage = stages[active];
  return (
    <section className="section-block record-section" id="record">
      <div className="page-shell">
        <Reveal className="section-intro">
          <p className="eyebrow">THE CONNECTED CASE</p>
          <h2>
            Every stage.
            <br />
            <span className="accent-heading">The same source of truth.</span>
          </h2>
          <p className="section-description">
            Explore the journey from borrower details to recovery.
          </p>
        </Reveal>
        <div
          className="journey"
          role="tablist"
          aria-label="Explore the case journey"
          onKeyDown={(event) =>
            handleTabKeys(event, active, stages.length, setActive)
          }
        >
          {stages.map((s, i) => (
            <button
              role="tab"
              id={`stage-tab-${i}`}
              aria-controls="stage-panel"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              key={s.name}
              onClick={() => setActive(i)}
              className={i === active ? "active" : ""}
            >
              <span className="journey-number">
                {i < active ? (
                  <Check size={15} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
        <div
          className="journey-content"
          id="stage-panel"
          role="tabpanel"
          aria-labelledby={`stage-tab-${active}`}
        >
          <div className="journey-copy">
            <p className="small-label">
              STAGE {String(active + 1).padStart(2, "0")} / 07
            </p>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
            <div className="document-benefit">
              <span>
                <FileText size={21} />
              </span>
              <div>
                <strong>Documents that start with your data.</strong>
                <p>
                  Demand notices, possession notices, inventory and panchnama.
                </p>
              </div>
            </div>
            <a className="text-link" href="#contact">
              See it with your team <ArrowRight size={18} />
            </a>
          </div>
          <div className="case-preview">
            <div className="preview-toolbar">
              <span>
                <span className="status-dot" /> CASE WORKSPACE
              </span>
              <span className="sample-pill">Illustrative demo</span>
            </div>
            <div className="case-preview-body">
              <div className="case-identity">
                <div>
                  <p className="small-label">CASE #2026-0148</p>
                  <h3>ABC Industries</h3>
                  <p>Industrial unit · Mumbai</p>
                </div>
                <div className="case-thumb">
                  <Image
                    src="/images/hero-industrial-estate.webp"
                    alt="Illustrative industrial property linked to the demo case"
                    fill
                    sizes="110px"
                  />
                </div>
              </div>
              <div className="stage-status" key={active}>
                <span className="small-label">CURRENT STAGE</span>
                <strong>
                  <span className="status-dot" />
                  {stage.status}
                </strong>
              </div>
              <div className="linked-document">
                <FileText size={22} />
                <div>
                  <strong>{stage.document}</strong>
                  <span>Linked to this case</span>
                </div>
                <Check size={17} />
              </div>
              <div className="next-action">
                <span className="small-label">NEXT ACTION</span>
                <strong>
                  {stage.action}
                  <ArrowRight size={18} />
                </strong>
              </div>
              <div className="preview-footer">
                <span>
                  <MapPin size={15} /> Property linked
                </span>
                <span>Data · Documents · Activity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
