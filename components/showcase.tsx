"use client";
import {
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
  LockKeyhole,
  History,
  Check,
} from "lucide-react";
import CaseWorkflow from "./case-workflow";
import Portfolio from "./portfolio";
import Problem from "./problem";
import Reveal from "./reveal";
export default function Showcase() {
  return (
    <>
      <section className="hero firm-hero" id="home">
        <div className="container firm-hero-grid">
          <div className="firm-hero-copy">
            <p className="eyebrow"><i className="signal-dot" /> WORKFLOW SYSTEMS. BUILT AROUND YOUR TEAM.</p>
            <h1><span>Cases organised.</span><span className="hero-accent">Teams aligned.</span></h1>
            <p className="firm-intro">See every case. Know who owns the next step.</p>
            <p className="firm-description">We connect your records, documents and team responsibilities in a system configured around your process.</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">Discuss your workflow <ArrowUpRight size={21} /></a>
              <a className="hero-secondary" href="#problem">See how it works <ArrowDown size={20} /></a>
            </div>
            <div className="firm-service"><span className="signal-dot" /> Process mapping <i /> System setup <i /> Team handover</div>
          </div>
          <div className="firm-visual">
            <div className="firm-photo"><img src="/images/hero-industrial-estate.webp" alt="Industrial estate at dusk, an illustration of the properties a case team manages" /><div className="firm-photo-shade" /><span>THE BIG PICTURE.<br /><strong>Every detail in place.</strong></span></div>
            <div className="firm-workspace">
              <div className="firm-workspace-top"><span><i className="signal-dot" /> CASE WORKSPACE</span><span>Illustrative view</span></div>
              <div className="firm-table" role="table" aria-label="Illustrative cases, responsible teams and next steps">
                <div className="firm-table-head" role="row"><span role="columnheader">Case</span><span role="columnheader">Owner</span><span role="columnheader">Next step</span></div>
                {[
                  ["ABC Industries", "Legal team", "Review application"],
                  ["Westbridge Properties", "Field team", "Plan site visit"],
                  ["Northstar Engineering", "Case team", "Prepare documents"],
                ].map(([name, owner, action]) => <div className="firm-table-row" role="row" key={name}><strong role="cell">{name}</strong><span role="cell">{owner}</span><span role="cell">{action}</span></div>)}
              </div>
              <div className="firm-workspace-foot"><Check size={17} /> Clear ownership. Visible next steps.</div>
            </div>
          </div>
        </div>
      </section>
      <Problem />
      <section className="workflow section" id="platform">
        <div className="container workflow-demo-grid">
          <div className="workflow-demo-copy"><p className="eyebrow">FROM RECORD TO NEXT STEP</p><h2>Connected details.<br /><span>Less repeated work.</span></h2><p>Explore how case information feeds a document template and keeps the next action in view.</p><a className="text-link" href="#contact">Discuss your process <ArrowUpRight size={21} /></a></div>
          <CaseWorkflow />
        </div>
      </section>
      <section className="visibility section" id="dashboard">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">VISIBILITY THAT MOVES WORK</p>
              <h2>
                From status meetings.
                <br />
                <span>To action meetings.</span>
              </h2>
            </div>
            <p>
              One connected case.
              <br />A useful view for every team.
            </p>
          </Reveal>
          <Reveal>
            <Portfolio />
          </Reveal>
        </div>
      </section>
      <section className="control section" id="security">
        <div className="container control-grid">
          <Reveal className="control-statement">
            <p className="eyebrow">BUILT AROUND YOUR PROCESS</p>
            <h2>
              Connected work.
              <br />
              <span>Considered control.</span>
            </h2>
            <p>
              We configure the records, templates and workflows. Then test the
              setup with your team and make the handover clear.
            </p>
            <a className="text-link" href="#contact">
              Discuss your workflow <ArrowUpRight size={21} />
            </a>
            <div className="implementation-path">
              <span>Understand</span>
              <i />
              <span>Configure</span>
              <i />
              <span>Handover</span>
            </div>
          </Reveal>
          <Reveal className="control-ledger">
            <div className="ledger-heading">
              <span>
                <ShieldCheck size={24} /> THE CONTROL LAYER
              </span>
              <i className="signal-dot" />
            </div>
            <article>
              <span className="ledger-rail" />
              <ShieldCheck size={26} />
              <div>
                <h3>Access by responsibility.</h3>
                <p>Permissions aligned to each team’s role.</p>
              </div>
            </article>
            <article>
              <span className="ledger-rail" />
              <LockKeyhole size={26} />
              <div>
                <h3>Documents under control.</h3>
                <p>Visibility and access set deliberately.</p>
              </div>
            </article>
            <article>
              <span className="ledger-rail" />
              <History size={26} />
              <div>
                <h3>A traceable case history.</h3>
                <p>History for selected, tracked information.</p>
              </div>
            </article>
            <p className="control-note">
              Controls are defined with your team and verified during
              implementation.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
