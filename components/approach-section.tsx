"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ApproachSection() {
  const apRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ap = apRef.current;
    if (!ap) return;

    const ss = Array.from(ap.querySelectorAll<HTMLElement>(".s4"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const set = (p: number) => {
      ap.style.setProperty("--p", String(p));
      ss.forEach((x, i) => x.classList.toggle("on", p >= i / 4 + 0.02));
    };

    if (reduced) {
      set(1);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: ap,
      start: "top 72%",
      end: "bottom 58%",
      onUpdate: (self) => set(self.progress),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section className="apr">
      <div className="wrap">
        <div className="aph">
          <div>
            <span className="tg">Our approach</span>
            <h2>Start with the work.</h2>
          </div>
          <p>
            Useful technology starts with an understanding of the people and process behind it.
          </p>
        </div>
        <div className="ap" id="ap" ref={apRef}>
          <div className="s4">
            <i className="nd" />
            <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
              <g fill="none" stroke="var(--ink)" strokeWidth={2} strokeDasharray="4 3">
                <rect x={6} y={14} width={22} height={16} transform="rotate(-8 17 22)" />
                <rect x={32} y={8} width={22} height={16} transform="rotate(6 43 16)" />
                <rect x={12} y={46} width={22} height={16} transform="rotate(5 23 54)" />
              </g>
              <g className="mg" fill="none" stroke="var(--teal)" strokeWidth={4} strokeLinecap="round">
                <circle cx={52} cy={46} r={13} />
                <path d="M62 56l10 10" />
              </g>
            </svg>
            <span className="n">01</span>
            <h3>Understand the process</h3>
            <p>
              Start with the <mark>real information, handoffs</mark>, and daily tasks your team manages.
            </p>
          </div>

          <div className="s4">
            <i className="nd" />
            <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
              <g className="bd" fill="var(--ink)">
                <path d="M8 10h17v18H8z" />
                <path d="M8 31h17v18H8z" />
                <path d="M8 52h17v18H8z" />
              </g>
              <path className="n2" fill="var(--teal)" d="M27 33h14v14H27z" />
            </svg>
            <span className="n">02</span>
            <h3>Configure the system</h3>
            <p>
              Shape records, templates, workflows, and access permissions <mark>around those exact needs</mark>.
            </p>
          </div>

          <div className="s4">
            <i className="nd" />
            <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
              <circle className="c3" cx={40} cy={40} r={28} fill="none" stroke="var(--ink)" strokeWidth={4} pathLength={1} />
              <path
                className="k3"
                d="M27 41l9 9 18-20"
                fill="none"
                stroke="var(--teal)"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
              />
            </svg>
            <span className="n">03</span>
            <h3>Validate with your team</h3>
            <p>
              Review the working setup together with <mark>live data</mark> to verify every step works smoothly.
            </p>
          </div>

          <div className="s4">
            <i className="nd" />
            <svg className="ic" viewBox="0 0 80 80" aria-hidden="true">
              <path fill="var(--ink)" d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8z" />
              <g className="ar">
                <path fill="var(--ink)" d="M28 34 51 10h19L43 40z" />
                <path fill="var(--ink)" d="M28 46l15-6 27 30H51z" />
              </g>
              <path fill="var(--teal)" d="M27 33h14v14H27z" />
            </svg>
            <span className="n">04</span>
            <h3>Prepare the handover</h3>
            <p>
              Make day-to-day operations <mark>clear and effortless</mark> for the people responsible for the work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

