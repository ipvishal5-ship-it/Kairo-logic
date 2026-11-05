"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Total Workers", value: "432", change: "+12 this month", icon: "👥", color: "text-blue-400" },
  { label: "Active Shifts", value: "89", change: "Running now", icon: "🏭", color: "text-teal-400" },
  { label: "Pending Deliveries", value: "23", change: "Due today", icon: "🚚", color: "text-amber-400" },
  { label: "Records Digitized", value: "100%", change: "Zero spreadsheets", icon: "📋", color: "text-emerald-400" },
];

export const WorkerDashboard = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Plant overview at a glance
            </h2>
            <p className="text-slate-400">
              Live counts update as workers clock in, jobs are assigned and
              deliveries move through the floor.
            </p>
          </div>

          <motion.button
            whileHover="scale-105"
            whileTap="scale-95"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium border border-slate-700 transition-all"
          >
            Refresh data
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all animate-in fade-in duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <span className={stat.color}>▲</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                <span className="text-teal-400">●</span> {stat.change}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};