"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
  Line, LineChart,
} from "recharts";
import { SectionHeading, Counter } from "./motion-primitives";
import { pipeline, vintage, routes, trustAlerts } from "@/lib/data";

const tooltipStyle = {
  backgroundColor: "#111823",
  border: "1px solid #1e2a3a",
  borderRadius: "0.5rem",
  fontSize: "12px",
  color: "#e7ecf3",
};

export default function Dashboard() {
  const reduce = useReducedMotion();

  return (
    <section id="dashboard" className="border-t border-line/60 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Dashboards"
          title={
            <>
              From <span className="text-warn">STATUS</span> meetings to{" "}
              <span className="text-accent2">ACTION</span> meetings.
            </>
          }
          sub="Management can view the overall position of cases directly - pipeline, bottlenecks, recoveries and trends, in real time."
        />

        {/* Management KPIs */}
        <div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[
            { label: "Total Cases", v: 248, s: "" },
            { label: "Order Pending", v: 31, s: "" },
            { label: "Possession Pending", v: 46, s: "" },
            { label: "Auction & Sale", v: 22, s: "" },
          ].map((k, i) => (
            <motion.div
              key={k.label}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-7"
            >
              <p className="text-sm text-muted">{k.label}</p>
              <p className="mt-3 font-mono text-4xl font-semibold text-text">
                <Counter value={k.v} suffix={k.s} />
              </p>
            </motion.div>
          ))}
        </div>

        {/* pipeline bar */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card mt-8 p-7"
        >
          <p className="mb-5 font-mono text-xs tracking-widest text-muted uppercase">
            Case Pipeline — 248 total (illustrative)
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipeline} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid stroke="#1e2a3a" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="stage" tick={{ fill: "#aeb9c8", fontSize: 13 }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fill: "#aeb9c8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(79,124,255,0.06)" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={64}>
                {pipeline.map((_, i) => (
                  <Cell key={i} fill={i === pipeline.length - 1 ? "#22d3aa" : "#4f7cff"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ARC intelligence */}
        <div className="mt-24 grid gap-8 md:grid-cols-2">
            {/* vintage line */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-7"
            >
              <p className="mb-5 font-mono text-xs tracking-widest text-muted uppercase">
                Recovery vs Cost, by vintage (×)
              </p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={vintage} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                  <CartesianGrid stroke="#1e2a3a" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tick={{ fill: "#aeb9c8", fontSize: 13 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#aeb9c8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="multiple" stroke="#4f7cff" strokeWidth={3} dot={{ r: 4, fill: "#4f7cff" }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* routes donut */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-7"
            >
              <p className="mb-5 font-mono text-xs tracking-widest text-muted uppercase">
                Recovery by resolution route
              </p>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="52%" height={280}>
                  <PieChart>
                    <Pie data={routes} dataKey="value" innerRadius="60%" outerRadius="90%" paddingAngle={3} strokeWidth={0}>
                      {routes.map((r, i) => (
                        <Cell key={i} fill={r.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <ul className="flex-1 space-y-3 text-sm">
                  {routes.map((r) => (
                    <li key={r.name} className="flex items-center justify-between gap-3 text-muted">
                      <span className="flex items-center gap-2.5">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.fill }} />
                        {r.name}
                      </span>
                      <span className="font-mono text-base text-text">{r.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* trust alerts — 2 column, readable */}
          <div className="mt-20 grid gap-5 md:grid-cols-2">
            {trustAlerts.map((a, i) => (
              <motion.div
                key={a.t}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card border-l-2 border-l-warn p-7"
              >
                <p className="font-display text-lg font-semibold text-text">{a.t}</p>
                <p className="mt-2.5 text-base leading-7 text-muted">{a.d}</p>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  );
}

