"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface HomeHeroProps {
  header?: React.ReactNode;
}

export default function HomeHero({ header }: HomeHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const stage = stageRef.current;
    if (!stage) return;
    const st = statusRef.current;
    const fxw = factsRef.current;
    if (!st || !fxw) return;
    const fx = Array.from(fxw.querySelectorAll<HTMLDivElement>(".facts div"));

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = 36;
    const BY = [10, 31, 52];
    const HV = [0, 0, 0];
    const WORDS = [
      "Invoice_final_v3.xlsx",
      "Re: Re: follow up",
      "Hearing 14 Nov",
      "Who has the file?",
      "Due Friday",
      "Call me back",
      "Scan_0042.pdf",
      "Approved?",
      "Shift list.xls",
      "Notice draft",
      "Dispatch late",
      "Order #2291",
      "Which folder?",
      "See attached",
    ];

    let W = 0;
    let H = 0;
    let dpr = 1;
    let s = 1;
    let ox = 0;
    let oy = 0;
    let t0: number | null = null;
    let leaving: number | null = null;
    let vis = true;
    let sorted = -1;
    let hl = -1;
    let user = false;
    let lastCyc = 0;
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    let raf = 0;

    const rnd = (() => {
      let v = 11;
      return () => (v = (v * 16807) % 2147483647) / 2147483647;
    })();

    const F = Array.from({ length: N }, (_, i) => {
      const b = i % 3;
      return {
        k: i % 4,
        w: i % 2 ? "" : WORDS[(i >> 1) % WORDS.length],
        b,
        bx: rnd() * 1.1 - 0.05,
        by: rnd() * 1.1 - 0.05,
        r: (rnd() - 0.5) * 2.4,
        sc: 1.2 + rnd() * 1.1,
        ph: rnd() * 6.28,
        sp: 0.35 + rnd() * 0.5,
        tx: 11 + rnd() * 11,
        ty: BY[b] + 5 + rnd() * 8,
      };
    });

    const css = (n: string) => {
      if (typeof document === "undefined") return "";
      return getComputedStyle(document.documentElement)
        .getPropertyValue(n)
        .trim();
    };

    const sm = (x: number) => {
      x = Math.max(0, Math.min(1, x));
      return x * x * (3 - 2 * x);
    };
    const cl = (x: number) => Math.max(0, Math.min(1, x));
    const eb = (x: number) => {
      x = cl(x);
      return 1 + 2.7 * Math.pow(x - 1, 3) + 1.7 * Math.pow(x - 1, 2);
    };
    const eo = (x: number) => {
      x = cl(x);
      return 1 - Math.pow(1 - x, 3);
    };

    function layout() {
      if (!stage || !cv) return;
      const r = stage.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = W * dpr;
      cv.height = H * dpr;
      s = (Math.min(W, H) * 0.74) / 62;
      ox = W / 2 - 39 * s;
      oy = H / 2 - 40 * s;
      kick();
    }

    function setHl(b: number) {
      hl = b;
      fx.forEach((f, i) => f.classList.toggle("on", i === b));
      kick();
    }

    function kick() {
      if (reduced) requestAnimationFrame(frame);
    }

    function updStatus(c: number) {
      const n = Math.round(c);
      if (n === sorted) return;
      sorted = n;
      const span = st?.querySelector("span");
      if (span) {
        span.textContent =
          n >= N ? "All " + N + " sorted" : "Sorting " + n + " of " + N;
      }
      st?.classList.toggle("ok", n >= N);
    }

    function shape(k: number, w: number, h: number) {
      if (!ctx) return;
      ctx.beginPath();
      if (k === 0) {
        ctx.rect(-w / 2, -h / 2, w, h);
        ctx.moveTo(-w / 6, -h / 2);
        ctx.lineTo(-w / 6, h / 2);
        ctx.moveTo(-w / 2, 0);
        ctx.lineTo(w / 2, 0);
      } else if (k === 1) {
        ctx.roundRect(-w / 2, -h / 2, w, h, h / 3);
        ctx.moveTo(-w / 4, h / 2);
        ctx.lineTo(-w / 2.6, h / 2 + h / 3);
        ctx.lineTo(0, h / 2);
        ctx.moveTo(-w / 3, -h / 8);
        ctx.lineTo(w / 3, -h / 8);
        ctx.moveTo(-w / 3, h / 6);
        ctx.lineTo(w / 6, h / 6);
      } else if (k === 2) {
        ctx.moveTo(-w / 2, -h / 2);
        ctx.lineTo(w / 4, -h / 2);
        ctx.lineTo(w / 2, -h / 4);
        ctx.lineTo(w / 2, h / 2);
        ctx.lineTo(-w / 2, h / 2);
        ctx.closePath();
        ctx.moveTo(w / 4, -h / 2);
        ctx.lineTo(w / 4, -h / 4);
        ctx.lineTo(w / 2, -h / 4);
        ctx.moveTo(-w / 3, 0);
        ctx.lineTo(w / 3, 0);
        ctx.moveTo(-w / 3, h / 4);
        ctx.lineTo(0, h / 4);
      } else {
        ctx.moveTo(h / 1.2, 0);
        ctx.arc(0, 0, h / 1.2, 0, 6.3);
        ctx.moveTo(h / 1.7, 0);
        ctx.arc(0, 0, h / 1.7, 0, 6.3);
        ctx.moveTo(-h / 3, 0);
        ctx.lineTo(h / 3, 0);
      }
      ctx.stroke();
    }

    function frame(now: number) {
      if (!ctx || !cv) return;
      if (t0 === null) t0 = now;
      if (leaving !== null) {
        const q = (now - leaving) / 380;
        cv.style.opacity = String(Math.max(0, 1 - q));
        if (q >= 1) {
          leaving = null;
          t0 = now;
          setHl(-1);
          lastCyc = now;
        }
      } else {
        cv.style.opacity = reduced ? "1" : String(Math.min(1, (now - t0) / 500));
      }

      const elapsed = (now - t0) / 1000;
      // Delay sorting by ~1.3s so visitors can see the messy documents floating first
      const SORT_DELAY = 1.3;
      const T = reduced ? 99 : Math.max(0, elapsed - SORT_DELAY);
      const ink = css("--ink") || "#102A43";
      const teal = css("--teal") || "#16876D";

      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      if (!reduced && T > 4.4 && !user && now - lastCyc > 2600) {
        lastCyc = now;
        setHl((hl + 1) % 3);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const cx0 = ox + 34 * s;
      const cy0 = oy + 40 * s;
      const R = Math.min(W, H) * 0.5;

      // ice ripples from the case node
      if (T > 2.6) {
        for (let j = 0; j < 3; j++) {
          const p = (((T - 2.6) / 3.6 + j / 3) % 1);
          ctx.globalAlpha = (1 - p) * 0.28 * sm((T - 2.6) / 1);
          ctx.strokeStyle = teal;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(cx0, cy0, p * R, 0, 6.3);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // scattered work
      const cnt = [0, 0, 0];
      const tot = [0, 0, 0];
      const fs = Math.max(0.6, Math.min(1, W / 560));

      F.forEach((f, i) => {
        // Smooth graceful flight into the logo
        const e = sm((T - (0.4 + (i / N) * 1.8)) / 1.4);
        tot[f.b]++;
        cnt[f.b] += sm((e - 0.7) / 0.3);
        if (e >= 1) return;

        const px = f.bx * W + Math.sin(elapsed * f.sp + f.ph) * 22;
        const py = f.by * H + Math.cos(elapsed * f.sp * 1.3 + f.ph) * 18;
        const tx = ox + f.tx * s;
        const ty = oy + f.ty * s;

        const x = px + (tx - px) * e;
        const y = py + (ty - py) * e;
        const sc = (f.sc + (0.25 - f.sc) * e) * fs;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(f.r * (1 - e));
        ctx.scale(sc, sc);
        ctx.lineWidth = 1.4 / sc;
        ctx.globalAlpha = (0.35 + 0.5 * e) * (1 - sm((e - 0.85) / 0.15));
        ctx.strokeStyle = ink;
        shape(f.k, 34, 24);
        ctx.restore();

        if (f.w) {
          ctx.save();
          ctx.globalAlpha = 0.6 * (1 - e) * (1 - e);
          ctx.fillStyle = ink;
          ctx.font =
            "500 " + Math.round(11 * fs) + 'px "Hanken Grotesk", sans-serif';
          ctx.textAlign = "center";
          ctx.fillText(f.w, x, y + 16 * sc + 8);
          ctx.restore();
        }
      });

      ctx.globalAlpha = 1;

      // the logo
      updStatus(cnt[0] + cnt[1] + cnt[2]);
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(s, s);

      for (let b = 0; b < 3; b++) {
        const pb = cnt[b] / tot[b];
        HV[b] += ((hl === b ? 1 : 0) - HV[b]) * 0.12;
        if (pb <= 0) continue;

        const dx = -mx * 1.5 - HV[b] * 1.6;
        ctx.save();
        ctx.translate(dx, -my);
        ctx.strokeStyle = ink;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.5 * Math.min(1, pb * 4);
        ctx.strokeRect(8, BY[b], 17, 18);
        ctx.globalAlpha = 1;
        ctx.fillStyle = ink;
        ctx.fillRect(8, BY[b], 17 * pb, 18);

        if (HV[b] > 0.01) {
          ctx.globalAlpha = HV[b];
          ctx.fillStyle = teal;
          ctx.fillRect(8, BY[b], 17 * pb, 18);
          ctx.globalAlpha = 1;
        }

        const ce = sm((T - 2.2) / 0.5) * (1 - sm((T - 3.4) / 0.8));
        if (ce > 0) {
          ctx.globalAlpha = ce;
          ctx.strokeStyle = teal;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(25, BY[b] + 9);
          ctx.lineTo(27, 40);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        ctx.restore();
      }

      const ae = eo((T - 3.1) / 1);
      if (ae > 0) {
        ctx.fillStyle = ink;
        ctx.globalAlpha = ae;
        [
          [-1, "M28 34 51 10h19L43 40z"],
          [1, "M28 46l15-6 27 30H51z"],
        ].forEach(([d, p]) => {
          ctx.save();
          ctx.translate(mx * 1.5, my);
          ctx.translate(34, 40);
          ctx.rotate(Number(d) * (1 - ae) * 0.6);
          ctx.scale(ae, ae);
          ctx.translate(-34, -40);
          ctx.fill(new Path2D(String(p)));
          ctx.restore();
        });
        ctx.globalAlpha = 1;
      }

      const ne = eb((T - 2.6) / 0.7);
      if (ne > 0) {
        ctx.save();
        ctx.translate(mx * 0.3, my * 0.3);
        ctx.translate(34, 40);
        ctx.scale(ne, ne);
        ctx.translate(-34, -40);
        ctx.fillStyle = teal;
        ctx.fillRect(27, 33, 14, 14);
        ctx.restore();
      }

      ctx.restore();

      if (!reduced && vis) raf = requestAnimationFrame(frame);
      else raf = 0;
    }

    const listeners: Array<() => void> = [];

    fx.forEach((f) => {
      const b = Number(f.dataset.b);
      const onEnter = () => {
        user = true;
        fxw.classList.add("u");
        setHl(b);
      };
      const onLeave = () => {
        user = false;
        fxw.classList.remove("u");
        lastCyc = performance.now();
      };
      ["mouseenter", "focus"].forEach((ev) => f.addEventListener(ev, onEnter));
      ["mouseleave", "blur"].forEach((ev) => f.addEventListener(ev, onLeave));
      listeners.push(() => {
        ["mouseenter", "focus"].forEach((ev) =>
          f.removeEventListener(ev, onEnter)
        );
        ["mouseleave", "blur"].forEach((ev) =>
          f.removeEventListener(ev, onLeave)
        );
      });
    });

    const onPointerMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tmy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    stage.addEventListener("pointermove", onPointerMove);

    const onPointerLeave = () => {
      tmx = 0;
      tmy = 0;
    };
    stage.addEventListener("pointerleave", onPointerLeave);

    const again = () => {
      if (reduced || leaving !== null) return;
      leaving = performance.now();
    };
    stage.addEventListener("click", again);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        again();
      }
    };
    stage.addEventListener("keydown", onKeyDown);

    const hero = heroRef.current;
    let onHeroPointerMove: ((e: PointerEvent) => void) | null = null;
    if (hero) {
      onHeroPointerMove = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--px", e.clientX - r.left + "px");
        hero.style.setProperty("--py", e.clientY - r.top + "px");
      };
      hero.addEventListener("pointermove", onHeroPointerMove);
    }

    const ro = new ResizeObserver(layout);
    ro.observe(stage);

    const io = new IntersectionObserver(([en]) => {
      vis = en.isIntersecting;
      if (vis && !reduced && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(stage);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        layout();
        if (!reduced) raf = requestAnimationFrame(frame);
      });
    } else {
      layout();
      if (!reduced) raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      listeners.forEach((fn) => fn());
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("click", again);
      stage.removeEventListener("keydown", onKeyDown);
      if (hero && onHeroPointerMove)
        hero.removeEventListener("pointermove", onHeroPointerMove);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      {header && <div className="wrap">{header}</div>}

      <div className="wrap grid">
        <div className="copy">
          <h1>
            <span className="ln">
              <i>Stop chasing work.</i>
            </span>
            <span className="ln g">
              <i>Let your systems run it.</i>
            </span>
          </h1>
          <p className="rv">
            When work lives across scattered spreadsheets and endless messages,
            things get delayed. Kairologic builds clean, custom software where
            every task is assigned, tracked, and finished on time.
          </p>
          <div className="btns rv d2">
            <Link className="btn" href="#showcase">
              See how it works
            </Link>
            <Link className="lnk" href="/contact">
              Talk to our team
            </Link>
          </div>
        </div>

        <div
          className="stage"
          id="stage"
          ref={stageRef}
          role="button"
          tabIndex={0}
          aria-label="Scatter the work and watch it sort itself again"
        >
          <canvas id="c" ref={canvasRef} />
          <div className="status" id="status" ref={statusRef}>
            <i />
            <span>Sorting 0 of 36</span>
          </div>
        </div>
      </div>

      <div className="wrap facts" id="facts" ref={factsRef}>
        <div tabIndex={0} data-b="0">
          <b>Organized Records</b>
          <span>Everything in one clear place</span>
        </div>
        <div tabIndex={0} data-b="1">
          <b>Clear Hand-offs</b>
          <span>Next task assigned automatically</span>
        </div>
        <div tabIndex={0} data-b="2">
          <b>Zero Missed Dates</b>
          <span>Deadlines tracked &amp; completed</span>
        </div>
      </div>
    </section>
  );
}

