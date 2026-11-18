"use client";

import { useEffect, useRef, useCallback } from "react";
import "./lex-browser-diagram.css";

const INSTALL_STEPS = [
  { num: "01", label: "Download" },
  { num: "02", label: "Install" },
  { num: "03", label: "Configure" },
  { num: "04", label: "Update" },
];

const DEVICE_NAMES = ["PC", "Laptop", "Tablet"];

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function LexScreenContent() {
  return (
    <div className="lexdg-ui">
      {/* Top Browser Bar */}
      <div className="lexdg-t">
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <path
            fill="#102A43"
            d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8zM28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
          />
          <path fill="#16876D" d="M27 33h14v14H27z" />
        </svg>
        <s />
        <i />
        <u />
      </div>

      {/* Screen Body */}
      <div className="lexdg-b">
        {/* Sidebar */}
        <div className="lexdg-sd">
          <b />
          <b />
          <b />
          <b />
          <b />
        </div>

        {/* Main Work Area */}
        <div className="lexdg-mn">
          <div className="lexdg-hd">
            <i />
            <i />
          </div>
          <div className="lexdg-zn">
            <em className="lexdg-ok" />
          </div>
          <div className="lexdg-sg">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LexBrowserDiagram() {
  const dgRef = useRef<HTMLDivElement>(null);
  const iqRef = useRef<HTMLDivElement>(null);
  const cqRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const zrRef = useRef<HTMLDivElement>(null);
  const rcRef = useRef<HTMLDivElement>(null);
  const gsRef = useRef<HTMLDivElement>(null);
  const dRefs = useRef<(HTMLDivElement | null)[]>([]);
  const btRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const forcedRef = useRef<number>(-1);
  const showDevRef = useRef<boolean>(false);
  const curRef = useRef<number>(-1);
  const rafIdRef = useRef<number>(0);

  const dev = useCallback((i: number, forceReplay = false) => {
    if (i === curRef.current && showDevRef.current && !forceReplay) return;
    curRef.current = i;

    dRefs.current.forEach((d, k) => {
      if (!d) return;
      const shouldBeOn = showDevRef.current && k === i;
      if (shouldBeOn && forceReplay) {
        d.classList.remove("lexdg-on");
        void d.offsetWidth; // Trigger browser reflow to restart one-shot animation
      }
      d.classList.toggle("lexdg-on", shouldBeOn);
    });

    btRefs.current.forEach((b, k) => {
      if (!b) return;
      const isActive = k === i;
      b.classList.toggle("lexdg-active", isActive);
      b.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }, []);

  const draw = useCallback(
    (p: number) => {
      // 1. Cross out installation steps
      cqRefs.current.forEach((q, i) => {
        if (!q) return;
        const progress = clamp((p / 0.25) * 4 - i * 0.9);
        q.style.setProperty("--s", String(progress));
      });

      // 2. Dim steps row when p > 0.25
      iqRef.current?.classList.toggle("lexdg-dim", p > 0.25);

      // 3. Show "0 Zero installation" badge when p > 0.2
      zrRef.current?.classList.toggle("lexdg-on", p > 0.2);

      // 4. Device visibility when p > 0.3
      const showDev = p > 0.3;
      showDevRef.current = showDev;

      // 5. Ready badge on when p > 0.34
      rcRef.current?.classList.toggle("lexdg-on", p > 0.34);

      // 6. Ground shadow when device is visible
      gsRef.current?.classList.toggle("lexdg-on", showDev);

      // 7. Active device selection: PC (< 0.55), Laptop (< 0.78), else Tablet
      const autoDevice = p < 0.55 ? 0 : p < 0.78 ? 1 : 2;

      // Reset forced device when scrolling back above the diagram
      if (p < 0.25) {
        forcedRef.current = -1;
      }

      const targetDevice = forcedRef.current >= 0 ? forcedRef.current : autoDevice;
      dev(targetDevice);
    },
    [dev]
  );

  const handleButtonClick = useCallback(
    (index: number) => {
      forcedRef.current = index;
      showDevRef.current = true;
      rcRef.current?.classList.add("lexdg-on");
      gsRef.current?.classList.add("lexdg-on");
      dev(index, true);
    },
    [dev]
  );

  useEffect(() => {
    const dg = dgRef.current;
    if (!dg) return;

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function upd() {
      rafIdRef.current = 0;
      if (!dgRef.current) return;
      const rect = dgRef.current.getBoundingClientRect();
      const p = clamp(
        (window.innerHeight * 0.85 - rect.top) /
          (window.innerHeight * 0.7 + rect.height * 0.2)
      );
      draw(p);
    }

    function onScroll() {
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(upd);
      }
    }

    if (isReducedMotion) {
      draw(1);
    } else {
      draw(0);

      // Support direct diagnostic URL inspection (e.g. ?p=0.4 or ?force=laptop)
      const params = new URLSearchParams(window.location.search);
      const testP = params.get("p");
      const testForce = params.get("force");

      if (testForce !== null) {
        const devIdx =
          testForce === "laptop"
            ? 1
            : testForce === "tablet"
            ? 2
            : parseInt(testForce, 10) || 0;
        forcedRef.current = devIdx;
        showDevRef.current = true;
        rcRef.current?.classList.add("lexdg-on");
        gsRef.current?.classList.add("lexdg-on");
        dev(devIdx, true);
      }

      if (testP !== null) {
        const pVal = parseFloat(testP);
        draw(pVal);
        dg.scrollIntoView({ block: "center" });
      } else {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", upd);
        upd();
      }
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", upd);
    };
  }, [draw]);

  return (
    <div className="lexdg-root" id="dg" ref={dgRef}>
      {/* Visually hidden screen reader context */}
      <p className="lexdg-sr-only">
        Install steps are crossed out, then the same Lex screen is ready in the
        browser on a PC, a laptop and a tablet.
      </p>

      {/* 1. Installation Queue Row */}
      <div className="lexdg-iq" id="iq" ref={iqRef} aria-hidden="true">
        {INSTALL_STEPS.map((step, idx) => (
          <span
            key={step.num}
            className="lexdg-cq"
            ref={(el) => {
              cqRefs.current[idx] = el;
            }}
          >
            <em>{step.num}</em>
            {step.label}
          </span>
        ))}

        <div className="lexdg-zr" id="zr" ref={zrRef}>
          <b>0</b>
          <span>Zero installation</span>
        </div>
      </div>

      {/* 2. Device Interaction Area */}
      <div className="lexdg-area" id="ar" aria-hidden="true">
        {/* Ready In Browser Pill Badge */}
        <div className="lexdg-rc" id="rc" ref={rcRef}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="10" fill="#7FE0C3" />
            <path
              d="M5.5 10.5l3 3 6-7"
              fill="none"
              stroke="#102A43"
              strokeWidth="2"
            />
          </svg>
          Ready in your browser
        </div>

        {/* Soft Ground Shadow */}
        <div className="lexdg-gs" id="gs" ref={gsRef} />

        {/* Device 1: PC */}
        <div
          className="lexdg-d lexdg-pc"
          ref={(el) => {
            dRefs.current[0] = el;
          }}
        >
          <div className="lexdg-fr">
            <LexScreenContent />
          </div>
          <i className="lexdg-ft" />
        </div>

        {/* Device 2: Laptop */}
        <div
          className="lexdg-d lexdg-lp"
          ref={(el) => {
            dRefs.current[1] = el;
          }}
        >
          <div className="lexdg-fr">
            <LexScreenContent />
          </div>
          <i className="lexdg-ft" />
        </div>

        {/* Device 3: Tablet */}
        <div
          className="lexdg-d lexdg-tb2"
          ref={(el) => {
            dRefs.current[2] = el;
          }}
        >
          <div className="lexdg-fr">
            <LexScreenContent />
          </div>
        </div>
      </div>

      {/* 3. Device Selector Controls */}
      <div className="lexdg-sel" id="sl" role="group" aria-label="Choose a device">
        {DEVICE_NAMES.map((name, idx) => (
          <button
            key={name}
            type="button"
            ref={(el) => {
              btRefs.current[idx] = el;
            }}
            className={idx === 0 ? "lexdg-active" : ""}
            onClick={() => handleButtonClick(idx)}
            aria-pressed={idx === 0 ? "true" : "false"}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
