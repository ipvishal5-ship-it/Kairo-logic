"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "./motion-primitives";
import { documents } from "@/lib/data";

const stages = [
  { n: "01", t: "Borrower & Loan", d: "Account & loan details" },
  { n: "02", t: "Legal Status", d: "Case standing & court info" },
  { n: "03", t: "Section 13(2)/(4)", d: "Demand & possession notices" },
  { n: "04", t: "Section 14 Order", d: "COT / DRT order received" },
  { n: "05", t: "Physical Possession", d: "Site visit & possession" },
  { n: "06", t: "Documents", d: "All case-linked files" },
  { n: "07", t: "Geo-Location", d: "Property location pinned" },
  { n: "08", t: "Recovery & Closure", d: "Auction, sale, closed" },
];

export default function Record() {
  const reduce = useReducedMotion();
  return (
    <section id="record" className="border-t border-line/60 py-24 bg-surface/30">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="The Record"
          title={
            <>
              One digital record.<br />
              <span className="text-muted">Every stage. One place.</span>
            </>
          }
          sub="Everything important follows the case — data, documents, photos, location — ready for every field visit."
        />

        {/* 8-stage timeline */}
        <div className="mt-20 relative">
          <div className="absolute left-1/2 -top-1/2 w-[1px] h-full bg-line/40 hidden lg:block" />
          <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-8">
            {stages.map((s, i) => (
              <motion.div
                key={s.n}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex flex-col items-center gap-3 relative"
              >
                <span
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-[10px] font-mono font-bold transition-all
                    ${i === 0 ? "border-accent bg-accent text-white shadow-lg shadow-accent/30" : "border-line/60 text-muted bg-ink"}`}
                >
                  {s.n}
                </span>
                <p className="text-center text-xs font-display font-semibold text-text leading-tight">{s.t}</p>
                <p className="text-center text-[10px] leading-4 text-muted">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* case record preview card */}
        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-7"
          >
            <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-5">
              <p className="font-mono text-xs tracking-widest text-muted">CASE FILE</p>
              <span className="rounded-full border border-accent2/40 bg-accent2/10 px-2.5 py-0.5 font-mono text-[10px] text-accent2">
                LIVE
              </span>
            </div>
            <p className="mb-5 font-mono text-sm text-accent">Case #2026-0148</p>
            <div className="space-y-3">
              {[
                { label: "Borrower", value: "ABC Industries" },
                { label: "Property", value: "Industrial Unit, Mumbai" },
                { label: "Stage", value: "Section 14 Order Received" },
                { label: "Next Action", value: "Physical Possession" },
              ].map((f) => (
                <div key={f.label} className="flex justify-between text-sm">
                  <p className="text-muted">{f.label}</p>
                  <p className="font-medium text-text">{f.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card p-7"
          >
            <p className="mb-4 font-mono text-[10px] tracking-widest text-muted uppercase">Linked Documents</p>
            <div className="space-y-3">
              {documents.map((d) => (
                <motion.div
                  key={d.t}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + documents.indexOf(d) * 0.05 }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg border border-line/60 bg-ink/40 text-sm"
                >
                  <span className="w-8 text-[10px] font-mono text-accent2">{d.tag}</span>
                  <p className="flex-1 font-medium text-text">{d.t}</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-line/60" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* auto-generated documents */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Auto-Generated Documents"
            title="Prepared from the case data. No retyping."
            sub="Notices and records are generated from the case itself — no copy-paste errors."
          />
          {documents.map((d, i) => (
            <motion.div
              key={d.t}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="card group p-6"
            >
              <span className="font-mono text-[10px] tracking-widest text-accent2 uppercase">
                {d.tag}
              </span>
              <div className="mt-4 h-28 rounded-lg border border-line bg-ink/60 p-3 font-mono text-[10px] leading-4 text-muted">
                <span className="block text-accent">{d.t.toUpperCase()}</span>
                <span className="mt-1 block opacity-40 group-hover:opacity-80 transition-opacity">
                  ── populated from case #2026-0148 ──
                </span>
                <span className="mt-2 block opacity-0 transition-opacity duration-500 group-hover:opacity-70">
                  borrower: ABC Industries
                  <br />
                  account & loan ✓ &nbsp; property ✓ &nbsp; stage ✓
                </span>
              </div>
              <p className="mt-4 font-display text-base font-semibold text-text">{d.t}</p>
              <p className="mt-1.5 text-sm leading-6 text-muted">{d.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
