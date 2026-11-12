"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { trackEvent } from "@/lib/analytics";

const P: [number, number][] = [
  [28, 70],
  [100, 60],
  [60, 120],
  [134, 140],
  [26, 190],
  [96, 206],
  [132, 262],
  [44, 290],
  [100, 322],
];

const R = [-12, 8, -5, 14, 6, -9, 10, -7, 5];
const SY = [100, 206, 312];
const SX = 345;
const SYY = 190;

const STEP_CHIPS = [
  "Merge",
  "Cover",
  "Text",
  "Compress",
  "Pagination",
  "Seal",
  "Split",
];

export default function LexHeroDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const hv = wrap.querySelector<SVGSVGElement>("#lx");
    const tl7 = wrap.querySelector<HTMLDivElement>("#tl7");
    const run = wrap.querySelector<SVGGElement>("#run");
    const rt = wrap.querySelector<SVGTextElement>("#rt");
    const rh = wrap.querySelector<SVGTextElement>("#rh");
    const stk = wrap.querySelector<SVGGElement>("#stk");

    if (!hv || !tl7 || !run || !rt || !rh || !stk) return;

    const toks = Array.from(hv.querySelectorAll<SVGGElement>(".lex-tok"));
    const parts = Array.from(hv.querySelectorAll<SVGGElement>(".lex-part"));
    const chips = Array.from(tl7.querySelectorAll<HTMLSpanElement>("span"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let busy = false;
    let done = false;
    let auto = false;
    let autoTimer: ReturnType<typeof setTimeout> | null = null;
    let io: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      const reset = () => {
        chips.forEach((c) => c.classList.remove("ok"));
        toks.forEach((g, i) =>
          gsap.set(g, { x: P[i][0], y: P[i][1], rotation: R[i], scale: 1, opacity: 1 })
        );
        gsap.set(stk, { opacity: 0, x: SX, y: SYY, scaleY: 1 });
        gsap.set(
          hv.querySelectorAll("#cvr, #lns, #pgx, #sealg"),
          { opacity: 0 }
        );
        gsap.set(parts, { opacity: 0, x: SX, y: SYY });
        rt.textContent = "RUN";
        rh.textContent = "Click RUN";
        done = false;
      };

      const finalState = () => {
        toks.forEach((g) => gsap.set(g, { opacity: 0 }));
        chips.forEach((c) => c.classList.add("ok"));
        parts.forEach((g, i) =>
          gsap.set(g, { opacity: 1, x: 495, y: SY[i] - 12 })
        );
        gsap.set(stk, { opacity: 0 });
        rt.textContent = "Done";
        rh.textContent = "Complete filing package";
        done = true;
      };

      const tick = (i: number) => {
        if (chips[i]) chips[i].classList.add("ok");
      };

      const play = () => {
        if (busy) return;
        if (done) reset();
        busy = true;
        rt.textContent = "…";
        rh.textContent = "Running";

        const tl = gsap.timeline({
          onComplete: () => {
            busy = false;
            done = true;
            rt.textContent = "Done";
            rh.textContent = "Complete filing package · click to run again";
          },
        });

        tl.set(stk, { opacity: 0, x: SX, y: SYY }, 0)
          .to(
            toks,
            {
              x: SX,
              y: SYY,
              rotation: 0,
              duration: 0.9,
              stagger: 0.07,
              ease: "power2.inOut",
            },
            0.2
          )
          .set(stk, { opacity: 1 }, 1.0)
          .to(toks, { opacity: 0, duration: 0.3 }, 1.2)
          .call(() => tick(0), undefined, 1.5)
          .fromTo(
            hv.querySelector("#cvr"),
            { opacity: 0, y: -60 },
            { opacity: 1, y: 0, duration: 0.4 },
            1.8
          )
          .call(() => tick(1), undefined, 2.2)
          .to(hv.querySelector("#lns"), { opacity: 1, duration: 0.5 }, 2.4)
          .call(() => tick(2), undefined, 2.9)
          .to(
            stk,
            { scaleY: 0.85, duration: 0.4, transformOrigin: "50% 100%" },
            3.0
          )
          .call(() => tick(3), undefined, 3.4)
          .to(hv.querySelector("#pgx"), { opacity: 1, duration: 0.3 }, 3.6)
          .call(() => tick(4), undefined, 3.9)
          .fromTo(
            hv.querySelector("#sealg"),
            {
              opacity: 0,
              scale: 1.8,
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            },
            { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" },
            4.1
          )
          .call(() => tick(5), undefined, 4.5)
          .to(stk, { opacity: 0, duration: 0.3 }, 4.8)
          .to(
            parts,
            {
              opacity: 1,
              x: 495,
              y: (i) => SY[i] - 12,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
            },
            4.8
          )
          .call(() => tick(6), undefined, 5.6);
      };

      reset();

      if (reduced) {
        finalState();
      } else {
        const onClick = () => {
          trackEvent("hero_demo_interact", {
            product: "lex",
            action: "run_workflow",
          });
          play();
        };
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            trackEvent("hero_demo_interact", {
              product: "lex",
              action: "run_workflow",
            });
            play();
          }
        };

        run.addEventListener("click", onClick);
        run.addEventListener("keydown", onKeyDown);

        io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !auto) {
              auto = true;
              autoTimer = setTimeout(() => {
                if (!busy && !done) play();
              }, 2200);
            }
          },
          { threshold: 0.6 }
        );
        io.observe(hv);

        return () => {
          run.removeEventListener("click", onClick);
          run.removeEventListener("keydown", onKeyDown);
        };
      }
    }, wrap);

    return () => {
      if (autoTimer) clearTimeout(autoTimer);
      io?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div>
      <div className="hv" ref={wrapRef}>
        <svg
          id="lx"
          viewBox="0 0 560 400"
          role="img"
          aria-label="Click RUN and a pile of loose documents becomes a finished, numbered, sealed filing split into portal-ready parts"
        >
          <g fontSize={15} fontWeight={600} fill="#102A43">
            <text x={0} y={22}>
              Case folder
            </text>
            <text x={430} y={22}>
              Filing package
            </text>
          </g>

          <g
            fill="none"
            stroke="#102A43"
            strokeOpacity={0.35}
            strokeWidth={1.5}
            strokeDasharray="5 5"
          >
            <rect x={440} y={50} width={110} height={88} />
            <rect x={440} y={156} width={110} height={88} />
            <rect x={440} y={262} width={110} height={88} />
          </g>

          <g id="run" role="button" tabIndex={0} aria-label="Run">
            <rect id="rb" x={196} y={140} width={100} height={100} fill="#16876D" />
            <text
              id="rt"
              x={246}
              y={200}
              textAnchor="middle"
              fontSize={26}
              fontWeight={700}
              fill="#fff"
              fontFamily="Bricolage Grotesque"
            >
              RUN
            </text>
            <text
              id="rh"
              x={246}
              y={270}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill="#102A43"
            >
              Click RUN
            </text>
          </g>

          <g id="stk" opacity={0}>
            <g id="base" fill="#F6FAF9" stroke="#102A43" strokeWidth={2}>
              <rect x={-40} y={-50} width={80} height={100} />
              <rect x={-37} y={-47} width={80} height={100} />
              <rect x={-34} y={-44} width={80} height={100} />
            </g>
            <rect id="cvr" x={-34} y={-44} width={80} height={100} fill="#16876D" opacity={0} />
            <g id="lns" fill="#16876D" opacity={0}>
              <rect x={-22} y={-20} width={50} height={6} />
              <rect x={-22} y={-4} width={42} height={6} />
              <rect x={-22} y={12} width={48} height={6} />
            </g>
            <text
              id="pgx"
              x={6}
              y={76}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              fill="#102A43"
              opacity={0}
            >
              Page X of Y
            </text>
            <g id="sealg" opacity={0}>
              <circle
                cx={24}
                cy={34}
                r={18}
                fill="#F6FAF9"
                stroke="#16876D"
                strokeWidth={3}
              />
              <path
                d="M16 34l6 6 11-13"
                fill="none"
                stroke="#16876D"
                strokeWidth={3.5}
                strokeLinecap="round"
              />
            </g>
          </g>

          <g id="pts">
            {[0, 1, 2].map((i) => (
              <g key={i} className="lex-part" opacity={0}>
                <rect
                  x={-44}
                  y={-34}
                  width={88}
                  height={68}
                  fill="#F6FAF9"
                  stroke="#102A43"
                  strokeWidth={2}
                />
                <rect x={-32} y={-18} width={40} height={5} fill="#16876D" />
                <rect
                  x={-32}
                  y={-6}
                  width={52}
                  height={5}
                  fill="#102A43"
                  fillOpacity={0.3}
                />
                <circle
                  cx={26}
                  cy={16}
                  r={10}
                  fill="none"
                  stroke="#16876D"
                  strokeWidth={2.5}
                />
              </g>
            ))}
          </g>

          <g id="tks">
            {P.map((_, i) => (
              <g
                key={i}
                className="lex-tok"
                fill="#F6FAF9"
                stroke="#102A43"
                strokeWidth={1.8}
              >
                {i % 2 === 0 ? (
                  <>
                    <rect x={-13} y={-16} width={26} height={32} />
                    <path d="M-7 -6h14M-7 0h14M-7 6h8" />
                  </>
                ) : (
                  <>
                    <rect x={-17} y={-13} width={34} height={26} />
                    <circle cx={-7} cy={-4} r={3} />
                    <path d="M-17 13l10-12 8 8 6-6 13 10" />
                  </>
                )}
              </g>
            ))}
          </g>
        </svg>

        <div className="tl7" id="tl7">
          {STEP_CHIPS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

