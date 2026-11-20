"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const STEPS = ["Download", "Install", "Configure", "Update"] as const;
const DEVICES = ["Laptop", "Tablet", "Mobile"] as const;

function clamp(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export default function ZeroInstallation() {
  const dgRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [forcedDevice, setForcedDevice] = useState<number>(-1);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // In-view observer for copy mark animation & early device reveal
  useEffect(() => {
    const el = copyRef.current;
    const dg = dgRef.current;
    if (!el || !dg) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            setIsInView(true);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    io.observe(dg);
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
  const isZeroOn = p > 0.15 || isInView;
  const showDev = isReducedMotion || isInView || p > 0.15 || forcedDevice >= 0;
  const isRcOn = isReducedMotion || isInView || p > 0.2 || forcedDevice >= 0;
  const autoDev = p < 0.55 ? 0 : p < 0.78 ? 1 : 2;
  const activeDevice = forcedDevice >= 0 ? forcedDevice : autoDev;

  const renderLaptopUi = () => (
    <div className="ui ui-laptop">
      {/* Browser Bar */}
      <div className="br-bar">
        <div className="br-dots">
          <span className="dot d-r" />
          <span className="dot d-y" />
          <span className="dot d-g" />
        </div>
        <div className="url-bar">
          <svg className="lock-ic" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6V4a4 4 0 0 1 8 0v2h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1zm2 0h4V4a2 2 0 0 0-4 0v2z" />
          </svg>
          <span className="url-txt">lex.kairologic.com/filing</span>
        </div>
        <div className="br-status">
          <span className="live-dot" />
          <span>Live</span>
        </div>
      </div>

      {/* App Workspace */}
      <div className="app-body">
        {/* Sidebar */}
        <aside className="app-side">
          <div className="side-brand">
            <div className="k-mini">
              <svg viewBox="0 0 80 80" aria-hidden="true">
                <path
                  fill="#102A43"
                  d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8zM28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
                />
                <path fill="#16876D" d="M27 33h14v14H27z" />
              </svg>
            </div>
            <span className="brand-lbl">Lex</span>
          </div>
          <nav className="side-nav">
            <div className="nav-item a">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 3a1 1 0 0 1 1-1h4l2 2h4a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3z" />
              </svg>
              <span>Dockets</span>
            </div>
            <div className="nav-item">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 3v1h6V4H5zm0 3v1h6V7H5zm0 3v1h4v-1H5z" />
              </svg>
              <span>Liquid</span>
            </div>
            <div className="nav-item">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a7 7 0 1 0 7 7A7 7 0 0 0 8 1zm0 2a5 5 0 1 1-5 5 5 5 0 0 1 5-5zm-1 3v3.586l2.707 2.707.707-.707L8 9.293V6z" />
              </svg>
              <span>Filing</span>
            </div>
          </nav>
        </aside>

        {/* Main Panel */}
        <main className="app-main">
          <div className="main-hd">
            <div className="hd-file">
              <span className="hd-tag">DOCKET #2026-LEX</span>
              <span className="hd-name">Complaint_Final.pdf</span>
            </div>
            <span className="hd-badge">300 DPI</span>
          </div>

          <div className="drop-stage">
            <div className="doc-card">
              <div className="doc-bar">
                <span className="doc-icon">PDF</span>
                <span className="doc-title-skel" />
                <span className="doc-ok">Ready</span>
              </div>
              <div className="doc-lines">
                <span className="ln full" />
                <span className="ln half" />
                <span className="ln highlight" />
                <span className="ln full" />
              </div>
            </div>
            <div className="stamp-seal">
              <svg viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="pipe-strip">
            <div className="seg"><span className="fill" /><label>Merge</label></div>
            <div className="seg"><span className="fill" /><label>OCR</label></div>
            <div className="seg"><span className="fill" /><label>Smart</label></div>
            <div className="seg"><span className="fill" /><label>Bates</label></div>
            <div className="seg"><span className="fill" /><label>Seal</label></div>
          </div>
        </main>
      </div>
    </div>
  );

  const renderTabletUi = () => (
    <div className="ui ui-tablet">
      <div className="tb-hd">
        <div className="tb-brand">
          <svg viewBox="0 0 80 80" className="tb-logo" aria-hidden="true">
            <path
              fill="#102A43"
              d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8zM28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
            />
            <path fill="#16876D" d="M27 33h14v14H27z" />
          </svg>
          <span className="tb-name">Lex Touch</span>
        </div>
        <div className="tb-tabs">
          <span className="tb-t a">Review</span>
          <span className="tb-t">Clauses</span>
          <span className="tb-t">Portal</span>
        </div>
        <span className="tb-live">Online</span>
      </div>

      <div className="tb-split">
        <div className="tb-pane">
          <div className="pane-top">
            <span className="pane-title">SOURCE DOCKET</span>
            <span className="pane-page">p. 1/14</span>
          </div>
          <div className="pane-content">
            <span className="tb-l mid" />
            <span className="tb-l full" />
            <span className="tb-l hl" />
            <span className="tb-l lg" />
          </div>
        </div>

        <div className="tb-divider">
          <span className="tb-sync-ico">⇄</span>
        </div>

        <div className="tb-pane">
          <div className="pane-top">
            <span className="pane-title">FILING SUMMARY</span>
            <span className="pane-page">Matched</span>
          </div>
          <div className="pane-content">
            <span className="tb-l hl" />
            <span className="tb-l full" />
            <span className="tb-l mid" />
            <span className="tb-l lg" />
          </div>
        </div>
      </div>

      <div className="tb-ft">
        <div className="tb-chips">
          <span className="tb-chip">Merge ✓</span>
          <span className="tb-chip">OCR 300DPI ✓</span>
          <span className="tb-chip">Bates #108</span>
          <span className="tb-chip">&lt;50MB Split ✓</span>
        </div>
        <span className="tb-btn">Verified &amp; Sealed</span>
      </div>
    </div>
  );

  const renderMobileUi = () => (
    <div className="ui ui-mobile">
      <div className="mb-status">
        <span className="mb-clock">09:41</span>
        <div className="mb-notch" />
        <span className="mb-icons">5G</span>
      </div>

      <div className="mb-app-bar">
        <div className="mb-brand">
          <svg viewBox="0 0 80 80" className="mb-logo" aria-hidden="true">
            <path
              fill="#102A43"
              d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8zM28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
            />
            <path fill="#16876D" d="M27 33h14v14H27z" />
          </svg>
          <span className="mb-app-name">Lex Mobile</span>
        </div>
        <span className="mb-cloud-tag">Cloud</span>
      </div>

      <div className="mb-content">
        <div className="mb-case-card">
          <div className="mb-case-hd">
            <span className="mb-case-num">DOCKET #2026-LEX</span>
            <span className="mb-case-badge">Ready</span>
          </div>
          <div className="mb-case-doc">
            <span className="mb-doc-ico">PDF</span>
            <div className="mb-doc-meta">
              <span className="mb-doc-name">E-Court Filing Bundle</span>
              <span className="mb-doc-sub">3 Files · 42 Pages</span>
            </div>
          </div>
        </div>

        <div className="mb-steps">
          <div className="mb-row done">
            <span className="mb-num">01</span>
            <span className="mb-step-lbl">Smart Merge &amp; Index</span>
            <span className="mb-ck">✓</span>
          </div>
          <div className="mb-row done">
            <span className="mb-num">02</span>
            <span className="mb-step-lbl">300 DPI OCR Engine</span>
            <span className="mb-ck">✓</span>
          </div>
          <div className="mb-row done">
            <span className="mb-num">03</span>
            <span className="mb-step-lbl">Bates Stamp &amp; Seal</span>
            <span className="mb-ck">✓</span>
          </div>
          <div className="mb-row done">
            <span className="mb-num">04</span>
            <span className="mb-step-lbl">Split &lt; 50MB Portal</span>
            <span className="mb-ck">✓</span>
          </div>
        </div>

        <div className="mb-action">
          <span>1-Click Submit to Portal</span>
        </div>
      </div>

      <div className="mb-bottom-bar">
        <span className="mb-b-item a">📁</span>
        <span className="mb-b-item">⚡</span>
        <span className="mb-b-item">🔍</span>
        <span className="mb-b-item">⚙️</span>
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
            <h3>Any laptop. Any tablet. Any mobile.</h3>
            <p>
              Kairologic Lex operates as a high-performance web service. Simply
              open your browser, drop your case files, and let the cloud engine
              automate the entire pipeline: selective OCR, 300 DPI conversion,
              pagination, digital seals, and portal-ready splitting.
            </p>
            <ul>
              <li>Instant browser access</li>
              <li>Server-side OCR &amp; processing</li>
              <li>Works on Mac, Windows, iOS &amp; Android</li>
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
              the browser on a laptop, a tablet and a mobile.
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

              {/* Laptop Frame */}
              <div
                className={`d lp${showDev && activeDevice === 0 ? " on" : ""}`}
              >
                <div
                  className="fr"
                  key={activeDevice === 0 ? "lp-act" : "lp-inact"}
                >
                  {renderLaptopUi()}
                </div>
              </div>

              {/* Tablet Frame */}
              <div
                className={`d tb${showDev && activeDevice === 1 ? " on" : ""}`}
              >
                <div
                  className="fr"
                  key={activeDevice === 1 ? "tb-act" : "tb-inact"}
                >
                  {renderTabletUi()}
                </div>
              </div>

              {/* Mobile Frame */}
              <div
                className={`d mb${showDev && activeDevice === 2 ? " on" : ""}`}
              >
                <div
                  className="fr"
                  key={activeDevice === 2 ? "mb-act" : "mb-inact"}
                >
                  {renderMobileUi()}
                </div>
                <i className="hm" />
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
