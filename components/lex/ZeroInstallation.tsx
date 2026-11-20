"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const STEPS = ["Download", "Install", "Configure", "Update"] as const;
const DEVICES = ["PC", "Laptop", "Tablet"] as const;

function clamp(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export default function ZeroInstallation() {
  const dgRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [forcedDevice, setForcedDevice] = useState<number>(-1);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // In-view observer for copy mark animation
  useEffect(() => {
    const el = copyRef.current;
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

  // Scroll listener
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) {
      setIsReducedMotion(true);
      setProgress(1);
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const dg = dgRef.current;
      if (!dg) return;
      const r = dg.getBoundingClientRect();
      const p = clamp(
        (window.innerHeight * 0.85 - r.top) /
          (window.innerHeight * 0.7 + r.height * 0.2)
      );
      setProgress(p);

      if (p < 0.25) {
        setForcedDevice(-1);
      }
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

  const handleDeviceClick = useCallback((index: number) => {
    setForcedDevice(index);
  }, []);

  const p = isReducedMotion ? 1 : progress;
  const isDim = p > 0.25;
  const isZeroOn = p > 0.2;
  const showDev = isReducedMotion || p > 0.3 || forcedDevice >= 0;
  const isRcOn = isReducedMotion || p > 0.34 || forcedDevice >= 0;
  const autoDev = p < 0.55 ? 0 : p < 0.78 ? 1 : 2;
  const activeDevice = forcedDevice >= 0 ? forcedDevice : autoDev;

  const renderUi = () => (
    <div className="ui">
      <div className="t">
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
      <div className="b">
        <div className="sd">
          <b />
          <b />
          <b />
          <b />
          <b />
        </div>
        <div className="mn">
          <div className="hd">
            <i />
            <i />
          </div>
          <div className="zn">
            <em className="ok" />
          </div>
          <div className="sg">
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

  return (
    <div className="zi">
      <section className="sec">
        <div className="grid">
          <div className="copy" id="zcp" ref={copyRef}>
            <h2>
              Zero installation. <mark>Ready in your browser.</mark>
            </h2>
            <h3>Any PC. Any laptop. Any tablet.</h3>
            <p>
              Kairologic Lex operates as a high-performance web service. Simply
              open your browser, drop your case files, and let the cloud engine
              automate the entire pipeline: selective OCR, 300 DPI conversion,
              pagination, digital seals, and portal-ready splitting.
            </p>
            <ul>
              <li>Instant browser access</li>
              <li>Server-side OCR &amp; processing</li>
              <li>Works on Windows, Mac &amp; iPad</li>
              <li>Zero hardware load</li>
            </ul>
          </div>

          <div className="dg" id="zdg" ref={dgRef}>
            <p
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              Install steps are crossed out, then the same Lex screen is ready in
              the browser on a PC, a laptop and a tablet.
            </p>

            <div
              className={`iq${isDim ? " dim" : ""}`}
              id="ziq"
              aria-hidden="true"
            >
              {STEPS.map((s, i) => {
                const strike = isReducedMotion
                  ? 1
                  : clamp((p / 0.25) * 4 - i * 0.9);
                return (
                  <span
                    key={s}
                    className="cq"
                    style={{ "--s": strike } as React.CSSProperties}
                  >
                    <em>0{i + 1}</em>
                    {s}
                  </span>
                );
              })}
              <div className={`zr${isZeroOn ? " on" : ""}`} id="zzr">
                <b>0</b>
                <span>Zero installation</span>
              </div>
            </div>

            <div className="area" id="zar" aria-hidden="true">
              <div className={`rc${isRcOn ? " on" : ""}`} id="zrc">
                <svg viewBox="0 0 20 20">
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

              <div className={`gs${showDev ? " on" : ""}`} id="zgs" />

              {/* PC Frame */}
              <div
                className={`d pc${showDev && activeDevice === 0 ? " on" : ""}`}
              >
                <div className="fr" key={activeDevice === 0 ? "pc-act" : "pc-inact"}>
                  {renderUi()}
                </div>
                <i className="ft" />
              </div>

              {/* Laptop Frame */}
              <div
                className={`d lp${showDev && activeDevice === 1 ? " on" : ""}`}
              >
                <div className="fr" key={activeDevice === 1 ? "lp-act" : "lp-inact"}>
                  {renderUi()}
                </div>
                <i className="ft" />
              </div>

              {/* Tablet Frame */}
              <div
                className={`d tb2${showDev && activeDevice === 2 ? " on" : ""}`}
              >
                <div className="fr" key={activeDevice === 2 ? "tb-act" : "tb-inact"}>
                  {renderUi()}
                </div>
              </div>
            </div>

            <div
              className="sel"
              id="zsl"
              role="group"
              aria-label="Choose a device"
            >
              {DEVICES.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  className={activeDevice === i ? "a" : ""}
                  onClick={() => handleDeviceClick(i)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
