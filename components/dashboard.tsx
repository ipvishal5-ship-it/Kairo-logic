"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Reveal } from "./motion-primitives";
const names = [
  "Filing",
  "Order pending",
  "Possession pending",
  "Auction & sale",
  "Closed",
];
const nextActions = [
  "Review filing readiness and supporting documents.",
  "Review the pending court orders with the legal team.",
  "Coordinate possession with the field team.",
  "Review auction readiness and sale records.",
  "Review recovery outcomes and closure records.",
];
const portfolios = {
  Bank: { values: [19, 31, 46, 22, 130], trend: [48, 62, 80, 96, 112, 130] },
  ARC: { values: [12, 22, 28, 18, 80], trend: [31, 43, 54, 62, 74, 80] },
};
export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<keyof typeof portfolios>("Bank");
  const [selected, setSelected] = useState(2);
  const reduce = useReducedMotion();
  const data = portfolios[portfolio];
  const total = data.values.reduce((a, b) => a + b, 0);
  const closed = data.values[4];
  const percent = Math.round((closed / total) * 100);
  const trend = data.trend.map((count, i) => ({
    month: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"][i],
    count,
  }));
  return (
    <section id="dashboard" className="section-block dashboard-section">
      <div className="page-shell">
        <Reveal className="split-heading">
          <div>
            <p className="eyebrow">CLARITY THAT LEADS TO ACTION</p>
            <h2>
              See the movement.
              <br />
              <span className="accent-heading">Spot the bottleneck.</span>
            </h2>
          </div>
          <p className="section-description">
            A clear view of your portfolio.
            <br />A focused next step for your team.
          </p>
        </Reveal>
        <Reveal className="dashboard-shell">
          <div className="dashboard-toolbar">
            <div>
              <span className="status-dot" />
              <strong>Portfolio overview</strong>
            </div>
            <div className="dashboard-controls">
              <span className="sample-pill">Illustrative data</span>
              <div
                className="segmented"
                role="group"
                aria-label="Choose an illustrative portfolio"
              >
                {(["Bank", "ARC"] as const).map((p) => (
                  <button
                    key={p}
                    aria-pressed={p === portfolio}
                    onClick={() => setPortfolio(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="dashboard-metrics">
            <div>
              <span>Total cases</span>
              <strong key={`total-${portfolio}`}>
                {total}
                <small>cases</small>
              </strong>
            </div>
            <div>
              <span>Active pipeline</span>
              <strong>
                {total - closed}
                <small>cases</small>
              </strong>
            </div>
            <div>
              <span>Possession pending</span>
              <strong className="amber-value">
                {data.values[2]}
                <small>cases</small>
              </strong>
            </div>
            <div>
              <span>Closed cases</span>
              <strong className="teal-value">
                {closed}
                <ArrowUpRight size={23} />
              </strong>
            </div>
          </div>
          <div className="dashboard-grid">
            <div className="pipeline-panel">
              <div className="chart-heading">
                <h3>The case pipeline</h3>
                <span>SELECT A STAGE</span>
              </div>
              <div
                className="pipeline-bars"
                role="group"
                aria-label="Cases by stage"
              >
                {names.map((name, i) => (
                  <button
                    className={`pipeline-row ${selected === i ? "selected" : ""}`}
                    key={name}
                    aria-pressed={selected === i}
                    onClick={() => setSelected(i)}
                  >
                    <span className="bar-label">{name}</span>
                    <span className="bar-track">
                      <motion.span
                        className={i === 4 ? "bar-fill teal" : "bar-fill"}
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{
                          width: `${(data.values[i] / Math.max(...data.values)) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: reduce ? 0 : 0.75,
                          delay: reduce ? 0 : i * 0.06,
                        }}
                      />
                    </span>
                    <strong>{data.values[i]}</strong>
                  </button>
                ))}
              </div>
              <div className="pipeline-insight" aria-live="polite">
                <span className="insight-dot" />
                <div>
                  <strong>
                    {data.values[selected]} {names[selected].toLowerCase()}{" "}
                    cases
                  </strong>
                  <p>{nextActions[selected]}</p>
                </div>
                <ArrowRight size={19} />
              </div>
            </div>
            <div className="closure-panel">
              <div className="chart-heading">
                <h3>Closure progress</h3>
                <span>OF ALL CASES</span>
              </div>
              <div className="donut-wrap">
                <svg
                  viewBox="0 0 200 200"
                  role="img"
                  aria-label={`${percent} percent closed, ${closed} of ${total} cases`}
                >
                  <circle className="donut-track" cx="100" cy="100" r="78" />
                  <motion.circle
                    className="donut-value"
                    cx="100"
                    cy="100"
                    r="78"
                    pathLength="100"
                    initial={reduce ? false : { strokeDasharray: "0 100" }}
                    whileInView={{
                      strokeDasharray: `${(closed / total) * 100} 100`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: reduce ? 0 : 1 }}
                  />
                </svg>
                <div className="donut-center">
                  <strong>
                    {percent}
                    <span>%</span>
                  </strong>
                  <span>closed</span>
                </div>
              </div>
              <div className="donut-legend">
                <span>
                  <i />
                  {closed} closed
                </span>
                <span>
                  <i />
                  {total - closed} active
                </span>
              </div>
            </div>
          </div>
          <div className="trend-panel">
            <div>
              <p className="small-label">THE BIGGER PICTURE</p>
              <h3>
                Recovery is a journey.
                <br />
                See your progress.
              </h3>
              <p>Cumulative case closures · sample six-month view</p>
            </div>
            <div
              className="trend-chart"
              role="img"
              aria-label={`Illustrative cumulative closed cases from April to September: ${data.trend.join(", ")}`}
            >
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart
                  data={trend}
                  margin={{ top: 12, right: 12, left: 12, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="closureGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#22d3aa"
                        stopOpacity={0.25}
                      />
                      <stop offset="100%" stopColor="#22d3aa" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#b2bfce", fontSize: 13 }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={12}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#111823",
                      border: "1px solid #33455d",
                      borderRadius: 10,
                      color: "#e7ecf3",
                    }}
                    formatter={(value) => [value, "Closed cases"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#22d3aa"
                    strokeWidth={3}
                    fill="url(#closureGradient)"
                    isAnimationActive={!reduce}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
        <p className="demo-note">
          Interactive product illustration. Case counts and trends are sample
          data.
        </p>
      </div>
    </section>
  );
}
