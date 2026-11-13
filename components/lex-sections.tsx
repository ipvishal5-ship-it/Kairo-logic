"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { LEX_FAQS } from "@/lib/ops-lex-faqs";

interface LexRowItem {
  title: string;
  description: string;
  svg: ReactNode;
}

interface HabitStepItem {
  title: string;
  caption: string;
  svg: ReactNode;
}

const FILING_PREP_COPY = {
  heading: "Watch a filing prepare itself.",
  sub: "The real sequence Kairologic Lex runs: the same steps your team does by hand today, fully automated.",
  rows: [
    {
      title: "Merge",
      description: "PDFs, scans and photos combined into one filing.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <g fill="#F6FAF9" stroke="#102A43" strokeWidth={2}>
            <rect
              className="sg"
              style={{ "--dx": "-14px", "--dy": "-8px" } as CSSProperties}
              x={16}
              y={12}
              width={40}
              height={52}
            />
            <rect
              className="sg"
              style={{ "--dx": "12px", "--dy": "-14px" } as CSSProperties}
              x={20}
              y={16}
              width={40}
              height={52}
            />
            <rect
              className="sg"
              style={{ "--dx": "-6px", "--dy": "10px" } as CSSProperties}
              x={24}
              y={20}
              width={40}
              height={52}
            />
          </g>
        </svg>
      ),
    },
    {
      title: "Cover Page",
      description:
        "An index table with the count, name and list of every document is added.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <g fill="#F6FAF9" stroke="#102A43" strokeWidth={2}>
            <rect x={18} y={22} width={40} height={52} />
            <rect x={22} y={26} width={40} height={52} />
          </g>
          <rect className="cv" x={14} y={10} width={40} height={52} fill="#16876D" />
        </svg>
      ),
    },
    {
      title: "Smart Text",
      description:
        "Scanned pages become searchable. Typed pages are left untouched.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <rect
            x={16}
            y={8}
            width={48}
            height={64}
            fill="#F6FAF9"
            stroke="#102A43"
            strokeWidth={2}
          />
          <path
            d="M22 18l8 -4M22 26l16 -8"
            stroke="#102A43"
            strokeOpacity={0.3}
            strokeWidth={3}
          />
          <rect className="t2" x={22} y={30} width={36} height={5} fill="#16876D" />
          <rect className="t2" x={22} y={42} width={30} height={5} fill="#16876D" />
          <rect className="t2" x={22} y={54} width={34} height={5} fill="#16876D" />
        </svg>
      ),
    },
    {
      title: "Compress",
      description: "Reduced to the size the portal accepts.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <g className="cm" fill="#F6FAF9" stroke="#102A43" strokeWidth={2}>
            <rect x={14} y={14} width={46} height={14} />
            <rect x={14} y={30} width={46} height={14} />
            <rect x={14} y={46} width={46} height={14} />
            <rect x={14} y={62} width={46} height={14} />
          </g>
        </svg>
      ),
    },
    {
      title: "Pagination",
      description:
        "“Page X of Y” printed on every page, exactly where the court expects it.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <g fill="#F6FAF9" stroke="#102A43" strokeWidth={2}>
            <rect x={10} y={22} width={38} height={48} />
            <rect x={22} y={14} width={38} height={48} />
            <rect x={34} y={6} width={38} height={48} />
          </g>
          <rect className="nm" x={14} y={60} width={10} height={8} fill="#16876D" />
          <rect className="nm" x={26} y={52} width={10} height={8} fill="#16876D" />
          <rect className="nm" x={38} y={44} width={10} height={8} fill="#16876D" />
        </svg>
      ),
    },
    {
      title: "Seal",
      description: "The bank’s official seal applied to every page.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <rect
            x={14}
            y={8}
            width={52}
            height={64}
            fill="#F6FAF9"
            stroke="#102A43"
            strokeWidth={2}
          />
          <g className="sl">
            <circle
              cx={46}
              cy={50}
              r={15}
              fill="none"
              stroke="#16876D"
              strokeWidth={4}
            />
            <path
              d="M39 50l5 5 9-11"
              fill="none"
              stroke="#16876D"
              strokeWidth={4}
              strokeLinecap="round"
            />
          </g>
        </svg>
      ),
    },
    {
      title: "Split",
      description:
        "Divided into portal-ready parts that never cut a document mid-way.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <g fill="#F6FAF9" stroke="#102A43" strokeWidth={2}>
            <rect
              className="sp"
              style={{ "--sx": "-22px" } as CSSProperties}
              x={30}
              y={20}
              width={22}
              height={40}
            />
            <rect
              className="sp"
              style={{ "--sx": "0px" } as CSSProperties}
              x={30}
              y={20}
              width={22}
              height={40}
            />
            <rect
              className="sp"
              style={{ "--sx": "22px" } as CSSProperties}
              x={30}
              y={20}
              width={22}
              height={40}
            />
          </g>
        </svg>
      ),
    },
  ] satisfies LexRowItem[],
};

