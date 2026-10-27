"use client";
import { useEffect, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Check,
  FileText,
  FolderOpen,
  MapPin,
  Play,
  Pause,
  RotateCcw,
  Layers,
  ChartNoAxesCombined,
} from "lucide-react";
const chapters = [
  {
    label: "Connect",
    title: "Everything finds its case.",
    description: "Data, documents and field evidence converge into one record.",
  },
  {
    label: "Prepare",
    title: "The record does the retyping.",
    description: "Mapped case details populate a template, ready for review.",
  },
  {
    label: "Act",
    title: "Every update points forward.",
    description: "The next action stays visible to the people responsible.",
  },
];
const sources = [
  {
    label: "Borrower data",
    detail: "Borrower & loan details",
    sub: "Industrial unit · Mumbai",
    icon: Layers,
  },
  {
    label: "Documents",
    detail: "Notices & court order",
    sub: "Linked to the case record",
    icon: FileText,
  },
  {
    label: "Field evidence",
    detail: "Photographs & location",
    sub: "Captured during site visits",
    icon: MapPin,
  },
];
export default function CaseWorkflow() {
  const [step, setStep] = useState(0);
  const [source, setSource] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(
      () => {
        if (step < 2) {
          setStep(step + 1);
          if (step === 0) setPrepared(true);
        } else setPlaying(false);
      },
      reduced ? 1200 : 3000,
    );
    return () => clearTimeout(timer);
  }, [playing, step, reduced]);
  function select(n: number) {
    setPlaying(false);
    setStep(n);
    if (n === 1) setPrepared(false);
  }
  function keys(e: KeyboardEvent<HTMLDivElement>) {
    const n =
      e.key === "ArrowRight"
        ? (step + 1) % 3
        : e.key === "ArrowLeft"
          ? (step + 2) % 3
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 2
              : null;
    if (n === null) return;
    e.preventDefault();
    select(n);
    e.currentTarget
      .querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [n]?.focus();
  }
  const current = sources[source];
  return (
    <div
      className={`case-constellation phase-${step} ${playing ? "is-playing" : ""}`}
    >
      <div className="constellation-top">
        <span>
          <i className="signal-dot" /> THE CONNECTED CASE
        </span>
        <span className="illustrative-label">Illustrative view</span>
      </div>
      <div className="constellation-canvas">
        <div className="case-orbit orbit-one" aria-hidden="true" />
        <div className="case-orbit orbit-two" aria-hidden="true" />
        <svg
          className="case-traces"
          viewBox="0 0 680 490"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="traceGradient">
              <stop stopColor="#365483" />
              <stop offset="1" stopColor="#49dab9" />
            </linearGradient>
          </defs>
          {[
            { d: step === 1 ? "M156 135 C230 135 220 310 300 310" : "M156 135 C236 135 213 247 310 247", name: "data" },
            { d: step === 1 ? "M141 450 C230 450 210 390 290 390" : "M141 337 C230 337 222 278 310 278", name: "documents" },
            { d: step === 1 ? "M270 600 C270 520 360 500 360 420" : "M529 408 C499 408 452 316 400 301", name: "field" },
            { d: step === 1 ? "M400 330 C460 330 440 260 500 260" : "M423 239 C505 239 454 112 542 112", name: "outcome" },
          ].map((p, i) => (
            <g
              key={p.name}
              className={`trace-group ${source === i && step === 0 ? "trace-selected" : ""} ${i === 3 ? "trace-outcome" : ""}`}
            >
              <path d={p.d} className="trace-rail" />
              <path
                d={p.d}
                className="trace-signal"
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            </g>
          ))}
        </svg>
        <button
          className={`source-node source-data ${source === 0 && step === 0 ? "source-selected" : ""}`}
          onClick={() => {
            setSource(0);
            select(0);
          }}
          aria-pressed={step === 0 && source === 0}
        >
          <span className="node-icon">
            <Layers size={22} />
          </span>
          <strong>Borrower data</strong>
          <span className="source-node-note">The starting point</span>
        </button>
        <button
          className={`source-node source-documents ${source === 1 && step === 0 ? "source-selected" : ""}`}
          onClick={() => {
            setSource(1);
            select(0);
          }}
          aria-pressed={step === 0 && source === 1}
        >
          <span className="node-icon">
            <FileText size={22} />
          </span>
          <strong>Documents</strong>
          <span className="source-node-note">Every file, linked</span>
        </button>
        <button
          className={`source-node source-field ${source === 2 && step === 0 ? "source-selected" : ""}`}
          onClick={() => {
            setSource(2);
            select(0);
          }}
          aria-pressed={step === 0 && source === 2}
        >
          <img
            src="/images/field-inspection.webp"
            alt="Illustrative field visit"
          />
          <span>
            <MapPin size={19} />
            <strong>Field evidence</strong>
          </span>
        </button>
        <div className="record-heart">
          <div className="heart-top">
            <span className="heart-symbol">
              <FolderOpen size={24} />
            </span>
            <span className="signal-dot" />
          </div>
          <span className="heart-label">ONE CASE RECORD</span>
          <h3>ABC Industries</h3>
          <p key={`${step}-${source}`} className="heart-detail">
            {step === 0
              ? current.detail
              : step === 1
                ? "Case fields mapped"
                : "Section 14 order received"}
          </p>
          <div className="heart-bottom">
            <Check size={17} />
            {step === 0
              ? current.sub
              : step === 1
                ? "Ready for the template"
                : "Possession is next"}
          </div>
          <span className="heart-corner corner-one" />
          <span className="heart-corner corner-two" />
        </div>
        <div
          className={`outcome-node ${step === 1 ? "outcome-document" : ""}`}
          key={step}
        >
          <div className="outcome-top">
            {step === 0 ? (
              <FolderOpen size={21} />
            ) : step === 1 ? (
              <FileText size={21} />
            ) : (
              <ChartNoAxesCombined size={21} />
            )}
            <span>
              {step === 0
                ? "One source of truth"
                : step === 1
                  ? "Document preview"
                  : "Next action"}
            </span>
          </div>
          {step === 0 ? (
            <>
              <strong>
                The whole case.
                <br />
                In context.
              </strong>
              <span className="outcome-status">
                <Check size={16} /> Connected
              </span>
            </>
          ) : step === 1 ? (
            <>
              <div className={`document-sheet ${prepared ? "is-populated" : ""}`}>
                <div className="document-sheet-heading">
                  <span className="document-rule" aria-hidden="true" />
                  <strong>Case summary</strong>
                  <span>Approved template · sample</span>
                </div>
                <dl className="document-fields" key={prepared ? "filled" : "empty"}>
                  {[
                    ["Borrower", "ABC Industries", "Borrower name"],
                    ["Property", "Industrial unit", "Property type"],
                    ["Location", "Mumbai", "Case location"],
                  ].map(([label, value, placeholder], index) => (
                    <div className="document-field" key={label} style={{ animationDelay: `${index * 230}ms` }}>
                      <dt>{label}</dt>
                      <dd>{prepared ? value : <span className="document-placeholder">{placeholder}</span>}
                        {prepared && <Check size={17} aria-hidden="true" />}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="document-sheet-status" role="status">
                  {prepared ? <><Check size={18} /> Ready for review</> : <><Layers size={18} /> Waiting for case details</>}
                </div>
              </div>
              <p className="document-instruction">
                {prepared ? "Sample details filled from the case record." : "See case details fill an approved template."}
              </p>
              <button className="mapping-trigger" onClick={() => setPrepared(!prepared)}>
                {prepared ? "Reset preview" : "Populate fields"}
                <ArrowRight size={17} />
              </button>
            </>
          ) : (
            <>
              <strong>
                Coordinate
                <br />
                possession.
              </strong>
              <span className="outcome-status">
                <i className="signal-dot" /> Field team
              </span>
            </>
          )}
        </div>
        <div className="constellation-coordinate" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
      </div>
      <div
        className="chapter-controls"
        role="tablist"
        aria-label="Explore the connected case workflow"
        onKeyDown={keys}
      >
        {chapters.map((c, i) => (
          <button
            key={c.label}
            role="tab"
            id={`chapter-${i}`}
            aria-controls="workflow-caption"
            aria-selected={step === i}
            tabIndex={step === i ? 0 : -1}
            onClick={() => select(i)}
          >
            <span className="chapter-index">0{i + 1}</span>
            <strong>{c.label}</strong>
            <span className="chapter-meter" />
          </button>
        ))}
      </div>
      <div
        className="workflow-caption"
        role="tabpanel"
        id="workflow-caption"
        aria-labelledby={`chapter-${step}`}
      >
        <div aria-live="polite">
          <h3>{chapters[step].title}</h3>
          <p>{chapters[step].description}</p>
        </div>
        <button
          className="play-workflow"
          onClick={() => {
            if (playing) {
              setPlaying(false);
            } else {
              setStep(0);
              setPrepared(false);
              setPlaying(true);
            }
          }}
          aria-label={
            playing
              ? "Pause workflow"
              : step === 2
                ? "Replay workflow"
                : "Play workflow"
          }
          title={playing ? "Pause workflow" : "Play the workflow"}
        >
          {playing ? (
            <Pause size={22} />
          ) : step === 2 ? (
            <RotateCcw size={22} />
          ) : (
            <Play size={22} />
          )}
        </button>
      </div>
    </div>
  );
}
