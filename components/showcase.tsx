"use client";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  LockKeyhole,
  History,
  Check,
  Layers,
  FileText,
  Users,
} from "lucide-react";
import CaseWorkflow from "./case-workflow";
import Portfolio from "./portfolio";
import Reveal from "./reveal";
export default function Showcase() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-atmosphere" aria-hidden="true">
          <img src="/images/hero-industrial-estate.webp" alt="" />
          <span />
        </div>
        <div className="hero-blueprint" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <i className="signal-dot" /> CASE & WORKFLOW INTELLIGENCE
            </p>
            <h1>
              <span>One case.</span>
              <span>One record.</span>
              <span className="hero-accent">Total control.</span>
            </h1>
            <p className="hero-intro">
              Spend less time collecting data.
              <br />
              Spend more time moving work forward.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#platform">
                Explore the workflow <ArrowDown size={21} />
              </a>
              <a className="hero-secondary" href="#contact">
                Let’s talk <ArrowUpRight size={20} />
              </a>
            </div>
            <p className="hero-context">
              Records, documents and decisions.
              <br />
              Connected around the way your team works.
            </p>
          </div>
          <div className="hero-system">
            <CaseWorkflow />
          </div>
        </div>
        <div className="container hero-foot">
          <span>Scattered information.</span>
          <div className="hero-foot-path" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <strong>One clear way forward.</strong>
          <span className="hero-foot-end">
            The Kairologic approach <ArrowDown size={19} />
          </span>
        </div>
      </section>
      <section className="workflow section" id="platform">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">THE WORK SHOULD MOVE</p>
              <h2>
                From scattered updates.
                <br />
                <span>To a connected process.</span>
              </h2>
            </div>
            <p>
              Every record feeds the next step.
              <br />
              Every step stays in context.
            </p>
          </Reveal>
          <div className="delivery-flow">
            <article>
              <span className="delivery-symbol">
                <Layers size={28} />
              </span>
              <div>
                <span className="flow-step">CONNECT</span>
                <h3>Bring the case together.</h3>
                <p>
                  Borrower details, files and field evidence. One organised
                  record.
                </p>
              </div>
              <ArrowRight className="flow-arrow" size={26} />
            </article>
            <article>
              <span className="delivery-symbol">
                <FileText size={28} />
              </span>
              <div>
                <span className="flow-step">PREPARE</span>
                <h3>Let the record do the work.</h3>
                <p>
                  Map case data to approved document templates, ready for
                  review.
                </p>
              </div>
              <ArrowRight className="flow-arrow" size={26} />
            </article>
            <article>
              <span className="delivery-symbol">
                <Users size={28} />
              </span>
              <div>
                <span className="flow-step">MOVE FORWARD</span>
                <h3>Give the team its next step.</h3>
                <p>
                  Clear responsibilities, visible progress and a shared view of
                  the case.
                </p>
              </div>
              <Check className="flow-arrow flow-complete" size={25} />
            </article>
          </div>
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