const WEB_SERVICE_COPY = {
  beforeMark: "Zero installation. ",
  mark: "Ready in your browser.",
  subtitle: "Any PC. Any laptop. Any tablet.",
  body: "Kairologic Lex operates as a high-performance web service. Simply open your browser, drop your case files, and let the cloud engine automate the entire pipeline: selective OCR, 300 DPI conversion, pagination, digital seals, and portal-ready splitting.",
  chips: [
    "Instant browser access",
    "Server-side OCR & processing",
    "Works on Windows, Mac & iPad",
    "Zero hardware load",
  ],
};

const INTEGRITY_COPY = {
  heading: "Built for document integrity and verifiable filings.",
  sub: "Checksums, page-count validation and non-destructive processing keep your originals intact and portal-compliant.",
  rows: [
    {
      title: "Page-count validation",
      description:
        "Automated pre-flight and post-flight checks make sure the final page count matches before release.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <g fill="#F6FAF9" stroke="#102A43" strokeWidth={2}>
            <rect x={6} y={20} width={24} height={40} />
            <rect x={50} y={20} width={24} height={40} />
          </g>
          <path className="eq" d="M34 34h12M34 46h12" stroke="#16876D" strokeWidth={5} />
        </svg>
      ),
    },
    {
      title: "Selective OCR",
      description:
        "Existing text layers are detected, and only scanned images are processed.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <rect
            x={16}
            y={8}
            width={48}
            height={64}
            fill="#F6FAF9"
            stroke="#102A43"
            strokeWidth={2}
          />
          <path
            d="M22 20h36M22 30h36"
            stroke="#102A43"
            strokeOpacity={0.5}
            strokeWidth={4}
          />
          <rect className="scn" x={16} y={30} width={48} height={4} fill="#16876D" />
          <path d="M22 52h30M22 62h22" stroke="#16876D" strokeWidth={4} />
        </svg>
      ),
    },
    {
      title: "300 DPI rendering",
      description:
        "Scans are processed at the court-recommended resolution, without aggressive compression.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <g fill="#102A43">
            <rect className="px" x={12} y={12} width={16} height={16} />
            <rect
              className="px"
              x={32}
              y={12}
              width={16}
              height={16}
              style={{ transitionDelay: ".1s" }}
            />
            <rect
              className="px"
              x={52}
              y={12}
              width={16}
              height={16}
              style={{ transitionDelay: ".2s" }}
            />
            <rect
              className="px"
              x={12}
              y={32}
              width={16}
              height={16}
              style={{ transitionDelay: ".15s" }}
            />
            <rect
              className="px"
              x={32}
              y={32}
              width={16}
              height={16}
              fill="#16876D"
              style={{ transitionDelay: ".25s" }}
            />
            <rect
              className="px"
              x={52}
              y={32}
              width={16}
              height={16}
              style={{ transitionDelay: ".35s" }}
            />
            <rect
              className="px"
              x={12}
              y={52}
              width={16}
              height={16}
              style={{ transitionDelay: ".3s" }}
            />
            <rect
              className="px"
              x={32}
              y={52}
              width={16}
              height={16}
              style={{ transitionDelay: ".4s" }}
            />
            <rect
              className="px"
              x={52}
              y={52}
              width={16}
              height={16}
              style={{ transitionDelay: ".5s" }}
            />
          </g>
        </svg>
      ),
    },
    {
      title: "Inspection logs",
      description:
        "A structured summary of sizes, page splits and anomalies, so your team can verify before upload.",
      svg: (
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <rect
            x={12}
            y={8}
            width={56}
            height={64}
            fill="#F6FAF9"
            stroke="#102A43"
            strokeWidth={2}
          />
          <rect className="lg2" x={20} y={20} width={40} height={5} fill="#16876D" />
          <rect
            className="lg2"
            x={20}
            y={34}
            width={32}
            height={5}
            fill="#16876D"
            style={{ transitionDelay: ".15s" }}
          />
          <rect
            className="lg2"
            x={20}
            y={48}
            width={38}
            height={5}
            fill="#16876D"
            style={{ transitionDelay: ".3s" }}
          />
          <rect
            className="lg2"
            x={20}
            y={60}
            width={24}
            height={5}
            fill="#16876D"
            style={{ transitionDelay: ".45s" }}
          />
        </svg>
      ),
    },
  ] satisfies LexRowItem[],
};

