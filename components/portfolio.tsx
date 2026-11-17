"use client";
import { useState, type KeyboardEvent } from "react";
import {
  ArrowUpRight,
  FileText,
  MapPin,
  Check,
  ChartNoAxesCombined,
  Scale,
  Users,
} from "lucide-react";

const roles = [
  {
    label: "Management",
    icon: ChartNoAxesCombined,
    title: "The portfolio, at a glance.",
    text: "See where cases stand and where attention is needed.",
    selected: 2,
  },
  {
    label: "Legal team",
    icon: Scale,
    title: "The next legal step, in context.",
    text: "Keep case details, notices and orders within reach.",
    selected: 1,
  },
  {
    label: "Field team",
    icon: Users,
    title: "The case goes where the work is.",
    text: "Connect the site visit, property evidence and next action.",
    selected: 2,
  },
];

const pipeline = [
  { label: "Filing", value: 19 },
  { label: "Order pending", value: 31 },
  { label: "Possession pending", value: 46 },
  { label: "Auction & sale", value: 22 },
  { label: "Closed", value: 130 },
];

export default function Portfolio() {
  const [role, setRole] = useState(0);
  const [stage, setStage] = useState(2);
  const r = roles[role];

  function keys(e: KeyboardEvent<HTMLDivElement>) {
    const n =
      e.key === "ArrowRight"
        ? (role + 1) % 3
        : e.key === "ArrowLeft"
          ? (role + 2) % 3
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 2
              : null;
    if (n === null) return;
    e.preventDefault();
    setRole(n);
    setStage(roles[n].selected);
    e.currentTarget
      .querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [n]?.focus();
  }

  return (
    <div className="portfolio-shell">
      <div className="portfolio-toolbar">
        <span className="portfolio-label">
          <i className="signal-dot" /> THE SAME CASE. A DIFFERENT VIEW.
        </span>
        <span className="illustrative-label">Sample data</span>
      </div>

      <div
        className="role-switcher"
        role="tablist"
        aria-label="Explore team perspectives"
        onKeyDown={keys}
      >
        {roles.map((x, i) => {
          const Icon = x.icon;
          return (
            <button
              role="tab"
              id={`perspective-${i}`}
              aria-selected={role === i}
              aria-controls="perspective-panel"
              tabIndex={role === i ? 0 : -1}
              onClick={() => {
                setRole(i);
                setStage(x.selected);
              }}
              key={x.label}
            >
              <Icon size={20} />
              <span>{x.label}</span>
              <ArrowUpRight size={17} />
            </button>
          );
        })}
      </div>

      <div
        className="portfolio-headline"
        id="perspective-panel"
        role="tabpanel"
        aria-labelledby={`perspective-${role}`}
      >
        <div>
          <h3>{r.title}</h3>
          <p>{r.text}</p>
        </div>
        <div className="portfolio-total">
          <strong>248</strong>
          <span>TOTAL CASES</span>
        </div>
      </div>

      <div className="portfolio-body">
        {/* Left Column: Universal Case Pipeline */}
        <div className="pipeline-chart">
          <div className="chart-label-row">
            <h4>The case pipeline</h4>
            <span className="chart-sub-guide">Select a stage</span>
          </div>

          <div
            className="pipeline-rows"
            role="group"
            aria-label="Sample cases by stage"
          >
            {pipeline.map((p, i) => (
              <button
                className={`pipeline-line ${stage === i ? "is-selected" : ""}`}
                aria-pressed={stage === i}
                onClick={() => setStage(i)}
                key={p.label}
              >
                <span className="pipeline-stage-name">{p.label}</span>
                <span className="pipeline-track">
                  <i
                    className={i === 4 ? "closed-fill" : ""}
                    style={{ width: `${(p.value / 130) * 100}%` }}
                  />
                </span>
                <span className="pipeline-value-badge">{p.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Circular Donut Gauge Cockpit */}
        <div className="portfolio-insight">
          {role === 0 ? (
            <div className="closure-cockpit">
              <div className="chart-label-row">
                <h4>Closure progress</h4>
              </div>

              <div className="closure-ring" aria-label="130 of 248 sample cases closed">
                <svg
                  viewBox="0 0 200 200"
                  role="img"
                >
                  <defs>
                    <linearGradient id="portfolio-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="76" className="ring-base" />
                  <circle
                    cx="100"
                    cy="100"
                    r="76"
                    className="ring-complete"
                    pathLength="100"
                    strokeDasharray="52.419 100"
                  />
                </svg>
                <div className="closure-ring-center">
                  <strong>
                    52<span>%</span>
                  </strong>
                  <span>CLOSED</span>
                </div>
              </div>

              <div className="closure-legend">
                <span>
                  <i /> 130 closed
                </span>
                <span>
                  <i /> 118 active
                </span>
              </div>
            </div>
          ) : role === 1 ? (
            <div className="role-evidence legal-evidence">
              <FileText size={30} />
              <span className="eyebrow">LINKED TO THE CASE</span>
              <h4>
                The order.
                <br />
                The record.
                <br />
                The next step.
              </h4>
              <p>Court order verified.</p>
              <div>
                <Check size={18} /> Ready for next action
              </div>
            </div>
          ) : (
            <div className="role-evidence field-evidence">
              <img
                src="/images/field-inspection.webp"
                alt="Illustrative property inspection"
                loading="lazy"
                width={320}
                height={240}
              />
              <div>
                <MapPin size={22} />
                <h4>
                  Evidence from
                  <br />
                  the ground.
                </h4>
                <p>Photographs and location, linked to the case.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
