"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Boxes, Users, Wrench, ScanLine, PackageCheck, Truck,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stations = [
  {
    icon: Boxes,
    name: "Material In",
    desc: "Raw stock logged with drawings and BOM — quantities verified before a single job is cut.",
    metric: "BOM verified",
    color: "#60a5fa",
  },
  {
    icon: Users,
    name: "Workforce Assigned",
    desc: "Skilled workers matched to the job and shift automatically, from the central records pool.",
    metric: "Roster set",
    color: "#818cf8",
  },
  {
    icon: Wrench,
    name: "Production Line",
    desc: "Job moves through the line with live stage updates from the floor — no whiteboard, no register.",
    metric: "Live stages",
    color: "#c084fc",
  },
  {
    icon: ScanLine,
    name: "Quality & Serial QR",
    desc: "Inspection passed and a serial QR engraved — the unit becomes traceable for its whole life.",
    metric: "QR engraved",
    color: "#f472b6",
  },
  {
    icon: PackageCheck,
    name: "Packed & Ready",
    desc: "Packing confirmed against the order, dispatch paperwork generated from the same record.",
    metric: "Paperwork auto",
    color: "#2dd4bf",
  },
  {
    icon: Truck,
    name: "Dispatch",
    desc: "Loaded, tracked and searchable — the delivery ID answers any customer call in seconds.",
    metric: "On the road",
    color: "#34d399",
  },
];

const TRACK_MS = 2000;

export const PlantWorkflow = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..100 along the belt
  const [produced, setProduced] = useState(428);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pw-el", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* belt progress 0→100 looping, +1 unit each cycle */
  useEffect(() => {
    const start = Date.now();
    const CYCLE = TRACK_MS;
    const t = setInterval(() => {
      const p = ((Date.now() - start) % CYCLE) / CYCLE * 100;
      setProgress(p);
      if (p < 2) setProduced((v) => v + 1);
    }, 40);
    return () => clearInterval(t);
  }, []);

  // nearest station index from progress
  const stationIdx = Math.min(
    stations.length - 1,
    Math.floor(progress / (100 / stations.length))
  );

  return (
    <section ref={rootRef} className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(139,92,246,0.06),transparent_55%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="pw-el text-center mb-20">
          <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-semibold text-indigo-300 tracking-widest uppercase">
            Manufacturing · one unit&apos;s journey
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Follow one order{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-teal-400">
              down the line.
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Every unit passes the same stations. Kairologic rides along —
            recording, timing and numbering as it goes.
          </p>
        </div>

        {/* ═══ the conveyor ═══ */}
        <div className="pw-el relative">
          {/* belt bar */}
          <div className="relative h-2 rounded-full bg-slate-800/80 overflow-hidden mb-12">
            {/* moving stripes */}
            <motion.div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(148,163,184,0.25) 0 14px, transparent 14px 28px)",
              }}
              animate={{ backgroundPositionX: [0, 28] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            />
            {/* progress glow */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 via-fuchsia-500 to-teal-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.08, ease: "linear" }}
            />
          </div>

          {/* travelling pallet */}
          <motion.div
            className="absolute -top-9 z-30 hidden md:block"
            animate={{ left: `${progress}%`, x: "-50%" }}
            transition={{ duration: 0.08, ease: "linear" }}
          >
            <div className="rounded-lg border border-white/20 bg-slate-900 px-3 py-1.5 font-mono text-xs font-bold text-white shadow-xl shadow-fuchsia-500/20 flex items-center gap-1.5">
              <PackageCheck className="h-3.5 w-3.5 text-teal-300" />
              UNIT #{produced}
            </div>
            <div className="mx-auto mt-1 h-2 w-px bg-slate-600" />
          </motion.div>

          {/* stations */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
            {stations.map((s, i) => {
              const isActive = stationIdx === i;
              const isPast = stationIdx > i;
              return (
                <motion.div
                  key={s.name}
                  className="flex flex-col items-center text-center"
                  animate={{ y: isActive ? -4 : 0 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                >
                  {/* machine node */}
                  <div className="relative">
                    <motion.span
                      className="flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-2xl border-2 transition-colors duration-300"
                      animate={{
                        borderColor: isActive ? s.color : isPast ? "rgba(52,211,153,0.3)" : "rgba(30,41,59,1)",
                        backgroundColor: isActive ? `${s.color}1c` : "rgba(15,23,42,0.9)",
                      }}
                      style={{ boxShadow: isActive ? `0 0 30px ${s.color}55` : "none" }}
                    >
                      <s.icon
                        className="h-7 w-7 lg:h-9 lg:w-9"
                        style={{ color: isActive || isPast ? s.color : "#475569" }}
                      />
                    </motion.span>
                    {isActive && (
                      <>
                        <motion.span
                          className="absolute -inset-1 rounded-[18px] border pointer-events-none"
                          style={{ borderColor: `${s.color}66` }}
                          animate={{ opacity: [0.9, 0.15, 0.9] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                        {/* sparks */}
                        {[0, 1, 2].map((k) => (
                          <motion.span
                            key={k}
                            className="absolute h-1 w-1 rounded-full"
                            style={{ background: s.color, left: "50%", top: "50%" }}
                            animate={{
                              x: [0, (k - 1) * 34],
                              y: [0, -26 - k * 6],
                              opacity: [1, 0],
                            }}
                            transition={{ duration: 0.7, repeat: Infinity, delay: k * 0.18 }}
                          />
                        ))}
                      </>
                    )}
                  </div>

                  <span className="mt-3 text-xs font-mono tracking-widest text-slate-500">
                    ST-{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`mt-1.5 text-base lg:text-lg font-bold leading-snug ${isActive ? "text-white" : "text-slate-400"}`}>
                    {s.name}
                  </h3>
                  <span
                    className="mt-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-opacity"
                    style={{
                      color: s.color,
                      borderColor: `${s.color}44`,
                      opacity: isActive || isPast ? 1 : 0.35,
                    }}
                  >
                    {s.metric}
                  </span>
                  <p className="mt-2.5 text-sm text-slate-500 leading-relaxed hidden lg:block">
                    {s.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* counters */}
          <div className="pw-el mt-20 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-slate-800 bg-slate-800/60">
            {[
              { v: String(produced), l: "units down the line today" },
              { v: "486", l: "workers on live rosters" },
              { v: "6", l: "stations, one record" },
            ].map((s) => (
              <div key={s.l} className="bg-slate-950/95 px-6 py-6 text-center backdrop-blur">
                <div className="text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">
                  {s.v}
                </div>
                <div className="mt-2 text-sm lg:text-lg text-slate-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
