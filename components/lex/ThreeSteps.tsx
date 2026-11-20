"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "Drop the documents",
    desc: "Put the case folder’s PDFs and scans into the input folder.",
  },
  {
    num: "02",
    title: "Click RUN",
    desc: "One button. Every step lights up green as it finishes.",
  },
  {
    num: "03",
    title: "Upload with confidence",
    desc: "Portal-ready parts land in the output folder, with a written report.",
  },
] as const;

export default function ThreeSteps() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState(0);

  // In-view observer for headline mark
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

  // Scroll listener for progress q
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) {
      setQ(1);
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const track = trackRef.current;
      if (!track) return;
      const r = track.getBoundingClientRect();
      const nextQ = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight * 0.75 - r.top) /
            (r.height + window.innerHeight * 0.1)
        )
      );
      setQ(nextQ);
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

  return (
    <section className="th3">
      <div className="kw">
        <h2 className="kt" data-in ref={headRef}>
          Three steps. Then it is <mark>just a habit.</mark>
        </h2>

        <div
          className="l3"
          id="n-l3"
          ref={trackRef}
          style={{ "--q": q } as React.CSSProperties}
        >
          <div className="r3">
            <b />
          </div>
          <div className="n3" />
          <div className="g3">
            {STEPS.map((s, i) => {
              const isOn = q >= i / 3 - 0.02;
              return (
                <div key={s.num} className={`c3${isOn ? " on" : ""}`}>
                  <em>{s.num}</em>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
