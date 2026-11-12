"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { OPS_FAQS } from "@/lib/ops-lex-faqs";

const CHIP_ITEMS = [
  "Spreadsheets",
  "Email threads",
  "Shared folders",
  "Phone updates",
  "Property photos",
  "Status meetings",
];

const SC = [
  [0.03, 0.08, -6],
  [0.5, 0.03, 5],
  [0.28, 0.3, -3],
  [0.58, 0.47, 7],
  [0.04, 0.64, 4],
  [0.36, 0.84, -5],
];

export function OpsSections() {
  const s2Ref = useRef<HTMLElement>(null);
  const srcRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const stpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const srcEl = srcRef.current;
    const s2El = s2Ref.current;
    if (!srcEl || !s2El) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chips = Array.from(srcEl.querySelectorAll<HTMLElement>(".chip"));
    const card = srcEl.querySelector<HTMLElement>(".cc");
    const btn = s2El.querySelector<HTMLButtonElement>("#tgl");
    const lab = btn?.querySelector<HTMLElement>("span");
    const h = s2El.querySelector<HTMLElement>("#s2t");

    if (!card || !btn || !lab || !h) return;

    let conn = false;
    let W = 0;
    let H = 0;
    const nat: number[] = [];
    let cx = 0;
    let cy = 0;
    let cw = 0;
    let ch = 0;

    const geo = () => {
      W = srcEl.clientWidth;
      H = srcEl.clientHeight;
      cx = W * 0.1;
      cy = H * 0.04;
      cw = W * 0.8;
      ch = H * 0.92;
      Object.assign(card.style, {
        left: cx + "px",
        top: cy + "px",
        width: cw + "px",
        height: ch + "px",
      });
    };

    const T = (i: number, c: boolean) => {
      if (c) {
        const g = (ch - 64 - 52) / 6;
        return {
          x: cx + cw * 0.055,
          y: cy + 64 + i * g + (g - 44) / 2,
          rotation: 0,
          width: cw * 0.89,
        };
      }
      return {
        x: SC[i][0] * (W - (nat[i] || 120)),
        y: SC[i][1] * (H - 44),
        rotation: SC[i][2],
        width: nat[i] || 120,
      };
    };

    const col = (c: boolean) =>
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

    const put = (c: boolean) => {
      gsap.set(chips, {
        x: (i) => T(i, c).x,
        y: (i) => T(i, c).y,
        rotation: (i) => T(i, c).rotation,
        width: (i) => T(i, c).width,
        ...col(c),
      });
      gsap.set(card, { opacity: c ? 1 : 0 });
      gsap.set(srcEl.querySelectorAll(".ck"), { opacity: c ? 1 : 0 });
      lab.textContent = c ? "See the scattered view" : "See the connected view";
    };

    const go = (c: boolean) => {
      conn = c;
      lab.textContent = c ? "See the scattered view" : "See the connected view";
      if (reduced) {
        put(c);
        return;
      }
      gsap.to(chips, {
        x: (i) => T(i, c).x,
        y: (i) => T(i, c).y,
        rotation: (i) => T(i, c).rotation,
        width: (i) => T(i, c).width,
        ...col(c),
        duration: 0.95,
        stagger: 0.07,
        ease: "power3.inOut",
        overwrite: true,
      });
      gsap.to(card, { opacity: c ? 1 : 0, duration: 0.6, delay: c ? 0.2 : 0 });
      gsap.to(srcEl.querySelectorAll(".ck"), {
        opacity: c ? 1 : 0,
        duration: 0.3,
        stagger: 0.07,
        delay: c ? 0.8 : 0,
      });
    };

    const onResize = () => {
      geo();
      put(conn);
    };

    const init = () => {
      chips.forEach((c) => nat.push(c.offsetWidth));
      geo();
      if (reduced) {
        put(true);
        h.classList.add("in");
      } else {
        put(false);
        const io = new IntersectionObserver(
          ([e], o) => {
            if (e.isIntersecting) {
              h.classList.add("in");
              setTimeout(() => go(true), 700);
              o.disconnect();
            }
          },
          { threshold: 0.55 }
        );
        io.observe(srcEl);
      }
      window.addEventListener("resize", onResize);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(init);
    } else {
      init();
    }

    const onBtnClick = () => go(!conn);
    btn.addEventListener("click", onBtnClick);

    // Section 3 Row Observers
    const rowsEl = rowsRef.current;
    let rowIo: IntersectionObserver | null = null;
    if (rowsEl) {
      const rs = Array.from(rowsEl.querySelectorAll<HTMLElement>(".r2"));
      rowIo = new IntersectionObserver(
        (es) => es.forEach((e) => e.target.classList.toggle("on", e.isIntersecting)),
        { rootMargin: "-38% 0px -38% 0px" }
      );
      rs.forEach((r) => {
        rowIo?.observe(r);
        r.addEventListener("pointerenter", () => r.classList.add("on"));
      });
    }

    // Section 4 Step Observer
    const stpEl = stpRef.current;
    let stpIo: IntersectionObserver | null = null;
    if (stpEl) {
      const ss = Array.from(stpEl.querySelectorAll<HTMLElement>(".s3"));
      const triggerSteps = () => {
        ss.forEach((s, i) => setTimeout(() => s.classList.add("on"), i * 650));
        stpEl.style.setProperty("--p", "1");
      };

      if (reduced) {
        ss.forEach((s) => s.classList.add("on"));
        stpEl.style.setProperty("--p", "1");
      } else {
        stpIo = new IntersectionObserver(
          ([e], o) => {
            if (e.isIntersecting) {
              triggerSteps();
              o.disconnect();
            }
          },
          { threshold: 0.4 }
        );
        stpIo.observe(stpEl);
      }
    }

    return () => {
      btn.removeEventListener("click", onBtnClick);
      window.removeEventListener("resize", onResize);
      rowIo?.disconnect();
      stpIo?.disconnect();
    };
  }, []);

  return (
    <>
      {/* SECTION 2: Why chase six sources? */}
      <section className="wrap s2" id="s2" ref={s2Ref}>
        <div id="s2t">
          <h2>
            The case is one. <mark>Why chase six sources?</mark>
          </h2>
          <p>
            Bring the data, documents and people together. Open a case and see
            the whole picture.
          </p>
          <button className="tgl" id="tgl">
            <span>See the scattered view</span> →
          </button>
        </div>

        <div className="src" id="src" ref={srcRef}>
          <div className="cc">
            <h5>One case. One record.</h5>
            <small>Every update leads back to the same case.</small>
          </div>
          {CHIP_ITEMS.map((item) => (
            <div key={item} className="chip">
              {item}
              <span className="ck">✓</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Connected details. Less repeated work. */}
      <section className="wrap wd">
        <h2>Connected details. Less repeated work.</h2>
        <div className="rows" id="rows" ref={rowsRef}>
          {/* Row 1: Connect */}
          <div className="r2">
            <div className="w2">Connect</div>
            <p>Data, documents and field evidence converge into one record.</p>
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
          </div>

          {/* Row 2: Prepare */}
          <div className="r2">
            <div className="w2">Prepare</div>
            <p>
              Case information feeds a document template and keeps the next
              action in view.
            </p>
            <svg viewBox="0 0 80 80" aria-hidden="true">
              <rect x="16" y="6" width="48" height="68" fill="#102A43" />
              <rect className="fl2" x="24" y="20" width="30" height="7" fill="#16876D" />
              <rect className="fl2" x="24" y="34" width="32" height="7" fill="#7FE0C3" />
              <rect className="fl2" x="24" y="48" width="20" height="7" fill="#16876D" />
            </svg>
          </div>

          {/* Row 3: See */}
          <div className="r2">
            <div className="w2">See</div>
            <p>See where cases stand and where attention is needed.</p>
            <svg viewBox="0 0 80 80" aria-hidden="true">
              <g fill="#102A43">
                <rect className="b3" x="8" y="42" width="14" height="32" />
                <rect className="b3" x="26" y="28" width="14" height="46" />
                <rect className="b3" x="44" y="36" width="14" height="38" />
              </g>
              <rect className="b3" x="62" y="10" width="12" height="64" fill="#16876D" />
            </svg>
          </div>

          {/* Row 4: Control */}
          <div className="r2">
            <div className="w2">Control</div>
            <p>Permissions aligned to each team’s role.</p>
            <svg viewBox="0 0 80 80" aria-hidden="true">
              <rect x="20" y="36" width="40" height="34" fill="#102A43" />
              <circle cx="40" cy="52" r="5" fill="#7FE0C3" />
              <path
                className="lk"
                d="M29 36V28a11 11 0 0 1 22 0v8"
                fill="none"
                stroke="#16876D"
                strokeWidth="6"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* SECTION 4: Built around your process. */}
      <section className="wrap hw" id="hw">
        <h2>Built around your process.</h2>
        <p className="sub">
          We configure the records, templates and workflows. Then test the setup
          with your team and make the handover clear.
        </p>
        <div className="stp" id="stp" ref={stpRef}>
          {/* Step 1: Understand */}
          <div className="s3">
            <i className="nd" />
            <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
              <g fill="none" stroke="#102A43" strokeWidth="2" strokeDasharray="4 3">
                <rect x="6" y="14" width="22" height="16" transform="rotate(-8 17 22)" />
                <rect x="32" y="8" width="22" height="16" transform="rotate(6 43 16)" />
                <rect x="12" y="46" width="22" height="16" transform="rotate(5 23 54)" />
              </g>
              <g className="mg" fill="none" stroke="#16876D" strokeWidth="4" strokeLinecap="round">
                <circle cx="52" cy="46" r="13" />
                <path d="M62 56l10 10" />
              </g>
            </svg>
            <h3>Understand</h3>
            <span>Process mapping</span>
          </div>

          {/* Step 2: Configure */}
          <div className="s3">
            <i className="nd" />
            <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
              <g className="bn" fill="#102A43">
                <path d="M8 10h17v18H8z" />
                <path d="M8 31h17v18H8z" />
                <path d="M8 52h17v18H8z" />
              </g>
              <path className="nd2" fill="#16876D" d="M27 33h14v14H27z" />
            </svg>
            <h3>Configure</h3>
            <span>System setup</span>
          </div>

          {/* Step 3: Handover */}
          <div className="s3">
            <i className="nd" />
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
            <h3>Handover</h3>
            <span>Team handover</span>
          </div>
        </div>
      </section>

      {/* SECTION 5: Questions, answered. */}
      <section className="wrap fq" id="faq">
        <h2>Questions, answered.</h2>
        <div className="fql">
          {OPS_FAQS.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* SECTION 6: Closing band */}
      <section className="cl">
        <div className="wrap">
          <div>
            <h2>What should work better?</h2>
            <p>
              Tell us about the work your team manages and where you want to
              improve it.
            </p>
            <div className="btns">
              <Link className="btn" href="/contact">
                Tell us about your project
              </Link>
              <a className="lnk" href="#faq">
                Browse FAQs
              </a>
            </div>
          </div>
          <div />
        </div>
      </section>
    </>
  );
}

export default OpsSections;

