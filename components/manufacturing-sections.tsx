"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  CLOSING_SECTION_COPY,
  COMPARISON_SECTION_COPY,
  MANUFACTURING_FAQS,
  MEMORY_SECTION_COPY,
  PROCESS_SECTION_COPY,
  SCATTERED_SECTION_COPY,
} from "@/lib/manufacturing-data";

const SC: readonly [number, number, number][] = [
  [0.03, 0.08, -6],
  [0.5, 0.03, 5],
  [0.28, 0.3, -3],
  [0.58, 0.47, 7],
  [0.04, 0.64, 4],
  [0.36, 0.84, -5],
];

const MEMORY_SVGS: Record<
  (typeof MEMORY_SECTION_COPY.rows)[number]["id"],
  ReactNode
> = {
  records: (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <g className="bn" fill="#102A43">
        <path d="M8 10h17v18H8z" />
        <path d="M8 31h17v18H8z" />
        <path d="M8 52h17v18H8z" />
      </g>
      <path
        className="ar2"
        fill="#102A43"
        d="M28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
      />
      <path className="nd2" fill="#16876D" d="M27 33h14v14H27z" />
    </svg>
  ),
  shifts: (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <g fill="#102A43">
        <rect className="fl2" x={8} y={14} width={34} height={10} />
        <rect className="fl2" x={20} y={34} width={44} height={10} />
        <rect className="fl2" x={12} y={54} width={30} height={10} fill="#16876D" />
      </g>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <g fill="#102A43">
        <circle cx={14} cy={16} r={4} />
        <circle cx={34} cy={16} r={4} />
        <circle cx={54} cy={16} r={4} />
        <circle cx={14} cy={36} r={4} />
        <circle cx={34} cy={36} r={4} />
        <circle cx={54} cy={36} r={4} />
        <circle cx={14} cy={56} r={4} />
        <circle cx={34} cy={56} r={4} />
        <circle cx={54} cy={56} r={4} />
      </g>
      <g
        className="mg2"
        fill="none"
        stroke="#16876D"
        strokeWidth={4}
        strokeLinecap="round"
      >
        <circle cx={46} cy={44} r={14} />
        <path d="M56 54l12 12" />
      </g>
    </svg>
  ),
  handover: (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <g className="hp1" fill="#102A43">
        <circle cx={20} cy={26} r={8} />
        <path d="M6 60c0-12 6-18 14-18s14 6 14 18z" />
      </g>
      <path
        d="M38 40h10m-5-6l6 6-6 6"
        stroke="#102A43"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
      />
      <g className="hp2">
        <circle cx={60} cy={26} r={8} />
        <path d="M46 60c0-12 6-18 14-18s14 6 14 18z" />
      </g>
    </svg>
  ),
};

const PROCESS_SVGS: Record<
  (typeof PROCESS_SECTION_COPY.steps)[number]["id"],
  ReactNode
> = {
  understand: (
    <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
      <g
        fill="none"
        stroke="#102A43"
        strokeWidth={2}
        strokeDasharray="4 3"
      >
        <rect x={6} y={14} width={22} height={16} transform="rotate(-8 17 22)" />
        <rect x={32} y={8} width={22} height={16} transform="rotate(6 43 16)" />
        <rect x={12} y={46} width={22} height={16} transform="rotate(5 23 54)" />
      </g>
      <g
        className="mg"
        fill="none"
        stroke="#16876D"
        strokeWidth={4}
        strokeLinecap="round"
      >
        <circle cx={52} cy={46} r={13} />
        <path d="M62 56l10 10" />
      </g>
    </svg>
  ),
  configure: (
    <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
      <g className="bn" fill="#102A43">
        <path d="M8 10h17v18H8z" />
        <path d="M8 31h17v18H8z" />
        <path d="M8 52h17v18H8z" />
      </g>
      <path className="nd2" fill="#16876D" d="M27 33h14v14H27z" />
    </svg>
  ),
  handover: (
    <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
      <path
        fill="#102A43"
        d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8z"
      />
      <path
        className="ar2"
        fill="#102A43"
        d="M28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
      />
      <path fill="#16876D" d="M27 33h14v14H27z" />
    </svg>
  ),
};

