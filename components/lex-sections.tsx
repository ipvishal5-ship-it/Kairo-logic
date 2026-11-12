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

const LOCAL_SECURITY_COPY = {
  beforeMark: "The documents ",
  mark: "never leave the office.",
  subtitle: "No uploads. No cloud. No accounts.",
  body: "The whole engine runs locally on your office PC, and even text recognition works with the internet disconnected. Court and bank documents stay exactly where confidential files belong: on your machine.",
  chips: ["Zero uploads", "Works fully offline", "Self-contained engine"],
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
  body: "Talk to us about your filing portal and see an offline run with sample files.",
  buttonLabel: "Request a live walkthrough",
  linkLabel: "Read offline & filing FAQs",
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

      {/* SECTION: The documents never leave the office. */}
      <section className="wrap loc">
        <div>
          <h2 ref={locH2Ref}>
            {LOCAL_SECURITY_COPY.beforeMark}
            <mark>{LOCAL_SECURITY_COPY.mark}</mark>
          </h2>
          <div className="l1">{LOCAL_SECURITY_COPY.subtitle}</div>
          <p>{LOCAL_SECURITY_COPY.body}</p>
          <div className="chips" style={{ marginTop: "22px" }}>
            {LOCAL_SECURITY_COPY.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>

        <div className="lc">
          <svg
            viewBox="0 0 520 380"
            role="img"
            aria-label="Documents circulate inside the office PC boundary. Attempts to reach the cloud are blocked."
          >
            <rect
              x={40}
              y={100}
              width={320}
              height={240}
              rx={10}
              fill="none"
              stroke="#102A43"
              strokeWidth={2.5}
              strokeDasharray="9 7"
            />
            <text x={56} y={130} fontSize={15} fontWeight={600} fill="#102A43">
              Your office
            </text>
            <rect x={130} y={170} width={140} height={92} rx={4} fill="#102A43" />
            <rect x={144} y={182} width={112} height={68} fill="#16876D" />
            <path
              d="M180 262v22M215 262v22M160 286h90"
              stroke="#102A43"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <path id="lp" d="M80 150H320V310H80Z" fill="none" />
            <g fill="#F6FAF9" stroke="#102A43" strokeWidth={2}>
              <rect x={-9} y={-12} width={18} height={24}>
                <animateMotion dur="8s" repeatCount="indefinite" begin="0s">
                  <mpath href="#lp" />
                </animateMotion>
              </rect>
              <rect x={-9} y={-12} width={18} height={24}>
                <animateMotion dur="8s" repeatCount="indefinite" begin="-2.7s">
                  <mpath href="#lp" />
                </animateMotion>
              </rect>
              <rect x={-9} y={-12} width={18} height={24}>
                <animateMotion dur="8s" repeatCount="indefinite" begin="-5.3s">
                  <mpath href="#lp" />
                </animateMotion>
              </rect>
            </g>
            <g
              fill="none"
              stroke="#102A43"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M430 90a22 22 0 0 1 4-43 30 30 0 0 1 56 8 20 20 0 0 1-6 35z"
                opacity={0.55}
              />
            </g>
            <path
              d="M424 100L496 36"
              stroke="#F2B84B"
              strokeWidth={5}
              strokeLinecap="round"
            />
            <text
              x={460}
              y={128}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill="#102A43"
            >
              No cloud
            </text>
            <g className="bnc">
              <circle
                cx={360}
                cy={200}
                r={8}
                fill="#7FE0C3"
                stroke="#102A43"
                strokeWidth={2}
              />
            </g>
            <path
              d="M372 192L410 160"
              stroke="#102A43"
              strokeOpacity={0.3}
              strokeWidth={2}
              strokeDasharray="4 5"
            />
            <path
              d="M366 168v64"
              stroke="#F2B84B"
              strokeWidth={5}
              strokeLinecap="round"
            />
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

