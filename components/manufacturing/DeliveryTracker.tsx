"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Truck, Clock, User, CheckCircle2, AlertCircle } from "lucide-react";

const deliveries = [
  { id: "DLV-2024-0891", worker: "Rajesh Kumar", item: "CNC Machine Part A-42", status: "In Production", eta: "2:30 PM", priority: "High", color: "text-amber-400" },
  { id: "DLV-2024-0892", worker: "Sarah Chen", item: "Hydraulic Pump Seal", status: "Quality Check", eta: "4:15 PM", priority: "Medium", color: "text-blue-400" },
  { id: "DLV-2024-0893", worker: "Mike Rodriguez", item: "Conveyor Belt Section", status: "Assigned", eta: "Tomorrow 9:00 AM", priority: "Low", color: "text-slate-400" },
  { id: "DLV-2024-0894", worker: "Priya Nair", item: "Motor Controller V3", status: "Ready for Dispatch", eta: "1:00 PM", priority: "Urgent", color: "text-emerald-400" },
  { id: "DLV-2024-0895", worker: "David Okafor", item: "Steel Bracket Set", status: "Delayed - Awaiting Parts", eta: "TBD", priority: "High", color: "text-rose-400" },
];

export const DeliveryTracker = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof deliveries[number] | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleSelect = (delivery: typeof deliveries[number]) => {
    setSelected(delivery);
  };

  const filtered = deliveries.filter((d) =>
    d.id.toLowerCase().includes(query.toLowerCase()) ||
    d.worker.toLowerCase().includes(query.toLowerCase()) ||
    d.item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="py-20 lg:py-32 bg-slate-900/50 border-y border-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Instant delivery lookup
            </h2>
            <p className="text-slate-400">
              Type a delivery ID, worker name or item — no folders, no Excel,
              no waiting. Results appear as you type.
            </p>
          </div>
        </div>

        <motion.div
          className="relative max-w-xl mb-12 animate-in fade-in duration-500"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search delivery ID, worker or item..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-lg"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              ✕
            </button>
          )}
        </motion.div>

        {selected ? (
          <motion.div
            className="bg-slate-800/60 backdrop-blur rounded-2xl p-8 border border-slate-700 shadow-2xl animate-in fade-in slide-in-from-bottom-4"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-blue-400" />
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Delivery ID</span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">{selected.id}</div>

                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-teal-400" />
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Assigned worker</span>
                </div>
                <div className="text-xl font-semibold text-white">{selected.worker}</div>

                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">ETA</span>
                </div>
                <div className="text-xl font-semibold text-white">{selected.eta}</div>
              </div>

              <div className="w-full lg:w-64 space-y-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50">
                  <span className={`w-2 h-2 rounded-full ${selected.color}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wider ${selected.color}`}>
                    {selected.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Priority: {selected.priority}</span>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-sm text-slate-400">
                    Kailogic located this record instantly — no spreadsheet search required.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((delivery) => (
              <motion.div
                key={delivery.id}
                whileHover="bg-white/5"
                onClick={handleSelect.bind(null, delivery)}
                className="group cursor-pointer bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all animate-in fade-in duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-tighter">{delivery.id}</span>
                  <span className={`text-xs font-semibold uppercase ${delivery.color}`}>
                    {delivery.status}
                  </span>
                </div>
                <div className="text-lg font-semibold text-white mb-1">{delivery.item}</div>
                <div className="text-sm text-slate-400 mb-1">
                  <User className="w-4 h-4 mr-1 inline" /> {delivery.worker}
                </div>
                <div className="text-sm text-slate-500">
                  <Clock className="w-4 h-4 mr-1 inline" /> {delivery.eta}
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && query && (
              <motion.div
                className="col-span-full bg-slate-800/50 p-12 rounded-xl border border-dashed border-slate-700 text-center animate-in fade-in"
              >
                <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-500" />
                <p className="text-slate-400">No deliveries match "{query}"</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};