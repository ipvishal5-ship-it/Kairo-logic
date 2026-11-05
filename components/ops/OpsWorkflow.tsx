"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileInput,
  Gavel,
  Landmark,
  KeyRound,
  Hammer,
  BadgeIndianRupee,
  Clock3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGE_MS = 4800;

const stages = [
  {
    icon: FileInput,
    name: "NPA Account Intake",
    desc: "The borrower's account, title deeds and KYC enter the system once — structured, searchable, and version-controlled.",
    tag: "DAY 0",
    days: "Case opens",
    color: "#34d399",
  },
  {
    icon: Gavel,
    name: "Sec 13(2) Demand Notice",
    desc: "The demand notice is generated with the statutory 60-day clock attached. The system tracks the deadline — it never passes silently.",
    tag: "DAY 1",
    days: "60-day clock starts",
    color: "#4ade80",
  },
  {
    icon: Landmark,
    name: "DM / CMM Court Petition",
    desc: "Section 14 petition with affidavit bundle prepared from the case record. Every filing date and order received is logged against the case.",
    tag: "MONTH 2",
    days: "Order awaited",
    color: "#22d3ee",
  },
  {
    icon: KeyRound,
    name: "Physical Possession",
    desc: "The granted order drives the possession plan — site visit schedules, panchnama records and photographs stored against the same case.",
    tag: "MONTH 4",
    days: "Order executed",
    color: "#38bdf8",
  },
  {
    icon: Hammer,
    name: "E-Auction Publication",
    desc: "Reserve valuation, notice publication dates and auction timelines run on one calendar. Nothing is missed across multiple properties.",
    tag: "MONTH 6",
    days: "Auction published",
    color: "#818cf8",
  },
  {
    icon: BadgeIndianRupee,
    name: "Realisation & Audit",
    desc: "Sale proceeds, adjustments and the final realisation report — the full statutory trail, ready for the bank's audit at any moment.",
    tag: "CLOSED",
    days: "Funds realised",
    color: "#fbbf24",
  },
];

export const OpsWorkflow = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ops-el", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      gsap.from(".ops-rail", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.4,
        ease: "power2.inOut",
        scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % stages.length), STAGE_MS);
    return () => clearInterval(t);
  }, [isPaused]);

  return (
    <section
      ref={rootRef}
      className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Statutory Recovery Lifecycle"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-700/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(16,185,129,0.07),transparent_55%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <div className="ops-el text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
            The Statutory Recovery Lifecycle
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Every statutory deadline.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              On one connected timeline.
            </span>
          </h2>
          <p className="text-base text-slate-400 mt-4">
            From NPA account intake to final realisation, every clock is tracked and verified.
          </p>
        </div>

        {/* ═══ The Ladder ═══ */}
        <div className="relative max-w-4xl mx-auto">
          {/* The Rail */}
          <div className="ops-rail absolute left-[27px] lg:left-[35px] top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-emerald-500/60 via-cyan-500/50 to-amber-400/60" />

          <div className="space-y-5">
            {stages.map((s, i) => {
              const isActive = active === i;
              const isPast = active > i;
              return (
                <motion.button
                  key={s.name}
                  onClick={() => setActive(i)}
                  className={`ops-stage relative w-full text-left flex gap-5 lg:gap-7 group rounded-2xl transition-colors ${
                    isActive ? "" : "opacity-80"
                  }`}
                >
                  {/* node on the rail */}
                  <span className="relative z-10 shrink-0">
                    <motion.span
                      className="flex h-14 w-14 lg:h-[72px] lg:w-[72px] items-center justify-center rounded-2xl border-2 transition-all duration-300"
                      animate={{
                        borderColor: isActive ? s.color : isPast ? "rgba(52,211,153,0.35)" : "rgba(30,41,59,1)",
                        backgroundColor: isActive ? `${s.color}1c` : "rgba(15,23,42,0.95)",
                        scale: isActive ? 1.08 : 1,
                      }}
                      style={{ boxShadow: isActive ? `0 0 34px ${s.color}55` : "none" }}
                    >
                      <s.icon
                        className="h-6 w-6 lg:h-8 lg:w-8 transition-colors"
                        style={{ color: isActive || isPast ? s.color : "#475569" }}
                      />
                    </motion.span>
                    {isActive && (
                      <motion.span
                        className="absolute -inset-1.5 rounded-[20px] border-2 pointer-events-none"
                        style={{ borderColor: `${s.color}55` }}
                        animate={{ opacity: [0.8, 0.2, 0.8] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      />
                    )}
                  </span>

                  {/* card */}
                  <div
                    className={`flex-1 rounded-2xl border p-5 lg:p-7 transition-all duration-300 ${
                      isActive
                        ? "bg-slate-900/90 border-slate-700"
                        : "bg-slate-950/60 border-slate-800/70 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2.5">
                      <span
                        className="rounded-full px-3 py-1 text-xs font-extrabold tracking-widest border"
                        style={{
                          color: s.color,
                          borderColor: `${s.color}55`,
                          backgroundColor: `${s.color}12`,
                        }}
                      >
                        {s.tag}
                      </span>
                      <h3 className={`text-xl lg:text-2xl font-bold ${isActive ? "text-white" : "text-slate-300"}`}>
                        {s.name}
                      </h3>
                      {isActive ? (
                        <span className="ml-auto flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                          <Clock3 className="h-3.5 w-3.5" /> {s.days}
                        </span>
                      ) : isPast ? (
                        <ShieldCheck className="ml-auto h-5 w-5 text-emerald-500/70" />
                      ) : null}
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden text-base lg:text-lg text-slate-300 leading-relaxed"
                        >
                          {s.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* journey summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ops-el mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center"
          >
            <span className="text-base lg:text-lg text-slate-400">From intake to realisation —</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300 font-extrabold text-lg lg:text-2xl">
              every deadline on one timeline.
            </span>
            <ArrowRight className="h-5 w-5 text-slate-600" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
