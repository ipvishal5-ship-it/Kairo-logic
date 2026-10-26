"use client";
import { useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  FolderOpen,
  MapPin,
  ShieldCheck,
  LockKeyhole,
  History,
  ChevronRight,
  ChartNoAxesCombined,
  PanelsTopLeft,
} from "lucide-react";
import Reveal from "./reveal";
const features = [
  {
    name: "Connected records",
    title: "The whole case. In one place.",
    copy: "Bring borrower details, legal status, documents and field updates into one organised record.",
    icon: FolderOpen,
  },
  {
    name: "Document automation",
    title: "Enter once. Prepare with confidence.",
    copy: "Map approved templates to case data, prepare the document and review it before use.",
    icon: FileText,
  },
  {
    name: "Clear dashboards",
    title: "See the position. Know the priority.",
    copy: "Turn case updates into a clear view of pending work, progress and the next action.",
    icon: ChartNoAxesCombined,
  },
];
function TabKeys(
  e: KeyboardEvent<HTMLDivElement>,
  active: number,
  set: (n: number) => void,
) {
  const n =
    e.key === "ArrowRight"
      ? (active + 1) % 3
      : e.key === "ArrowLeft"
        ? (active + 2) % 3
        : e.key === "Home"
          ? 0
          : e.key === "End"
            ? 2
            : null;
  if (n === null) return;
  e.preventDefault();
  set(n);
  e.currentTarget
    .querySelectorAll<HTMLButtonElement>('[role="tab"]')
    [n]?.focus();
}
function CaseDemo() {
  return (
    <div className="case-demo">
      <div className="demo-title">
        <div>
          <span className="eyebrow">CASE OVERVIEW</span>
          <h3>ABC Industries</h3>
        </div>
        <span className="demo-badge">Illustrative</span>
      </div>
      <div className="case-demo-content">
        <div className="property-preview">
          <img
            src="/images/hero-industrial-estate.webp"
            alt="Illustrative industrial estate linked to a sample case"
          />
          <span>
            <MapPin size={18} /> Industrial property, Mumbai
          </span>
        </div>
        <div className="case-summary">
          <div>
            <span>Current stage</span>
            <strong>Section 14 order received</strong>
          </div>
          <div>
            <span>Next action</span>
            <strong>
              Coordinate possession <ArrowRight size={18} />
            </strong>
          </div>
          <div className="linked-file">
            <FileText size={22} />
            <span>Order & supporting documents</span>
            <Check size={20} />
          </div>
        </div>
      </div>
      <div className="demo-bottom">
        <span className="teal-dot" /> Case data, documents and activity.
        Connected.
      </div>
    </div>
  );
}
function DocumentDemo() {
  const [ready, setReady] = useState(false);
  return (
    <div className="document-demo">
      <div className="demo-title">
        <div>
          <span className="eyebrow">TEMPLATE WORKFLOW</span>
          <h3>From record to document.</h3>
        </div>
        <span className="demo-badge">Illustrative</span>
      </div>
      <div className="document-demo-content">
        <div className="template-source">
          <div>
            <Check size={20} /> Case selected
          </div>
          <div>
            <Check size={20} /> Approved template
          </div>
          <div>
            <Check size={20} /> Fields mapped
          </div>
          <button className="button primary" onClick={() => setReady(true)}>
            {ready ? "Prepare again" : "Prepare sample"}
            <ArrowRight size={19} />
          </button>
        </div>
        <div
          className={`paper-preview ${ready ? "prepared" : ""}`}
          aria-live="polite"
        >
          <div className="paper-top">
            <FileText size={25} />
            <span>SAMPLE PREVIEW</span>
          </div>
          <h4>{ready ? "Case summary" : "Your approved template"}</h4>
          {ready ? (
            <>
              <p>
                <b>Borrower</b>
                <br />
                ABC Industries
              </p>
              <p>
                <b>Current stage</b>
                <br />
                Section 14 order received
              </p>
              <div className="paper-stamp">
                <Check size={18} /> Ready for review
              </div>
            </>
          ) : (
            <>
              <div className="paper-line long" />
              <div className="paper-line" />
              <div className="paper-line long" />
              <p>Click “Prepare sample” to see fields populate.</p>
            </>
          )}
        </div>
      </div>
      <div className="demo-bottom">
        Interactive illustration of field mapping. Review remains part of the
        workflow.
      </div>
    </div>
  );
}
const stages = [
  { name: "Order pending", count: 31 },
  { name: "Possession pending", count: 46 },
  { name: "Auction & sale", count: 22 },
];
function DashboardDemo() {
  const [selected, setSelected] = useState(1);
  return (
    <div className="dashboard-demo">
      <div className="demo-title">
        <div>
          <span className="eyebrow">MANAGEMENT VIEW</span>
          <h3>A clear view of pending work.</h3>
        </div>
        <span className="demo-badge">Sample data</span>
      </div>
      <div className="dashboard-demo-content">
        <div className="metric">
          <span>Active cases</span>
          <strong>99</strong>
          <p>Across the stages shown</p>
        </div>
        <div
          className="demo-chart"
          role="group"
          aria-label="Explore sample case stages"
        >
          {stages.map((s, i) => (
            <button
              aria-pressed={selected === i}
              className={`chart-row ${selected === i ? "selected" : ""}`}
              onClick={() => setSelected(i)}
              key={s.name}
            >
              <span>{s.name}</span>
              <div className="bar-track">
                <i style={{ width: `${(s.count / 46) * 100}%` }} />
              </div>
              <strong>{s.count}</strong>
            </button>
          ))}
        </div>
      </div>
      <div className="demo-bottom" aria-live="polite">
        <span className="teal-dot" />
        {stages[selected].count} cases at {stages[selected].name.toLowerCase()}{" "}
        stage.
      </div>
    </div>
  );
}
export default function Showcase() {
  const [active, setActive] = useState(0);
  const f = features[active];
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-lines" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="teal-dot" /> WORKFLOW. AUTOMATION. CLARITY.
            </p>
            <h1>
              Bring structure.
              <br />
              <span>
                Move work
                <br className="hero-line-break" /> forward.
              </span>
            </h1>
            <p className="hero-intro">
              Connected records. Automated documents. Clear dashboards.
              Configured around your team.
            </p>
            <div className="hero-actions">
              <a className="button mint" href="#platform">
                Explore the solution <ArrowRight size={22} />
              </a>
              <a className="hero-secondary" href="#contact">
                Request a demonstration <ArrowUpRight size={21} />
              </a>
            </div>
            <p className="hero-context">
              Designed around case, legal and recovery operations.
            </p>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
              <img
                src="/images/hero-industrial-estate.webp"
                alt="Illustrative industrial estate at dusk"
                fetchPriority="high"
              />
              <div className="photo-overlay" />
              <span className="photo-caption">
                <MapPin size={18} /> From the asset to the outcome.
              </span>
            </div>
            <div className="hero-workspace">
              <div className="workspace-top">
                <span className="workspace-icon">
                  <PanelsTopLeft size={24} />
                </span>
                <div>
                  <strong>One connected workspace</strong>
                  <span>Everything your team needs in context.</span>
                </div>
              </div>
              <div className="workspace-flow">
                <span>
                  <FolderOpen size={21} />
                  Record
                </span>
                <ChevronRight size={18} />
                <span>
                  <FileText size={21} />
                  Document
                </span>
                <ChevronRight size={18} />
                <span>
                  <ChartNoAxesCombined size={21} />
                  Insight
                </span>
              </div>
              <div className="workspace-footer">
                <span className="teal-dot" /> A simpler way to move work
                forward.
              </div>
            </div>
            <span className="visual-note">Illustrative product view</span>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>Less chasing information.</span>
          <span className="hero-bottom-line" />
          <span>More clarity at every step.</span>
          <a href="#platform" aria-label="Explore how the solution works">
            <ArrowRight size={24} />
          </a>
        </div>
      </section>
      <section className="solution section" id="platform">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">A CLEARER WAY TO WORK</p>
              <h2>
                Three capabilities.
                <br />
                <span>One connected process.</span>
              </h2>
            </div>
            <p>
              Start with the work your team does every day. Make it easier to
              manage, prepare and review.
            </p>
          </Reveal>
          <div
            className="solution-tabs"
            role="tablist"
            aria-label="Explore the solution"
            onKeyDown={(e) => TabKeys(e, active, setActive)}
          >
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  id={`feature-tab-${i}`}
                  role="tab"
                  aria-selected={active === i}
                  aria-controls="feature-panel"
                  tabIndex={i === active ? 0 : -1}
                  key={item.name}
                  onClick={() => setActive(i)}
                >
                  <Icon size={23} />
                  <span>{item.name}</span>
                  <ArrowUpRight className="tab-arrow" size={21} />
                </button>
              );
            })}
          </div>
          <div
            className="feature-panel"
            role="tabpanel"
            id="feature-panel"
            aria-labelledby={`feature-tab-${active}`}
          >
            <div className="feature-explanation">
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
            </div>
            {active === 0 ? (
              <CaseDemo />
            ) : active === 1 ? (
              <DocumentDemo />
            ) : (
              <DashboardDemo />
            )}
          </div>
        </div>
      </section>
      <section className="approach section" id="approach">
        <div className="container">
          <Reveal className="approach-grid">
            <div className="approach-intro">
              <p className="eyebrow">OUR ROLE</p>
              <h2>
                The setup.
                <br />
                The structure.
                <br />
                <span>The way forward.</span>
              </h2>
              <p>
                We bring your process, data and documents together in a working
                setup your team can use.
              </p>
              <a className="text-link" href="#contact">
                Discuss your workflow <ArrowUpRight size={22} />
              </a>
            </div>
            <div className="approach-steps">
              <article>
                <span className="step-symbol">
                  <FolderOpen size={25} />
                </span>
                <div>
                  <h3>Understand the work.</h3>
                  <p>
                    Map the case journey, responsibilities and information your
                    team needs.
                  </p>
                </div>
              </article>
              <article>
                <span className="step-symbol">
                  <FileText size={25} />
                </span>
                <div>
                  <h3>Build around your process.</h3>
                  <p>
                    Configure records, document templates, workflows and
                    dashboards.
                  </p>
                </div>
              </article>
              <article>
                <span className="step-symbol">
                  <Check size={27} />
                </span>
                <div>
                  <h3>Make the handover clear.</h3>
                  <p>
                    Test with your team, provide training and agree the support
                    scope.
                  </p>
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="security section" id="security">
        <div className="container">
          <Reveal className="security-grid">
            <div className="security-visual">
              <img
                src="/images/field-inspection.webp"
                alt="Illustrative field officer capturing a property photograph during a visit"
                loading="lazy"
              />
              <div className="security-photo-caption">
                <MapPin size={21} />
                <span>
                  Field evidence.
                  <br />
                  <strong>Connected to the case.</strong>
                </span>
              </div>
            </div>
            <div className="security-copy">
              <p className="eyebrow">CONTROL WITH CLARITY</p>
              <h2>
                The right access.
                <br />
                <span>For the right people.</span>
              </h2>
              <p>
                Security requirements are defined with your team and verified as
                part of implementation.
              </p>
              <ul>
                <li>
                  <ShieldCheck size={27} />
                  <div>
                    <h3>Access by responsibility</h3>
                    <p>Permissions aligned to each team’s role.</p>
                  </div>
                </li>
                <li>
                  <LockKeyhole size={27} />
                  <div>
                    <h3>Controlled documents</h3>
                    <p>Document visibility and access set deliberately.</p>
                  </div>
                </li>
                <li>
                  <History size={27} />
                  <div>
                    <h3>Traceable changes</h3>
                    <p>History for selected, tracked case information.</p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
