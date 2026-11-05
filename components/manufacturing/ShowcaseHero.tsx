"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import {
  Users, Truck, PackageCheck, HardHat, Check, ArrowRight, Search,
} from "lucide-react";

const stats = [
  { value: "500+", label: "Workers managed in one system" },
  { value: "3 sec", label: "To find any record or delivery" },
  { value: "0", label: "Excel files needed" },
  { value: "24/7", label: "Live shopfloor visibility" },
];

/* live tiles cycling in the hero visual */
const tiles = [
  { icon: Users, name: "R. Mehra", sub: "Line B · A shift", color: "#60a5fa", tag: "CHECKED IN" },
  { icon: PackageCheck, name: "Order #8841", sub: "Line A · stage 3 of 4", color: "#818cf8", tag: "ON TRACK" },
  { icon: Truck, name: "DL-4471", sub: "Out for delivery · ETA 14:30", color: "#2dd4bf", tag: "LIVE" },
  { icon: HardHat, name: "MC-12", sub: "Maintenance in 3 days", color: "#fbbf24", tag: "SCHEDULED" },
  { icon: Users, name: "S. Kumar", sub: "Line C · B shift", color: "#34d399", tag: "CHECKED IN" },
  { icon: PackageCheck, name: "Order #8842", sub: "Packaging · QC passed", color: "#f472b6", tag: "READY" },
];

export const ShowcaseHero = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tileIdx, setTileIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-stat", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.6,
      });
      gsap.to(".hero-glow", {
        scale: 1.15,
        opacity: 0.35,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* cycle the visible tiles */
  useEffect(() => {
    const t = setInterval(() => setTileIdx((i) => (i + 1) % tiles.length), 2400);
    return () => clearInterval(t);
  }, []);

  /* type "DL-4471" then clear, loop */
  useEffect(() => {
    const word = "DL-4471";
    let i = 0;
    let dir: 1 | -1 = 1;
    const t = setInterval(() => {
      if (dir === 1) {
        i += 1;
        setQuery(word.slice(0, i));
        if (i >= word.length) {
          dir = -1;
          i = word.length;
          setTimeout(() => setTyping(false), 1600);
        }
      } else {
        i -= 1;
        setQuery(word.slice(0, Math.max(0, i)));
        if (i <= 0) {
          dir = 1;
          setTyping(true);
        }
      }
    }, 260);
    return () => clearInterval(t);
  }, []);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  const visibleTiles = [0, 1, 2].map((k) => tiles[(tileIdx + k) % tiles.length]);
  const matched = query && "DL-4471".startsWith(query.toUpperCase());

  return (
    <section
      ref={rootRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-slate-950"
    >
      {/* animated grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,132,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,132,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <motion.div style={{ y: yBg, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="hero-glow absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="hero-glow absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-teal-500/15 blur-[110px]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
        {/* ── left: copy ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-5 py-2 text-sm md:text-base font-semibold text-blue-300 border border-blue-500/30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
              </span>
              KAILOGIC · MANUFACTURING SUITE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]"
          >
            Run a 500-worker plant{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
              without a single Excel file.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 text-lg md:text-2xl text-slate-300 leading-relaxed"
          >
            Workers, shifts, machines and deliveries — unified into one
            instant, searchable command centre. Any detail is{" "}
            <span className="text-white font-semibold">3 seconds away</span>,
            not 3 folders away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#workflow"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-0.5"
            >
              See how it works
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#pain"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 hover:border-cyan-400/60 text-slate-200 hover:text-white rounded-xl font-semibold text-lg transition-all"
            >
              The Excel problem, visualised
            </a>
          </motion.div>

          {/* stat strip */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-slate-800 bg-slate-800/60">
            {stats.map((s) => (
              <div
                key={s.label}
                className="hero-stat bg-slate-950/95 px-6 py-6 backdrop-blur"
              >
                <div className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                  {s.value}
                </div>
                <div className="mt-2 text-sm lg:text-base text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── right: the live plant pulse ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden lg:block relative h-[560px]"
        >
          {/* stage frame */}
          <div className="absolute inset-3 rounded-3xl border border-slate-800/70 bg-slate-950/30" />

          {/* central hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-[0_0_70px_rgba(37,99,235,0.55)] border border-blue-400/40"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.6, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-4xl font-extrabold text-white tabular-nums">486</div>
                <div className="text-[10px] font-bold tracking-widest text-blue-200 uppercase">workers live</div>
              </div>
              {/* radar rings */}
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-3xl border border-blue-400/40 pointer-events-none"
                  animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.85, ease: "easeOut" }}
                />
              ))}
            </motion.div>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-sm font-semibold text-slate-300">
              the whole plant, one pulse
            </span>
          </div>

          {/* orbiting live tiles */}
          <div className="absolute inset-0 z-10">
            {[
              { top: "6%", left: "8%" },
              { top: "20%", right: "4%" },
              { bottom: "24%", left: "4%" },
            ].map((pos, k) => {
              const t = visibleTiles[k];
              const Icon = t.icon;
              return (
                <motion.div
                  key={`${tileIdx}-${k}`}
                  initial={{ opacity: 0, y: 16, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: k * 0.12 }}
                  className="absolute w-[230px] rounded-2xl border border-slate-700/80 bg-slate-900/90 backdrop-blur p-4 shadow-2xl"
                  style={pos as React.CSSProperties}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                      style={{ borderColor: `${t.color}55`, backgroundColor: `${t.color}1a` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: t.color }} />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-bold text-white">{t.name}</div>
                      <div className="truncate text-xs text-slate-500">{t.sub}</div>
                    </div>
                    <span
                      className="ml-auto shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-extrabold tracking-wide"
                      style={{ color: t.color, borderColor: `${t.color}44`, backgroundColor: `${t.color}12` }}
                    >
                      {t.tag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* the 3-second search bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[88%]">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur px-5 py-4 shadow-2xl shadow-blue-500/10">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 shrink-0 text-slate-500" />
                <div className="relative flex-1 overflow-hidden">
                  <span className="text-lg text-slate-200 font-medium">
                    {query}
                    {typing && (
                      <motion.span
                        className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 bg-cyan-400"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </span>
                  {!query && (
                    <span className="absolute left-0 top-0 text-lg text-slate-600">
                      Search any worker, order or delivery…
                    </span>
                  )}
                </div>
                <AnimatePresence>
                  {matched && query.length > 3 && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 shrink-0"
                    >
                      <Check className="h-3.5 w-3.5" /> FOUND
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="mt-3 text-center text-sm text-slate-500">
              Type a delivery ID — the answer, in <span className="text-cyan-300 font-semibold">3 seconds</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