/**
 * Remaining sections for /technologies/manufacturing:
 * scattered-to-recorded chips (#s2), 4 memory rows (.wd), software comparison (.vs),
 * 3-step delivery process (#how / #hw), FAQ accordion (#faq), and closing CTA (.cl).
 */
export default function ManufacturingSections() {
  const rootRef = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLElement>(null);
  const srcRef = useRef<HTMLDivElement>(null);
  const s2tRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const stpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const s2El = s2Ref.current;
    const srcEl = srcRef.current;
    const s2tEl = s2tRef.current;
    const rowsEl = rowsRef.current;
    const stpEl = stpRef.current;
    if (!root || !s2El || !srcEl || !s2tEl || !rowsEl || !stpEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chips = Array.from(srcEl.querySelectorAll<HTMLElement>(".chip"));
    const card = srcEl.querySelector<HTMLElement>(".cc");
    const checks = Array.from(srcEl.querySelectorAll<HTMLElement>(".ck"));
    const btn = s2El.querySelector<HTMLButtonElement>("#tgl");
    const lab = btn?.querySelector<HTMLElement>("span");

    if (!card || !btn || !lab) return;

    let alive = true;
    let conn = false;
    let W = 0;
    let H = 0;
    const nat: number[] = [];
    let cx = 0;
    let cy = 0;
    let cw = 0;
    let ch = 0;
    let s2DelayTimer: ReturnType<typeof setTimeout> | null = null;
    const stepTimers: ReturnType<typeof setTimeout>[] = [];

    const geo = () => {
      W = srcEl.clientWidth;
      H = srcEl.clientHeight;
      cx = W * 0.1;
      cy = H * 0.04;
      cw = W * 0.8;
      ch = H * 0.92;
      Object.assign(card.style, {
        left: `${cx}px`,
        top: `${cy}px`,
        width: `${cw}px`,
        height: `${ch}px`,
      });
    };

    const targetFor = (i: number, c: boolean) => {
      if (c) {
        const g = (ch - 64 - 52) / 6;
        return {
          x: cx + cw * 0.055,
          y: cy + 64 + i * g + (g - 44) / 2,
          rotation: 0,
          width: cw * 0.89,
        };
      }
      const wChip = nat[i] || chips[i]?.offsetWidth || 140;
      return {
        x: SC[i][0] * (W - wChip),
        y: SC[i][1] * (H - 44),
        rotation: SC[i][2],
        width: wChip,
      };
    };

    const colorsFor = (c: boolean) =>
      c
        ? {
            backgroundColor: "rgba(228,240,236,.1)",
            color: "#E4F0EC",
            borderColor: "rgba(228,240,236,.2)",
          }
        : {
            backgroundColor: "#F6FAF9",
            color: "#102A43",
            borderColor: "rgba(16,42,67,.16)",
          };

    const ctx = gsap.context(() => {}, srcEl);

    const put = (c: boolean) => {
      ctx.add(() => {
        gsap.set(chips, {
          x: (i: number) => targetFor(i, c).x,
          y: (i: number) => targetFor(i, c).y,
          rotation: (i: number) => targetFor(i, c).rotation,
          width: (i: number) => targetFor(i, c).width,
          ...colorsFor(c),
        });
        gsap.set(card, { opacity: c ? 1 : 0 });
        gsap.set(checks, { opacity: c ? 1 : 0 });
      });
      lab.textContent = c
        ? SCATTERED_SECTION_COPY.ctaScattered
        : SCATTERED_SECTION_COPY.ctaRecorded;
    };

    const go = (c: boolean) => {
      conn = c;
      lab.textContent = c
        ? SCATTERED_SECTION_COPY.ctaScattered
        : SCATTERED_SECTION_COPY.ctaRecorded;
      if (reduced) {
        put(c);
        return;
      }
      ctx.add(() => {
        gsap.to(chips, {
          x: (i: number) => targetFor(i, c).x,
          y: (i: number) => targetFor(i, c).y,
          rotation: (i: number) => targetFor(i, c).rotation,
          width: (i: number) => targetFor(i, c).width,
          ...colorsFor(c),
          duration: 0.95,
          stagger: 0.07,
          ease: "power3.inOut",
          overwrite: true,
        });
        gsap.to(card, {
          opacity: c ? 1 : 0,
          duration: 0.6,
          delay: c ? 0.2 : 0,
        });
        gsap.to(checks, {
          opacity: c ? 1 : 0,
          duration: 0.3,
          stagger: 0.07,
          delay: c ? 0.8 : 0,
        });
      });
    };

    let srcIo: IntersectionObserver | null = null;
    const onResize = () => {
      geo();
      put(conn);
    };
    const onToggle = () => go(!conn);

    document.fonts.ready.then(() => {
      if (!alive) return;
      chips.forEach((chip) => nat.push(chip.offsetWidth));
      geo();
      if (reduced) {
        conn = true;
        s2tEl.classList.add("in");
        put(true);
      } else {
        put(false);
        srcIo = new IntersectionObserver(
          ([entry], observer) => {
            if (entry.isIntersecting) {
              s2tEl.classList.add("in");
              s2DelayTimer = setTimeout(() => go(true), 700);
              observer.disconnect();
            }
          },
          { threshold: 0.55 }
        );
        srcIo.observe(srcEl);
      }
      window.addEventListener("resize", onResize);
    });

    btn.addEventListener("click", onToggle);

    // Marker highlight sweeps for headings with <mark> (.wd h2, .vs h2)
    const markHeadings = Array.from(
      root.querySelectorAll<HTMLElement>(".wd h2, .vs h2")
    );
    const headingObservers: IntersectionObserver[] = [];
    if (reduced) {
      markHeadings.forEach((h) => h.classList.add("in"));
    } else {
      markHeadings.forEach((h) => {
        const hIo = new IntersectionObserver(
          ([entry], observer) => {
            if (entry.isIntersecting) {
              h.classList.add("in");
              observer.disconnect();
            }
          },
          { threshold: 0.35 }
        );
        hIo.observe(h);
        headingObservers.push(hIo);
      });
    }

    // 4 large rows (.r2): active when crossing middle of viewport or on pointer enter
    const rows = Array.from(rowsEl.querySelectorAll<HTMLElement>(".r2"));
    const onRowPointerEnter = (e: Event) => {
      (e.currentTarget as HTMLElement).classList.add("on");
    };
    const rowIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("on", entry.isIntersecting);
        });
      },
      { rootMargin: "-38% 0px -38% 0px" }
    );
    rows.forEach((row) => {
      rowIo.observe(row);
      row.addEventListener("pointerenter", onRowPointerEnter);
    });

    // 3 process steps (#stp): line progress + staggered "on"
    const steps = Array.from(stpEl.querySelectorAll<HTMLElement>(".s3"));
    let stpIo: IntersectionObserver | null = null;
    if (reduced) {
      steps.forEach((s) => s.classList.add("on"));
      stpEl.style.setProperty("--p", "1");
    } else {
      stpIo = new IntersectionObserver(
        ([entry], observer) => {
          if (entry.isIntersecting) {
            steps.forEach((s, i) => {
              const t = setTimeout(() => s.classList.add("on"), i * 650);
              stepTimers.push(t);
            });
            stpEl.style.setProperty("--p", "1");
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      stpIo.observe(stpEl);
    }

    return () => {
      alive = false;
      window.removeEventListener("resize", onResize);
      btn.removeEventListener("click", onToggle);
      srcIo?.disconnect();
      if (s2DelayTimer) clearTimeout(s2DelayTimer);
      headingObservers.forEach((o) => o.disconnect());
      rowIo.disconnect();
      rows.forEach((r) => r.removeEventListener("pointerenter", onRowPointerEnter));
      stpIo?.disconnect();
      stepTimers.forEach((t) => clearTimeout(t));
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* SECTION: Work is done. Nothing is recorded in one place. */}
      <section className="wrap s2" id="s2" ref={s2Ref}>
        <div id="s2t" ref={s2tRef}>
          <h2>
            {SCATTERED_SECTION_COPY.headingBefore}
            <mark>{SCATTERED_SECTION_COPY.headingMark}</mark>
          </h2>
          <p>{SCATTERED_SECTION_COPY.body}</p>
          <button className="tgl" id="tgl" type="button">
            <span>{SCATTERED_SECTION_COPY.ctaRecorded}</span> →
          </button>
        </div>

        <div className="src" id="src" ref={srcRef}>
          <div className="cc">
            <h5>{SCATTERED_SECTION_COPY.cardTitle}</h5>
            <small>{SCATTERED_SECTION_COPY.cardSubtitle}</small>
          </div>
          {SCATTERED_SECTION_COPY.chips.map((label) => (
            <div className="chip" key={label}>
              {label}
              <span className="ck">✓</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: A factory that remembers everything. */}
      <section className="wrap wd">
        <h2>
          {MEMORY_SECTION_COPY.headingBefore}
          <mark>{MEMORY_SECTION_COPY.headingMark}</mark>
        </h2>
        <div className="rows" id="rows" ref={rowsRef}>
          {MEMORY_SECTION_COPY.rows.map((row) => (
            <div className="r2" key={row.id}>
              <h3 className="w2">{row.title}</h3>
              <p>{row.description}</p>
              {MEMORY_SVGS[row.id]}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Not another HR tool. A system built around your factory. */}
      <section className="wrap vs">
        <h2>
          {COMPARISON_SECTION_COPY.headingBefore}
          <mark>{COMPARISON_SECTION_COPY.headingMark}</mark>
        </h2>
        <div className="vsg">
          <div className="vl">
            <h3>{COMPARISON_SECTION_COPY.offTheShelf.heading}</h3>
            <ul>
              {COMPARISON_SECTION_COPY.offTheShelf.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="vr">
            <h3>{COMPARISON_SECTION_COPY.kairologic.heading}</h3>
            <ul>
              {COMPARISON_SECTION_COPY.kairologic.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="sub">{COMPARISON_SECTION_COPY.industriesLabel}</p>
        <div className="chips" style={{ marginTop: "12px" }}>
          {COMPARISON_SECTION_COPY.industries.map((industry) => (
            <span key={industry}>{industry}</span>
          ))}
        </div>
      </section>

      {/* SECTION: Built around your process. */}
      <div id="how" />
      <section className="wrap hw" id="hw">
        <h2>{PROCESS_SECTION_COPY.heading}</h2>
        <p className="sub">{PROCESS_SECTION_COPY.sub}</p>
        <div className="stp" id="stp" ref={stpRef}>
          {PROCESS_SECTION_COPY.steps.map((step) => (
            <div className="s3" key={step.id}>
              <i className="nd" />
              {PROCESS_SVGS[step.id]}
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
          {MANUFACTURING_FAQS.map((item) => (
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
            <h2>{CLOSING_SECTION_COPY.heading}</h2>
            <p>{CLOSING_SECTION_COPY.body}</p>
            <div className="btns" style={{ marginTop: 0 }}>
              <Link className="btn" href="/contact">
                {CLOSING_SECTION_COPY.primaryCta}
              </Link>
              <Link className="lnk" href="/contact">
                {CLOSING_SECTION_COPY.secondaryCta}
              </Link>
            </div>
          </div>
          <div />
        </div>
      </section>
    </div>
  );
}
