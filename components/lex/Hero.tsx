"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const SD = [
  [6, 8, -9],
  [40, 30, 6],
  [10, 52, -4],
  [48, 6, 10],
  [26, 72, 5],
] as const;

const CHIPS = [
  "Merge",
  "Cover",
  "Text",
  "Compress",
  "Pagination",
  "Seal",
  "Split",
] as const;

export default function LexHero() {
  const headRef = useRef<HTMLDivElement>(null);
  const foRef = useRef<HTMLDivElement>(null);
  const stkRef = useRef<HTMLDivElement>(null);
  const pkRef = useRef<HTMLDivElement>(null);
  const hsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ckRefs = useRef<(HTMLDivElement | null)[]>([]);

  const busyRef = useRef(false);
  const doneRef = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const [isDone, setIsDone] = useState(false);
  const [activeChips, setActiveChips] = useState<boolean[]>(
    new Array(CHIPS.length).fill(false)
  );

  // In-view observer for headline mark sweep
  useEffect(() => {
    const el = headRef.current;
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

  const clearState = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    hsRefs.current.forEach((d, i) => {
      if (d) {
        d.style.transform = `rotate(${SD[i][2]}deg)`;
      }
    });

    setActiveChips(new Array(CHIPS.length).fill(false));
    setIsDone(false);
    busyRef.current = false;
    doneRef.current = false;
  }, []);

  const finishRun = useCallback(() => {
    setIsDone(true);
    busyRef.current = false;
    doneRef.current = true;
  }, []);

  const runAnimation = useCallback(() => {
    if (busyRef.current) return;

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (doneRef.current) {
      clearState();
      const t = setTimeout(runAnimation, rm ? 0 : 350);
      timersRef.current.push(t);
      return;
    }

    const fo = foRef.current;
    const stk = stkRef.current;
    if (!fo || !stk) return;

    busyRef.current = true;

    if (rm) {
      // Jump immediately to finished state
      const f = fo.getBoundingClientRect();
      const s = stk.getBoundingClientRect();
      const cx = s.left + s.width / 2 - f.left;
      const cy = s.top + s.height / 2 - f.top;

      hsRefs.current.forEach((d, i) => {
        if (!d) return;
        const lx = d.offsetLeft + d.offsetWidth / 2;
        const ly = d.offsetTop + d.offsetHeight / 2;
        d.style.transform = `translate(${cx - lx + i * 2}px,${cy - ly + i * 2 - 4}px) scale(.6)`;
      });

      setActiveChips(new Array(CHIPS.length).fill(true));
      finishRun();
      return;
    }

    const f = fo.getBoundingClientRect();
    const s = stk.getBoundingClientRect();
    const cx = s.left + s.width / 2 - f.left;
    const cy = s.top + s.height / 2 - f.top;

    hsRefs.current.forEach((d, i) => {
      if (!d) return;
      const lx = d.offsetLeft + d.offsetWidth / 2;
      const ly = d.offsetTop + d.offsetHeight / 2;
      d.style.transform = `translate(${cx - lx + i * 2}px,${cy - ly + i * 2 - 4}px) scale(.6)`;
    });

    CHIPS.forEach((_, i) => {
      const t = setTimeout(() => {
        setActiveChips((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 700 + i * 260);
      timersRef.current.push(t);
    });

    const finishTimer = setTimeout(
      finishRun,
      700 + CHIPS.length * 260 + 200
    );
    timersRef.current.push(finishTimer);
  }, [clearState, finishRun]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="hero">
      <div className="kw hg">
        <div data-in ref={headRef}>
          <p className="eb">Kairologic Lex · Legal Intelligence Suite</p>
          <h1 className="kt">
            Case management, document intelligence,{" "}
            <mark>automated filing.</mark>
          </h1>
          <p className="kc">
            One platform for every stage of legal recovery work — from the first
            case intake to the final court bundle. Manage cases, read across
            documents, and file in one click.
          </p>
          <div className="btns">
            <a className="kb" href="#pillars">
              Explore the three modules
            </a>
            <a className="kb g" href="#n-watch">
              See filing automation
            </a>
          </div>
          <div className="sts">
            <div>
              <b>3 Modules</b>
              <span>in one unified platform</span>
            </div>
            <div>
              <b>1 Click</b>
              <span>complete filing automated</span>
            </div>
            <div>
              <b>Zero Install</b>
              <span>runs in any web browser</span>
            </div>
          </div>
        </div>

        <div className="hx">
          <div>
            <span className="l2">Case folder</span>
            <div className="fo" id="n-fo" ref={foRef}>
              {SD.map((s, i) => (
                <div
                  key={i}
                  className="hs"
                  ref={(el) => {
                    hsRefs.current[i] = el;
                  }}
                  style={{
                    left: `${s[0]}%`,
                    top: `${s[1]}%`,
                    transform: `rotate(${s[2]}deg)`,
                  }}
                />
              ))}
            </div>
          </div>

          <button
            className="run"
            id="n-run"
            aria-label="Click RUN to prepare the filing"
            onClick={runAnimation}
          >
            RUN
          </button>

          <div>
            <span className="l2">Filing package</span>
            <div className={`pk${isDone ? " done" : ""}`} id="n-pk" ref={pkRef}>
              <i className="sl2" />
              <div className="stk" id="n-stk" ref={stkRef} />
              {CHIPS.map((chip, i) => (
                <div
                  key={chip}
                  className={`ck${activeChips[i] ? " on" : ""}`}
                  ref={(el) => {
                    ckRefs.current[i] = el;
                  }}
                >
                  <i />
                  {chip}
                </div>
              ))}
              <div className="pgx2">Page X of Y</div>
            </div>
          </div>

          <p className="cl">Click RUN</p>
        </div>
      </div>
    </section>
  );
}
