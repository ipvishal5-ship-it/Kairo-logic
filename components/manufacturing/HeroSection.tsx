"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(79,124,255,0.03)1px,transparent1px),linear-gradient(90deg,rgba(79,124,255,0.03)1px,transparent1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-12 flex items-center gap-3 animate-in fade-in duration-500"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Manufacturing Workspace
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-400 border border-slate-700">
            Kailogic System
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-8 animate-in fade-in slide-in-from-top-4 duration-500"
        >
          Stop searching Excel. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Find any worker or delivery in seconds.
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mb-12 animate-in fade-in slide-in-from-top-4 duration-500"
        >
          For large manufacturing plants with hundreds of workers, keeping records,
          shift assignments and delivery details organised is a massive task. Kailogic
          replaces scattered spreadsheets with one connected, searchable system —
          animated, visual and instant.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-top-4 duration-500"
        >
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-500/25">
            See the workflow in action
          </button>
          <button className="px-8 py-4 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white rounded-xl font-semibold text-lg transition-all">
            Explore worker records
          </button>
        </motion.div>
      </div>

      {/* Visual divider showing before/after */}
      <div className="mt-20 border-t border-slate-800 relative">
        <motion.div
          className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-in fade-in duration-1000"
        />
      </div>
    </section>
  );
};