"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, CheckCircle2, ChevronRight } from "lucide-react";

const workers = [
  { id: "W-001", name: "Rajesh Kumar", role: "CNC Operator", shift: "Morning", station: "Station A-4", status: "Active", lastSeen: "2 min ago", color: "text-emerald-400" },
  { id: "W-002", name: "Sarah Chen", role: "Quality Inspector", shift: "Morning", station: "QC Bench 2", status: "Active", lastSeen: "5 min ago", color: "text-emerald-400" },
  { id: "W-003", name: "Mike Rodriguez", role: "Forklift Driver", shift: "Afternoon", station: "Loading Bay B", status: "Active", lastSeen: "1 min ago", color: "text-emerald-400" },
  { id: "W-004", name: "Priya Nair", role: "Assembly Lead", shift: "Morning", station: "Assembly Line 3", status: "On Break", lastSeen: "12 min ago", color: "text-amber-400" },
  { id: "W-005", name: "David Okafor", role: "Maintenance Tech", shift: "Night", station: "Maintenance Shop", status: "Off Duty", lastSeen: "Last night", color: "text-slate-500" },
  { id: "W-006", name: "Elena Volkov", role: "Welder", shift: "Afternoon", station: "Welding Bay 1", status: "Active", lastSeen: "3 min ago", color: "text-emerald-400" },
  { id: "W-007", name: "James Wilson", role: "Painter", shift: "Morning", station: "Paint Booth 2", status: "Active", lastSeen: "8 min ago", color: "text-emerald-400" },
  { id: "W-008", name: "Aisha Rahman", role: "Packing Lead", shift: "Afternoon", station: "Packing Station C", status: "Active", lastSeen: "4 min ago", color: "text-emerald-400" },
];

export const WorkerRecords = () => {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleRowClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filtered = workers.filter((w) =>
    w.name.toLowerCase().includes(query.toLowerCase()) ||
    w.role.toLowerCase().includes(query.toLowerCase()) ||
    w.station.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Worker directory & records
          </h2>
          <p className="text-slate-400">
            Every worker's role, shift, station and current status in one
            searchable place — no more opening individual Excel files.
          </p>
        </div>

        <div className="relative mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, role or station..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg"
          />
        </div>        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Worker ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Shift</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Station</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Last seen</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((worker) => {
                const isExpanded = expandedId === worker.id;
                return (
                  <>
                    <motion.tr
                      key={worker.id}
                      className="border-b border-white/5 group cursor-pointer animate-in fade-in slide-in-from-top-4 duration-500"
                      whileHover="bg-white/5"
                      onClick={() => handleRowClick(worker.id)}
                    >
                      <td className="px-6 py-4 text-sm font-mono text-slate-300">{worker.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{worker.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{worker.role}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{worker.shift}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{worker.station}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`flex items-center gap-1.5 ${worker.color}`}>
                          <span className="w-2 h-2 rounded-full" />
                          {worker.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-slate-500">{worker.lastSeen}</td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                      </td>
                    </motion.tr>

                    <AnimatePresence mode="wait">
                      {isExpanded && (
                        <motion.tr
                          key={`exp-${worker.id}`}
                          className="bg-slate-800/30 animate-in fade-in duration-300"
                        >
                          <td colSpan={8} className="px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-500 uppercase mb-1">Employee ID</p>
                                <p className="text-sm font-medium text-white">{worker.id}</p>
                              </div>
                              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-500 uppercase mb-1">Department</p>
                                <p className="text-sm font-medium text-white">{worker.role.split(" ")[0]}</p>
                              </div>
                              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-500 uppercase mb-1">Current Task</p>
                                <p className="text-sm font-medium text-white">Delivery {worker.id.slice(-3)} - Assembly</p>
                              </div>
                              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-500 uppercase mb-1">Records Format</p>
                                <p className="text-sm font-medium text-emerald-400">Digital in Kailogic</p>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              <p className="text-sm text-slate-300">
                                Record updated automatically — no manual Excel entry needed.
                              </p>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                    No workers match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          {filtered.length} of {workers.length} workers shown. All records are live in Kailogic.
        </p>
      </div>
    </section>
  );
};