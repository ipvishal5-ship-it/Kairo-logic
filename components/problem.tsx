"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "./motion-primitives";
import { sources, excelProblems } from "@/lib/data";

export default function Problem() {
  const reduce = useReducedMotion();
  return (
    <section id="problem" className="border-t border-line/60 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="The Problem"
          title={
            <>
              One case? Six sources.<br />
              <span className="text-muted">No single view of the case.</span>
            </>
          }
          sub="Case information is scattered across six different places. Data is available — but information is not centralized."
        />

        {/* converging diagram: 6 nodes -> 1 record */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {sources.map((s, i) => (
              <motion.div
                key={s}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="card flex items-center justify-between px-4 py-3 text-sm text-muted"
              >
                {s}
                <span className="h-1.5 w-1.5 rounded-full bg-warn" />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-8">
            <svg
              viewBox="0 0 200 80"
              className="h-20 w-full max-w-sm text-line"
              aria-hidden
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.path
                  key={i}
                  d={`M 10 ${10 + i * 12} C 80 ${10 + i * 12}, 120 40, 190 40`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                />
              ))}
            </svg>
            <motion.div
              initial={reduce ? false : { scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="card flex items-center gap-5 px-8 py-6 ring-1 ring-accent/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent font-display font-bold text-white text-lg">
                1
              </span>
              <div className="text-center">
                <p className="font-display font-semibold text-text">One Case Record</p>
                <p className="text-xs text-muted">All stages. One place.</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* six limitations grid */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {excelProblems.map((p, i) => (
            <motion.div
              key={p.n}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="card group p-7 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <span className="font-mono text-sm font-semibold">{p.n}</span>
              </div>
              <p className="font-display text-xl font-semibold text-text">{p.t}</p>
              <p className="mt-3 text-base leading-7 text-muted">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
