"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Lock, CheckCheck, FileSearch,
  Scan, FileText, Cloud, KeyRound,
} from "lucide-react";

const verificationFeatures = [
  {
    icon: CheckCheck,
    title: "Page-Count Validation",
    desc: "Automated pre-flight and post-flight verification checks ensure the input page count strictly matches the final exported dossier before release.",
  },
  {
    icon: FileSearch,
    title: "Selective OCR Processing",
    desc: "Detects existing text layers automatically and only processes scanned images, preserving vector clarity where text already exists.",
  },
  {
    icon: Scan,
    title: "Court-Standard 300 DPI Rendering",
    desc: "Scans are processed at court-recommended 300 DPI baselines to maintain document legibility without aggressive compression artifacts.",
  },
  {
    icon: FileText,
    title: "Detailed Inspection Logs",
    desc: "Generates an automated summary log showing file sizes, page splits, and Bates number ranges so your team can verify before portal upload.",
  },
];

export const SafetyPrivacy = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={rootRef} className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 bg-slate-950 border-t border-slate-800/60 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Cloud Security Banner */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-slate-900/80 p-8 lg:p-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-[100px] pointer-events-none" />
          <div className="relative grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-10 items-center">
            <div className="flex h-20 w-20 lg:h-24 lg:w-24 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/15 shrink-0">
              <Cloud className="h-10 w-10 lg:h-12 lg:w-12 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Your documents, secured in the cloud.
              </h2>
              <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
                Kairologic Lex runs as a web service, so your team works from any
                authorised device without installing software or passing files around.
                Every document is encrypted in transit and at rest, with access gated
                to the roles you define.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { icon: Lock, text: "Encrypted in transit and at rest" },
                  { icon: KeyRound, text: "Role-based access control" },
                  { icon: ShieldCheck, text: "No local installation needed" },
                ].map((b) => (
                  <span key={b.text} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-300">
                    <b.icon className="h-4 w-4" /> {b.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verification & Integrity Features */}
        <div className="text-center mb-12 lg:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 tracking-widest uppercase"
          >
            Document Integrity &amp; Auditing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Built for document integrity and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              verifiable filings
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Automated checksums, page-count validation, and non-destructive processing ensure your original documents remain intact and portal-compliant.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {verificationFeatures.map((p, i) => (
            <motion.div
              key={p.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 lg:p-8 hover:border-slate-700 transition-colors"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/30 mb-4">
                <p.icon className="h-5 w-5 text-blue-300" />
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2.5">{p.title}</h3>
              <p className="text-sm lg:text-base text-slate-400 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
