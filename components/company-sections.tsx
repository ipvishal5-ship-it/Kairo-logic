"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "./site-link";
import { BrandMark } from "./brand";
import {
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  FileText,
  BarChart3,
  Settings2,
  FileCheck,
  Bell,
  Users,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   HERO SCULPTURE — Pure Visual Magnetism (Award-Winning Designer Standard)
   Zero clutter, zero dense text. A luminous, floating glass brand monument
   with optical refractions, ambient auroras, and subtle 3D tilt interaction.
   ───────────────────────────────────────────────────────────────────────────── */
export function HeroSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // Subtle interactive 3D parallax on mouse move (desktop pointer only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -y / 24,
      y: x / 24,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="hero-sculpture-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Ambient background volumetric glow */}
      <div className="hero-aurora-glow" />

      {/* Orbiting celestial rings */}
      <svg className="hero-orbit-svg" viewBox="0 0 500 500" fill="none">
        <circle cx="250" cy="250" r="190" stroke="rgba(24, 87, 70, 0.18)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="250" cy="250" r="140" stroke="rgba(24, 87, 70, 0.25)" strokeWidth="1.2" />
        <circle cx="250" cy="250" r="230" stroke="rgba(188, 200, 197, 0.35)" strokeWidth="0.8" />
        {/* Orbiting energy beads */}
        <circle cx="250" cy="60" r="4" fill="#185746" className="hero-orbit-bead bead-1" />
        <circle cx="390" cy="250" r="3.5" fill="#1a6a8a" className="hero-orbit-bead bead-2" />
        <circle cx="110" cy="250" r="4" fill="#8c6b23" className="hero-orbit-bead bead-3" />
      </svg>

      {/* 3D Floating Monument */}
      <div
        className="hero-monument"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Core Glass Prism */}
        <div className="hero-glass-core">
          <div className="hero-glass-shimmer" />
          <BrandMark className="hero-monument-mark" />
          <div className="hero-monument-reflection" />
        </div>

        {/* Floating Satellites — Golden Triangle Layout */}

        {/* TOP-LEFT WING: Secure & Governed */}
        <div className="hero-satellite sat-1">
          <div className="sat-icon sat-green">
            <ShieldCheck size={15} />
          </div>
          <div className="sat-text">
            <strong>Protected &amp; Secure</strong>
            <span className="sat-live">
              <span className="sat-beacon sat-beacon-green" />
              Role-based access
            </span>
          </div>
        </div>

        {/* TOP-RIGHT WING: Live Workflow */}
        <div className="hero-satellite sat-2">
          <div className="sat-icon sat-blue">
            <Zap size={15} />
          </div>
          <div className="sat-text">
            <strong>Live Progress</strong>
            <span className="sat-live">
              <span className="sat-beacon sat-beacon-blue" />
              Real-time task tracking
            </span>
          </div>
        </div>

        {/* BOTTOM-CENTER ANCHOR: Verified Records */}
        <div className="hero-satellite sat-3">
          <div className="sat-icon sat-amber">
            <Activity size={15} />
          </div>
          <div className="sat-text">
            <strong>Verified Records</strong>
            <span className="sat-live">
              <span className="sat-beacon sat-beacon-amber" />
              Complete audit history
            </span>
          </div>
        </div>
      </div>

      {/* Grounding Shadow */}
      <div className="hero-ground-shadow" />
    </div>
  );
}

// Backward compatibility alias
export const BrandComposition = HeroSculpture;

/* ─────────────────────────────────────────────────────────────────────────────
   WORKFLOW NEXUS — The Living Enterprise Orchestration Stage
   Positioned right in the "See the work come together" showcase section!
   ───────────────────────────────────────────────────────────────────────────── */
interface PipelineNode {
  title: string;
  sub: string;
  tag: string;
  status: "verified" | "processing" | "ready";
}

interface PipelineVertical {
  id: string;
  name: string;
  shortName: string;
  accent: string;
  glowColor: string;
  ticker: string;
  stats: { label: string; value: string };
  leftNodes: PipelineNode[];
  kernelTitle: string;
  kernelSubtitle: string;
  rightNodes: PipelineNode[];
}

