"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileSpreadsheet, FolderOpen, Clock, Search, AlertTriangle,
  Zap, Monitor, ShieldCheck, TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const oldWay = [
  { icon: FolderOpen, text: "Records scattered across dozens of folders & drives" },
  { icon: FileSpreadsheet, text: "One Excel per department — none of them talk to each other" },
  { icon: Search, text: "Urgent delivery question? Open file → Ctrl+F → hope" },
  { icon: Clock, text: "15–30 minutes lost on every single lookup" },
  { icon: AlertTriangle, text: "One wrong cell edit and the whole shift plan breaks" },
];

const kailogicWay = [
  { icon: Monitor, text: "One unified dashboard — every worker, every machine, live" },
  { icon: Zap, text: "Instant search: type a name, shift or delivery ID → result" },
  { icon: ShieldCheck, text: "Role-based access — records stay accurate and audit-safe" },
  { icon: TrendingUp, text: "Production trends and delivery status update in real time" },
  { icon: Zap, text: "Any detail in seconds — on desktop, tablet or shopfloor kiosk" },
];

export const BeforeAfter = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ba-card", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      gsap.from(".ba-line", {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: { trigger: rootRef.current, start: "top 55%" },
      });
      gsap.from(".ba-arrow", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: { trigger: rootRef.current, start: "top 45%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pain" ref={rootRef} className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-300 tracking-widest uppercase"
          >
            The everyday reality
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Managing a big plant on spreadsheets is a{" "}
            <span className="text-amber-400">daily battle.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Every manager knows this scene: an urgent call about a delivery, and
            the answer is buried somewhere in an Excel file nobody can find.
          </motion.p>
        </div>

        <div className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-stretch">
          {/* BEFORE */}
          <div className="ba-card relative rounded-2xl border border-amber-500/25 bg-amber-950/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <FileSpreadsheet className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">The old way</h3>
                <p className="text-base text-amber-300/80">Folders + Excel chaos</p>
              </div>
            </div>
            <ul className="space-y-4">
              {oldWay.map((item, i) => (
                <li key={i} className="ba-line flex gap-3 text-slate-400">
                  <item.icon className="h-6 w-6 mt-1 shrink-0 text-amber-400/70" />
                  <span className="text-base md:text-lg leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-slate-950/60 border border-slate-800 p-4 font-mono text-sm text-slate-500">
              <div className="text-amber-400/80 mb-1">a typical morning…</div>
              <div>Urgent: “Where is delivery #DL-4471?”</div>
              <div className="text-slate-600">→ check 6 folders… open 3 Excels… Ctrl+F…</div>
              <div className="text-slate-600">→ 22 minutes later: found it.</div>
            </div>
          </div>

          {/* ARROW */}
          <div className="ba-arrow flex lg:flex-col items-center justify-center">
            <div className="hidden lg:block h-full w-px bg-gradient-to-b from-amber-500/40 via-slate-700 to-cyan-500/40" />
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:relative lg:static lg:translate-x-0 lg:translate-y-0 rounded-full bg-slate-900 border border-slate-700 p-4 shadow-2xl shadow-cyan-500/10"
            >
              <svg className="h-8 w-8 text-cyan-400 lg:rotate-0 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          {/* AFTER */}
          <div className="ba-card relative rounded-2xl border border-cyan-500/30 bg-cyan-950/10 p-8 shadow-2xl shadow-cyan-500/5">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                <Monitor className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">With Kailogic</h3>
                <p className="text-base text-cyan-300/80">One connected command centre</p>
              </div>
            </div>
            <ul className="space-y-4">
              {kailogicWay.map((item, i) => (
                <li key={i} className="ba-line flex gap-3 text-slate-300">
                  <item.icon className="h-6 w-6 mt-1 shrink-0 text-cyan-300" />
                  <span className="text-base md:text-lg leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-slate-950/60 border border-cyan-900/50 p-4 font-mono text-sm text-slate-400">
              <div className="text-cyan-300 mb-1">the same morning…</div>
              <div>Urgent: “Where is delivery #DL-4471?”</div>
              <div className="text-cyan-400">→ type “DL-4471” in the search bar</div>
              <div className="text-cyan-400">→ 2.4 seconds later: full history, live status.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
