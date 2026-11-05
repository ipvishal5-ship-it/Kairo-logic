"use client";

import { useState } from "react";
import Reveal from "./reveal";
import { ArrowRight, Check } from "lucide-react";

const sources = [
  "Sales quotes in Excel",
  "Paper production travellers",
  "Manual machine logs",
  "Isolated ERP silos",
  "Phone call dispatching",
  "Delayed warranty claims",
];

export default function ManufacturingProblem() {
  const [connected, setConnected] = useState(true);

  return (
    <section id="problem" className="section-block problem-section">
      <div className="container problem-layout">
        <Reveal>
          <p className="eyebrow">FROM PRODUCTION BOTTLENECKS TO CONNECTED FLOW</p>
          <h2>
            The factory is one.
            <br />
            <span className="muted-heading">Why run on fragmented systems?</span>
          </h2>
          <p className="section-description">
            Bring customer quotes, shopfloor work orders, machine telemetry and field service tickets into a single unified record.
          </p>
          <button
            className="text-link"
            onClick={() => setConnected(!connected)}
          >
            {connected ? "See the fragmented plant" : "Bring the factory together"}{" "}
            <ArrowRight size={18} />
          </button>
        </Reveal>

        <Reveal
          className={`connection-panel ${connected ? "is-connected" : "is-scattered"}`}
        >
          <div className="connection-top">
            <span className="small-label">THE KAIROLOGIC FACTORY EFFECT</span>
            <span
              className={`connection-status ${connected ? "" : "disconnected"}`}
            >
              {connected ? "Unified Flow" : "Fragmented Silos"}
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
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M 10 30 C 80 30, 100 180, 170 180"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray={connected ? "none" : "4 4"}
              />
              <path
                d="M 10 90 C 80 90, 100 180, 170 180"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray={connected ? "none" : "4 4"}
              />
              <path
                d="M 10 150 C 80 150, 100 180, 170 180"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray={connected ? "none" : "4 4"}
              />
              <path
                d="M 10 210 C 80 210, 100 180, 170 180"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray={connected ? "none" : "4 4"}
              />
              <path
                d="M 10 270 C 80 270, 100 180, 170 180"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray={connected ? "none" : "4 4"}
              />
              <path
                d="M 10 330 C 80 330, 100 180, 170 180"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray={connected ? "none" : "4 4"}
              />
            </svg>

            <div className="connection-target">
              <div className="record-node">
                <span className="record-pulse" />
                <strong>Unified Order</strong>
                <span>Full lifecycle trace</span>
              </div>
            </div>
          </div>

          <div className="connection-foot">
            <Check size={18} />
            <span>
              {connected
                ? "Every machine log and service request automatically links to the customer order."
                : "Manual re-entry causes delays, inventory stockouts, and warranty disputes."}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