const VERTICALS: PipelineVertical[] = [
  {
    id: "operations",
    name: "Daily Operations",
    shortName: "Daily Operations",
    accent: "#185746",
    glowColor: "rgba(24, 87, 70, 0.45)",
    ticker: "Live Task Flow: Tasks automatically assigned to team members and tracked in real time",
    stats: { label: "Work Status", value: "On Schedule" },
    leftNodes: [
      { title: "Incoming Request", sub: "New job or inquiry received", tag: "STEP 01", status: "verified" },
      { title: "Details Checked", sub: "Information & files organized", tag: "STEP 02", status: "verified" },
      { title: "Assigned to Owner", sub: "Routed to the right team member", tag: "STEP 03", status: "processing" },
    ],
    kernelTitle: "Kairologic Core",
    kernelSubtitle: "Connected Workflow",
    rightNodes: [
      { title: "Action Completed", sub: "Work finished & verified", tag: "STEP 04", status: "verified" },
      { title: "Status Update Sent", sub: "Customer & manager notified", tag: "STEP 05", status: "verified" },
      { title: "Recorded & Saved", sub: "Full activity history logged", tag: "STEP 06", status: "verified" },
    ],
  },
  {
    id: "documents",
    name: "Document Approvals",
    shortName: "Document Approvals",
    accent: "#1a6a8a",
    glowColor: "rgba(26, 106, 138, 0.45)",
    ticker: "Document Flow: Approvals tracked stage by stage with clear timestamps and review history",
    stats: { label: "Review Status", value: "Verified & Signed" },
    leftNodes: [
      { title: "Document Uploaded", sub: "Contract, notice, or file logged", tag: "STEP 01", status: "verified" },
      { title: "Auto-Check Rules", sub: "Key fields & attachments verified", tag: "STEP 02", status: "verified" },
      { title: "Sent for Approval", sub: "Delivered to designated reviewer", tag: "STEP 03", status: "processing" },
    ],
    kernelTitle: "Kairologic Core",
    kernelSubtitle: "Approval Pipeline",
    rightNodes: [
      { title: "Reviewer Sign-off", sub: "Approved with verified timestamp", tag: "STEP 04", status: "verified" },
      { title: "Sent to Stakeholders", sub: "Secure delivery to all parties", tag: "STEP 05", status: "verified" },
      { title: "Stored in Archive", sub: "Organized & instantly searchable", tag: "STEP 06", status: "verified" },
    ],
  },
  {
    id: "dispatch",
    name: "Team & Job Dispatch",
    shortName: "Team & Job Dispatch",
    accent: "#8c6b23",
    glowColor: "rgba(140, 107, 35, 0.45)",
    ticker: "Dispatch Flow: Field and operational jobs tracked from start to on-time handover",
    stats: { label: "Dispatch Status", value: "Tracked Live" },
    leftNodes: [
      { title: "Job Requirement In", sub: "Customer order & timeline set", tag: "STEP 01", status: "verified" },
      { title: "Resource Checklist", sub: "Team & supplies confirmed", tag: "STEP 02", status: "verified" },
      { title: "Dispatched to Team", sub: "Instructions & task handed over", tag: "STEP 03", status: "processing" },
    ],
    kernelTitle: "Kairologic Core",
    kernelSubtitle: "Dispatch & Delivery",
    rightNodes: [
      { title: "Quality Check", sub: "Passed operational checklist", tag: "STEP 04", status: "verified" },
      { title: "Handover in Progress", sub: "Real-time delivery confirmation", tag: "STEP 05", status: "verified" },
      { title: "Completed on Time", sub: "Signed off with full record", tag: "STEP 06", status: "verified" },
    ],
  },
];

