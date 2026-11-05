"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users, UserCheck, Clock, PackageCheck, Activity,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, Cell,
} from "recharts";

gsap.registerPlugin(ScrollTrigger);

const kpis = [
  { icon: Users, label: "Active Workers", value: 486, suffix: "", color: "text-blue-400", trend: "+12 today" },
  { icon: UserCheck, label: "On Shift Now", value: 312, suffix: "", color: "text-cyan-400", trend: "A shift" },
  { icon: Clock, label: "Avg. Lookup Time", value: 2.4, suffix: "s", color: "text-teal-400", trend: "-96% vs Excel" },
  { icon: PackageCheck, label: "Open Deliveries", value: 47, suffix: "", color: "text-violet-400", trend: "6 urgent" },
];

const outputData = [
  { day: "Mon", units: 1240, target: 1200 },
  { day: "Tue", units: 1380, target: 1200 },
  { day: "Wed", units: 1310, target: 1200 },
  { day: "Thu", units: 1490, target: 1200 },
  { day: "Fri", units: 1520, target: 1200 },
  { day: "Sat", units: 1180, target: 1200 },
  { day: "Sun", units: 980, target: 900 },
];

const utilisationData = [
  { line: "Line A", pct: 94 },
  { line: "Line B", pct: 87 },
  { line: "Line C", pct: 78 },
  { line: "Line D", pct: 91 },
  { line: "Packaging", pct: 68 },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => setDisplay(value % 1 !== 0 ? Math.round(obj.v * 10) / 10 : Math.round(obj.v)),
    });
    return () => { tween.kill(); };
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}{suffix}
    </span>
  );
}

export const LiveDashboard = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dash-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);
    return () => { ctx.revert(); };
  }, []);

  // simulate a live event feed
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => (p + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={rootRef} className="relative py-24 lg:py-32 bg-slate-950 border-t border-slate-800/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-semibold text-teal-300 tracking-widest uppercase">
            Live command centre
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold text-white tracking-tight">
            One screen. Every worker.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Every delivery.
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            This is what a plant supervisor sees the moment they open Kailogic —
            no opening files, no hunting through sheets.
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              className="dash-card relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <k.icon className={`h-5 w-5 ${k.color}`} />
                <span className="text-sm font-medium text-slate-400">{k.trend}</span>
              </div>
              <div className={`text-4xl font-extrabold ${k.color}`}>
                <AnimatedNumber value={k.value} suffix={k.suffix} />
              </div>
              <div className="mt-1.5 text-base text-slate-400">{k.label}</div>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${i === 0 ? "from-blue-500/60" : i === 1 ? "from-cyan-500/60" : i === 2 ? "from-teal-500/60" : "from-violet-500/60"
                } to-transparent`} />
            </motion.div>
          ))}
        </div>

        {/* charts row */}
        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          <motion.div
            className="dash-card rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-4 w-4 text-cyan-400" />
              <h3 className="text-base md:text-lg font-bold text-white">Weekly production output</h3>
              <span className="ml-auto text-sm text-slate-500 font-mono">units vs target</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={outputData}>
                <defs>
                  <linearGradient id="outGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#94a3b8" }}
                />
                <Area type="monotone" dataKey="target" stroke="#475569" strokeDasharray="4 4" fill="none" />
                <Area type="monotone" dataKey="units" stroke="#06b6d4" strokeWidth={2} fill="url(#outGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="dash-card rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-4 w-4 text-blue-400" />
              <h3 className="text-base md:text-lg font-bold text-white">Line utilisation — right now</h3>
              <span className="ml-auto text-sm text-slate-500 font-mono">live</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={utilisationData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis type="category" dataKey="line" stroke="#475569" fontSize={11} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: any) => [`${v}%`, "Utilisation"]}
                />
                <Bar dataKey="pct" radius={[0, 6, 6, 0]} barSize={16}>
                  {utilisationData.map((d, i) => (
                    <Cell key={i} fill={d.pct >= 90 ? "#14b8a6" : d.pct >= 75 ? "#06b6d4" : "#f59e0b"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* live event ticker */}
        <motion.div
          className="dash-card rounded-2xl border border-slate-800 bg-slate-900/50 p-5 font-mono text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-teal-400" />
            </span>
            <span className="text-teal-300 font-bold text-sm tracking-widest uppercase">Live activity feed</span>
          </div>
          <div className="space-y-1.5 text-slate-500">
            {[
              "worker R.Mehra (ID W-0287) checked in to Line B · 09:41",
              "delivery DL-4471 status → OUT FOR DELIVERY · ETA 14:30",
              "shift assignment auto-updated: 8 workers → Line C afternoon",
              "machine MC-12 maintenance due in 3 days — task created",
            ].map((line, i) => (
              <motion.div
                key={i}
                animate={{ opacity: pulse === i ? 1 : 0.4 }}
                transition={{ duration: 0.6 }}
                className="flex gap-3"
              >
                <span className="text-slate-500">›</span>
                <span className={pulse === i ? "text-slate-200" : ""}>{line}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
