"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const HERO_DECOYS: readonly [number, number, number, number][] = [
  [-30, -14, 12, 10],
  [-22, 40, 8, 14],
  [96, 6, 14, 10],
  [102, 54, 10, 12],
  [74, 84, 12, 10],
  [-8, 92, 16, 8],
  [30, -24, 9, 9],
  [88, -18, 11, 9],
];

const HERO_PIECES: readonly {
  offset: [number, number, number];
  fill: string;
  d: string;
}[] = [
  { offset: [-60, -30, -12], fill: "#102A43", d: "M8 10h17v18H8z" },
  { offset: [-46, 34, 10], fill: "#102A43", d: "M8 31h17v18H8z" },
  { offset: [-52, 60, -8], fill: "#102A43", d: "M8 52h17v18H8z" },
  {
    offset: [48, -34, 14],
    fill: "#102A43",
    d: "M28 34 51 10h19L43 40z",
  },
  {
    offset: [58, 48, -12],
    fill: "#102A43",
    d: "M28 46l15-6 27 30H51z",
  },
  { offset: [10, -44, 0], fill: "#16876D", d: "M27 33h14v14H27z" },
];

const PROBLEMS = [
  "Records scattered everywhere",
  "Slow, repetitive manual work",
  "Deadlines slipping quietly",
  "No live visibility",
] as const;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function ProblemDiagram({ index, fixed }: { index: number; fixed: boolean }) {
  const cls = `pn p${index + 1}${fixed ? " fix" : ""}`;

  if (index === 0) {
    return (
      <div className={cls}>
        <svg viewBox="0 0 200 150">
          <rect className="k a" x={60} y={26} width={80} height={26} />
          <rect className="k b" x={60} y={62} width={80} height={26} />
          <rect className="k c" x={60} y={98} width={80} height={26} />
        </svg>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className={cls}>
        <svg viewBox="0 0 200 150">
          <rect className="k d1" x={60} y={40} width={80} height={60} />
          <rect className="k d2" x={60} y={40} width={80} height={60} />
          <rect className="k d3" x={60} y={40} width={80} height={60} />
          <rect className="k d4" x={60} y={40} width={80} height={60} />
          <path className="ck" d="M84 72l12 12 22-24" />
        </svg>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className={cls}>
        <svg viewBox="0 0 200 150">
          <path
            d="M20 75h160"
            stroke="rgba(16,42,67,.16)"
            strokeWidth={2}
          />
          <path className="dl" d="M130 25v100" />
          <rect className="bk" x={24} y={58} width={50} height={34} />
        </svg>
      </div>
    );
  }

  return (
    <div className={cls}>
      <svg viewBox="0 0 200 150">
        <rect className="bn" x={40} y={30} width={100} height={22} />
        <rect className="bn" x={40} y={64} width={100} height={22} />
        <rect className="bn" x={40} y={98} width={100} height={22} />
        <circle className="dt" cx={164} cy={41} r={7} />
        <circle className="dt" cx={164} cy={75} r={7} />
        <circle className="dt" cx={164} cy={109} r={7} />
      </svg>
    </div>
  );
}

/**
 * Part 1 of /need-a-solution: scroll-assembled Hero + interactive Four Problems section.
 */