export function WorkflowNexus() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const current = VERTICALS[activeIdx];

  // Auto-cycle through the 3 verticals smoothly
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % VERTICALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="nexus-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Kairologic Interactive Enterprise Workflow Architecture"
    >
      {/* Ambient background glow field */}
      <div
        className="nexus-ambient-glow"
        style={{ background: `radial-gradient(circle at 50% 30%, ${current.glowColor} 0%, transparent 70%)` }}
      />

      {/* Top Header / Vertical Selector Bar */}
      <div className="nexus-top-bar">
        <div className="nexus-selector-tabs" role="tablist">
          {VERTICALS.map((v, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={v.id}
                role="tab"
                aria-selected={isActive}
                className={`nexus-tab-btn ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveIdx(i)}
                style={isActive ? { borderColor: v.accent, color: "#ffffff" } : {}}
              >
                <span className="nexus-tab-indicator" style={{ background: isActive ? v.accent : "transparent" }} />
                <span className="nexus-tab-text">{v.shortName}</span>
                {isActive && <span className="nexus-tab-live-dot" style={{ background: v.accent }} />}
              </button>
            );
          })}
        </div>

        {/* Live metric badge */}
        <div className="nexus-kpi-pill">
          <span className="nexus-kpi-label">{current.stats.label}</span>
          <strong className="nexus-kpi-value" style={{ color: current.accent }}>
            {current.stats.value}
          </strong>
        </div>
      </div>

      {/* Main Living Canvas */}
      <div className="nexus-canvas">
        {/* Left Column: Input Nodes */}
        <div className="nexus-col nexus-col-left">
          <div className="nexus-col-header">
            <span className="nexus-col-kicker">INPUT STAGES</span>
            <span className="nexus-col-counter">Step-by-Step</span>
          </div>

          <div className="nexus-nodes-group">
            {current.leftNodes.map((node, i) => (
              <div
                key={node.title}
                className={`nexus-node-card is-left ${hoveredNode === `left-${i}` ? "is-hovered" : ""}`}
                onMouseEnter={() => setHoveredNode(`left-${i}`)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="nexus-node-top">
                  <span className="nexus-node-tag">{node.tag}</span>
                  <span className="nexus-node-status-dot" style={{ background: current.accent }} />
                </div>
                <strong className="nexus-node-title">{node.title}</strong>
                <span className="nexus-node-sub">{node.sub}</span>
                <span className="nexus-port-out" style={{ borderColor: current.accent }} />
              </div>
            ))}
          </div>
        </div>

        {/* Center SVG Beziers + Central Processor Kernel */}
        <div className="nexus-col nexus-col-center">
          <svg className="nexus-svg-lines" viewBox="0 0 200 360" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id={`grad-left-${activeIdx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="100%" stopColor={current.accent} />
              </linearGradient>
              <linearGradient id={`grad-right-${activeIdx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={current.accent} />
                <stop offset="100%" stopColor="#75dfc3" />
              </linearGradient>
            </defs>

            {/* Left convergence curves */}
            <path d="M 0,60 C 70,60 70,180 100,180" className="nexus-path-base" />
            <path d="M 0,180 C 60,180 70,180 100,180" className="nexus-path-base" />
            <path d="M 0,300 C 70,300 70,180 100,180" className="nexus-path-base" />

            <path
              d="M 0,60 C 70,60 70,180 100,180"
              className="nexus-path-pulse"
              style={{ stroke: `url(#grad-left-${activeIdx})`, animationDelay: "0s" }}
            />
            <path
              d="M 0,180 C 60,180 70,180 100,180"
              className="nexus-path-pulse"
              style={{ stroke: `url(#grad-left-${activeIdx})`, animationDelay: "0.8s" }}
            />
            <path
              d="M 0,300 C 70,300 70,180 100,180"
              className="nexus-path-pulse"
              style={{ stroke: `url(#grad-left-${activeIdx})`, animationDelay: "1.6s" }}
            />

            {/* Right divergence curves */}
            <path d="M 100,180 C 130,180 130,60 200,60" className="nexus-path-base" />
            <path d="M 100,180 C 140,180 140,180 200,180" className="nexus-path-base" />
            <path d="M 100,180 C 130,180 130,300 200,300" className="nexus-path-base" />

            <path
              d="M 100,180 C 130,180 130,60 200,60"
              className="nexus-path-pulse"
              style={{ stroke: `url(#grad-right-${activeIdx})`, animationDelay: "0.4s" }}
            />
            <path
              d="M 100,180 C 140,180 140,180 200,180"
              className="nexus-path-pulse"
              style={{ stroke: `url(#grad-right-${activeIdx})`, animationDelay: "1.2s" }}
            />
            <path
              d="M 100,180 C 130,180 130,300 200,300"
              className="nexus-path-pulse"
              style={{ stroke: `url(#grad-right-${activeIdx})`, animationDelay: "2.0s" }}
            />
          </svg>

          {/* Central Living Kernel */}
          <div className="nexus-kernel-pod" style={{ borderColor: current.accent }}>
            <div className="nexus-kernel-glow-ring" style={{ boxShadow: `0 0 35px ${current.glowColor}` }} />
            <div className="nexus-kernel-inner">
              <BrandMark className="nexus-kernel-mark" />
              <div className="nexus-kernel-labels">
                <span className="nexus-kernel-badge">SYSTEM FLOW</span>
                <strong className="nexus-kernel-title">{current.kernelTitle}</strong>
                <span className="nexus-kernel-sub">{current.kernelSubtitle}</span>
              </div>
              <div className="nexus-kernel-ping">
                <span className="nexus-kernel-ping-dot" />
                <span>LIVE &amp; IN SYNC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output Nodes */}
        <div className="nexus-col nexus-col-right">
          <div className="nexus-col-header">
            <span className="nexus-col-kicker">OUTPUT MILESTONES</span>
            <span className="nexus-col-counter">Completed on Time</span>
          </div>

          <div className="nexus-nodes-group">
            {current.rightNodes.map((node, i) => (
              <div
                key={node.title}
                className={`nexus-node-card is-right ${hoveredNode === `right-${i}` ? "is-hovered" : ""}`}
                onMouseEnter={() => setHoveredNode(`right-${i}`)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <span className="nexus-port-in" style={{ borderColor: current.accent }} />
                <div className="nexus-node-top">
                  <span className="nexus-node-tag is-outcome">{node.tag}</span>
                  <CheckCircle2 size={13} className="nexus-node-check" />
                </div>
                <strong className="nexus-node-title">{node.title}</strong>
                <span className="nexus-node-sub">{node.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Live Activity Feed / Telemetry Bar */}
      <div className="nexus-footer-bar">
        <div className="nexus-ticker-wrap">
          <Zap size={14} className="nexus-ticker-icon" style={{ color: current.accent }} />
          <span className="nexus-ticker-label">WORKFLOW:</span>
          <span className="nexus-ticker-text">{current.ticker}</span>
        </div>
        <div className="nexus-telemetry-chips">
          <span className="nexus-chip">
            <span className="nexus-chip-dot" /> Role-Based Access
          </span>
          <span className="nexus-chip">
            <span className="nexus-chip-dot" /> Real-Time Updates
          </span>
          <span className="nexus-chip">
            <span className="nexus-chip-dot" /> Complete History
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProductVisual() {
  return (
    <div className="c-product-visual" aria-label="Product overview connecting case information, documents and team activity">
      <div className="c-product-visual-title">
        <BrandMark className="c-preview-mark" />
        <span>One connected workspace</span>
      </div>
      <div className="c-preview-record">
        <span className="c-preview-corner" />
        <strong>Case information</strong>
        <span>Details in context</span>
      </div>
      <div className="c-preview-bottom">
        <div>
          <span className="c-preview-symbol c-document-symbol" aria-hidden="true" />
          <strong>Documents</strong>
          <span>Prepared from your records</span>
        </div>
        <div>
          <span className="c-preview-symbol c-team-symbol" aria-hidden="true" />
          <strong>Team activity</strong>
          <span>A shared view of the work</span>
        </div>
      </div>
    </div>
  );
}

const productFeatures = [
  {
    id: "tasks",
    domain: "TASK MANAGEMENT",
    tabLabel: "01 Daily Tasks",
    name: "Never lose track of",
    nameAccent: "who is doing what.",
    desc: "Every task has a clear owner, a confirmed deadline, and every file in one place. No more lost emails or chasing people for updates.",
    href: "/technologies/workflow",
    cta: "See task workflows",
    visualTitle: "Daily Task Board",
    accent: "#7FE0C3",
    heroBg: "var(--c-mint)",
    hero: { strong: "Active Task Pipeline", sub: "Assigned with clear ownership and due dates" },
    bottom: [
      { icon: Users, strong: "Clear Ownership", sub: "Every person knows their exact priorities" },
      { icon: Bell, strong: "Deadline Alerts", sub: "Automatic reminders before anything slips" },
    ],
  },
  {
    id: "approvals",
    domain: "DOCUMENT APPROVALS",
    tabLabel: "02 Document Approvals",
    name: "Fast approvals without",
    nameAccent: "the back-and-forth.",
    desc: "Route contracts, invoices, and files to the right reviewer automatically. Stop missing attachments and keep a clean record of every sign-off.",
    href: "/technologies/workflow",
    cta: "See approval workflows",
    visualTitle: "Document Review Pipeline",
    accent: "#93D5FF",
    heroBg: "#e2eff5",
    hero: { strong: "Review & Sign-Off Hub", sub: "Step-by-step approvals without delays" },
    bottom: [
      { icon: FileCheck, strong: "Automatic Handoff", sub: "Directly moves to the next reviewer" },
      { icon: ShieldCheck, strong: "Verified History", sub: "Complete time-stamped audit log" },
    ],
  },
  {
    id: "visibility",
    domain: "REAL-TIME VISIBILITY",
    tabLabel: "03 Live Visibility",
    name: "See the whole picture",
    nameAccent: "in real time.",
    desc: "Give leadership and teams a single live overview of all ongoing work. Spot delays early and know where projects stand without update meetings.",
    href: "/technologies/workflow",
    cta: "See live reporting",
    visualTitle: "Live Operations Radar",
    accent: "#F2B84B",
    heroBg: "#f7f0e1",
    hero: { strong: "Overall Work Status", sub: "Live status across all active deliverables" },
    bottom: [
      { icon: Layers, strong: "Zero Blind Spots", sub: "See open, in-progress, and finished work" },
      { icon: Activity, strong: "Early Warnings", sub: "Surfaces blocked items before deadlines" },
    ],
  },
];

const ROTATE_DURATION = 6; // seconds

export function TechnologyFeature() {
  const [active, setActive] = useState(0);
  const p = productFeatures[active];

  const handleNext = () => {
    setActive((curr) => (curr + 1) % productFeatures.length);
  };

  return (
    <div className="c-technology-rotator" aria-label="Kairologic Technology Solutions">
      {/* Top Selector Tabs */}
      <div className="c-tech-tabs" role="tablist" aria-label="Featured technologies">
        {productFeatures.map((pf, i) => {
          const isActive = i === active;
          return (
            <button
              key={pf.id}
              role="tab"
              aria-selected={isActive}
              className={`c-tech-tab ${isActive ? "is-active" : ""}`}
              style={isActive ? { borderColor: pf.accent, color: pf.accent } : undefined}
              onClick={() => setActive(i)}
            >
              <span
                className="c-tech-tab-dot"
                style={{ background: isActive ? pf.accent : "rgba(16, 43, 58, 0.25)" }}
              />
              <span>{pf.tabLabel}</span>
              {isActive && (
                <span
                  key={`progress-${active}`}
                  className="c-tech-tab-progress"
                  style={{
                    background: pf.accent,
                    animationDuration: `${ROTATE_DURATION}s`,
                  }}
                  onAnimationEnd={handleNext}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Showcase Article */}
      <article className="c-technology-feature" style={{ borderColor: `${p.accent}33` }}>
        <div className="c-technology-copy">
          <p className="c-section-label" style={{ color: p.accent }}>
            SYSTEM SPECIALITY · {p.domain}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h3>
                {p.name}<br />
                <em style={{ color: p.accent }} dangerouslySetInnerHTML={{ __html: p.nameAccent }} />
              </h3>
              <p>{p.desc}</p>
              <Link href={p.href} className="c-button" style={{ background: p.accent }}>
                <span>{p.cta}</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="c-technology-visual-wrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="c-product-visual"
              aria-label={`${p.domain} overview`}
            >
              <div className="c-product-visual-title">
                <BrandMark className="c-preview-mark" />
                <span>{p.visualTitle}</span>
              </div>
              <div
                className="c-preview-record"
                style={{ background: p.heroBg, borderColor: `${p.accent}33` }}
              >
                <span className="c-preview-corner" style={{ borderColor: p.accent }} />
                <strong>{p.hero.strong}</strong>
                <span>{p.hero.sub}</span>
              </div>
              <div className="c-preview-bottom">
                {p.bottom.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.strong} className="c-preview-cell">
                      <div
                        className="c-preview-icon-wrap"
                        style={{ background: `${p.accent}14`, color: p.accent }}
                      >
                        <Icon size={17} />
                      </div>
                      <strong>{b.strong}</strong>
                      <span>{b.sub}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </article>
    </div>
  );
}

const capabilities = [
  {
    num: "01",
    name: "Connected information",
    text: "Organize business records and keep related details, documents and actions together in one reliable system.",
  },
  {
    num: "02",
    name: "Document workflows",
    text: "Prepare repeatable documents, notices, and client files from approved templates and stored records.",
  },
  {
    num: "03",
    name: "Reporting and visibility",
    text: "Give teams real-time clarity on ownership, work in progress, and upcoming deadlines without manual chasing.",
  },
  {
    num: "04",
    name: "System implementation",
    text: "We map your real process, configure the software to match, and train your team for day-one success.",
  },
];

export function Capabilities() {
  return (
    <div className="c-capability-list">
      {capabilities.map((item) => (
        <div className="c-capability-row" key={item.name}>
          <div className="c-cap-accent-bar" aria-hidden="true" />
          <span className="c-cap-num">{item.num}</span>
          <h3 className="c-cap-title">{item.name}</h3>
          <p className="c-cap-desc">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

const approach = [
  {
    step: "01",
    title: "Understand the process",
    text: "Start with the real information, handoffs, and daily tasks your team manages.",
  },
  {
    step: "02",
    title: "Configure the system",
    text: "Shape records, templates, workflows, and access permissions around those exact needs.",
  },
  {
    step: "03",
    title: "Validate with your team",
    text: "Review the working setup together with live data to verify every step works smoothly.",
  },
  {
    step: "04",
    title: "Prepare the handover",
    text: "Make day-to-day operations clear and effortless for the people responsible for the work.",
  },
];

export function Approach() {
  return (
    <section className="c-approach c-section" id="approach">
      <div className="c-shell c-approach-grid">
        <div className="c-approach-intro">
          <p className="c-section-label">Our approach</p>
          <h2>
            Start with<br />the work.
          </h2>
          <p className="c-lede">
            Useful technology starts with an understanding of the people and process behind it.
          </p>
        </div>

        <div className="c-approach-list">
          {approach.map((item) => (
            <div key={item.title} className="c-approach-row">
              <div className="c-approach-accent-bar" aria-hidden="true" />
              <span className="c-approach-num">{item.step}</span>
              <div className="c-approach-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactInvitation() {
  return (
    <section className="c-invitation">
      <div className="c-shell c-invitation-inner">
        <div>
          <p className="c-section-label">Talk to Kairologic</p>
          <h2>What should<br />work better?</h2>
          <p>Tell us about the work your team manages and where you want to improve it.</p>
        </div>
        <Link href="/contact" className="c-button">Tell us about your project</Link>
      </div>
    </section>
  );
}
