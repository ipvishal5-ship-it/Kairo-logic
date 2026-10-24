"use client";
import { useState } from "react";
import { Reveal } from "./motion-primitives";
import { ArrowRight, Check } from "lucide-react";
const sources = [
  "Spreadsheets",
  "Email threads",
  "Shared folders",
  "Phone updates",
  "Property photos",
  "Status meetings",
];
export default function Problem() {
  const [connected, setConnected] = useState(true);
  return (
    <section id="problem" className="section-block problem-section">
      <div className="page-shell problem-layout">
        <Reveal>
          <p className="eyebrow">FROM SCATTERED TO CONNECTED</p>
          <h2>
            The case is one.
            <br />
            <span className="muted-heading">Why chase six sources?</span>
          </h2>
          <p className="section-description">
            Bring the data, documents and people together. Open a case and see
            the whole picture.
          </p>
          <button
            className="text-link"
            onClick={() => setConnected(!connected)}
          >
            {connected ? "See the scattered view" : "Bring it all together"}{" "}
            <ArrowRight size={18} />
          </button>
        </Reveal>
        <Reveal
          className={`connection-panel ${connected ? "is-connected" : "is-scattered"}`}
        >
          <div className="connection-top">
            <span className="small-label">THE KAIROLOGIC EFFECT</span>
            <span
              className={`connection-status ${connected ? "" : "disconnected"}`}
            >
              {connected ? "Connected" : "Scattered"}
            </span>
          </div>
          <div className="connection-visual">
            <div className="source-stack">
              {sources.map((s, i) => (
                <div key={s} className="source-row">
                  <span className="source-number">0{i + 1}</span>
                  {s}
                  <span className="source-light" />
                </div>
              ))}
            </div>
            <svg
              className="connection-lines"
              viewBox="0 0 180 360"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {sources.map((s, i) => (
                <g key={s}>
                  <path
                    d={`M0 ${30 + i * 60} C90 ${30 + i * 60},80 180,180 180`}
                    className="connection-base"
                  />
                  <path
                    d={`M0 ${30 + i * 60} C90 ${30 + i * 60},80 180,180 180`}
                    className="connection-flow"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                </g>
              ))}
            </svg>
            <div className="record-node">
              <span className="record-symbol">
                <Check size={30} />
              </span>
              <strong>
                One case.
                <br />
                One record.
              </strong>
              <span>All in context.</span>
            </div>
          </div>
          <p className="connection-foot">
            {connected
              ? "Every update leads back to the same case."
              : "Separate updates. An incomplete picture."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
