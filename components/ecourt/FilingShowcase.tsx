"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Files, Layers, ScanText, FileDown, Hash, Stamp, Split,
  Clock, BadgeCheck,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── pipeline stages ── */
const stages = [
  { icon: Layers, key: "merge", name: "Merge", desc: "All documents — PDF, scans, photos — combined into one filing, in natural order.", color: "#60a5fa" },
  { icon: Files, key: "cover", name: "Cover Page", desc: "An index page with court, case number and document list is added.", color: "#818cf8" },
  { icon: ScanText, key: "ocr", name: "Smart Text", desc: "Scanned pages become searchable text. Typed pages are left untouched.", color: "#a78bfa" },
  { icon: FileDown, key: "compress", name: "Compress", desc: "The file shrinks until it fits the portal's upload limit — quality protected.", color: "#c084fc" },
  { icon: Hash, key: "paginate", name: "Numbering", desc: "\"Page X of Y\" printed on every page, exactly where the court expects it.", color: "#f472b6" },
  { icon: Stamp, key: "stamp", name: "Seal", desc: "The bank's official seal applied cleanly on every page.", color: "#fb923c" },
  { icon: Split, key: "split", name: "Split", desc: "Divided into portal-ready parts that never cut a document mid-way.", color: "#34d399" },
];

const STAGE_MS = 900;

function usePipelineRunner() {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;

    let timeoutId: NodeJS.Timeout | null = null;
    let intervalId: NodeJS.Timeout | null = null;

    const startCycle = () => {
      let step = 0;
      setCurrent(0);
      setDone([]);

      intervalId = setInterval(() => {
        step += 1;
        if (step < stages.length) {
          setDone((d) => Array.from(new Set([...d, step - 1])));
          setCurrent(step);
        } else {
          // Finished all stages
          setDone(stages.map((_, idx) => idx));
          setCurrent(-1);
          if (intervalId) clearInterval(intervalId);

          // Hold completed state for 2.4s so user can review all completed stages, then seamlessly loop
          timeoutId = setTimeout(() => {
            startCycle();
          }, 2400);
        }
      }, STAGE_MS);
    };

    startCycle();

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [running]);

  return { current, done, running, setRunning };
}

export const FilingShowcase = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { current, done } = usePipelineRunner();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".kv-el", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pipeline" ref={rootRef} className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,132,255,0.08),transparent_55%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="kv-el text-center mb-16">
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-300 tracking-widest uppercase">
            One click. Whole filing.
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Watch a filing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              prepare itself
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            This is the real sequence Kairologic Lex runs — the same steps your
            team does by hand today, fully automated while your PC does the work.
          </p>
        </div>

        <div className="kv-el max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 lg:p-10">
          {/* window chrome */}
          <div className="flex items-center gap-3 mb-8 pb-5 border-b border-slate-800">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/15 border border-blue-500/30">
              <ScanText className="h-5 w-5 text-blue-300" />
            </span>
            <div>
              <div className="text-white font-bold text-xl">Kairologic Lex</div>
              <div className="text-sm text-slate-400">Court filing automation · runs on your own PC</div>
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {current >= 0 ? `Running · step ${current + 1} of ${stages.length}` : done.length === stages.length ? "Finished" : "Ready"}
            </div>
          </div>

          {/* stages */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stages.map((s, i) => {
              const isDone = done.includes(i);
              const isActive = current === i;
              return (
                <motion.div
                  key={s.key}
                  animate={{
                    scale: isActive ? 1.03 : 1,
                    borderColor: isActive ? `${s.color}88` : isDone ? "rgba(52,211,153,0.35)" : "rgba(30,41,59,1)",
                    backgroundColor: isActive ? `${s.color}14` : "rgba(15,23,42,0.6)",
                  }}
                  className="relative rounded-xl border p-5 h-full flex flex-col transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <s.icon
                      className="h-6 w-6 shrink-0"
                      style={{ color: isActive || isDone ? s.color : "#64748b" }}
                    />
                    <span className={`text-lg font-bold ${isActive || isDone ? "text-white" : "text-slate-400"}`}>
                      {s.name}
                    </span>
                    {isDone && <BadgeCheck className="h-5 w-5 text-emerald-400 ml-auto shrink-0" />}
                    {isActive && (
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity }}
                        className="ml-auto text-xs font-mono font-bold shrink-0"
                        style={{ color: s.color }}
                      >
                        RUNNING
                      </motion.span>
                    )}
                  </div>
                  <p className="text-sm lg:text-base text-slate-400 leading-relaxed">{s.desc}</p>
                  <div className="mt-auto pt-4 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: s.color }}
                        initial={false}
                        animate={{ width: isDone ? "100%" : isActive ? "65%" : "0%" }}
                        transition={{ duration: isActive ? STAGE_MS / 1000 : 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* total strip */}
          <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-8 py-6">
            <div className="flex items-center gap-4">
              <Clock className="h-7 w-7 text-emerald-300 shrink-0" />
              <span className="text-white font-bold text-xl">Complete filing package</span>
            </div>
            <div className="text-right flex flex-col sm:items-end">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300">100% Automated</span>
              <span className="text-xs sm:text-sm text-slate-400">Zero manual pagination or splitting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
