"use client";

import { useState, useRef, useCallback } from "react";
import CaseManagementDiagram from "./CaseManagementDiagram";
import LiquidTextDiagram from "./LiquidTextDiagram";
import CourtFilingPanel from "./CourtFilingPanel";

export default function ModuleTabs() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex = index;
      if (e.key === "ArrowRight") {
        nextIndex = (index + 1) % 3;
      } else if (e.key === "ArrowLeft") {
        nextIndex = (index - 1 + 3) % 3;
      } else if (e.key === "Home") {
        nextIndex = 0;
      } else if (e.key === "End") {
        nextIndex = 2;
      } else {
        return;
      }

      e.preventDefault();
      setActiveTab(nextIndex);
      tabButtonRefs.current[nextIndex]?.focus();
    },
    []
  );

  return (
    <div className="mod" id="pillars">
      <div className="sec">
        <div className="tabs" role="tablist" aria-label="Lex features">
          <button
            ref={(el) => {
              tabButtonRefs.current[0] = el;
            }}
            role="tab"
            aria-selected={activeTab === 0}
            data-t="0"
            onClick={() => setActiveTab(0)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            type="button"
          >
            <i>01</i>Case Management
          </button>
          <button
            ref={(el) => {
              tabButtonRefs.current[1] = el;
            }}
            role="tab"
            aria-selected={activeTab === 1}
            data-t="1"
            onClick={() => setActiveTab(1)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            type="button"
          >
            <i>02</i>Liquid Text
          </button>
          <button
            ref={(el) => {
              tabButtonRefs.current[2] = el;
            }}
            role="tab"
            aria-selected={activeTab === 2}
            data-t="2"
            onClick={() => setActiveTab(2)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            type="button"
          >
            <i>03</i>Court Filing
          </button>
        </div>

        {/* Panel 0: Case Management */}
        <section className="pn" id="p0" hidden={activeTab !== 0}>
          <div className="cp">
            <span className="lab">Case Management</span>
            <h2>Every case. One record. No loose ends.</h2>
            <p>
              A single digital file holds the borrower, loan details, court
              orders, hearing dates, limitation deadlines, field photos, and
              every auto-generated notice. Your team stops hunting through
              emails and starts acting on what matters next.
            </p>
            <ul>
              <li>Master case docket</li>
              <li>Hearing &amp; limitation tracker</li>
              <li>Role-based team access</li>
              <li>Auto-generated legal notices</li>
              <li>Possession &amp; auction workflow</li>
            </ul>
          </div>
          <CaseManagementDiagram isVisible={activeTab === 0} />
        </section>

        {/* Panel 1: Liquid Text */}
        <section className="pn" id="p1" hidden={activeTab !== 1}>
          <div className="cp">
            <span className="lab">Liquid Text</span>
            <h2>Read across documents. Connect facts to evidence.</h2>
            <p>
              Open multiple documents side-by-side — agreement vs. notice,
              petition vs. counter. Pull excerpts, draw connective links between
              clauses, annotate in context, and build a living brief without
              printing a single sheet.
            </p>
            <ul>
              <li>Side-by-side document canvas</li>
              <li>Cross-document clause linking</li>
              <li>Excerpt &amp; annotation workspace</li>
              <li>Compare pleadings &amp; agreements</li>
              <li>Brief building — no printing</li>
            </ul>
          </div>
          <LiquidTextDiagram isVisible={activeTab === 1} />
        </section>

        {/* Panel 2: Court Filing */}
        <CourtFilingPanel hidden={activeTab !== 2} />
      </div>
    </div>
  );
}
