"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   LEX PILLARS — 3-tab pillar switcher with live interactive diagrams
   Case Management | Liquid Text | Court Filing
   ───────────────────────────────────────────────────────────────────────────── */

// ─── Case Management diagram ────────────────────────────────────────────────
function CaseMgmtDiagram() {
  const [active, setActive] = useState(0);

  const stages = [
    { label: "Notice Served", color: "#16876D", status: "done" },
    { label: "Sec 14 Filed", color: "#16876D", status: "done" },
    { label: "Order Received", color: "#16876D", status: "done" },
    { label: "Possession", color: "#F2B84B", status: "active" },
    { label: "Auction", color: "#1E2A3A", status: "pending" },
    { label: "Closed", color: "#1E2A3A", status: "pending" },
  ];

  const fields = [
    { key: "Borrower", val: "M/s Ashoka Traders Ltd." },
    { key: "Loan A/c", val: "NPA-2026-00841" },
    { key: "Court", val: "DRT Mumbai — DM Div 3" },
    { key: "Limitation", val: "12 Apr 2027" },
    { key: "Next Hearing", val: "04 Dec 2026" },
    { key: "Stage", val: "Possession" },
  ];

  const docs = [
    { icon: "📄", name: "Demand Notice (13.2)", tag: "Generated" },
    { icon: "📋", name: "Possession Notice (13.4)", tag: "Generated" },
    { icon: "🗂", name: "Inventory & Panchnama", tag: "Generated" },
    { icon: "📷", name: "Site Photos — 3 Nov", tag: "Uploaded" },
  ];

  const tabs = ["Case Record", "Stage Track", "Documents"];

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="lp-diagram lp-case">
      <div className="lp-casefile">
        {/* Case header */}
        <div className="lp-cf-header">
          <span className="lp-cf-badge">SARFAESI CASE</span>
          <span className="lp-cf-id">#2026-0841</span>
        </div>

        {/* Tab nav */}
        <div className="lp-cf-tabs" role="tablist">
          {tabs.map((t, i) => (
            <button
              key={t}
              role="tab"
              aria-selected={active === i}
              className={`lp-cf-tab${active === i ? " is-on" : ""}`}
              onClick={() => setActive(i)}
              type="button"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Panel 0: Case Record */}
        <div className={`lp-cf-panel${active === 0 ? " is-on" : ""}`}>
          <div className="lp-fields">
            {fields.map((f) => (
              <div className="lp-field" key={f.key}>
                <span className="lp-field-k">{f.key}</span>
                <span className="lp-field-v">{f.val}</span>
              </div>
            ))}
          </div>
          <div className="lp-sample-note">
            Illustrative sample data
          </div>
        </div>

        {/* Panel 1: Stage Track */}
        <div className={`lp-cf-panel${active === 1 ? " is-on" : ""}`}>
          <div className="lp-stages">
            {stages.map((s, i) => (
              <div className={`lp-stage lp-stage--${s.status}`} key={s.label}>
                <span
                  className="lp-stage-dot"
                  style={s.status === "done" || s.status === "active" ? { background: s.color } : {}}
                />
                {i < stages.length - 1 && (
                  <span
                    className="lp-stage-line"
                    style={s.status === "done" ? { background: s.color } : {}}
                  />
                )}
                <span className="lp-stage-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Documents */}
        <div className={`lp-cf-panel${active === 2 ? " is-on" : ""}`}>
          <div className="lp-docs">
            {docs.map((d) => (
              <div className="lp-doc-row" key={d.name}>
                <span className="lp-doc-icon">{d.icon}</span>
                <span className="lp-doc-name">{d.name}</span>
                <span className="lp-doc-tag">{d.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Liquid Text diagram ─────────────────────────────────────────────────────
function LiquidTextDiagram() {
  const [linkActive, setLinkActive] = useState(false);
  const [activeDoc, setActiveDoc] = useState<number | null>(null);

  useEffect(() => {
    // Auto-animate the link activation
    const t1 = setTimeout(() => setLinkActive(true), 1200);
    return () => clearTimeout(t1);
  }, []);

  const leftLines = [
    { w: "90%", accent: false },
    { w: "75%", accent: false },
    { w: "88%", accent: true },   // highlighted clause
    { w: "60%", accent: false },
    { w: "82%", accent: false },
    { w: "55%", accent: true },   // highlighted clause
    { w: "70%", accent: false },
  ];

  const rightLines = [
    { w: "85%", accent: false },
    { w: "92%", accent: false },
    { w: "60%", accent: true },   // connected clause
    { w: "78%", accent: false },
    { w: "68%", accent: false },
    { w: "88%", accent: true },   // connected clause
    { w: "55%", accent: false },
  ];

  const docs = [
    { name: "Loan Agreement", short: "Agreement" },
    { name: "Section 13(2) Notice", short: "Demand Notice" },
    { name: "DRT Petition Bundle", short: "Petition" },
  ];

  return (
    <div className="lp-diagram lp-liquid">
      {/* Doc selector pills */}
      <div className="lp-lt-pills">
        {docs.map((d, i) => (
          <button
            key={d.name}
            type="button"
            className={`lp-lt-pill${activeDoc === i ? " is-on" : ""}`}
            onClick={() => setActiveDoc(activeDoc === i ? null : i)}
          >
            {d.short}
          </button>
        ))}
      </div>

      {/* Two-pane document canvas */}
      <div className="lp-lt-canvas">
        {/* Left doc */}
        <div
          className={`lp-lt-doc${activeDoc === 0 ? " is-focused" : ""}`}
          onClick={() => setActiveDoc(activeDoc === 0 ? null : 0)}
        >
          <div className="lp-lt-doc-title">Loan Agreement</div>
          <div className="lp-lt-lines">
            {leftLines.map((l, i) => (
              <div
                key={i}
                className={`lp-lt-line${l.accent ? " is-accent" : ""}${l.accent && linkActive ? " is-linked" : ""}`}
                style={{ width: l.w }}
              />
            ))}
          </div>
          {linkActive && (
            <div className="lp-lt-excerpt">
              <span className="lp-lt-excerpt-label">Extracted clause</span>
              <span className="lp-lt-excerpt-text">
                "…outstanding principal of ₹4.2 Cr plus interest at 14.5% p.a…"
              </span>
            </div>
          )}
        </div>

        {/* SVG connection yarn */}
        <svg
          className="lp-lt-yarn"
          viewBox="0 0 60 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {linkActive && (
            <>
              <path
                d="M 0,70 C 30,70 30,90 60,90"
                stroke="#16876D"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 3"
                opacity="0.9"
              />
              <path
                d="M 0,130 C 30,130 30,150 60,150"
                stroke="#16876D"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 3"
                opacity="0.9"
              />
            </>
          )}
        </svg>

        {/* Right doc */}
        <div
          className={`lp-lt-doc${activeDoc === 1 ? " is-focused" : ""}`}
          onClick={() => setActiveDoc(activeDoc === 1 ? null : 1)}
        >
          <div className="lp-lt-doc-title">Demand Notice (13.2)</div>
          <div className="lp-lt-lines">
            {rightLines.map((l, i) => (
              <div
                key={i}
                className={`lp-lt-line${l.accent ? " is-accent" : ""}${l.accent && linkActive ? " is-linked" : ""}`}
                style={{ width: l.w }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom caption */}
      <div className="lp-lt-caption">
        {linkActive
          ? "Clause linked across both documents. Click any pill to open a third document."
          : "Connecting clauses across documents…"}
      </div>
    </div>
  );
}

// ─── Court Filing diagram — reuse the existing chip summary visual ───────────
function FilingDiagram() {
  const steps = [
    { n: "01", label: "Merge", done: true },
    { n: "02", label: "Cover Page", done: true },
    { n: "03", label: "Smart Text", done: true },
    { n: "04", label: "Compress", done: true },
    { n: "05", label: "Pagination", done: false },
    { n: "06", label: "Seal", done: false },
    { n: "07", label: "Split", done: false },
  ];
  const [active, setActive] = useState(4);

  useEffect(() => {
    if (active >= steps.length) return;
    const t = setTimeout(() => setActive((a) => a + 1), 850);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="lp-diagram lp-filing">
      <div className="lp-filing-title">Filing pipeline — running</div>
      <div className="lp-filing-steps">
        {steps.map((s, i) => {
          const done = i < active;
          return (
            <div key={s.label} className={`lp-fs${done ? " is-done" : ""}`}>
              <span className="lp-fs-n">{s.n}</span>
              <span className="lp-fs-bar" style={done ? { width: "100%", background: "#16876D" } : {}} />
              <span className="lp-fs-label">{s.label}</span>
              {done && <span className="lp-fs-tick">✓</span>}
            </div>
          );
        })}
      </div>
      <div className="lp-filing-output">
        <div className="lp-fo-part">Part 1</div>
        <div className="lp-fo-part">Part 2</div>
        <div className="lp-fo-part">Part 3</div>
      </div>
      <div className="lp-lt-caption">Portal-ready bundles — ready to upload</div>
    </div>
  );
}

// ─── Pillar data ─────────────────────────────────────────────────────────────
const PILLARS = [
  {
    id: "case-management",
    num: "01",
    label: "Case Management",
    tagline: "Every case. One record. No loose ends.",
    body: "A single digital file holds the borrower, loan details, court orders, hearing dates, limitation deadlines, field photos, and every auto-generated notice. Your team stops hunting through emails and starts acting on what matters next.",
    chips: [
      "Master case docket",
      "Hearing & limitation tracker",
      "Role-based team access",
      "Auto-generated legal notices",
      "Possession & auction workflow",
    ],
    diagram: <CaseMgmtDiagram />,
  },
  {
    id: "liquid-text",
    num: "02",
    label: "Liquid Text",
    tagline: "Read across documents. Connect facts to evidence.",
    body: "Open multiple documents side-by-side — agreement vs. notice, petition vs. counter. Pull excerpts, draw connective links between clauses, annotate in context, and build a living brief without printing a single sheet.",
    chips: [
      "Side-by-side document canvas",
      "Cross-document clause linking",
      "Excerpt & annotation workspace",
      "Compare pleadings & agreements",
      "Brief building — no printing",
    ],
    diagram: <LiquidTextDiagram />,
  },
  {
    id: "court-filing",
    num: "03",
    label: "Court Filing",
    tagline: "A day of filing work, automated in one click.",
    body: "Merge, smart OCR, compress, paginate, apply the bank seal, and split into portal-ready bundles — all inside your web browser, nothing to install, running unattended while your team handles the next case.",
    chips: [
      "1-click full pipeline",
      "Selective OCR (scan-aware)",
      "Court-mandated pagination",
      "Bank seal on every page",
      "Portal bundle splitting",
    ],
    diagram: <FilingDiagram />,
  },
];

// ─── Main export ─────────────────────────────────────────────────────────────
export default function LexPillars() {
  const [active, setActive] = useState(0);
  const p = PILLARS[active];

  return (
    <section className="lp-section wrap" id="pillars">
      {/* Pillar selector */}
      <div className="lp-selector" role="tablist" aria-label="Kairologic Lex modules">
        {PILLARS.map((pl, i) => (
          <button
            key={pl.id}
            role="tab"
            aria-selected={i === active}
            className={`lp-sel-btn${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
            type="button"
          >
            <span className="lp-sel-num">{pl.num}</span>
            <span className="lp-sel-label">{pl.label}</span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="lp-content" key={p.id}>
        {/* Left: copy */}
        <div className="lp-copy">
          <p className="lp-module-tag">{p.label}</p>
          <h2 className="lp-heading">{p.tagline}</h2>
          <p className="lp-body">{p.body}</p>
          <ul className="lp-chips">
            {p.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Right: diagram */}
        <div className="lp-visual" aria-hidden="true">
          {p.diagram}
        </div>
      </div>
    </section>
  );
}
