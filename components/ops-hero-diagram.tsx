"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BY = [100, 196, 292];
const C = [
  "Work scattered across spreadsheets, emails and folders",
  "Everything has its place.",
  "The same case. A different view.",
];

const P = [
  [28, 84],
  [96, 70],
  [62, 134],
  [132, 150],
  [26, 196],
  [94, 214],
  [130, 268],
  [44, 292],
  [100, 326],
];

const R = [-12, 8, -5, 14, 6, -9, 10, -7, 5];
const MAP = [0, 2, 1]; // 0: sheet, 2: photo, 1: bubble

export default function OpsHeroDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cap = capRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const hv = container.querySelector<SVGSVGElement>("#hv");
      if (!hv) return;

      const toks = gsap.utils.toArray<SVGGElement>(".tok", hv);
      const fb = gsap.utils.toArray<SVGRectElement>(".fb", hv);
      const cn = gsap.utils.toArray<SVGPathElement>(".cn", hv);
      const pc = gsap.utils.toArray<SVGCircleElement>(".pc", hv);
      const pg = gsap.utils.toArray<SVGGElement>(".pg", hv);
      const ok = gsap.utils.toArray<SVGGElement>(".ok", hv);
      const T = [0, 1, 2].map((i) => hv.querySelector<SVGTextElement>("#t" + i));

      // Token initial positions
      toks.forEach((g, i) => {
        gsap.set(g, { x: P[i][0], y: P[i][1], rotation: R[i] });
      });

      // Connector stroke dasharray
      const L = cn.map((p) => p.getTotalLength());
      cn.forEach((p, i) => {
        p.style.strokeDasharray = `${L[i]}`;
        p.style.strokeDashoffset = `${L[i]}`;
      });

      const say = (t: string) => {
        if (!cap) return;
        cap.style.opacity = "0";
        setTimeout(() => {
          cap.textContent = t;
          cap.style.opacity = "1";
        }, 150);
      };

      if (reduced) {
        gsap.set(toks, { opacity: 0 });
        gsap.set(fb, { attr: { width: 126 } });
        cn.forEach((p) => {
          p.style.strokeDashoffset = "0";
        });
        gsap.set(pc, { fill: "#16876D", stroke: "#16876D" });
        gsap.set(pg, { fill: "#FFFFFF" });
        gsap.set(ok, { opacity: 1 });
        gsap.set(T, { opacity: 1 });
        if (cap) cap.textContent = C[2];
        return;
      }

      const FB = { transformBox: "fill-box" as const, transformOrigin: "50% 50%" };
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      tl.call(() => say(C[0]), undefined, 0)
        .to(
          toks,
          {
            x: 206,
            y: (i: number) => BY[i % 3],
            rotation: 0,
            scale: 0.5,
            opacity: 0,
            duration: 0.9,
            stagger: 0.13,
            ease: "power2.in",
          },
          1.4
        )
        .call(() => say(C[1]), undefined, 1.8)
        .to(T[1], { opacity: 1, duration: 0.3 }, 1.8)
        .to(fb, { attr: { width: 126 }, duration: 1.8, stagger: 0.2, ease: "none" }, 2)
        .call(() => say(C[2]), undefined, 4.4)
        .to(T[2], { opacity: 1, duration: 0.3 }, 4.4)
        .to(cn, { strokeDashoffset: 0, duration: 0.6, stagger: 0.15 }, 4.4)
        .to(pc, { fill: "#16876D", stroke: "#16876D", duration: 0.3, stagger: 0.15 }, 4.8)
        .to(pg, { fill: "#FFFFFF", duration: 0.3, stagger: 0.15 }, 4.8)
        .fromTo(
          ok,
          { opacity: 0, scale: 0.4, ...FB },
          { opacity: 1, scale: 1, duration: 0.35, stagger: 0.15, ease: "back.out(2)" },
          5
        )
        .to(
          toks,
          {
            x: (i: number) => P[i][0],
            y: (i: number) => P[i][1],
            rotation: (i: number) => R[i],
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: "power2.out",
          },
          9
        )
        .to(fb, { attr: { width: 0 }, duration: 0.6 }, 9)
        .to(cn, { strokeDashoffset: (i: number) => L[i], duration: 0.5 }, 9)
        .to(pc, { fill: "#F6FAF9", stroke: "#102A43", duration: 0.4 }, 9)
        .to(pg, { fill: "#102A43", duration: 0.4 }, 9)
        .to(ok, { opacity: 0, duration: 0.3 }, 9)
        .to([T[1], T[2]], { opacity: 0.35, duration: 0.4 }, 9)
        .call(() => say(C[0]), undefined, 9.2)
        .to({}, { duration: 0.4 }, 9.8);

      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
        } else {
          tl.pause();
        }
      });
      io.observe(container);

      return () => {
        io.disconnect();
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="hv" ref={containerRef}>
      <svg
        id="hv"
        viewBox="0 0 560 380"
        role="img"
        aria-label="Scattered work flows into one structured workspace and connects the whole team"
      >
        <g fontSize={15} fontWeight={600} fill="#102A43">
          <text id="t0" x={0} y={22}>
            Scattered
          </text>
          <text id="t1" x={190} y={22} opacity={0.35}>
            Structured
          </text>
          <text id="t2" x={430} y={22} opacity={0.35}>
            Connected
          </text>
        </g>
        <rect
          x={190}
          y={44}
          width={190}
          height={300}
          fill="none"
          stroke="#102A43"
          strokeOpacity={0.35}
          strokeWidth={1.5}
        />
        <g className="bd" tabIndex={0} role="button" aria-label="Records">
          <rect x={206} y={64} width={158} height={72} fill="#102A43" rx={2} />
          <text x={222} y={106} fill="#E4F0EC" fontSize={19} fontWeight={600}>
            Records
          </text>
          <rect className="fb" x={222} y={118} width={0} height={6} fill="#7FE0C3" rx={2} />
        </g>
        <g className="bd" tabIndex={0} role="button" aria-label="Documents">
          <rect x={206} y={160} width={158} height={72} fill="#102A43" rx={2} />
          <text x={222} y={202} fill="#E4F0EC" fontSize={19} fontWeight={600}>
            Documents
          </text>
          <rect className="fb" x={222} y={214} width={0} height={6} fill="#7FE0C3" rx={2} />
        </g>
        <g className="bd" tabIndex={0} role="button" aria-label="Team access">
          <rect x={206} y={256} width={158} height={72} fill="#102A43" rx={2} />
          <text x={222} y={298} fill="#E4F0EC" fontSize={19} fontWeight={600}>
            Team access
          </text>
          <rect className="fb" x={222} y={310} width={0} height={6} fill="#7FE0C3" rx={2} />
        </g>
        <path
          d="M380 100 H468"
          stroke="#102A43"
          strokeOpacity={0.25}
          strokeWidth={2}
          strokeDasharray="4 5"
          fill="none"
        />
        <path
          className="cn"
          d="M380 100 H468"
          stroke="#16876D"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M380 196 H468"
          stroke="#102A43"
          strokeOpacity={0.25}
          strokeWidth={2}
          strokeDasharray="4 5"
          fill="none"
        />
        <path
          className="cn"
          d="M380 196 H468"
          stroke="#16876D"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M380 292 H468"
          stroke="#102A43"
          strokeOpacity={0.25}
          strokeWidth={2}
          strokeDasharray="4 5"
          fill="none"
        />
        <path
          className="cn"
          d="M380 292 H468"
          stroke="#16876D"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
        <g className="pn" transform="translate(490,100)">
          <circle className="pc" r={26} fill="#F6FAF9" stroke="#102A43" strokeWidth={2.5} />
          <g className="pg" fill="#102A43">
            <circle cy={-7} r={7} />
            <path d="M-13 14c0-9 6-14 13-14s13 5 13 14z" />
          </g>
          <g className="ok" opacity={0}>
            <circle cx={20} cy={-20} r={10} fill="#7FE0C3" stroke="#F6FAF9" strokeWidth={2} />
            <path
              d="M15 -20l4 4 7-8"
              stroke="#102A43"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
            />
          </g>
          <text y={54} textAnchor="middle" fontSize={15} fontWeight={600} fill="#102A43">
            Management
          </text>
        </g>
        <g className="pn" transform="translate(490,196)">
          <circle className="pc" r={26} fill="#F6FAF9" stroke="#102A43" strokeWidth={2.5} />
          <g className="pg" fill="#102A43">
            <circle cy={-7} r={7} />
            <path d="M-13 14c0-9 6-14 13-14s13 5 13 14z" />
          </g>
          <g className="ok" opacity={0}>
            <circle cx={20} cy={-20} r={10} fill="#7FE0C3" stroke="#F6FAF9" strokeWidth={2} />
            <path
              d="M15 -20l4 4 7-8"
              stroke="#102A43"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
            />
          </g>
          <text y={54} textAnchor="middle" fontSize={15} fontWeight={600} fill="#102A43">
            Legal team
          </text>
        </g>
        <g className="pn" transform="translate(490,292)">
          <circle className="pc" r={26} fill="#F6FAF9" stroke="#102A43" strokeWidth={2.5} />
          <g className="pg" fill="#102A43">
            <circle cy={-7} r={7} />
            <path d="M-13 14c0-9 6-14 13-14s13 5 13 14z" />
          </g>
          <g className="ok" opacity={0}>
            <circle cx={20} cy={-20} r={10} fill="#7FE0C3" stroke="#F6FAF9" strokeWidth={2} />
            <path
              d="M15 -20l4 4 7-8"
              stroke="#102A43"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
            />
          </g>
          <text y={54} textAnchor="middle" fontSize={15} fontWeight={600} fill="#102A43">
            Field team
          </text>
        </g>
        <g id="tks">
          {P.map((_, i) => {
            const shapeIdx = MAP[i % 3];
            return (
              <g
                key={i}
                className="tok"
                fill="#F6FAF9"
                stroke="#102A43"
                strokeWidth={1.8}
                strokeLinejoin="round"
              >
                {shapeIdx === 0 && (
                  <>
                    <rect x={-13} y={-16} width={26} height={32} />
                    <path d="M-7 -6h14M-7 0h14M-7 6h8" fill="none" />
                  </>
                )}
                {shapeIdx === 1 && (
                  <>
                    <rect x={-17} y={-12} width={34} height={24} rx={5} />
                    <path d="M-6 12l-4 8 11-8" />
                  </>
                )}
                {shapeIdx === 2 && (
                  <>
                    <rect x={-17} y={-13} width={34} height={26} />
                    <circle cx={-7} cy={-4} r={3} fill="#102A43" />
                    <path d="M-17 13l10-12 8 8 6-6 13 10" fill="none" />
                  </>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      <p className="cap2" id="cap" ref={capRef}>
        Work scattered across spreadsheets, emails and folders
      </p>
    </div>
  );
}

