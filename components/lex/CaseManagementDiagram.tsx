"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const N = [
  "Borrower",
  "Loan details",
  "Court orders",
  "Hearing dates",
  "Limitation deadlines",
  "Field photos",
  "Notices",
] as const;

const AM = [3, 4];
const SX = [0.08, 0.7, 0.25, 0.9, 0.04, 0.6, 0.35];
const R = [-6, 5, -3, 7, 4, -7, 3];

interface TileMetrics {
  left: number;
  top: number;
  width: number;
  height: number;
  sx: number;
  sy: number;
}

export default function CaseManagementDiagram({
  isVisible = true,
}: {
  isVisible?: boolean;
}) {
  const cmgRef = useRef<HTMLDivElement>(null);
  const znRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const metricsRef = useRef<TileMetrics[]>([]);
  const animTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const [docked, setDocked] = useState<boolean[]>(new Array(7).fill(false));
  const dockedRef = useRef<boolean[]>(docked);
  dockedRef.current = docked;

  const applyTileStyle = useCallback((i: number, isDk: boolean) => {
    const t = tileRefs.current[i];
    const m = metricsRef.current[i];
    if (!t || !m) return;
    t.style.left = `${m.left}px`;
    t.style.top = `${m.top}px`;
    t.style.width = `${m.width}px`;
    t.style.height = `${m.height}px`;
    t.style.transform = isDk
      ? "none"
      : `translate(${m.sx}px,${m.sy}px) rotate(${R[i]}deg)`;
  }, []);

  const place = useCallback(() => {
    const cmg = cmgRef.current;
    const zn = znRef.current;
    if (!cmg || !zn || !cmg.offsetWidth) return;

    const c = cmg.getBoundingClientRect();
    const z = zn.getBoundingClientRect();

    metricsRef.current = N.map((_, i) => {
      const slotEl = slotRefs.current[i];
      if (!slotEl) {
        return { left: 0, top: 0, width: 0, height: 0, sx: 0, sy: 0 };
      }
      const r = slotEl.getBoundingClientRect();
      const L = r.left - c.left;
      const T = r.top - c.top;
      // Clamp on mobile to prevent clipping outside container
      const rawTargetX = z.left - c.left + SX[i] * Math.max(0, z.width - r.width);
      const targetX = Math.max(12, Math.min(c.width - r.width - 12, rawTargetX));
      const sx = targetX - L;
      const sy = z.top - c.top + 28 + i * ((z.height - 40 - r.height) / 6) - T;
      return { left: L, top: T, width: r.width, height: r.height, sx, sy };
    });

    dockedRef.current.forEach((isDk, i) => {
      applyTileStyle(i, isDk);
    });
  }, [applyTileStyle]);

  useEffect(() => {
    if (!isVisible) return;

    const raf = requestAnimationFrame(() => {
      place();
    });

    const onResize = () => {
      place();
    };

    window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => place());
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [isVisible, place]);

  // Cleanup anim timeouts on unmount only
  useEffect(() => {
    return () => {
      animTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const toggleTile = (i: number) => {
    const next = !dockedRef.current[i];
    setDocked((prev) => {
      const updated = [...prev];
      updated[i] = next;
      return updated;
    });
    applyTileStyle(i, next);
  };

  const handleBringTogether = () => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const all = dockedRef.current.every(Boolean);
    const targetState = !all;

    animTimeoutsRef.current.forEach(clearTimeout);
    animTimeoutsRef.current = [];

    N.forEach((_, i) => {
      const t = setTimeout(
        () => {
          setDocked((prev) => {
            const updated = [...prev];
            updated[i] = targetState;
            return updated;
          });
          applyTileStyle(i, targetState);
        },
        rm ? 0 : i * 110
      );
      animTimeoutsRef.current.push(t);
    });
  };

  const dockedCount = docked.filter(Boolean).length;
  const allDocked = dockedCount === 7;

  return (
    <div className="dg">
      <div className="cmg" id="cmg" ref={cmgRef}>
        <div className="zone" id="zn" ref={znRef}>
          <div className="zn-hd-row">
            <span className="lb">Loose ends</span>
            <button
              type="button"
              className="m-organize-btn"
              onClick={handleBringTogether}
            >
              {allDocked ? "Scatter ↺" : "Organize ✨"}
            </button>
          </div>
        </div>

        <div className="rec">
          <div className="rh">
            <svg viewBox="0 0 80 80" aria-hidden="true">
              <path
                fill="#102A43"
                d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8zM28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
              />
              <path fill="#16876D" d="M27 33h14v14H27z" />
            </svg>
            <i />
          </div>

          <div className="slots" id="sl">
            {N.map((_, i) => (
              <div
                key={i}
                className="slot"
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          <div className="rf">
            <div className="sg" id="sg">
              {N.map((_, i) => (
                <i key={i} className={docked[i] ? "on" : ""} />
              ))}
            </div>
            <div
              className={`fin${allDocked ? " on" : ""}`}
              id="fin"
              aria-live="polite"
            >
              <svg viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" fill="#16876D" />
                <path
                  d="M5.5 10.5l3 3 6-7"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                />
              </svg>
              No loose ends.
            </div>
          </div>
        </div>

        {/* Absolute positioned interactive tiles */}
        {N.map((n, i) => (
          <button
            key={n}
            type="button"
            className={`tile${docked[i] ? " dk" : ""}`}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            aria-pressed={docked[i]}
            onClick={() => toggleTile(i)}
          >
            <i className={AM.includes(i) ? "am" : ""} />
            {n}
          </button>
        ))}
      </div>

      <div className="ctl">
        <button className="btn" id="go" type="button" onClick={handleBringTogether}>
          {allDocked ? "Scatter again" : "Bring it together"}
        </button>
        <span className="hn">Or click any tile to add it to the record.</span>
      </div>
    </div>
  );
}
