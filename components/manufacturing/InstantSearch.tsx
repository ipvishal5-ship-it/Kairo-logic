"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Truck, MapPin, Package, Phone, FileText, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Delivery {
  id: string;
  customer: string;
  status: string;
  eta: string;
  from: string;
  to: string;
  items: string;
  contact: string;
  color: string;
}

const deliveries: Delivery[] = [
  { id: "DL-4471", customer: "Sterling Auto Works", status: "Out for delivery", eta: "14:30 today", from: "Plant 2 · Line B", to: "Chennai · Guindy", items: "2× CNC jig sets", contact: "+91 98400 22110", color: "cyan" },
  { id: "DL-4389", customer: "Meridian Fabrication", status: "Delivered", eta: "Yesterday 11:05", from: "Plant 1", to: "Coimbatore", items: "Steel brackets, 480 pcs", contact: "+91 98400 77203", color: "teal" },
  { id: "DL-4512", customer: "Aurora Motors", status: "Packed — pending dispatch", eta: "Tomorrow 09:00", from: "Plant 2 · Line C", to: "Pune · Chakan", items: "Gear housing assemblies", contact: "+91 98400 55871", color: "amber" },
  { id: "DL-4498", customer: "Vertex Engineering", status: "In production", eta: "Oct 29 · 16:00", from: "Plant 1 · Line A", to: "Hosur", items: "Hydraulic manifolds", contact: "+91 98400 90312", color: "blue" },
];

const statusColors: Record<string, string> = {
  "Out for delivery": "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
  "Delivered": "text-teal-300 bg-teal-500/10 border-teal-500/30",
  "Packed — pending dispatch": "text-amber-300 bg-amber-500/10 border-amber-500/30",
  "In production": "text-blue-300 bg-blue-500/10 border-blue-500/30",
};

export const InstantSearch = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Delivery | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sr-el", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const filtered = deliveries.filter(
    (d) =>
      d.id.toLowerCase().includes(query.toLowerCase()) ||
      d.customer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section ref={rootRef} className="relative py-24 lg:py-32 bg-slate-950 border-t border-slate-800/60 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.08),transparent_55%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sr-el text-center mb-14">
          <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-semibold text-cyan-300 tracking-widest uppercase">
            The urgent-call killer
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold text-white tracking-tight">
            Urgent delivery question?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              Type it. Done.
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            This search box is live — try it yourself. Type “DL-4471”, or a
            customer name, and watch every detail appear instantly.
          </p>
        </div>

        <div className="sr-el max-w-4xl mx-auto">
          {/* search bar */}
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur shadow-2xl shadow-cyan-500/5 overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-5">
              <Search className="h-6 w-6 text-slate-500 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
                placeholder="Search delivery ID or customer…  try “DL-4471”"
                className="w-full bg-transparent text-white placeholder-slate-600 text-lg outline-none font-medium"
              />
              <AnimatePresence mode="wait">
                <motion.kbd
                  key={query ? "clear" : "hint"}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="shrink-0 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-500 font-mono"
                >
                  {query ? `${filtered.length} match${filtered.length === 1 ? "" : "es"}` : "⌘K"}
                </motion.kbd>
              </AnimatePresence>
            </div>

            {/* results */}
            <AnimatePresence>
              {query && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-800"
                >
                  {filtered.length === 0 ? (
                    <div className="px-6 py-8 text-center text-slate-400 text-base">
                      No delivery matches “{query}” — in a real plant this is where
                      you&apos;d be stuck. Here, it just means try another ID.
                    </div>
                  ) : (
                    filtered.map((d) => (
                      <motion.button
                        key={d.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => setSelected(d)}
                        className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-800/50 transition-colors text-left border-b border-slate-800/60 last:border-0"
                      >
                        <Truck className="h-4 w-4 text-slate-500 shrink-0" />
                        <span className="font-mono font-bold text-cyan-300">{d.id}</span>
                        <span className="text-white font-medium text-base">{d.customer}</span>
                        <span className={`ml-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium border ${statusColors[d.status]}`}>
                          {d.status}
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-600" />
                      </motion.button>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* detail panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="mt-6 rounded-2xl border border-cyan-500/25 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur p-8 shadow-2xl shadow-cyan-500/10"
              >
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div>
                    <div className="font-mono font-bold text-xl text-white">{selected.id}</div>
                    <div className="text-base md:text-lg text-slate-300">{selected.customer}</div>
                  </div>
                  <span className={`ml-auto rounded-full px-3 py-1.5 text-xs font-semibold border ${statusColors[selected.status]}`}>
                    {selected.status}
                  </span>
                </div>

                {/* mini route visual */}
                <div className="mb-6 relative h-16 rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                  <div className="absolute top-1/2 left-8 right-8 h-px bg-slate-700" />
                  <motion.div
                    className="absolute top-1/2 left-8 h-px bg-gradient-to-r from-cyan-400 to-teal-400 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: selected.status === "Delivered" ? 1 : selected.status === "Out for delivery" ? 0.7 : 0.35 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ width: "calc(100% - 4rem)" }}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 flex items-center gap-1.5 text-sm text-slate-400">
                    <Package className="h-3.5 w-3.5 text-slate-400" /> {selected.from}
                  </div>
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: selected.status === "Delivered" ? "calc(100% - 9.5rem)" : "calc(2rem + 70% * 0.7)" }}
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Truck className="h-5 w-5 text-cyan-300" />
                  </motion.div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-1.5 text-sm text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-teal-400" /> {selected.to}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: Clock2Icon, label: "ETA", value: selected.eta },
                    { icon: Package, label: "Items", value: selected.items },
                    { icon: Phone, label: "Contact", value: selected.contact },
                    { icon: FileText, label: "Full history", value: "Every scan, every note" },
                  ].map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="rounded-xl border border-slate-800 bg-slate-900/50 p-4"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <f.icon className="h-3.5 w-3.5 text-slate-500" />
                        <span className="text-sm uppercase tracking-wider text-slate-400 font-semibold">{f.label}</span>
                      </div>
                      <div className="text-base md:text-lg text-white font-medium">{f.value}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

function Clock2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
