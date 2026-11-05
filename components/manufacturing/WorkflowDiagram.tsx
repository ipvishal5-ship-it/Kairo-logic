"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Factory, Users, ClipboardList, PackageSearch, Truck, LineChart,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    icon: Factory,
    title: "Plant Setup",
    desc: "Register machines, production lines and departments in one place.",
    detail: "Machines · Lines · Departments",
    color: "#60a5fa",
  },
  {
    icon: Users,
    title: "Worker Records",
    desc: "Every worker's profile, skills, shifts and history — centralised.",
    detail: "500+ profiles · Skills · Shift rosters",
    color: "#818cf8",
  },
  {
    icon: ClipboardList,
    title: "Shift & Task Allocation",
    desc: "Assign workers to lines and jobs automatically, no spreadsheet juggling.",
    detail: "Auto roster · Skill matching",
    color: "#a78bfa",
  },
  {
    icon: PackageSearch,
    title: "Production Tracking",
    desc: "Live status of every order on every line — visible at a glance.",
    detail: "Real-time · Per-line status",
    color: "#f472b6",
  },
  {
    icon: Truck,
    title: "Delivery & Dispatch",
    desc: "Track every delivery end-to-end with instant search by ID.",
    detail: "Live tracking · Search by ID",
    color: "#2dd4bf",
  },
  {
    icon: LineChart,
    title: "Analytics & Reports",
    desc: "Management gets trends, utilisation and delivery performance — live.",
    detail: "Dashboards · Reports",
    color: "#34d399",
  },
];

export const WorkflowDiagram = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wf-step", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".wf-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % stages.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="workflow"
      ref={rootRef}
      className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,124,255,0.06),transparent_65%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="wf-heading text-center mb-16">
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-300 tracking-widest uppercase">
            How it works
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            One connected flow, from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              worker to delivery
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every stage of plant life flows through Kailogic — no hand-copied
            registers, no missing files.
          </p>
        </div>

        {/* diagram */}
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-px bg-gradient-to-r from-blue-500/30 via-cyan-500/40 to-teal-500/30" />

          {stages.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={s.title}
                onClick={() => setActive(i)}
                whileHover={{ y: -6 }}
                className="wf-step relative flex flex-col items-center text-center group"
              >
                <span
                  className="relative z-10 flex items-center justify-center rounded-2xl border h-20 w-20 transition-all duration-300"
                  style={{
                    borderColor: isActive ? s.color : "rgba(51,65,85,1)",
                    backgroundColor: isActive ? `${s.color}1f` : "rgba(15,23,42,0.9)",
                    boxShadow: isActive ? `0 0 30px ${s.color}44` : "none",
                  }}
                >
                  <s.icon
                    className="h-9 w-9 transition-colors duration-300"
                    style={{ color: isActive ? s.color : "#64748b" }}
                  />
                </span>
                <span className="mt-4 text-[11px] font-mono text-slate-500 tracking-widest">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="mt-2 text-base lg:text-lg font-bold leading-snug transition-colors duration-300"
                  style={{ color: isActive ? "#fff" : "#94a3b8" }}
                >
                  {s.title}
                </span>
                <span className="mt-2 text-sm text-slate-500 leading-relaxed hidden md:block">
                  {s.detail}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* active stage description */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-14 mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 p-8 lg:p-10 backdrop-blur"
        >
          <div className="flex items-center gap-4 mb-4">
              {(() => {
              const s = stages[active];
              const Icon = s.icon;
              return (
                <>
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: `${s.color}55`,
                      backgroundColor: `${s.color}1a`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: s.color }} />
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    {s.title}
                  </h3>
                </>
              );
            })()}
          </div>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            {stages[active].desc}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
