"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StageData {
  headline: string;
  beforeMark: string;
  highlight: string;
  afterMark: string;
}

const MORPH_STAGES: StageData[] = [
  {
    headline: "Connected information",
    beforeMark:
      "Organize business records and keep related details, documents and actions together in ",
    highlight: "one reliable system",
    afterMark: ".",
  },
  {
    headline: "Document workflows",
    beforeMark:
      "Prepare repeatable documents, notices, and client files from ",
    highlight: "approved templates and stored records",
    afterMark: ".",
  },
  {
    headline: "Reporting and visibility",
    beforeMark:
      "Give teams real-time clarity on ownership, work in progress, and upcoming deadlines ",
    highlight: "without manual chasing",
    afterMark: ".",
  },
  {
    headline: "System implementation",
    beforeMark:
      "We map your real process, configure the software to match, and train your team for ",
    highlight: "day-one success",
    afterMark: ".",
  },
];

export function MorphStory() {
  const secRef = useRef<HTMLElement>(null);
  const [, setActState] = useState<number>(0);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sec);
      const FB = { opacity: 0, ease: "power2.out" };

      const setAct = (i: number) => {
        setActState(i);
        const texts = sec.querySelectorAll<HTMLElement>(".mt .tx");
        texts.forEach((x, j) => {
          x.classList.toggle("on", j === i);
          const dots = x.querySelectorAll<HTMLElement>(".pt span");
          dots.forEach((d, k) => d.classList.toggle("cur", k === i));
        });
      };

      // 1. dasharray setup for all .dr paths
      q(".dr").forEach((el) => {
        const p = el as unknown as SVGGeometryElement;
        if (typeof p.getTotalLength === "function") {
          const l = p.getTotalLength();
          p.style.strokeDasharray = `${l}`;
          p.style.strokeDashoffset = `${l}`;
        }
      });

      if (reduced) {
        setAct(3);
        gsap.set(sec, { backgroundColor: "#16876D" });
        gsap.set(q(".dr"), { strokeDashoffset: 0 });
        gsap.set(q("#c1 .cm, #c2 .cm, #c3 .cm"), { opacity: 0 });
        gsap.set(q("#shw, #sd, .cdw, #cn, #fan, #rgw"), { opacity: 0 });
        const SH = ["#8FC3B5", "#B5D9CF", "#DCEFE9", "#FFFFFF"];
        const H = [90, 170, 250, 330];
        q(".br").forEach((b, i) => {
          gsap.set(b, { attr: { y: 450 - H[i], height: H[i] }, fill: SH[i] });
        });
        gsap.set(q("#sl text"), { opacity: 1, y: 0 });
        gsap.set(q(".tkc"), { scale: 1 });
        gsap.set(q(".tkc .dr"), { strokeDashoffset: 0 });
        gsap.set(q("#fp"), { strokeDashoffset: 0 });
        gsap.set(q("#fg"), { scale: 1 });
        const ctn = q("#ctn")[0] as unknown as SVGTextElement | undefined;
        if (ctn) ctn.textContent = "36";
        return;
      }

      setAct(0);

      // 2. intro connector draw
      gsap.to(q("#cn .dr"), {
        strokeDashoffset: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 75%",
          once: true,
        },
      });

      // 3. pulsing ring
      gsap.fromTo(
        q("#rg"),
        { attr: { r: 40 }, opacity: 0.8 },
        {
          attr: { r: 66 },
          opacity: 0,
          duration: 1.8,
          repeat: -1,
          ease: "power1.out",
        }
      );

      // 4. scrubbed timeline
      const cnt = { v: 0 };
      const ctn = q("#ctn")[0] as unknown as SVGTextElement | undefined;
      const SH = ["#8FC3B5", "#B5D9CF", "#DCEFE9", "#FFFFFF"];
      const H = [90, 170, 250, 330];

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onUpdate: () => {
          setAct(Math.min(3, Math.round(tl.time())));
        },
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            setAct(Math.min(3, Math.round(self.progress * 3.25)));
          },
        },
      });

      if (typeof window !== "undefined") {
        (window as unknown as { __morphTL?: gsap.core.Timeline; gsap?: typeof gsap; ScrollTrigger?: typeof ScrollTrigger }).__morphTL = tl;
        (window as unknown as { gsap?: typeof gsap }).gsap = gsap;
        (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
      }

      // records become a document
      tl.to(sec, { backgroundColor: "#102A43", duration: 0.6 }, 0.2)
        .to(q("#cn, #fan, .cd, #rgw"), { opacity: 0, duration: 0.25 }, 0.2)
        .to(q("#c1 .cm"), { attr: { x: 70, y: 140, width: 30, height: 30 }, fill: "#7FE0C3", duration: 0.5 }, 0.25)
        .to(q("#c2 .cm"), { attr: { x: 70, y: 225, width: 30, height: 30 }, fill: "#7FE0C3", duration: 0.5 }, 0.3)
        .to(q("#c3 .cm"), { attr: { x: 70, y: 310, width: 30, height: 30 }, fill: "#7FE0C3", duration: 0.5 }, 0.35)
        .to(q("#nd"), { attr: { x: 210, y: 40, width: 220, height: 440 }, fill: "#E4F0EC", duration: 0.55 }, 0.35)
        .from(q("#shd"), { opacity: 0, duration: 0.3 }, 0.75)
        .from(q("#sd"), { opacity: 0, duration: 0.1 }, 0.6)
        .from(q("#sd > *"), { opacity: 0, y: 10, stagger: 0.03, duration: 0.25 }, 0.62)
        .from(q(".fl"), { scaleX: 0, transformOrigin: "0% 50%", ...FB, stagger: 0.06, duration: 0.25 }, 0.72)
        .from(q("#stc"), { scale: 1.8, transformOrigin: "50% 50%", ...FB, duration: 0.2, ease: "back.out(2)" }, 0.8)
        .to(q("#sck"), { strokeDashoffset: 0, duration: 0.18, ease: "none" }, 0.86)

        // document becomes a live report
        .to(sec, { backgroundColor: "#F6FAF9", duration: 0.6 }, 1.2)
        .to(q("#shw, #sd, .cdw"), { opacity: 0, y: 30, duration: 0.4 }, 1.2)
        .from(q(".gl"), { scaleX: 0, transformOrigin: "0% 50%", ...FB, stagger: 0.05, duration: 0.4 }, 1.35)
        .from(q("#tgt"), { scaleX: 0, transformOrigin: "0% 50%", ...FB, duration: 0.4 }, 1.5)
        .from(q(".br"), { scaleY: 0, transformOrigin: "50% 100%", ...FB, stagger: 0.1, duration: 0.45, ease: "power3.out" }, 1.4)
        .to(q("#sp"), { strokeDashoffset: 0, duration: 0.4, ease: "none" }, 1.72)
        .from(q(".dt"), { scale: 0, transformOrigin: "50% 50%", ...FB, stagger: 0.08, duration: 0.2, ease: "back.out(2)" }, 1.78)
        .from(q("#nm, #ct"), { opacity: 0, y: 8, duration: 0.3 }, 1.6)
        .to(
          cnt,
          {
            v: 36,
            duration: 0.5,
            ease: "none",
            onUpdate: () => {
              if (ctn) ctn.textContent = String(Math.round(cnt.v));
            },
          },
          1.5
        )

        // report becomes a finished system
        .to(sec, { backgroundColor: "#16876D", duration: 0.6 }, 2.2)
        .to(q("#sp, .dt, .gl, #tgt, #ct, #nm"), { opacity: 0, duration: 0.25 }, 2.2);

      q(".br").forEach((b, i) => {
        tl.to(b, { attr: { y: 450 - H[i], height: H[i] }, fill: SH[i], duration: 0.55 }, 2.25 + i * 0.07);
      });

      tl.from(q("#sl text"), { opacity: 0, y: 10, stagger: 0.06, duration: 0.25 }, 2.5)
        .from(q(".tkc"), { scale: 0, transformOrigin: "50% 50%", ...FB, stagger: 0.08, duration: 0.2, ease: "back.out(2)" }, 2.55)
        .to(q(".tkc .dr"), { strokeDashoffset: 0, stagger: 0.08, duration: 0.15, ease: "none" }, 2.65)
        .to(q("#fp"), { strokeDashoffset: 0, duration: 0.25, ease: "none" }, 2.7)
        .from(q("#fg"), { scale: 0, transformOrigin: "0% 50%", ...FB, duration: 0.25, ease: "back.out(2)" }, 2.85)
        .to({}, { duration: 0.35 }, 2.9);
    }, sec);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section className="wwd">
        <div className="wrap">
          <div className="wdh">
            <h2>Give your process a working system.</h2>
            <p>We connect the parts of everyday work that need to stay in step.</p>
          </div>
        </div>
      </section>

      <section className="mph" id="mph" ref={secRef}>
        <div className="mst">
          <div className="mt">
            {MORPH_STAGES.map((stg, idx) => (
              <div
                key={stg.highlight}
                className={`tx ${idx === 0 ? "on" : ""}`}
              >
                <h3>{stg.headline}</h3>
                <p>
                  {stg.beforeMark}
                  <mark>{stg.highlight}</mark>
                  {stg.afterMark}
                </p>
                <div className="pt">
                  <span className={idx === 0 ? "cur" : ""} />
                  <span className={idx === 1 ? "cur" : ""} />
                  <span className={idx === 2 ? "cur" : ""} />
                  <span className={idx === 3 ? "cur" : ""} />
                </div>
              </div>
            ))}
          </div>

          <svg
            className="mart"
            viewBox="0 0 640 520"
            role="img"
            aria-label="Records join one node, become a document, then a live report, then a finished system"
          >
            <defs>
              {/* Drop Shadow & Lighting Filters */}
              <filter id="m-cardShadow" x="-20%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#06121D" floodOpacity="0.28" />
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#06121D" floodOpacity="0.16" />
              </filter>
              <filter id="m-docShadow" x="-25%" y="-15%" width="150%" height="140%">
                <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#000000" floodOpacity="0.38" />
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.18" />
              </filter>
              <filter id="m-glowTeal" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#7FE0C3" floodOpacity="0.75" />
              </filter>
              <filter id="m-glowEmerald" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#16876D" floodOpacity="0.6" />
              </filter>

              {/* Sophisticated Gradients */}
              <linearGradient id="m-cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#163859" />
                <stop offset="100%" stopColor="#0D2235" />
              </linearGradient>

              <linearGradient id="m-cardBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7FE0C3" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#E4F0EC" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#2FB594" stopOpacity="0.35" />
              </linearGradient>

              <linearGradient id="m-conduitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#102A43" />
                <stop offset="45%" stopColor="#16876D" />
                <stop offset="100%" stopColor="#7FE0C3" />
              </linearGradient>

              <radialGradient id="m-hubAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7FE0C3" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#16876D" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#16876D" stopOpacity="0" />
              </radialGradient>

              {/* Bar Gradients for Stage 2 Analytics */}
              <linearGradient id="m-barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1B446B" />
                <stop offset="100%" stopColor="#0F2840" />
              </linearGradient>
              <linearGradient id="m-barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#204E78" />
                <stop offset="100%" stopColor="#102A43" />
              </linearGradient>
              <linearGradient id="m-barGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1B446B" />
                <stop offset="100%" stopColor="#0F2840" />
              </linearGradient>
              <linearGradient id="m-barGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2FB594" />
                <stop offset="35%" stopColor="#16876D" />
                <stop offset="100%" stopColor="#0D5947" />
              </linearGradient>

              <linearGradient id="m-splineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#16876D" />
                <stop offset="50%" stopColor="#2FB594" />
                <stop offset="100%" stopColor="#7FE0C3" />
              </linearGradient>

              <linearGradient id="m-flagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#102A43" />
                <stop offset="100%" stopColor="#194168" />
              </linearGradient>
            </defs>

            {/* STAGE 2: Coordinate Grid Lines */}
            <g stroke="#C6D8DC" strokeWidth={1.5} opacity={0.85}>
              <path className="gl" d="M40 450H600" />
              <path className="gl" d="M40 370H600" strokeDasharray="4 4" />
              <path className="gl" d="M40 290H600" strokeDasharray="4 4" />
              <path className="gl" d="M40 210H600" strokeDasharray="4 4" />
            </g>

            {/* STAGE 2: Target Benchmark Line & Tag */}
            <g id="tgt">
              <path
                d="M40 250H600"
                stroke="#16876D"
                strokeWidth={2}
                strokeDasharray="8 6"
                fill="none"
              />
              <rect x={540} y={242} width={52} height={16} rx={4} fill="#16876D" />
              <text x={566} y={254} fontSize={9} fontWeight={700} fill="#E4F0EC" textAnchor="middle" letterSpacing="0.05em">TARGET</text>
            </g>

            {/* STAGE 0: Animated Living Conduits & Flowing Energy Packets */}
            <g id="cn">
              {/* Conduit Track Guides */}
              <g fill="none" stroke="rgba(16,42,67,0.12)" strokeWidth={6} strokeLinecap="round">
                <path d="M194 100H250V260H300" />
                <path d="M194 260H300" />
                <path d="M194 420H250V260H300" />
              </g>

              {/* Conduit Animated Stroke Lines */}
              <g fill="none" stroke="url(#m-conduitGrad)" strokeWidth={3.5} strokeLinecap="round">
                <path className="dr" d="M194 100H250V260H300" />
                <path className="dr" d="M194 260H300" />
                <path className="dr" d="M194 420H250V260" />
              </g>

              {/* Flowing Energy Particle Packets (Indicates Live Data Streaming) */}
              <circle r={4} fill="#7FE0C3" filter="url(#m-glowTeal)">
                <animateMotion path="M194 100H250V260H300" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle r={4} fill="#7FE0C3" filter="url(#m-glowTeal)">
                <animateMotion path="M194 260H300" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle r={4} fill="#7FE0C3" filter="url(#m-glowTeal)">
                <animateMotion path="M194 420H250V260H300" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* STAGE 0: Live Unified Output Stream (On Right) */}
            <g id="fan">
              <g transform="translate(420, 180)">
                {/* Unified Timeline Indicator Line */}
                <line x1={-12} y1={10} x2={-12} y2={144} stroke="#16876D" strokeWidth={1.5} strokeDasharray="3 3" opacity={0.5} />

                {/* Event Row 1 */}
                <g>
                  <rect x={0} y={0} width={180} height={20} rx={6} fill="#102A43" />
                  <circle cx={10} cy={10} r={3} fill="#7FE0C3" />
                  <rect x={22} y={6} width={48} height={8} rx={3} fill="#7FE0C3" fillOpacity={0.85} />
                  <rect x={76} y={7} width={88} height={6} rx={3} fill="#E4F0EC" fillOpacity={0.3} />
                </g>

                {/* Event Row 2 */}
                <g>
                  <rect x={0} y={32} width={150} height={20} rx={6} fill="#102A43" />
                  <circle cx={10} cy={42} r={3} fill="#2FB594" />
                  <rect x={22} y={38} width={40} height={8} rx={3} fill="#2FB594" fillOpacity={0.85} />
                  <rect x={70} y={39} width={68} height={6} rx={3} fill="#E4F0EC" fillOpacity={0.3} />
                </g>

                {/* Event Row 3 (Featured Centerpiece Synchronized Stream) */}
                <g>
                  <rect x={0} y={64} width={196} height={26} rx={7} fill="#102A43" stroke="rgba(127,224,195,0.4)" strokeWidth={1.2} />
                  <circle cx={12} cy={77} r={4} fill="#7FE0C3" filter="url(#m-glowTeal)">
                    <animate attributeName="r" values="3.5;5;3.5" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <rect x={26} y={72} width={64} height={10} rx={4} fill="#16876D" />
                  <rect x={98} y={74} width={84} height={6} rx={3} fill="#E4F0EC" fillOpacity={0.4} />
                </g>

                {/* Event Row 4 */}
                <g>
                  <rect x={0} y={102} width={160} height={20} rx={6} fill="#102A43" />
                  <circle cx={10} cy={112} r={3} fill="#7FE0C3" />
                  <rect x={22} y={108} width={44} height={8} rx={3} fill="#7FE0C3" fillOpacity={0.85} />
                  <rect x={74} y={109} width={72} height={6} rx={3} fill="#E4F0EC" fillOpacity={0.3} />
                </g>

                {/* Event Row 5 */}
                <g>
                  <rect x={0} y={134} width={120} height={20} rx={6} fill="#102A43" />
                  <circle cx={10} cy={144} r={3} fill="#2FB594" />
                  <rect x={22} y={140} width={36} height={8} rx={3} fill="#2FB594" fillOpacity={0.85} />
                  <rect x={66} y={141} width={44} height={6} rx={3} fill="#E4F0EC" fillOpacity={0.3} />
                </g>
              </g>
            </g>

            {/* STAGE 0: Central Hub with Radiant Aura & Concentric Rings */}
            <g id="rgw">
              <circle cx={330} cy={260} r={55} fill="url(#m-hubAura)" />
              <circle
                id="rg"
                cx={330}
                cy={260}
                r={40}
                fill="none"
                stroke="#16876D"
                strokeWidth={2.5}
                strokeDasharray="6 4"
              />
              <circle cx={330} cy={260} r={28} fill="none" stroke="#7FE0C3" strokeWidth={1.5} opacity={0.65} />
            </g>

            {/* STAGE 0: Abstract Enterprise Data Cards (Pure architecture, zero real document names) */}
            {/* Card 1 */}
            <g className="cdw" id="c1">
              <rect
                className="cm"
                x={24}
                y={40}
                width={170}
                height={120}
                rx={12}
                fill="url(#m-cardBg)"
                stroke="url(#m-cardBorder)"
                strokeWidth={1.2}
                filter="url(#m-cardShadow)"
              />
              <g className="cd" transform="translate(24,40)">
                {/* Header status pill & pulsing active light */}
                <rect x={14} y={14} width={68} height={11} rx={5.5} fill="#7FE0C3" fillOpacity={0.9} />
                <circle cx={146} cy={19} r={3} fill="#7FE0C3" />
                <circle cx={146} cy={19} r={3} fill="none" stroke="#7FE0C3" strokeWidth={1} opacity={0.7}>
                  <animate attributeName="r" values="3;7;3" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Structured Data Row Skeleton Lines */}
                <rect x={14} y={36} width={130} height={7} rx={3.5} fill="#E4F0EC" fillOpacity={0.4} />
                <rect x={14} y={52} width={104} height={7} rx={3.5} fill="#E4F0EC" fillOpacity={0.3} />
                <rect x={14} y={68} width={118} height={7} rx={3.5} fill="#E4F0EC" fillOpacity={0.25} />

                {/* Action Capsule */}
                <rect x={14} y={92} width={52} height={16} rx={5} fill="#16876D" />
                <circle cx={22} cy={100} r={2.5} fill="#7FE0C3" />
                <rect x={28} y={98} width={30} height={4} rx={2} fill="#E4F0EC" fillOpacity={0.8} />
              </g>
            </g>

            {/* Card 2 */}
            <g className="cdw" id="c2">
              <rect
                className="cm"
                x={24}
                y={200}
                width={170}
                height={120}
                rx={12}
                fill="url(#m-cardBg)"
                stroke="url(#m-cardBorder)"
                strokeWidth={1.2}
                filter="url(#m-cardShadow)"
              />
              <g className="cd" transform="translate(24,200)">
                <rect x={14} y={14} width={68} height={11} rx={5.5} fill="#7FE0C3" fillOpacity={0.9} />
                <circle cx={146} cy={19} r={3} fill="#2FB594" />

                <rect x={14} y={36} width={130} height={7} rx={3.5} fill="#E4F0EC" fillOpacity={0.4} />
                <rect x={14} y={52} width={104} height={7} rx={3.5} fill="#E4F0EC" fillOpacity={0.3} />
                <rect x={14} y={68} width={118} height={7} rx={3.5} fill="#E4F0EC" fillOpacity={0.25} />

                <rect x={14} y={92} width={52} height={16} rx={5} fill="#16876D" />
                <circle cx={22} cy={100} r={2.5} fill="#7FE0C3" />
                <rect x={28} y={98} width={30} height={4} rx={2} fill="#E4F0EC" fillOpacity={0.8} />
              </g>
            </g>

            {/* Card 3 */}
            <g className="cdw" id="c3">
              <rect
                className="cm"
                x={24}
                y={360}
                width={170}
                height={120}
                rx={12}
                fill="url(#m-cardBg)"
                stroke="url(#m-cardBorder)"
                strokeWidth={1.2}
                filter="url(#m-cardShadow)"
              />
              <g className="cd" transform="translate(24,360)">
                <rect x={14} y={14} width={68} height={11} rx={5.5} fill="#7FE0C3" fillOpacity={0.9} />
                <circle cx={146} cy={19} r={3} fill="#7FE0C3" />

                <rect x={14} y={36} width={130} height={7} rx={3.5} fill="#E4F0EC" fillOpacity={0.4} />
                <rect x={14} y={52} width={104} height={7} rx={3.5} fill="#E4F0EC" fillOpacity={0.3} />
                <rect x={14} y={68} width={118} height={7} rx={3.5} fill="#E4F0EC" fillOpacity={0.25} />

                <rect x={14} y={92} width={52} height={16} rx={5} fill="#16876D" />
                <circle cx={22} cy={100} r={2.5} fill="#7FE0C3" />
                <rect x={28} y={98} width={30} height={4} rx={2} fill="#E4F0EC" fillOpacity={0.8} />
              </g>
            </g>

            {/* STAGE 1: Central Document Card & Drop Shadow */}
            <g id="shw">
              {/* Drop Shadow Sheet */}
              <rect
                id="shd"
                x={216}
                y={46}
                width={220}
                height={440}
                rx={14}
                fill="#000000"
                fillOpacity={0.32}
                filter="url(#m-docShadow)"
              />

              {/* Central Morph Node: starts as Nexus Hub, expands to Document Base Sheet */}
              <rect
                id="nd"
                x={300}
                y={230}
                width={60}
                height={60}
                rx={10}
                fill="#16876D"
                stroke="rgba(127,224,195,0.4)"
                strokeWidth={1.5}
              />
            </g>

            {/* STAGE 1: Living Document Workspace (Zero real document names, pure elegant UI structure) */}
            <g id="sd">
              {/* Subtle under-sheet stack for physical depth */}
              <rect x={206} y={48} width={220} height={428} rx={12} fill="#D3E2DD" opacity={0.65} />

              {/* Document Header Section */}
              <rect x={234} y={70} width={130} height={14} rx={4} fill="#102A43" />
              <rect x={382} y={72} width={28} height={10} rx={3} fill="#102A43" opacity={0.3} />
              <line x1={234} y1={94} x2={410} y2={94} stroke="#102A43" strokeWidth={1} opacity={0.15} />

              {/* Document Structured Skeleton Lines */}
              <g fill="#B7C9D1">
                <rect x={234} y={108} width={172} height={8} rx={3} />
                <rect x={234} y={128} width={150} height={8} rx={3} />
                <rect x={234} y={148} width={180} height={8} rx={3} />
                <rect x={234} y={168} width={120} height={8} rx={3} />
              </g>

              {/* Dynamic Automated Highlight Section Blocks (.fl animated by GSAP) */}
              <g fill="#16876D">
                <rect className="fl" x={234} y={210} width={100} height={22} rx={5} />
                <rect className="fl" x={234} y={250} width={154} height={22} rx={5} />
                <rect className="fl" x={234} y={290} width={80} height={22} rx={5} />
              </g>

              {/* Additional Document Clauses */}
              <g fill="#B7C9D1" opacity={0.6}>
                <rect x={234} y={336} width={176} height={6} rx={3} />
                <rect x={234} y={352} width={160} height={6} rx={3} />
                <rect x={234} y={368} width={130} height={6} rx={3} />
              </g>

              {/* Handcrafted Digital Signature Vector Stroke */}
              <path
                d="M234 416 c12 -12 24 6 36 -6 c10 -8 20 4 30 -4 c8 -6 16 2 24 -4"
                fill="none"
                stroke="#102A43"
                strokeWidth={1.8}
                strokeLinecap="round"
                opacity={0.7}
              />
              <rect x={234} y={430} width={100} height={2} rx={1} fill="#102A43" />

              {/* Official Cryptographic Verification Stamp */}
              <g id="stc">
                <circle cx={380} cy={424} r={26} fill="none" stroke="#16876D" strokeWidth={3} />
                <circle cx={380} cy={424} r={22} fill="none" stroke="#16876D" strokeWidth={1} strokeDasharray="3 2" />
                <path
                  id="sck"
                  className="dr"
                  d="M368 424l9 9 16-18"
                  fill="none"
                  stroke="#16876D"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>

            {/* STAGE 2: 4 Analytics Columns with Gradient Fills */}
            <g id="bars">
              {/* Bar 1 (Asha) */}
              <rect className="br" x={60} y={330} width={100} height={120} rx={8} fill="url(#m-barGrad1)" />
              {/* Bar 2 (Ravi) */}
              <rect className="br" x={200} y={260} width={100} height={190} rx={8} fill="url(#m-barGrad2)" />
              {/* Bar 3 (Meera) */}
              <rect className="br" x={340} y={300} width={100} height={150} rx={8} fill="url(#m-barGrad3)" />
              {/* Bar 4 (Kabir - Highlighted) */}
              <rect className="br" x={480} y={150} width={100} height={300} rx={8} fill="url(#m-barGrad4)" filter="url(#m-glowEmerald)" />
            </g>

            {/* STAGE 2: Glowing Trend Spline Curve */}
            <path
              id="sp"
              className="dr"
              d="M110 330L250 260L390 300L530 150"
              fill="none"
              stroke="url(#m-splineGrad)"
              strokeWidth={4.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#m-glowTeal)"
            />

            {/* STAGE 2: Data Vertices */}
            <g fill="#16876D" stroke="#FFFFFF" strokeWidth={3}>
              <circle className="dt" cx={110} cy={330} r={9} filter="url(#m-glowTeal)" />
              <circle className="dt" cx={250} cy={260} r={9} filter="url(#m-glowTeal)" />
              <circle className="dt" cx={390} cy={300} r={9} filter="url(#m-glowTeal)" />
              <circle className="dt" cx={530} cy={150} r={9} filter="url(#m-glowTeal)" />
            </g>

            {/* STAGE 2: Team Member Labels (Exact approved reference names) */}
            <g id="nm" fontSize={20} fontWeight={600} fill="#102A43" textAnchor="middle">
              <text x={110} y={488}>Asha</text>
              <text x={250} y={488}>Ravi</text>
              <text x={390} y={488}>Meera</text>
              <text x={530} y={488}>Kabir</text>
            </g>

            {/* STAGE 2: Metric Counter with Live Indicator Pill */}
            <g id="ct" fill="#102A43">
              <text id="ctn" x={40} y={84} fontSize={76} fontWeight={800} letterSpacing="-0.03em">0</text>
              <text x={40} y={114} fontSize={20} fontWeight={600} fillOpacity={0.65}>open tasks</text>
              {/* Live Badge */}
              <rect x={145} y={32} width={56} height={20} rx={10} fill="#7FE0C3" fillOpacity={0.8} />
              <circle cx={157} cy={42} r={3} fill="#16876D">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x={175} y={46} fontSize={10} fontWeight={700} fill="#102A43">LIVE</text>
            </g>

            {/* STAGE 3: Phase Step Titles (Exact approved reference labels) */}
            <g id="sl" fontSize={19} fontWeight={700} fill="#FFFFFF" textAnchor="middle">
              <text x={110} y={488}>Understand</text>
              <text x={250} y={488}>Configure</text>
              <text x={390} y={488}>Validate</text>
              <text x={530} y={488}>Handover</text>
            </g>

            {/* STAGE 3: Handover Flagpole & Animated Pennant */}
            <path id="fp" className="dr" d="M530 120V36" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" fill="none" />
            <g id="fg">
              <path d="M530 36h64l-16 18 16 18h-64z" fill="url(#m-flagGrad)" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} />
              {/* Finial Orb on top of Flagpole */}
              <circle cx={530} cy={36} r={6} fill="#7FE0C3" filter="url(#m-glowTeal)">
                <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* STAGE 3: Stepped Milestone Check Badges */}
            <g className="tkc">
              <circle cx={110} cy={330} r={16} fill="none" stroke="#FFFFFF" strokeWidth={3} filter="url(#m-glowTeal)" />
              <path className="dr" d="M102 330l6 6 10-12" fill="none" stroke="#FFFFFF" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g className="tkc">
              <circle cx={250} cy={250} r={16} fill="none" stroke="#FFFFFF" strokeWidth={3} filter="url(#m-glowTeal)" />
              <path className="dr" d="M242 250l6 6 10-12" fill="none" stroke="#FFFFFF" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g className="tkc">
              <circle cx={390} cy={170} r={16} fill="none" stroke="#FFFFFF" strokeWidth={3} filter="url(#m-glowTeal)" />
              <path className="dr" d="M382 170l6 6 10-12" fill="none" stroke="#FFFFFF" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
      </section>
    </>
  );
}

export default MorphStory;
