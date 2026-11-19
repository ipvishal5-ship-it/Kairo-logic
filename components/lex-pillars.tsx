"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FileText,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Clock,
  ArrowRight,
  Search,
  FileCheck,
  Calendar,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Link2,
  FolderOpen,
  Split,
  Stamp,
  Hash,
  Eye,
  RefreshCw,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   PILLAR 1: CASE MANAGEMENT WORKSPACE
   A complete, realistic Legal Matter Docket with real data fields,
   interactive stage timeline, and document registry.
   ───────────────────────────────────────────────────────────────────────────── */
function CaseMgmtDiagram() {
  const [activeTab, setActiveTab] = useState<"stages" | "details" | "docs">("stages");

  const stages = [
    { name: "Intake & Review", desc: "Parties mapped, verification done", date: "14 Oct", status: "completed" },
    { name: "Statutory Notice", desc: "Formal notice issued with proof", date: "28 Oct", status: "completed" },
    { name: "Court Petition", desc: "Drafted, indexed & verified", date: "10 Nov", status: "completed" },
    { name: "Hearing & Orders", desc: "Scheduled before designated bench", date: "04 Dec", status: "current" },
    { name: "Final Execution", desc: "Recovery & matter closure", date: "Pending", status: "upcoming" },
  ];

  const docRegistry = [
    { name: "Primary Demand Notice", type: "Statutory Notice", pages: "14 pages", status: "Generated & Signed", size: "1.2 MB" },
    { name: "Court Petition Bundle", type: "Pleading", pages: "68 pages", status: "Indexed & Formatted", size: "4.8 MB" },
    { name: "Inspection & Asset Report", type: "Field Report", pages: "24 pages", status: "Photos Attached", size: "6.1 MB" },
    { name: "Affidavit of Service", type: "Legal Filing", pages: "6 pages", status: "Verified Delivery", size: "840 KB" },
  ];

  return (
    <div className="lex-cm-card" aria-label="Interactive Case Management Workspace">
      {/* Docket Header */}
      <div className="lex-cm-header">
        <div className="lex-cm-matter-info">
          <span className="lex-cm-badge">DOCKET #CAS-2026-084</span>
          <h4 className="lex-cm-title">Institutional Enforcement &amp; Recovery Matter</h4>
        </div>
        <div className="lex-cm-status-pill">
          <span className="lex-cm-live-dot" />
          <span>Active Hearing · 04 Dec</span>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div className="lex-cm-tab-bar" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "stages"}
          className={`lex-cm-tab-btn ${activeTab === "stages" ? "is-active" : ""}`}
          onClick={() => setActiveTab("stages")}
        >
          <Clock size={13} />
          <span>Matter Stages</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "details"}
          className={`lex-cm-tab-btn ${activeTab === "details" ? "is-active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          <FolderOpen size={13} />
          <span>Docket Details</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "docs"}
          className={`lex-cm-tab-btn ${activeTab === "docs" ? "is-active" : ""}`}
          onClick={() => setActiveTab("docs")}
        >
          <FileText size={13} />
          <span>Document Vault</span>
        </button>
      </div>

      {/* Tab 1: Matter Stages */}
      {activeTab === "stages" && (
        <div className="lex-cm-panel">
          <div className="lex-cm-timeline">
            {stages.map((st, idx) => (
              <div key={st.name} className={`lex-cm-stage-item is-${st.status}`}>
                <div className="lex-cm-stage-node">
                  {st.status === "completed" ? (
                    <CheckCircle2 size={16} className="lex-node-icon is-done" />
                  ) : st.status === "current" ? (
                    <span className="lex-node-pulse" />
                  ) : (
                    <span className="lex-node-pending">{idx + 1}</span>
                  )}
                  {idx < stages.length - 1 && <span className="lex-node-connector" />}
                </div>
                <div className="lex-cm-stage-body">
                  <div className="lex-cm-stage-header">
                    <strong className="lex-cm-stage-title">{st.name}</strong>
                    <span className="lex-cm-stage-date">{st.date}</span>
                  </div>
                  <p className="lex-cm-stage-desc">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lex-cm-footer-strip">
            <div className="lex-cm-kpi">
              <strong>42 Days</strong>
              <span>Active Duration</span>
            </div>
            <div className="lex-cm-kpi">
              <strong>4 Documents</strong>
              <span>Ready for Court</span>
            </div>
            <div className="lex-cm-kpi">
              <strong>0 Delays</strong>
              <span>Timeline Compliant</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Docket Details */}
      {activeTab === "details" && (
        <div className="lex-cm-panel">
          <div className="lex-cm-grid">
            <div className="lex-cm-field">
              <span className="lex-cm-label">Forum &amp; Division</span>
              <strong className="lex-cm-val">Commercial High Court Division</strong>
            </div>
            <div className="lex-cm-field">
              <span className="lex-cm-label">Case Filing CNR</span>
              <strong className="lex-cm-val">MH-HC-2026-98104</strong>
            </div>
            <div className="lex-cm-field">
              <span className="lex-cm-label">Limitation Deadline</span>
              <strong className="lex-cm-val" style={{ color: "#16876D" }}>
                12 Apr 2027 (Safe)
              </strong>
            </div>
            <div className="lex-cm-field">
              <span className="lex-cm-label">Designated Counsel</span>
              <strong className="lex-cm-val">Principal Litigator &amp; Team</strong>
            </div>
            <div className="lex-cm-field">
              <span className="lex-cm-label">Matter Category</span>
              <strong className="lex-cm-val">Contractual Default &amp; Enforcement</strong>
            </div>
            <div className="lex-cm-field">
              <span className="lex-cm-label">Audit Log</span>
              <strong className="lex-cm-val">18 Actions Timestamped</strong>
            </div>
          </div>
          <div className="lex-sample-tag">Illustrative matter docket data</div>
        </div>
      )}

      {/* Tab 3: Document Vault */}
      {activeTab === "docs" && (
        <div className="lex-cm-panel">
          <div className="lex-cm-doc-list">
            {docRegistry.map((doc) => (
              <div key={doc.name} className="lex-cm-doc-row">
                <div className="lex-cm-doc-left">
                  <div className="lex-cm-file-icon">
                    <FileCheck size={16} />
                  </div>
                  <div>
                    <strong className="lex-cm-doc-name">{doc.name}</strong>
                    <span className="lex-cm-doc-meta">
                      {doc.type} · {doc.pages} · {doc.size}
                    </span>
                  </div>
                </div>
                <span className="lex-cm-doc-status">{doc.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PILLAR 2: LIQUID TEXT (MULTI-DOCUMENT WORKSPACE)
   Authentic active reading canvas with real readable legal clauses,
   precise cross-document anchor links, and an excerpt card.
   ───────────────────────────────────────────────────────────────────────────── */
function LiquidTextDiagram() {
  const [isHighlighted, setIsHighlighted] = useState(true);

  return (
    <div className="lex-lt-card" aria-label="Interactive Liquid Text Multi-Document Workspace">
      {/* Top Controls Toolbar */}
      <div className="lex-lt-toolbar">
        <div className="lex-lt-doc-pills">
          <span className="lex-lt-pill is-active">
            <FileText size={12} />
            <span>Document 1: Contract</span>
          </span>
          <span className="lex-lt-pill is-active">
            <FileText size={12} />
            <span>Document 2: Notice</span>
          </span>
        </div>
        <div className="lex-lt-link-badge">
          <Link2 size={13} />
          <span>Cross-Document Link Verified</span>
        </div>
      </div>

      {/* Dual Document Workspace Canvas */}
      <div className="lex-lt-workspace">
        {/* Left Document: Contract Agreement */}
        <div className="lex-lt-sheet lex-lt-left">
          <div className="lex-lt-sheet-header">
            <span className="lex-lt-sheet-title">Contract Agreement (Master)</span>
            <span className="lex-lt-sheet-badge">Page 14</span>
          </div>
          <div className="lex-lt-sheet-body">
            <p className="lex-lt-para">
              <strong>Section 4.1 · Obligations:</strong> All covenants and conditions shall remain in full force
              throughout the active tenure of this agreement.
            </p>
            <div className={`lex-lt-clause-box ${isHighlighted ? "is-linked" : ""}`}>
              <div className="lex-lt-pin-marker">
                <span className="lex-lt-pin-dot" />
                <span className="lex-lt-pin-label">Clause 4.2</span>
              </div>
              <p className="lex-lt-clause-text">
                "In the event of default, the aggrieved party shall issue formal written notice allowing a mandatory
                thirty (30) business day cure window prior to initiating court recovery."
              </p>
            </div>
            <p className="lex-lt-para">
              <strong>Section 4.3 · Enforcement:</strong> Failure to cure within the specified statutory period permits
              summary execution and recovery of all outstanding dues.
            </p>
          </div>
        </div>

        {/* Center Floating Cross-Document Anchor Yarn & Card */}
        <div className="lex-lt-bridge">
          {/* Connector Lines */}
          <svg className="lex-lt-yarn-svg" viewBox="0 0 120 180" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M 0,55 C 50,55 70,85 120,85"
              fill="none"
              stroke="#16876D"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              className="lex-yarn-pulse"
            />
            <circle cx="6" cy="55" r="4" fill="#16876D" />
            <circle cx="114" cy="85" r="4" fill="#16876D" />
          </svg>

          {/* Connected Synthesized Excerpt Card */}
          <div className="lex-lt-synth-card">
            <div className="lex-lt-synth-header">
              <Sparkles size={13} />
              <span>Synthesized Fact Match</span>
            </div>
            <strong className="lex-lt-synth-title">30-Day Cure Period Satisfied</strong>
            <p className="lex-lt-synth-note">
              Notice was served on Day 0; court petition filed on Day 34. Timeline requirement verified.
            </p>
          </div>
        </div>

        {/* Right Document: Formal Notice */}
        <div className="lex-lt-sheet lex-lt-right">
          <div className="lex-lt-sheet-header">
            <span className="lex-lt-sheet-title">Issued Statutory Notice</span>
            <span className="lex-lt-sheet-badge">Page 02</span>
          </div>
          <div className="lex-lt-sheet-body">
            <p className="lex-lt-para">
              <strong>Paragraph 2 · Background:</strong> Formal records demonstrate that covenants under the master
              agreement remained unfulfilled after due notice.
            </p>
            <div className={`lex-lt-clause-box ${isHighlighted ? "is-linked" : ""}`}>
              <div className="lex-lt-pin-marker">
                <span className="lex-lt-pin-dot" />
                <span className="lex-lt-pin-label">Notice Para 3</span>
              </div>
              <p className="lex-lt-clause-text">
                "Take notice that thirty (30) full business days have elapsed since initial service without cure, thereby
                entitling immediate institution of formal court proceedings."
              </p>
            </div>
            <p className="lex-lt-para">
              <strong>Paragraph 4 · Demand:</strong> Immediate remittance of all accrued amounts is hereby required
              forthwith.
            </p>
          </div>
        </div>
      </div>

      <div className="lex-lt-caption-bar">
        <span>Active Reading Canvas · Click any clause across documents to link evidence without switching tabs.</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PILLAR 3: COURT FILING ENGINE
   A complete, realistic Filing Preparation Studio with 7 automated stages
   and verified, portal-compliant downloadable bundle cards.
   ───────────────────────────────────────────────────────────────────────────── */
function FilingDiagram() {
  const [pipelineProgress, setPipelineProgress] = useState(7);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    { num: "01", name: "Merge & Normalize", desc: "18 input scans and PDFs joined into one continuous stream", icon: Layers },
    { num: "02", name: "Cover Page & Index", desc: "Automated table of contents with page counts generated", icon: FileText },
    { num: "03", name: "Smart OCR Text", desc: "High-accuracy searchable text layer applied to scanned exhibits", icon: Search },
    { num: "04", name: "Portal Compression", desc: "Optimized for maximum clarity while staying sub-10MB", icon: ShieldCheck },
    { num: "05", name: "Court Pagination", desc: "Running 'Page X of Y' stamped exactly per court specifications", icon: Hash },
    { num: "06", name: "Official Digital Seal", desc: "Organization and advocate seal applied across all sheets", icon: Stamp },
    { num: "07", name: "Bundle Partitioning", desc: "Clean split at document boundaries for portal upload limits", icon: Split },
  ];

  const bundles = [
    { name: "Bundle 01 — Main Petition", pages: "Pages 1 to 142", size: "8.4 MB", compliant: true },
    { name: "Bundle 02 — Annexures Part A", pages: "Pages 143 to 310", size: "9.1 MB", compliant: true },
    { name: "Bundle 03 — Annexures Part B", pages: "Pages 311 to 482", size: "7.8 MB", compliant: true },
  ];

  const handleReplay = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setPipelineProgress(0);

    let current = 0;
    const timer = setInterval(() => {
      current++;
      setPipelineProgress(current);
      if (current >= 7) {
        clearInterval(timer);
        setIsRunning(false);
      }
    }, 450);
  }, [isRunning]);

  return (
    <div className="lex-fp-card" aria-label="Interactive Automated Court Filing Studio">
      {/* Studio Header */}
      <div className="lex-fp-header">
        <div>
          <span className="lex-fp-badge">COURT FILING ENGINE</span>
          <h4 className="lex-fp-title">Automated Portal Dossier Generator</h4>
        </div>
        <button
          type="button"
          className="lex-fp-rerun-btn"
          onClick={handleReplay}
          disabled={isRunning}
          title="Simulate complete filing pipeline"
        >
          <RefreshCw size={13} className={isRunning ? "is-spinning" : ""} />
          <span>{isRunning ? "Running Pipeline…" : "Replay Pipeline"}</span>
        </button>
      </div>

      {/* 7 Automated Pipeline Stages Grid */}
      <div className="lex-fp-stages-grid">
        {steps.map((st, i) => {
          const isDone = i < pipelineProgress;
          const isCurrent = i === pipelineProgress && isRunning;
          return (
            <div
              key={st.name}
              className={`lex-fp-stage-box ${isDone ? "is-done" : isCurrent ? "is-current" : ""}`}
            >
              <div className="lex-fp-stage-top">
                <span className="lex-fp-stage-num">{st.num}</span>
                <div className="lex-fp-stage-icon">
                  <st.icon size={14} />
                </div>
                {isDone ? (
                  <CheckCircle2 size={15} className="lex-fp-stage-check" />
                ) : isCurrent ? (
                  <span className="lex-fp-pulse-dot" />
                ) : (
                  <span className="lex-fp-idle-dot" />
                )}
              </div>
              <strong className="lex-fp-stage-name">{st.name}</strong>
              <p className="lex-fp-stage-desc">{st.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Output Bundles Showcase */}
      <div className="lex-fp-output-tray">
        <div className="lex-fp-tray-label">
          <span>PORTAL-READY OUTPUT DOSSIERS (SUB-10MB COMPLIANT)</span>
          <span className="lex-fp-tray-tag">100% Passing Portal Checks</span>
        </div>
        <div className="lex-fp-bundles-row">
          {bundles.map((bd) => (
            <div key={bd.name} className="lex-fp-bundle-card">
              <div className="lex-fp-bundle-top">
                <FileCheck size={16} className="lex-fp-bundle-icon" />
                <span className="lex-fp-bundle-status">Verified Compliant</span>
              </div>
              <strong className="lex-fp-bundle-title">{bd.name}</strong>
              <div className="lex-fp-bundle-footer">
                <span>{bd.pages}</span>
                <span className="lex-fp-bundle-size">{bd.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   LEX PILLARS WRAPPER & TAB SWITCHER
   ───────────────────────────────────────────────────────────────────────────── */
const PILLARS = [
  {
    id: "case-management",
    num: "01",
    label: "Case Management",
    tagline: "Every case. One live record. No loose ends.",
    body: "Bring borrower details, loan documents, limitation dates, hearing schedules, and statutory notice drafts into a single structured master docket. Your team stops hunting through email attachments and always knows the exact next action.",
    chips: [
      "Master case docket with live status tracking",
      "Hearing schedules & statutory limitation dates",
      "Role-based access for litigation teams and counsel",
      "Auto-populated legal notices & court affidavits",
      "Complete timestamped audit trail of all actions",
    ],
    diagram: <CaseMgmtDiagram />,
  },
  {
    id: "liquid-text",
    num: "02",
    label: "Liquid Text",
    tagline: "Active document intelligence. Connect facts to evidence.",
    body: "Open contracts, notices, and court pleadings on a dynamic multi-document canvas. Pull excerpts, draw living connective links between clauses, annotate in context, and build your legal brief without switching windows or printing reams of paper.",
    chips: [
      "Side-by-side active multi-document canvas",
      "Cross-document clause and fact linkage",
      "Extracted evidence nodes with context anchors",
      "Direct clause comparison across pleadings & contracts",
      "Instant synthesis of complex dispute records",
    ],
    diagram: <LiquidTextDiagram />,
  },
  {
    id: "court-filing",
    num: "03",
    label: "Case Filing",
    tagline: "A full day of manual filing work, automated in one click.",
    body: "Merge multi-format files, run selective OCR, generate index pages, compress under portal limits, apply official seals, stamp running pagination, and split into compliant sub-10MB bundles ready for immediate court upload.",
    chips: [
      "One-click automated 7-step filing pipeline",
      "Selective OCR that converts only scanned pages",
      "High-clarity compression designed for portal limits",
      "Court-mandated running pagination (Page X of Y)",
      "Automated bundle splitting at document boundaries",
    ],
    diagram: <FilingDiagram />,
  },
];

export default function LexPillars() {
  const [active, setActive] = useState(0);
  const p = PILLARS[active];

  return (
    <section className="lp-section wrap" id="pillars">
      {/* Pillar Selector Tabs */}
      <div className="lp-selector" role="tablist" aria-label="Kairologic Lex Suite Modules">
        {PILLARS.map((pl, i) => (
          <button
            key={pl.id}
            role="tab"
            aria-selected={i === active}
            className={`lp-sel-btn ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
            type="button"
          >
            <span className="lp-sel-num">{pl.num}</span>
            <span className="lp-sel-label">{pl.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="lp-content" key={p.id}>
        {/* Left Column: Descriptive Copy */}
        <div className="lp-copy">
          <p className="lp-module-tag">Module {p.num} · {p.label}</p>
          <h2 className="lp-heading">{p.tagline}</h2>
          <p className="lp-body">{p.body}</p>
          <ul className="lp-chips">
            {p.chips.map((c) => (
              <li key={c}>
                <CheckCircle2 size={16} className="lp-chip-icon" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: High-Fidelity Interactive Diagram */}
        <div className="lp-visual">
          {p.diagram}
        </div>
      </div>
    </section>
  );
}
