"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    title: "Merge",
    desc: "PDFs, scans and photos combined into one filing.",
  },
  {
    title: "Cover Page",
    desc: "An index table with the count, name and list of every document is added.",
  },
  {
    title: "Smart Text",
    desc: "Scanned pages become searchable. Typed pages are left untouched.",
  },
  {
    title: "Compress",
    desc: "Reduced to the size the portal accepts.",
  },
  {
    title: "Pagination",
    desc: "“Page X of Y” printed on every page, exactly where the court expects it.",
  },
  {
    title: "Seal",
    desc: "The bank’s official seal applied to every page.",
  },
  {
    title: "Split",
    desc: "Divided into portal-ready parts that never cut a document mid-way.",
  },
] as const;

export default function WatchFiling() {
  const headRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  // In-view mark animation on header
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

  // Scroll listener throttled by requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth <= 900;

      if (isMobile || rm) {
        setIsMobileOrReduced(true);
        setActiveStep(6);
        return;
      }

      setIsMobileOrReduced(false);
      const track = trackRef.current;
      if (!track) return;

      const r = track.getBoundingClientRect();
      const h = track.offsetHeight - window.innerHeight + 72;
      if (h <= 0) return;

      const p = Math.max(0, Math.min(0.999, -r.top / h));
      const step = Math.floor(p * 7);
      setActiveStep(step);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  // Cumulative class names for the document
  const docClasses = ["dc2"];
  if (isMobileOrReduced) {
    // Show v0..v5 only (not v6) so page is not faded
    for (let i = 0; i < 6; i++) {
      docClasses.push(`v${i}`);
    }
  } else {
    for (let i = 0; i <= activeStep; i++) {
      docClasses.push(`v${i}`);
    }
  }

  return (
    <>
      <section className="wh" id="n-watch">
        <div className="kw" data-in ref={headRef}>
          <h2 className="kt">
            <mark>Watch a filing</mark> prepare itself.
          </h2>
          <p className="kc">
            The real sequence Kairologic Lex runs: the same steps your team does
            by hand today, fully automated.
          </p>
        </div>
      </section>

      <section className="wt" id="n-wt" ref={trackRef}>
        <div className="kw ws">
          <div>
            <ol className="wl" id="n-wl">
              {STEPS.map((s, i) => {
                const isCurrent = isMobileOrReduced || i === activeStep;
                const isPast = !isMobileOrReduced && i < activeStep;
                const liClass = isCurrent ? "a" : isPast ? "d" : "";

                return (
                  <li key={s.title} className={liClass}>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="wv" aria-hidden="true">
            <div className={docClasses.join(" ")} id="n-dc">
              <div className="sh a" />
              <div className="sh b" />
              <div className="sh c">
                <div className="cvx" />
                <div className="scn" />
                <div className="txl">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="pgx">Page X of Y</div>
                <div className="stp" />
              </div>
            </div>

            <div className="szb">
              <b />
              <u />
              <em>Portal limit</em>
            </div>

            <div className="prt">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
