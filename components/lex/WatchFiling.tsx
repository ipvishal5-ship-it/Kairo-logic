"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const userInteractedRef = useRef(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Check mobile screen size
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Desktop scroll listener throttled by requestAnimationFrame
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) {
      setActiveStep(6);
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      if (window.innerWidth <= 900) {
        // On mobile, scroll listener only updates activeStep if user has NOT manually interacted
        if (userInteractedRef.current || isPlaying) return;
        const track = trackRef.current;
        if (!track) return;
        const r = track.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.6 && r.bottom >= window.innerHeight * 0.2) {
          const progress = Math.max(0, Math.min(0.999, (window.innerHeight * 0.6 - r.top) / (r.height * 0.8)));
          const s = Math.floor(progress * 7);
          setActiveStep(s);
        }
        return;
      }

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

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isPlaying]);

  // Mobile Auto-play feature
  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    setIsPlaying(true);
    autoPlayTimerRef.current = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 6) {
          stopAutoPlay();
          return 6;
        }
        return prev + 1;
      });
    }, 1400);
  }, [stopAutoPlay]);

  const handleStepClick = (index: number) => {
    userInteractedRef.current = true;
    stopAutoPlay();
    setActiveStep(index);
  };

  const handleNext = () => {
    userInteractedRef.current = true;
    stopAutoPlay();
    setActiveStep((prev) => Math.min(6, prev + 1));
  };

  const handlePrev = () => {
    userInteractedRef.current = true;
    stopAutoPlay();
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, []);

  // Cumulative class names for the document (v0..v[activeStep])
  const docClasses = ["dc2"];
  for (let i = 0; i <= activeStep; i++) {
    docClasses.push(`v${i}`);
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
          {/* Left Column: Step List */}
          <div className="wt-steps-col">
            {/* Mobile Top Stepper Control Bar */}
            {isMobile && (
              <div className="m-stepper-bar">
                <div className="m-pills-wrap">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.title}
                      type="button"
                      className={`m-step-pill${i === activeStep ? " a" : i < activeStep ? " d" : ""}`}
                      onClick={() => handleStepClick(i)}
                      aria-label={`Step ${i + 1}: ${s.title}`}
                    >
                      <span className="m-num">0{i + 1}</span>
                      <span className="m-name">{s.title}</span>
                    </button>
                  ))}
                </div>

                <div className="m-step-actions">
                  <button
                    type="button"
                    className="m-btn-nav"
                    onClick={handlePrev}
                    disabled={activeStep === 0}
                    aria-label="Previous step"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    className={`m-btn-play${isPlaying ? " playing" : ""}`}
                    onClick={isPlaying ? stopAutoPlay : startAutoPlay}
                  >
                    {isPlaying ? "Pause ⏸" : "Auto-Play ▶"}
                  </button>
                  <button
                    type="button"
                    className="m-btn-nav"
                    onClick={handleNext}
                    disabled={activeStep === 6}
                    aria-label="Next step"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            <ol className="wl" id="n-wl">
              {STEPS.map((s, i) => {
                const isCurrent = i === activeStep;
                const isPast = i < activeStep;
                const liClass = isCurrent ? "a" : isPast ? "d" : "";

                return (
                  <li
                    key={s.title}
                    className={liClass}
                    onClick={() => handleStepClick(i)}
                    style={{ cursor: "pointer" }}
                  >
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right Column: Document Visualizer */}
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
