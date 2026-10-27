"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, FileText, MapPin, Shield } from "lucide-react";
import { caseRecord, caseChips } from "@/lib/data";

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease: [0.21, 0.65, 0.36, 1] as const },
      };

  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="bg-glow absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-24 pt-20 md:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.p {...fade(0)} className="eyebrow mb-6">
            SARFAESI Intelligence
          </motion.p>
          <motion.h1
            {...fade(0.1)}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-[4.2rem]"
          >
            One case.
            <br />
            One record.
            <br />
            <span className="text-accent">Total control.</span>
          </motion.h1>
          <motion.p {...fade(0.25)} className="mt-7 max-w-xl text-lg leading-8 text-muted sm:text-xl">
            Spend less time collecting data. Spend more time on recovery.
            Every SARFAESI case — data, documents, photos, location — in a
            single digital record for Banks, NBFCs, HFCs &amp; ARCs.
          </motion.p>
          <motion.div {...fade(0.4)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Request a demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#record"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-muted transition hover:text-text"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        {/* self-assembling case record card + property visual */}
        <motion.div {...fade(0.5)} className="space-y-5">
          {/* hero property visualization — abstract SVG, no external image dependency */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="card relative overflow-hidden"
          >
            <div className="relative h-56 w-full sm:h-64">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 640 384"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden
              >
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(79, 124, 255, 0.35)" />
                    <stop offset="50%" stopColor="rgba(79, 124, 255, 0.12)" />
                    <stop offset="100%" stopColor="rgba(34, 211, 170, 0.08)" />
                  </linearGradient>
                  <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(30, 42, 58, 0.5)" />
                    <stop offset="100%" stopColor="rgba(10, 14, 20, 0.7)" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="640" height="384" fill="url(#gridGradient)" />
                <rect x="20" y="20" width="600" height="344" rx="12" fill="url(#heroGradient)" />
                <rect x="80" y="60" width="480" height="240" rx="8" fill="rgba(255,255,255,0.06)" />
                <rect x="120" y="90" width="80" height="80" rx="4" fill="rgba(79,124,255,0.4)" />
                <rect x="220" y="110" width="60" height="60" rx="4" fill="rgba(34,211,170,0.35)" />
                <rect x="300" y="80" width="100" height="100" rx="4" fill="rgba(79,124,255,0.25)" />
                <rect x="420" y="100" width="40" height="40" rx="3" fill="rgba(34,211,170,0.3)" />
                <path
                  d="M 120 200 L 560 200"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 120 230 L 560 230"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle cx="440" cy="140" r="8" fill="rgba(79,124,255,0.5)" />
                <circle cx="480" cy="170" r="6" fill="rgba(34,211,170,0.45)" />
              </svg>
            </div>
            <div className="flex items-center justify-between px-5 py-3">
              <span className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4 text-accent2" /> Secured asset · Mumbai
              </span>
              <span className="rounded-full bg-accent2/10 px-3 py-1 font-mono text-[11px] text-accent2">
                GEO-TAGGED
              </span>
            </div>
          </motion.div>

          <motion.div
            className="card p-6 shadow-2xl shadow-accent/5"
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            <div className="flex items-center justify-between border-b border-line pb-4">
              <p className="font-mono text-xs tracking-widest text-muted">CASE FILE</p>
              <span className="rounded-full border border-accent2/40 bg-accent2/10 px-2.5 py-0.5 font-mono text-[10px] text-accent2">
                LIVE
              </span>
            </div>
            <p className="mt-4 font-mono text-sm text-accent">{caseRecord.id}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted">Borrower</p>
                <p className="mt-1 font-medium text-text">{caseRecord.borrower}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Property</p>
                <p className="mt-1 font-medium text-text">{caseRecord.property}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Stage</p>
                <p className="mt-1 font-medium text-warn">{caseRecord.stage}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Next Action</p>
                <p className="mt-1 font-medium text-accent2">{caseRecord.next}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {caseChips.map((c, i) => (
                <motion.span
                  key={c}
                  initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.09 }}
                  className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs text-muted"
                >
                  {c}
                </motion.span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
              <div className="flex items-center gap-2 text-xs text-muted">
                <FileText className="h-3.5 w-3.5 text-accent" />
                {caseRecord.docs.length} linked documents
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <MapPin className="h-3.5 w-3.5 text-accent2" /> Geo-tagged
                <Shield className="ml-2 h-3.5 w-3.5 text-accent" /> Audited
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
