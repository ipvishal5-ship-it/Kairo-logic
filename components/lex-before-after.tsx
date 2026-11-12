"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MANUAL_STEPS = [
  "Merge every document into one PDF",
  "Compress it so the portal accepts it",
  "Convert scans to searchable text",
  "Compress again",
  "Paginate every page by hand",
  "Place the bank seal on the pages",
  "Split into portal-sized parts",
];

export default function LexBeforeAfter() {
  const secRef = useRef<HTMLElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const s0Ref = useRef<HTMLDivElement>(null);
  const mnRef = useRef<HTMLElement>(null);
  const animCtxRef = useRef<gsap.Context | null>(null);

  const [tab, setTab] = useState<number>(0);

  const runManual = useCallback(() => {
    const s0 = s0Ref.current;
    const mn = mnRef.current;
    if (!s0 || !mn) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mbs = Array.from(s0.querySelectorAll<HTMLElement>(".mb"));

    if (animCtxRef.current) {
      animCtxRef.current.revert();
    }

    if (reduced) {
      mn.textContent = "60+";
      gsap.set(mbs, { x: 0, opacity: 1 });
      return;
    }

    animCtxRef.current = gsap.context(() => {
      gsap.fromTo(
        mbs,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.18, overwrite: true }
      );
      const o = { v: 0 };
      gsap.to(o, {
        v: 60,
        duration: 1.9,
        ease: "none",
        onUpdate: () => {
          mn.textContent = Math.round(o.v) + (o.v >= 60 ? "+" : "");
        },
      });
    }, s0);
  }, []);

  const handleSelect = (i: number) => {
    setTab(i);
    if (i === 0) {
      runManual();
    }
  };

  useEffect(() => {
    const h2 = h2Ref.current;
    const s0 = s0Ref.current;
    const mn = mnRef.current;
    if (!h2 || !s0 || !mn) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      h2.classList.add("in");
      mn.textContent = "60+";
      return;
    }

    const hIo = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          h2.classList.add("in");
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    hIo.observe(h2);

    const sIo = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          runManual();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    sIo.observe(s0);

    return () => {
      hIo.disconnect();
      sIo.disconnect();
      if (animCtxRef.current) {
        animCtxRef.current.revert();
      }
    };
  }, [runManual]);

  return (
    <section className="wrap ba" id="ba" ref={secRef}>
      <div>
        <h2 ref={h2Ref}>
          <mark>Seven careful steps.</mark> Every single filing.
        </h2>
        <p>
          The routine every legal team knows: over an hour per case, and every
          step is a chance for a mistake.
        </p>
      </div>

      <div>
        <div className="seg" id="seg" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 0}
            onClick={() => handleSelect(0)}
          >
            The manual routine
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 1}
            onClick={() => handleSelect(1)}
          >
            With Kairologic Lex
          </button>
        </div>

        <div className="bas">
          <div className={`stt${tab === 0 ? " on" : ""}`} id="s0" ref={s0Ref}>
            {MANUAL_STEPS.map((label) => (
              <div className="mb" key={label}>
                <span>{label}</span>
                <i />
              </div>
            ))}
            <div className="cts">
              <div>
                <b id="mn" ref={mnRef}>
                  0
                </b>
                <span>min per case, every time</span>
              </div>
              <div>
                <b>7</b>
                <span>chances for a manual mistake</span>
              </div>
            </div>
          </div>

          <div className={`stt${tab === 1 ? " on" : ""}`} id="s1">
            <div className="big">
              <div className="sq">RUN</div>
              <div className="cts" style={{ justifyContent: "center" }}>
                <div>
                  <b>1</b>
                  <span>click</span>
                </div>
                <div>
                  <b>Hands-Free</b>
                  <span>unattended background run</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