export default function NeedSolutionPart1() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const hvRef = useRef<HTMLDivElement>(null);
  const h1wRef = useRef<HTMLDivElement>(null);
  const prHeadingRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<(SVGPathElement | null)[]>([]);
  const decoyRefs = useRef<(SVGRectElement | null)[]>([]);
  const mpRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [pinned, setPinned] = useState<boolean[]>([false, false, false, false]);
  const [hovered, setHovered] = useState<boolean[]>([false, false, false, false]);
  const [mobileInView, setMobileInView] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const tr = trackRef.current;
    const hv = hvRef.current;
    const h1w = h1wRef.current;
    const prHeading = prHeadingRef.current;
    if (!tr || !hv || !h1w || !prHeading) return;

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(max-width: 760px)");

    // In-view highlight sweeps for <mark>
    const markTargets = [h1w, prHeading];
    const markIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            markIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    markTargets.forEach((el) => markIo.observe(el));

    const heroTimer = setTimeout(() => {
      h1w.classList.add("in");
    }, 300);

    // Hero SVG piece/decoy scroll assembly
    const draw = (p: number) => {
      const e = easeOutCubic(p);
      const k = 1 - e;

      HERO_PIECES.forEach((piece, i) => {
        const el = pieceRefs.current[i];
        if (!el) return;
        const [dx, dy, dr] = piece.offset;
        el.style.transform = `translate(${dx * k}px, ${dy * k}px) rotate(${dr * k}deg)`;
      });

      HERO_DECOYS.forEach(([x, y], i) => {
        const el = decoyRefs.current[i];
        if (!el) return;
        const cx = 36 - x;
        const cy = 40 - y;
        el.style.transform = `translate(${cx * e * 0.6}px, ${cy * e * 0.6}px) scale(${1 - e})`;
        el.style.opacity = String(0.35 * (1 - e));
      });
    };

    if (rm) {
      draw(1);
    } else {
      draw(0);
    }

    let rafId = 0;
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (rm) return;

        if (window.innerWidth > 900) {
          const h = tr.offsetHeight - window.innerHeight;
          const y = -tr.getBoundingClientRect().top;
          const progress = h > 0 ? Math.max(0, Math.min(1, y / (h * 0.8))) : 1;
          draw(progress);
        } else {
          const hr = hv.getBoundingClientRect();
          const progress = Math.max(
            0,
            Math.min(
              1,
              (window.innerHeight * 0.85 - hr.top) / (window.innerHeight * 0.5)
            )
          );
          draw(progress);
        }
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    onScrollOrResize();

    // Mobile inline problem diagram scroll trigger (<= 760px)
    let pio: IntersectionObserver | null = null;
    if (!rm) {
      pio = new IntersectionObserver(
        (entries) => {
          if (!mq.matches) return;
          setMobileInView((prev) => {
            const next = [...prev];
            let changed = false;
            entries.forEach((entry) => {
              const idxAttr = (entry.target as HTMLElement).dataset.i;
              if (idxAttr === undefined) return;
              const idx = Number(idxAttr);
              if (entry.isIntersecting && !next[idx]) {
                next[idx] = true;
                changed = true;
              } else if (
                !entry.isIntersecting &&
                entry.boundingClientRect.top > window.innerHeight / 2 &&
                next[idx]
              ) {
                next[idx] = false;
                changed = true;
              }
            });
            return changed ? next : prev;
          });
        },
        { rootMargin: "-30% 0px -30% 0px" }
      );
      mpRefs.current.forEach((el) => {
        if (el) pio?.observe(el);
      });
    }

    return () => {
      clearTimeout(heroTimer);
      markIo.disconnect();
      pio?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const isMobileViewport = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 760px)").matches;

  const handleRowEnterOrFocus = (index: number) => {
    if (isMobileViewport()) return;
    setHovered((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const handleRowLeaveOrBlur = (index: number) => {
    if (isMobileViewport()) return;
    setHovered((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  const handleRowClick = (index: number) => {
    if (isMobileViewport()) {
      const currentlyFixed = pinned[index] || mobileInView[index];
      setPinned((prev) => {
        const next = [...prev];
        next[index] = !currentlyFixed;
        return next;
      });
      if (currentlyFixed) {
        setMobileInView((prev) => {
          const next = [...prev];
          next[index] = false;
          return next;
        });
      }
      return;
    }

    const willPin = !pinned[index];
    setPinned((prev) => {
      const next = [...prev];
      next[index] = willPin;
      return next;
    });
    if (!willPin) {
      setHovered((prev) => {
        if (!prev[index]) return prev;
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
  };

  return (
    <div ref={rootRef}>
      {/* A) HERO */}
      <section className="track hero" id="top" ref={trackRef}>
        <div className="wrap sticky" style={{ maxWidth: "none" }}>
          <div id="h1w" ref={h1wRef}>
            <h1>
              Need a <span style={{ color: "var(--green)" }}>solution?</span>
            </h1>
            <p className="cap">
              Every organisation we work with started with the same sentence:{" "}
              “there must be <mark>a better way</mark> to do this.”
            </p>
            <p className="small">
              Scattered records, manual chasing, missed deadlines, no live view.
              We build and configure systems that remove exactly that.
            </p>
            <div className="btns">
              <Link className="btn" href="/contact">
                Describe your problem →
              </Link>
              <a className="lnk" href="#platforms">
                Or browse our platforms
              </a>
            </div>
          </div>

          <div className="hv" aria-hidden="true" ref={hvRef}>
            <svg viewBox="-40 -30 160 140" id="hs">
              <g id="dc">
                {HERO_DECOYS.map(([x, y, w, h], idx) => (
                  <rect
                    key={idx}
                    ref={(el) => {
                      decoyRefs.current[idx] = el;
                    }}
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    fill="#102A43"
                    opacity={0.35}
                    className="pc"
                  />
                ))}
              </g>
              {HERO_PIECES.map((piece, idx) => (
                <path
                  key={idx}
                  ref={(el) => {
                    pieceRefs.current[idx] = el;
                  }}
                  className="pc"
                  data-d={piece.offset.join(",")}
                  fill={piece.fill}
                  d={piece.d}
                />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* B) FOUR PROBLEMS */}
      <section className="pr">
        <div className="wrap">
          <div className="rv" data-in ref={prHeadingRef}>
            <h2>
              Four problems <mark>we exist to solve.</mark>
            </h2>
            <p className="cap" style={{ marginTop: "22px" }}>
              Sound familiar?
            </p>
          </div>

          <div className="pg">
            <ul className="pl">
              {PROBLEMS.map((title, idx) => {
                const isFixed = pinned[idx] || hovered[idx] || mobileInView[idx];
                return (
                  <li key={title}>
                    <button
                      type="button"
                      className={`pb${isFixed ? " on" : ""}`}
                      data-i={idx}
                      aria-pressed={pinned[idx]}
                      onMouseEnter={() => handleRowEnterOrFocus(idx)}
                      onFocus={() => handleRowEnterOrFocus(idx)}
                      onMouseLeave={() => handleRowLeaveOrBlur(idx)}
                      onBlur={() => handleRowLeaveOrBlur(idx)}
                      onClick={() => handleRowClick(idx)}
                    >
                      {title}
                      <i>See it fixed</i>
                    </button>
                    <div
                      className="mp"
                      aria-hidden="true"
                      data-i={idx}
                      ref={(el) => {
                        mpRefs.current[idx] = el;
                      }}
                    >
                      <ProblemDiagram index={idx} fixed={isFixed} />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="fr" aria-hidden="true">
              <div className="g">
                {PROBLEMS.map((title, idx) => {
                  const isFixed = pinned[idx] || hovered[idx];
                  return (
                    <ProblemDiagram key={title} index={idx} fixed={isFixed} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
