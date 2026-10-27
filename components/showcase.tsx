"use client";
import {
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
  LockKeyhole,
  History,
} from "lucide-react";
import CaseWorkflow from "./case-workflow";
import DigitalWorkspace from "./digital-workspace";
import Portfolio from "./portfolio";
import Problem from "./problem";
import Reveal from "./reveal";
export default function Showcase() {
  return (
    <>
      <section className="hero firm-hero" id="home">
        <div className="container firm-hero-grid">
          <div className="firm-hero-copy">
            <p className="eyebrow">Case &amp; workflow workspace</p>
            <h1><span>Your data, structured.</span><span className="hero-accent">Your team, connected.</span></h1>
            <p className="firm-intro">A clear place for your records, documents and daily work.</p>
            <p className="firm-description">We build your digital workspace around your process, with organised information, clear responsibilities and access defined by role.</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">Discuss your workflow <ArrowUpRight size={21} /></a>
              <a className="hero-secondary" href="#problem">See how it works <ArrowDown size={20} /></a>
            </div>
            <div className="firm-service"><span className="signal-dot" /> Process mapping <i /> System setup <i /> Team handover</div>
          </div>
          <div className="firm-visual"><DigitalWorkspace /></div>
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
