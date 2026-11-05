"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MousePointerClick, Timer, TriangleAlert, CloudOff,
  MousePointer2, FolderCheck,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const manualSteps = [
  "Merge every document into one PDF",
  "Compress it so the portal accepts it",
  "Convert scans to searchable text — a subscription site, half an hour",
  "Compress again, because the text step made the file bigger",
  "Number every single page by hand",
  "Place the bank seal on the pages",
  "Split into portal-sized parts",
];

export const OldVsNew = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ovn-card", {
        y: 70, opacity: 0, duration: 0.9, stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      gsap.from(".ovn-line", {
        x: -30, opacity: 0, duration: 0.5, stagger: 0.09,
        scrollTrigger: { trigger: rootRef.current, start: "top 55%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="compare" ref={rootRef} className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-semibold text-amber-300 tracking-widest uppercase"
          >
            Before Kairologic Lex
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Seven careful steps.{" "}
            <span className="text-amber-400">Every single filing.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
            className="mt-6 text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            The routine every legal team knows — over an hour per case, and
            every step is a chance for a mistake.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* manual column */}
          <div className="ovn-card rounded-2xl border border-amber-500/25 bg-amber-950/10 p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <MousePointerClick className="h-7 w-7 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">The manual routine</h3>
                <p className="text-base text-amber-300/80">Multiple tools, one hour+</p>
              </div>
            </div>
            <ol className="space-y-5">
              {manualSteps.map((s, i) => (
                <li key={i} className="ovn-line flex gap-4 text-slate-300">
                  <span className="shrink-0 h-8 w-8 rounded-full border border-amber-500/40 text-amber-300 text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-base lg:text-lg leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-5">
                <Timer className="h-6 w-6 text-amber-400 mb-2" />
                <div className="text-3xl font-extrabold text-white">60+ min</div>
                <div className="text-sm text-slate-400 mt-1">per case, every time</div>
              </div>
              <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-5">
                <TriangleAlert className="h-6 w-6 text-amber-400 mb-2" />
                <div className="text-3xl font-extrabold text-white">7 chances</div>
                <div className="text-sm text-slate-400 mt-1">for a manual mistake</div>
              </div>
            </div>
          </div>

          {/* kairologic lex column */}
          <div className="ovn-card relative rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-8 lg:p-10 shadow-2xl shadow-emerald-500/5">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-emerald-500/15 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <MousePointer2 className="h-7 w-7 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">With Kairologic Lex</h3>
                <p className="text-base text-emerald-300/80">One click, one tool, offline</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-7">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 border border-blue-500/40"
                >
                  <FolderCheck className="h-8 w-8 text-blue-300" />
                </motion.div>
                <div>
                  <div className="text-white font-bold text-xl">Drop the case folder. Click RUN.</div>
                  <div className="text-base text-slate-400 mt-0.5">Everything below happens by itself:</div>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {["Merge", "Cover", "Text", "Compress", "Numbering", "Seal", "Split"].map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0.3, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-base font-semibold text-emerald-300"
                  >
                    ✓ {s}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950/60 border border-emerald-900/50 p-5">
                <Timer className="h-6 w-6 text-emerald-300 mb-2" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white">Hands-Free</div>
                <div className="text-sm text-slate-400 mt-1">unattended background batch</div>
              </div>
              <div className="rounded-xl bg-slate-950/60 border border-emerald-900/50 p-5">
                <CloudOff className="h-6 w-6 text-emerald-300 mb-2" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white">0 Uploads</div>
                <div className="text-sm text-slate-400 mt-1">100% offline, stays on your PC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
