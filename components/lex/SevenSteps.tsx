"use client";

import { useState, useRef, useEffect } from "react";

export default function SevenSteps() {
  const [mode, setMode] = useState<0 | 1>(0);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="ss" id="n-seven">
      <div className="kw">
        <div data-in ref={headRef}>
          <h2 className="kt">
            <mark>Seven careful steps.</mark> Every single filing.
          </h2>
          <p className="kc">
            The routine every legal team knows: over an hour per case, and every
            step is a chance for a mistake.
          </p>
        </div>

        <div className="sw" role="group" aria-label="Compare">
          <button
            type="button"
            className={`sb${mode === 0 ? " a" : ""}`}
            data-m="0"
            aria-pressed={mode === 0}
            onClick={() => setMode(0)}
          >
            The manual routine
          </button>
          <button
            type="button"
            className={`sb${mode === 1 ? " a" : ""}`}
            data-m="1"
            aria-pressed={mode === 1}
            onClick={() => setMode(1)}
          >
            With Kairologic Lex
          </button>
        </div>

        <div className="sx" id="n-sx" data-m={mode}>
          <div className="lst">
            <ol className="s7">
              <li>
                <i>01</i>Merge every document into one PDF
              </li>
              <li>
                <i>02</i>Compress it so the portal accepts it
              </li>
              <li>
                <i>03</i>Convert scans to searchable text
              </li>
              <li>
                <i>04</i>Compress again
              </li>
              <li>
                <i>05</i>Paginate every page by hand
              </li>
              <li>
                <i>06</i>Place the bank seal on the pages
              </li>
              <li>
                <i>07</i>Split into portal-sized parts
              </li>
            </ol>
            <div className="rnc" aria-hidden="true">
              <span>RUN</span>
            </div>
          </div>

          <div className="mt" aria-live="polite">
            <div className="g0">
              <div className="m">
                <b>60+</b>
                <span>min per case</span>
              </div>
              <div className="m">
                <b>7</b>
                <span>chances for a manual mistake</span>
              </div>
            </div>
            <div className="g1">
              <div className="m">
                <b>0</b>
                <span>min per case, every time</span>
              </div>
              <div className="m">
                <b>1</b>
                <span>click</span>
              </div>
              <div className="m">
                <b>Hands-Free</b>
                <span>unattended background run</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
