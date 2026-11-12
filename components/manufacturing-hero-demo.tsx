"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { trackEvent } from "@/lib/analytics";

const DX = [-26, 12, 30, -48, 40] as const;
const DY = [92, 96, 98, 150, 146] as const;
const DR = [-14, 9, -22, 18, -31] as const;
const OR = "280 270";

const CAPTIONS = [
  "One manager. One Excel file. 1000+ workers.",
  "Nobody knows who is on shift. Work gets done, but nothing is recorded.",
  "Every worker, shift and task recorded as it happens.",
  "The manager is away. The factory keeps running.",
] as const;

/**
 * Interactive SVG structural scene contrasting single-manager fragility
 * against Kairologic's multi-pillar operational record.
 */
export default function ManufacturingHeroDemo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [mode, setMode] = useState<0 | 1>(0);
  const [gone, setGone] = useState(false);
  const [caption, setCaption] = useState<string>(CAPTIONS[0]);
  const [captionVisible, setCaptionVisible] = useState(true);

  const touchedRef = useRef(false);
  const gsapCtxRef = useRef<gsap.Context | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const autoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const captionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pil = Array.from(svg.querySelectorAll<SVGRectElement>(".pl"));
    const slab = svg.querySelector<SVGRectElement>("#slab");
    const blocks = Array.from(svg.querySelectorAll<SVGGElement>(".bk"));
    const FB = { transformBox: "fill-box" as const };

    const ctx = gsap.context(() => {
      gsap.set(pil, { scaleY: 0, transformOrigin: "50% 100%", ...FB });
      if (slab) {
        gsap.set(slab, { scaleX: 0, transformOrigin: "50% 50%", ...FB });
      }
      gsap.set(blocks, { transformOrigin: "50% 50%", ...FB });
    }, wrap);

    gsapCtxRef.current = ctx;

    let autoIo: IntersectionObserver | null = null;
    if (!reduced) {
      let once = false;
      autoIo = new IntersectionObserver(
        ([entry], observer) => {
          if (entry.isIntersecting && !once) {
            once = true;
            const t1 = setTimeout(() => {
              if (!touchedRef.current) setGone(true);
            }, 2400);
            const t2 = setTimeout(() => {
              if (!touchedRef.current) setMode(1);
            }, 7200);
            autoTimersRef.current.push(t1, t2);
            observer.disconnect();
          }
        },
        { threshold: 0.6 }
      );
      autoIo.observe(svg);
    }

    return () => {
      autoIo?.disconnect();
      autoTimersRef.current.forEach((id) => clearTimeout(id));
      autoTimersRef.current = [];
      if (captionTimerRef.current) {
        clearTimeout(captionTimerRef.current);
        captionTimerRef.current = null;
      }
      tlRef.current?.kill();
      tlRef.current = null;
      ctx.revert();
      gsapCtxRef.current = null;
    };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    const ctx = gsapCtxRef.current;
    if (!svg || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inst = isFirstRenderRef.current;
    const d = inst || reduced ? 0 : 1;
    const col = mode === 0 && gone;
    const pill = mode === 1;

    const bm = svg.querySelector<SVGRectElement>("#bm");
    const mg = svg.querySelector<SVGGElement>("#mg");
    const slab = svg.querySelector<SVGRectElement>("#slab");
    const blocks = Array.from(svg.querySelectorAll<SVGGElement>(".bk"));
    const pil = Array.from(svg.querySelectorAll<SVGRectElement>(".pl"));

    ctx.add(() => {
      tlRef.current?.kill();
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(
        pil,
        {
          scaleY: pill ? 1 : 0,
          stagger: d ? 0.07 : 0,
          duration: d * 0.6,
          ease: "power2.out",
        },
        0
      );

      if (slab) {
        tl.to(
          slab,
          {
            scaleX: pill ? 1 : 0,
            duration: d * 0.6,
            ease: "power2.out",
          },
          0
        );
      }

      if (mg) {
        tl.to(
          mg,
          {
            x: gone ? -170 : 0,
            opacity: gone ? 0 : 1,
            duration: d * 0.9,
            ease: gone ? "power1.in" : "power2.out",
          },
          0
        );
      }

      if (col) {
        const t0 = d * 0.5;
        if (bm) {
          tl.to(
            bm,
            {
              y: 94,
              rotation: 5,
              svgOrigin: OR,
              duration: d * 0.7,
              ease: "power2.in",
            },
            t0
          );
        }
        blocks.forEach((b, i) => {
          tl.to(
            b,
            {
              x: DX[i],
              y: DY[i],
              rotation: DR[i],
              duration: d * 1.1,
              ease: "bounce.out",
            },
            t0 + d * 0.1 + i * d * 0.05
          );
        });
        if (d) {
          tl.fromTo(
            svg,
            { x: -3 },
            { x: 3, duration: 0.05, repeat: 5, yoyo: true, ease: "none" },
            t0 + d * 0.6
          ).set(svg, { x: 0 });
        }
      } else {
        if (bm) {
          tl.to(
            bm,
            {
              y: 0,
              rotation: 0,
              svgOrigin: OR,
              duration: d * 0.8,
              ease: "power2.out",
            },
            0
          );
        }
        tl.to(
          blocks,
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: d * 0.9,
            ease: "power3.out",
            stagger: d ? 0.05 : 0,
          },
          0
        );
      }
    });

    const nextCaption = CAPTIONS[mode * 2 + (gone ? 1 : 0)];
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      setCaption(nextCaption);
      setCaptionVisible(true);
      return;
    }

    if (captionTimerRef.current) clearTimeout(captionTimerRef.current);
    setCaptionVisible(false);
    captionTimerRef.current = setTimeout(
      () => {
        setCaption(nextCaption);
        setCaptionVisible(true);
      },
      reduced ? 0 : 150
    );
  }, [mode, gone]);

  const stopAutoplay = () => {
    touchedRef.current = true;
    autoTimersRef.current.forEach((id) => clearTimeout(id));
    autoTimersRef.current = [];
  };

  const handleModeClick = (nextMode: 0 | 1) => {
    stopAutoplay();
    trackEvent("hero_demo_interact", {
      product: "manufacturing",
      action: "switch_mode",
      mode: nextMode === 1 ? "with_kairologic" : "today",
    });
    setMode(nextMode);
  };

  const handleAwayClick = () => {
    stopAutoplay();
    const nextGone = !gone;
    trackEvent("hero_demo_interact", {
      product: "manufacturing",
      action: "toggle_leave",
      away: nextGone,
    });
    setGone(nextGone);
  };

  const groundLabel = mode
    ? "One system. Every record."
    : "One manager. One Excel file.";

  return (
    <div className="hv" ref={wrapRef}>
      <div className="seg" id="mseg" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 0}
          onClick={() => handleModeClick(0)}
        >
          Today
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 1}
          onClick={() => handleModeClick(1)}
        >
          With Kairologic
        </button>
      </div>

      <svg
        ref={svgRef}
        id="fx"
        viewBox="0 0 560 420"
        role="img"
        aria-label="A factory's work resting on one manager, and the same work resting on one system"
      >
        <path d="M40 372H520" stroke="#102A43" strokeWidth={3} />
        <rect id="slab" x={60} y={372} width={440} height={9} fill="#16876D" />
        <g id="pls" fill="#16876D">
          <rect className="pl" x={120} y={278} width={26} height={94} />
          <rect className="pl" x={200} y={278} width={26} height={94} />
          <rect className="pl" x={334} y={278} width={26} height={94} />
          <rect className="pl" x={414} y={278} width={26} height={94} />
        </g>
        <g
          id="mg"
          stroke="#102A43"
          strokeWidth={9}
          strokeLinecap="round"
          fill="none"
        >
          <circle cx={280} cy={298} r={14} fill="#102A43" stroke="none" />
          <path d="M280 316V348M280 348L266 372M280 348L294 372M280 326L252 296L258 280M280 326L308 296L302 280" />
          <g stroke="none">
            <rect x={270} y={328} width={20} height={24} fill="#16876D" />
            <path
              d="M270 336h20M270 344h20M280 328v24"
              stroke="#F6FAF9"
              strokeWidth={1.5}
            />
          </g>
        </g>
        <rect id="bm" x={60} y={262} width={440} height={16} fill="#102A43" />
        <g className="bk">
          <rect
            x={84}
            y={206}
            width={120}
            height={56}
            fill="#F6FAF9"
            stroke="#102A43"
            strokeWidth={2.5}
          />
          <rect x={94} y={216} width={10} height={10} fill="#16876D" />
          <text x={94} y={250} fontSize={17} fontWeight={600} fill="#102A43">
            Workers
          </text>
        </g>
        <g className="bk">
          <rect
            x={220}
            y={206}
            width={120}
            height={56}
            fill="#F6FAF9"
            stroke="#102A43"
            strokeWidth={2.5}
          />
          <rect x={230} y={216} width={10} height={10} fill="#16876D" />
          <text x={230} y={250} fontSize={17} fontWeight={600} fill="#102A43">
            Shifts
          </text>
        </g>
        <g className="bk">
          <rect
            x={356}
            y={206}
            width={120}
            height={56}
            fill="#F6FAF9"
            stroke="#102A43"
            strokeWidth={2.5}
          />
          <rect x={366} y={216} width={10} height={10} fill="#16876D" />
          <text x={366} y={250} fontSize={17} fontWeight={600} fill="#102A43">
            Machines
          </text>
        </g>
        <g className="bk">
          <rect
            x={152}
            y={150}
            width={120}
            height={56}
            fill="#F6FAF9"
            stroke="#102A43"
            strokeWidth={2.5}
          />
          <rect x={162} y={160} width={10} height={10} fill="#16876D" />
          <text x={162} y={194} fontSize={17} fontWeight={600} fill="#102A43">
            Deliveries
          </text>
        </g>
        <g className="bk">
          <rect
            x={288}
            y={150}
            width={120}
            height={56}
            fill="#F6FAF9"
            stroke="#102A43"
            strokeWidth={2.5}
          />
          <rect x={298} y={160} width={10} height={10} fill="#16876D" />
          <text x={298} y={194} fontSize={17} fontWeight={600} fill="#102A43">
            Records
          </text>
        </g>
        <text
          id="gl"
          x={280}
          y={402}
          textAnchor="middle"
          fontSize={15}
          fontWeight={600}
          fill="#102A43"
        >
          {groundLabel}
        </text>
      </svg>

      <div className="ctl">
        <button
          type="button"
          className="away"
          id="away"
          aria-pressed={gone}
          onClick={handleAwayClick}
        >
          {gone ? "Manager is back" : "Manager on leave"}
        </button>

        <div className="roles" id="roles">
          {mode ? (
            <>
              <span className={gone ? "off" : undefined}>Factory manager</span>
              <span className={gone ? "go" : undefined}>Supervisor</span>
              <span>HR admin</span>
            </>
          ) : (
            <span className={gone ? "off" : undefined}>The manager</span>
          )}
        </div>
      </div>

      <p
        className="cap2"
        id="msg"
        style={{ opacity: captionVisible ? 1 : 0 }}
      >
        {caption}
      </p>
    </div>
  );
}