const HABIT_STEPS_COPY = {
  heading: "Three steps. Then it is just a habit.",
  steps: [
    {
      title: "Drop the documents",
      caption: "Put the case folder’s PDFs and scans into the input folder.",
      svg: (
        <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
          <path d="M8 28h26l6 8h32v34H8z" fill="#102A43" />
          <rect
            className="dpg"
            x={26}
            y={6}
            width={26}
            height={32}
            fill="#F6FAF9"
            stroke="#16876D"
            strokeWidth={3}
          />
        </svg>
      ),
    },
    {
      title: "Click RUN",
      caption: "One button. Every step lights up green as it finishes.",
      svg: (
        <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
          <rect x={12} y={12} width={56} height={56} fill="#16876D" />
          <text
            x={40}
            y={47}
            textAnchor="middle"
            fontSize={19}
            fontWeight={700}
            fill="#fff"
            fontFamily="Bricolage Grotesque"
          >
            RUN
          </text>
        </svg>
      ),
    },
    {
      title: "Upload with confidence",
      caption: "Portal-ready parts land in the output folder, with a written report.",
      svg: (
        <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
          <rect x={10} y={40} width={60} height={30} fill="#102A43" />
          <path
            d="M40 34V8M28 20l12-12 12 12"
            fill="none"
            stroke="#16876D"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ] satisfies HabitStepItem[],
};

const CLOSING_COPY = {
  heading: "Get Kairologic Lex for your team.",
  body: "Talk to us about your filing portal and see a live web run with sample files.",
  buttonLabel: "Request a live walkthrough",
  linkLabel: "Read web service & filing FAQs",
};

function LexRowList({ rows }: { rows: LexRowItem[] }) {
  return (
    <div className="rows rd">
      {rows.map((row) => (
        <div className="r2 sm" key={row.title}>
          <div className="w2">{row.title}</div>
          <p>{row.description}</p>
          {row.svg}
        </div>
      ))}
    </div>
  );
}

export default function LexSections() {
  const rootRef = useRef<HTMLDivElement>(null);
  const locH2Ref = useRef<HTMLHeadingElement>(null);
  const stpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = Array.from(root.querySelectorAll<HTMLElement>(".r2"));
    const headings = [
      ...Array.from(root.querySelectorAll<HTMLElement>(".wd h2")),
      ...(locH2Ref.current ? [locH2Ref.current] : []),
    ];
    const stp = stpRef.current;

    if (reduced) {
      rows.forEach((r) => r.classList.add("on"));
      headings.forEach((h) => h.classList.add("in"));
      if (stp) {
        stp.querySelectorAll<HTMLElement>(".s3").forEach((s) => s.classList.add("on"));
        stp.style.setProperty("--p", "1");
      }
      return;
    }

    const rowIo = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          entry.target.classList.toggle("on", entry.isIntersecting)
        ),
      { rootMargin: "-38% 0px -38% 0px" }
    );

    const onPointerEnter = (e: Event) => {
      (e.currentTarget as HTMLElement).classList.add("on");
    };

    rows.forEach((r) => {
      rowIo.observe(r);
      r.addEventListener("pointerenter", onPointerEnter);
    });

    const headingObservers: IntersectionObserver[] = [];
    headings.forEach((h) => {
      const hIo = new IntersectionObserver(
        ([entry], observer) => {
          if (entry.isIntersecting) {
            h.classList.add("in");
            observer.disconnect();
          }
        },
        { threshold: 0.6 }
      );
      hIo.observe(h);
      headingObservers.push(hIo);
    });

    let stpIo: IntersectionObserver | null = null;
    const stepTimers: ReturnType<typeof setTimeout>[] = [];
    if (stp) {
      const steps = Array.from(stp.querySelectorAll<HTMLElement>(".s3"));
      stpIo = new IntersectionObserver(
        ([entry], observer) => {
          if (entry.isIntersecting) {
            steps.forEach((s, i) => {
              const t = setTimeout(() => s.classList.add("on"), i * 650);
              stepTimers.push(t);
            });
            stp.style.setProperty("--p", "1");
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      stpIo.observe(stp);
    }

    return () => {
      rowIo.disconnect();
      rows.forEach((r) => r.removeEventListener("pointerenter", onPointerEnter));
      headingObservers.forEach((o) => o.disconnect());
      stpIo?.disconnect();
      stepTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* SECTION: Watch a filing prepare itself. */}
      <section className="wrap wd" id="steps">
        <h2>{FILING_PREP_COPY.heading}</h2>
        <p className="sub" style={{ marginTop: "18px" }}>
          {FILING_PREP_COPY.sub}
        </p>
        <LexRowList rows={FILING_PREP_COPY.rows} />
      </section>

      {/* SECTION: Web service — zero install, ready on any device */}
      <section className="wrap loc">
        <div>
          <h2 ref={locH2Ref}>
            {WEB_SERVICE_COPY.beforeMark}
            <mark>{WEB_SERVICE_COPY.mark}</mark>
          </h2>
          <div className="l1">{WEB_SERVICE_COPY.subtitle}</div>
          <p>{WEB_SERVICE_COPY.body}</p>
          <div className="chips" style={{ marginTop: "22px" }}>
            {WEB_SERVICE_COPY.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>

        <div className="lc">
          <svg
            viewBox="0 0 600 450"
            role="img"
            aria-label="Kairologic Lex web workspace: live document ingestion, OCR text layer extraction, Bates pagination, court seal validation, and split dossier export across browser devices."
          >
            <defs>
              <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#16876D" />
                <stop offset="100%" stopColor="#102A43" />
              </linearGradient>
              <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F8FBFA" />
              </linearGradient>
              <linearGradient id="glowG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7FE0C3" />
                <stop offset="100%" stopColor="#16876D" />
              </linearGradient>
              <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#16876D" stopOpacity="0" />
                <stop offset="30%" stopColor="#7FE0C3" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="70%" stopColor="#7FE0C3" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#16876D" stopOpacity="0" />
              </linearGradient>
              <filter id="softShadow" x="-10%" y="-10%" width="125%" height="125%">
                <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#102A43" floodOpacity="0.14" />
              </filter>
              <filter id="cardShadow" x="-12%" y="-12%" width="130%" height="130%">
                <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#102A43" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Canvas Stage Backdrop */}
            <rect x="8" y="8" width="584" height="434" rx="20" fill="#F4F8F7" stroke="#102A43" strokeOpacity="0.1" strokeWidth="1.2" />

            {/* ════════════════════════════════════════════════════════════════
                1. PRIMARY DESKTOP APPLICATION WORKSPACE
               ════════════════════════════════════════════════════════════════ */}
            <g filter="url(#softShadow)">
              {/* Outer Laptop / Monitor Body */}
              <rect x="36" y="32" width="418" height="268" rx="12" fill="#102A43" stroke="#102A43" strokeWidth="2" />
              
              {/* Window Title Bar */}
              <circle cx="56" cy="48" r="4.5" fill="#FF5F56" />
              <circle cx="70" cy="48" r="4.5" fill="#FFBD2E" />
              <circle cx="84" cy="48" r="4.5" fill="#27C93F" />
              
              {/* Browser Tabs */}
              <path d="M102 54 L110 40 L195 40 L203 54 Z" fill="#16876D" />
              <text x="122" y="49" fontSize="9" fontWeight="700" fill="#FFFFFF">Kairologic Lex</text>
              <circle cx="188" cy="47" r="2.5" fill="#7FE0C3" />

              {/* URL Address Bar */}
              <rect x="216" y="41" width="186" height="15" rx="5" fill="#193956" />
              <text x="226" y="52" fontSize="8" fill="#7FE0C3" fontFamily="monospace">https://app.kairologic.com/lex/filing</text>
              <circle cx="392" cy="48.5" r="3" fill="#7FE0C3" />

              {/* Application Screen Surface */}
              <rect x="38" y="56" width="414" height="242" rx="0 0 10 10" fill="url(#screenGrad)" />

              {/* Left Sidebar Menu */}
              <rect x="38" y="56" width="96" height="242" fill="#EBF2F0" />
              {/* Profile / Workspace Badge */}
              <rect x="46" y="68" width="80" height="20" rx="4" fill="#102A43" />
              <circle cx="56" cy="78" r="4" fill="#7FE0C3" />
              <text x="64" y="81" fontSize="7.5" fontWeight="700" fill="#FFFFFF">E-FILING #408</text>

              {/* Step Navigation Items */}
              <g transform="translate(46, 100)">
                {/* Step 1: Ingest */}
                <rect x="0" y="0" width="80" height="22" rx="4" fill="#FFFFFF" stroke="#16876D" strokeWidth="1" />
                <circle cx="8" cy="11" r="3" fill="#16876D" />
                <text x="16" y="14" fontSize="7.5" fontWeight="700" fill="#16876D">1. Intake &amp; OCR</text>

                {/* Step 2: Assemble */}
                <rect x="0" y="28" width="80" height="22" rx="4" fill="#F4F8F7" />
                <circle cx="8" cy="39" r="3" fill="#102A43" fillOpacity="0.4" />
                <text x="16" y="42" fontSize="7.5" fontWeight="600" fill="#102A43" fillOpacity="0.8">2. Pagination</text>

                {/* Step 3: Seals */}
                <rect x="0" y="56" width="80" height="22" rx="4" fill="#F4F8F7" />
                <circle cx="8" cy="67" r="3" fill="#102A43" fillOpacity="0.4" />
                <text x="16" y="70" fontSize="7.5" fontWeight="600" fill="#102A43" fillOpacity="0.8">3. Bank Seal</text>

                {/* Step 4: Split */}
                <rect x="0" y="84" width="80" height="22" rx="4" fill="#F4F8F7" />
                <circle cx="8" cy="95" r="3" fill="#102A43" fillOpacity="0.4" />
                <text x="16" y="98" fontSize="7.5" fontWeight="600" fill="#102A43" fillOpacity="0.8">4. Portal Split</text>
              </g>

              {/* Status footer pill on sidebar */}
              <rect x="46" y="266" width="80" height="16" rx="8" fill="#16876D" fillOpacity="0.15" />
              <text x="86" y="277" textAnchor="middle" fontSize="7" fontWeight="700" fill="#16876D">SYSTEM: ONLINE</text>

              {/* Main Content Workspace Stage */}
              <g transform="translate(144, 66)">
                {/* Header Action Bar */}
                <rect x="0" y="0" width="298" height="26" rx="5" fill="#FFFFFF" stroke="#102A43" strokeOpacity="0.08" />
                <text x="10" y="16" fontSize="8.5" fontWeight="700" fill="#102A43">Dossier: OriginalSuit_8472.pdf</text>
                
                {/* Real-time processing badges */}
                <rect x="180" y="5" width="54" height="16" rx="4" fill="#E3EDEA" stroke="#16876D" strokeWidth="0.8" />
                <text x="186" y="15" fontSize="7" fontWeight="700" fill="#16876D">300 DPI OK</text>

                <rect x="238" y="5" width="52" height="16" rx="4" fill="#16876D" />
                <text x="246" y="15" fontSize="7" fontWeight="700" fill="#FFFFFF">ACTIVE</text>

                {/* Interactive Document Inspection Canvas */}
                <g transform="translate(0, 36)">
                  {/* Paper 1: Background stack preview */}
                  <rect x="8" y="4" width="168" height="174" rx="4" fill="#E8F0EE" stroke="#102A43" strokeOpacity="0.1" />
                  <rect x="4" y="2" width="168" height="174" rx="4" fill="#F0F6F4" stroke="#102A43" strokeOpacity="0.15" />
                  
                  {/* Active Document Surface */}
                  <rect x="0" y="0" width="168" height="174" rx="4" fill="#FFFFFF" stroke="#102A43" strokeOpacity="0.25" strokeWidth="1.2" />

                  {/* Header of Document */}
                  <rect x="14" y="14" width="86" height="7" rx="3.5" fill="#102A43" fillOpacity="0.85" />
                  <rect x="14" y="25" width="56" height="4" rx="2" fill="#16876D" />

                  {/* Document Text Paragraph Rows */}
                  <rect x="14" y="38" width="140" height="3" rx="1.5" fill="#102A43" fillOpacity="0.22" />
                  <rect x="14" y="46" width="134" height="3" rx="1.5" fill="#102A43" fillOpacity="0.22" />
                  <rect x="14" y="54" width="138" height="3" rx="1.5" fill="#102A43" fillOpacity="0.22" />
                  <rect x="14" y="62" width="124" height="3" rx="1.5" fill="#102A43" fillOpacity="0.22" />

                  <rect x="14" y="76" width="140" height="3" rx="1.5" fill="#102A43" fillOpacity="0.22" />
                  <rect x="14" y="84" width="136" height="3" rx="1.5" fill="#102A43" fillOpacity="0.22" />
                  <rect x="14" y="92" width="130" height="3" rx="1.5" fill="#102A43" fillOpacity="0.22" />
                  <rect x="14" y="100" width="118" height="3" rx="1.5" fill="#102A43" fillOpacity="0.22" />

                  {/* High Precision Bates Stamping */}
                  <g transform="translate(94, 12)">
                    <rect x="0" y="0" width="62" height="14" rx="3" fill="#102A43" />
                    <text x="6" y="10" fontSize="7" fontWeight="700" fill="#7FE0C3" fontFamily="monospace">PAGE: 0142</text>
                  </g>

                  {/* Automated Bank Official Seal Stamp */}
                  <g transform="translate(100, 114)">
                    <circle cx="28" cy="28" r="22" fill="#7FE0C3" fillOpacity="0.2" stroke="#16876D" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="28" cy="28" r="17" fill="none" stroke="#16876D" strokeWidth="1" />
                    <text x="28" y="27" textAnchor="middle" fontSize="6" fontWeight="800" fill="#16876D">AUTHORISED</text>
                    <text x="28" y="34" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#102A43">SEAL</text>
                  </g>

                  {/* Animated OCR Laser Scanning Beam */}
                  <g>
                    {/* Beam Light Curtain */}
                    <rect x="4" y="28" width="160" height="16" fill="url(#laserGrad)" opacity="0.35">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 110; 0 0"
                        dur="3.6s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    {/* Sharp Focal Laser Line */}
                    <line x1="6" y1="36" x2="162" y2="36" stroke="#16876D" strokeWidth="2" strokeLinecap="round">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 110; 0 0"
                        dur="3.6s"
                        repeatCount="indefinite"
                      />
                    </line>
                  </g>

                  {/* Page-Count Footer Verification Indicator */}
                  <rect x="14" y="154" width="70" height="12" rx="3" fill="#E3EDEA" />
                  <text x="20" y="162.5" fontSize="6.5" fontWeight="700" fill="#16876D">✓ VERIFIED OCR</text>
                </g>

                {/* Right Pipeline Telemetry Card */}
                <g transform="translate(178, 36)">
                  <rect x="0" y="0" width="120" height="174" rx="6" fill="#FFFFFF" stroke="#102A43" strokeOpacity="0.1" />
                  
                  {/* Telemetry Header */}
                  <rect x="0" y="0" width="120" height="24" rx="6 6 0 0" fill="#102A43" />
                  <text x="10" y="16" fontSize="8" fontWeight="700" fill="#FFFFFF">CLOUD PIPELINE</text>
                  <circle cx="106" cy="12" r="3" fill="#7FE0C3" />

                  {/* Real-time stats */}
                  <g transform="translate(10, 32)">
                    <text x="0" y="8" fontSize="7" fill="#102A43" opacity="0.6">TOTAL PAGES</text>
                    <text x="0" y="20" fontSize="11" fontWeight="800" fill="#102A43">142 Pages</text>

                    <text x="0" y="34" fontSize="7" fill="#102A43" opacity="0.6">SELECTIVE OCR</text>
                    <text x="0" y="46" fontSize="9" fontWeight="700" fill="#16876D">48 Scans Processed</text>

                    <text x="0" y="60" fontSize="7" fill="#102A43" opacity="0.6">COMPRESSION</text>
                    <text x="0" y="72" fontSize="9" fontWeight="700" fill="#102A43">186 MB → 94 MB</text>

                    {/* Live Progress Bar */}
                    <text x="0" y="88" fontSize="7" fill="#102A43" opacity="0.6">PIPELINE STATUS</text>
                    <rect x="0" y="94" width="100" height="6" rx="3" fill="#E3EDEA" />
                    <rect x="0" y="94" width="84" height="6" rx="3" fill="url(#glowG)">
                      <animate attributeName="width" values="20;100;84;100" dur="4.2s" repeatCount="indefinite" />
                    </rect>

                    {/* Done Check pill */}
                    <rect x="0" y="110" width="100" height="20" rx="4" fill="#16876D" fillOpacity="0.12" stroke="#16876D" strokeWidth="0.8" />
                    <text x="50" y="123" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#16876D">READY FOR SPLIT</text>
                  </g>
                </g>
              </g>
            </g>

            {/* ════════════════════════════════════════════════════════════════
                2. CLOUD ACCELERATION ENGINE BADGE (Top-Right Floating)
               ════════════════════════════════════════════════════════════════ */}
            <g transform="translate(436, 26)" filter="url(#cardShadow)">
              <rect x="0" y="0" width="144" height="74" rx="12" fill="url(#cloudGrad)" stroke="#7FE0C3" strokeWidth="1.5" />
              
              {/* Cloud Icon with Server Cores */}
              <g transform="translate(12, 16)">
                <path
                  d="M16 26a9 9 0 0 1 16-4 12 12 0 0 1 20 2 8 8 0 0 1-2 15H16a8 8 0 0 1 0-13z"
                  fill="#7FE0C3"
                  fillOpacity="0.2"
                  stroke="#7FE0C3"
                  strokeWidth="1.5"
                />
                <circle cx="28" cy="27" r="2.5" fill="#FFFFFF" />
                <circle cx="36" cy="27" r="2.5" fill="#7FE0C3" />
              </g>

              <text x="58" y="28" fontSize="10" fontWeight="700" fill="#FFFFFF">Cloud Engine</text>
              <text x="58" y="42" fontSize="7.5" fill="#7FE0C3" fontWeight="600">High-Performance OCR</text>
              <text x="58" y="54" fontSize="7" fill="#E3EDEA" opacity="0.8">Zero Local CPU Load</text>

              {/* Status pulse */}
              <circle cx="130" cy="18" r="4" fill="#7FE0C3" />
              <circle cx="130" cy="18" r="7" fill="none" stroke="#7FE0C3" strokeWidth="1" opacity="0.6">
                <animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* ════════════════════════════════════════════════════════════════
                3. TABLET WORKSTATION — DOSSIER SPLITTING TOOL (Front-Right)
               ════════════════════════════════════════════════════════════════ */}
            <g transform="translate(360, 214)" filter="url(#cardShadow)">
              {/* Tablet Hardware Casing */}
              <rect x="0" y="0" width="206" height="152" rx="14" fill="#102A43" stroke="#7FE0C3" strokeWidth="1.8" />
              {/* Ambient Camera Notch */}
              <circle cx="103" cy="6" r="2.2" fill="#1E3E5C" />
              
              {/* Tablet Screen Surface */}
              <rect x="8" y="12" width="190" height="128" rx="8" fill="#F8FBFA" />
              
              {/* Tablet Application Top Nav */}
              <rect x="8" y="12" width="190" height="20" fill="#16876D" />
              <text x="18" y="25" fontSize="8" fontWeight="700" fill="#FFFFFF">Portal-Ready Splitting</text>
              <text x="178" y="25" textAnchor="end" fontSize="7" fontWeight="600" fill="#7FE0C3">Part Dossiers</text>

              {/* Split Volume 1 Card */}
              <g transform="translate(18, 38)">
                <rect x="0" y="0" width="80" height="52" rx="5" fill="#FFFFFF" stroke="#16876D" strokeWidth="1.2" />
                <rect x="0" y="0" width="80" height="14" rx="5 5 0 0" fill="#E3EDEA" />
                <text x="8" y="10" fontSize="7" fontWeight="700" fill="#16876D">PART 01 · 48 MB</text>
                <text x="8" y="24" fontSize="7" fontWeight="600" fill="#102A43">Pages 1 – 64</text>
                <text x="8" y="34" fontSize="6.5" fill="#102A43" opacity="0.6">Index + Pleadings</text>
                <rect x="8" y="40" width="64" height="4" rx="2" fill="#7FE0C3" fillOpacity="0.6" />
              </g>

              {/* Split Volume 2 Card */}
              <g transform="translate(108, 38)">
                <rect x="0" y="0" width="80" height="52" rx="5" fill="#FFFFFF" stroke="#16876D" strokeWidth="1.2" />
                <rect x="0" y="0" width="80" height="14" rx="5 5 0 0" fill="#E3EDEA" />
                <text x="8" y="10" fontSize="7" fontWeight="700" fill="#16876D">PART 02 · 46 MB</text>
                <text x="8" y="24" fontSize="7" fontWeight="600" fill="#102A43">Pages 65 – 142</text>
                <text x="8" y="34" fontSize="6.5" fill="#102A43" opacity="0.6">Exhibits + Orders</text>
                <rect x="8" y="40" width="64" height="4" rx="2" fill="#7FE0C3" fillOpacity="0.6" />
              </g>

              {/* Primary Download Button */}
              <g transform="translate(28, 100)">
                <rect x="0" y="0" width="150" height="26" rx="13" fill="#102A43" />
                <circle cx="20" cy="13" r="5" fill="#16876D" />
                <path d="M18 13 L20 15 L23 11" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                <text x="32" y="17" fontSize="8.5" fontWeight="700" fill="#7FE0C3">Export Verified Dossiers</text>
              </g>
            </g>

            {/* ════════════════════════════════════════════════════════════════
                4. MOBILE SMARTPHONE — LIVE STATUS TRACKER (Front-Left)
               ════════════════════════════════════════════════════════════════ */}
            <g transform="translate(24, 240)" filter="url(#cardShadow)">
              {/* Smartphone Outer Chassis */}
              <rect x="0" y="0" width="100" height="182" rx="16" fill="#102A43" stroke="#16876D" strokeWidth="1.8" />
              {/* Dynamic Island / Notch */}
              <rect x="36" y="7" width="28" height="4.5" rx="2.2" fill="#1E3E5C" />
              
              {/* Phone Screen Surface */}
              <rect x="6" y="16" width="88" height="154" rx="10" fill="#F8FBFA" />
              
              {/* App Screen Top Nav */}
              <rect x="6" y="16" width="88" height="24" fill="#16876D" />
              <text x="50" y="31" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#FFFFFF">E-Court Verify</text>

              {/* Mobile Verification Checklist */}
              <g transform="translate(14, 48)">
                {/* Item 1 */}
                <rect x="0" y="0" width="72" height="20" rx="4" fill="#FFFFFF" stroke="#16876D" strokeWidth="0.8" />
                <circle cx="8" cy="10" r="3.5" fill="#16876D" />
                <text x="16" y="13" fontSize="6.5" fontWeight="700" fill="#102A43">OCR Extracted</text>

                {/* Item 2 */}
                <rect x="0" y="24" width="72" height="20" rx="4" fill="#FFFFFF" stroke="#16876D" strokeWidth="0.8" />
                <circle cx="8" cy="34" r="3.5" fill="#16876D" />
                <text x="16" y="37" fontSize="6.5" fontWeight="700" fill="#102A43">Bates 001-142</text>

                {/* Item 3 */}
                <rect x="0" y="48" width="72" height="20" rx="4" fill="#FFFFFF" stroke="#16876D" strokeWidth="0.8" />
                <circle cx="8" cy="58" r="3.5" fill="#16876D" />
                <text x="16" y="61" fontSize="6.5" fontWeight="700" fill="#102A43">Bank Seal OK</text>

                {/* Item 4 */}
                <rect x="0" y="72" width="72" height="20" rx="4" fill="#FFFFFF" stroke="#16876D" strokeWidth="0.8" />
                <circle cx="8" cy="82" r="3.5" fill="#16876D" />
                <text x="16" y="85" fontSize="6.5" fontWeight="700" fill="#102A43">50 MB Limit OK</text>
              </g>

              {/* Ready status pill */}
              <rect x="14" y="146" width="72" height="18" rx="9" fill="#16876D" />
              <text x="50" y="158" textAnchor="middle" fontSize="7" fontWeight="700" fill="#FFFFFF">FILING READY</text>
            </g>

            {/* ════════════════════════════════════════════════════════════════
                5. HIGH-FIDELITY LIVE DATA FLOW CONNECTORS
               ════════════════════════════════════════════════════════════════ */}
            {/* Desktop to Cloud Stream */}
            <path id="pathDesktopCloud" d="M430 75 C 445 75, 455 60, 442 45" fill="none" stroke="#16876D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

            {/* Cloud Engine to Tablet Stream */}
            <path id="pathCloudTablet" d="M480 100 C 490 145, 470 180, 440 214" fill="none" stroke="#16876D" strokeWidth="2" strokeDasharray="4 3" opacity="0.75" />
            
            {/* Pulse Ball: Cloud -> Tablet */}
            <circle r="4" fill="#16876D">
              <animateMotion dur="2.6s" repeatCount="indefinite">
                <mpath href="#pathCloudTablet" />
              </animateMotion>
            </circle>

            {/* Desktop to Mobile Stream */}
            <path id="pathDesktopMobile" d="M144 260 C 110 270, 95 260, 80 240" fill="none" stroke="#7FE0C3" strokeWidth="2" strokeDasharray="4 3" opacity="0.85" />
            
            {/* Pulse Ball: Desktop -> Mobile */}
            <circle r="3.5" fill="#16876D">
              <animateMotion dur="3s" repeatCount="indefinite">
                <mpath href="#pathDesktopMobile" />
              </animateMotion>
            </circle>

            {/* ════════════════════════════════════════════════════════════════
                6. UNIVERSAL WEB ACCESS BANNER (Bottom Center)
               ════════════════════════════════════════════════════════════════ */}
            <g transform="translate(160, 392)" filter="url(#cardShadow)">
              <rect x="0" y="0" width="260" height="36" rx="18" fill="#102A43" stroke="#7FE0C3" strokeWidth="1.2" />
              <circle cx="22" cy="18" r="6" fill="#7FE0C3" />
              <path d="M19 18 L21 20 L25 16" fill="none" stroke="#102A43" strokeWidth="1.5" strokeLinecap="round" />
              <text x="38" y="17" fontSize="9" fontWeight="700" fill="#FFFFFF">Universal Web Workspace</text>
              <text x="38" y="27" fontSize="7.5" fill="#7FE0C3">Full OCR &amp; e-court preparation ready on any screen</text>
            </g>
          </svg>
        </div>
      </section>

      {/* SECTION: Built for document integrity and verifiable filings. */}
      <section className="wrap wd">
        <h2>{INTEGRITY_COPY.heading}</h2>
        <p className="sub" style={{ marginTop: "18px" }}>
          {INTEGRITY_COPY.sub}
        </p>
        <LexRowList rows={INTEGRITY_COPY.rows} />
      </section>

      {/* SECTION: Three steps. Then it is just a habit. */}
      <section className="wrap hw">
        <h2>{HABIT_STEPS_COPY.heading}</h2>
        <div className="stp" id="stp" ref={stpRef}>
          {HABIT_STEPS_COPY.steps.map((step) => (
            <div className="s3" key={step.title}>
              <i className="nd" />
              {step.svg}
              <h3>{step.title}</h3>
              <span>{step.caption}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Questions, answered. */}
      <section className="wrap fq" id="faq">
        <h2>Questions, answered.</h2>
        <div className="fql">
          {LEX_FAQS.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CLOSING BAND */}
      <section className="cl">
        <div className="wrap">
          <div>
            <h2>{CLOSING_COPY.heading}</h2>
            <p>{CLOSING_COPY.body}</p>
            <div className="btns">
              <Link className="btn" href="/contact">
                {CLOSING_COPY.buttonLabel}
              </Link>
              <a className="lnk" href="#faq">
                {CLOSING_COPY.linkLabel}
              </a>
            </div>
          </div>
          <div />
        </div>
      </section>
    </div>
  );
}

