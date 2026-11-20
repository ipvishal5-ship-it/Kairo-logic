"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const PA = [1, 4, 7] as const;
const PB: Record<"n" | "f", readonly [number, number, number]> = {
  n: [5, 2, 7],
  f: [3, 6, 1],
};
const W = [88, 70, 95, 62, 80, 90, 55, 84, 72];

interface ConnectorGeometry {
  d: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function LiquidTextDiagram({
  isVisible = true,
}: {
  isVisible?: boolean;
}) {
  const lwRef = useRef<HTMLDivElement>(null);
  const leftLinesRef = useRef<(HTMLElement | null)[]>([]);
  const rightLinesRef = useRef<(HTMLDivElement | null)[]>([]);

  const [mode, setMode] = useState<"n" | "f">("n");
  const [links, setLinks] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);
  const [connectors, setConnectors] = useState<ConnectorGeometry[]>([
    { d: "", x1: 0, y1: 0, x2: 0, y2: 0 },
    { d: "", x1: 0, y1: 0, x2: 0, y2: 0 },
    { d: "", x1: 0, y1: 0, x2: 0, y2: 0 },
  ]);

  const computeLayout = useCallback(() => {
    const lw = lwRef.current;
    if (!lw || !lw.offsetWidth) return;

    const c = lw.getBoundingClientRect();
    const partnerIndices = PB[mode];

    const nextConnectors = PA.map((leftIdx, k) => {
      const a = leftLinesRef.current[leftIdx];
      const b = rightLinesRef.current[partnerIndices[k]];
      if (!a || !b) {
        return { d: "", x1: 0, y1: 0, x2: 0, y2: 0 };
      }

      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();

      const ya = ra.top + ra.height / 2 - c.top;
      const yb = rb.top + rb.height / 2 - c.top;
      const xa = ra.left + ra.width - c.left;
      const xb = rb.left - c.left;
      const dx = (xb - xa) * 0.5;

      const d = `M${xa} ${ya}C${xa + dx} ${ya},${xb - dx} ${yb},${xb} ${yb}`;
      return {
        d,
        x1: xa - 4,
        y1: ya - 4,
        x2: xb - 4,
        y2: yb - 4,
      };
    });

    setConnectors(nextConnectors);
  }, [mode]);

  useEffect(() => {
    if (!isVisible) return;
    const raf = requestAnimationFrame(() => {
      computeLayout();
    });

    const onResize = () => {
      computeLayout();
    };

    window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => computeLayout());
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [isVisible, computeLayout]);

  const toggleLink = (k: number) => {
    setLinks((prev) => {
      const next: [boolean, boolean, boolean] = [...prev];
      next[k] = !next[k];
      return next;
    });
  };

  const switchMode = (newMode: "n" | "f") => {
    if (newMode === mode) return;
    setMode(newMode);
    setLinks([false, false, false]);
  };

  const partnerIndices = PB[mode];

  return (
    <div className="dg">
      <div className="pl">
        <span className="lb">Compare with</span>
        <button
          type="button"
          className={`pill${mode === "n" ? " a" : ""}`}
          onClick={() => switchMode("n")}
          data-m="n"
        >
          Notice
        </button>
        <button
          type="button"
          className={`pill${mode === "f" ? " a" : ""}`}
          onClick={() => switchMode("f")}
          data-m="f"
        >
          Filing
        </button>
      </div>

      <div className="lw" id="lw" ref={lwRef}>
        <div className="dc">
          <span className="lb">Primary agreement</span>
          <div className="ls" id="la">
            {Array.from({ length: 9 }).map((_, r) => {
              const k = PA.indexOf(r as 1 | 4 | 7);
              if (k > -1) {
                return (
                  <button
                    key={r}
                    type="button"
                    className="ln k"
                    ref={(el) => {
                      leftLinesRef.current[r] = el;
                    }}
                    style={{ "--w": `${W[r]}%` } as React.CSSProperties}
                    aria-pressed={links[k]}
                    aria-label={`Connect clause ${k + 1}`}
                    onClick={() => toggleLink(k)}
                  />
                );
              }
              return (
                <div
                  key={r}
                  className="ln"
                  ref={(el) => {
                    leftLinesRef.current[r] = el;
                  }}
                  style={{ "--w": `${W[r]}%` } as React.CSSProperties}
                />
              );
            })}
          </div>
        </div>

        <div />

        <div className="dc">
          <span className="lb" id="bt">
            {mode === "n" ? "Issued notice" : "Filing"}
          </span>
          <div className="ls" id="lbb">
            {Array.from({ length: 9 }).map((_, r) => {
              const linkedK = partnerIndices.indexOf(r);
              const isHl = linkedK > -1 && links[linkedK];
              return (
                <div
                  key={r}
                  className={`ln${isHl ? " hl" : ""}`}
                  ref={(el) => {
                    rightLinesRef.current[r] = el;
                  }}
                  style={{ "--w": `${W[(r + 3) % 9]}%` } as React.CSSProperties}
                />
              );
            })}
          </div>
        </div>

        <svg className="cn" id="cn" aria-hidden="true">
          {connectors.map((c, k) => (
            <g key={k}>
              <path
                d={c.d}
                pathLength={1}
                className={links[k] ? "on" : ""}
              />
              <rect
                x={c.x1}
                y={c.y1}
                width={8}
                height={8}
                className={links[k] ? "on" : ""}
              />
              <rect
                x={c.x2}
                y={c.y2}
                width={8}
                height={8}
                className={links[k] ? "on" : ""}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="br">
        <span className="lb">Living brief</span>
        <div className="bc" id="bc">
          <div className={`ch${links[0] ? " on" : ""}`} />
          <div className={`ch${links[1] ? " on" : ""}`} />
          <div className={`ch${links[2] ? " on" : ""}`} />
        </div>
        <p className="hn">Select a highlighted clause to connect it.</p>
      </div>
    </div>
  );
}
