"use client";

import { motion } from "motion/react";
import { ArrowRight, Phone, MapPin, Globe } from "lucide-react";
import { Reveal } from "./motion-primitives";
import { useEffect, useState } from "react";

export default function Contact() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <section id="contact" className="border-t border-line/60">
      <div className="relative overflow-hidden bg-grid">
        <div className="bg-glow absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-5 py-28 text-center">
          <Reveal>
            <p className="eyebrow mb-6">The Objective</p>
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold tracking-tight text-text sm:text-5xl md:leading-tight">
              Spend less time collecting data.{" "}
              <span className="text-accent">Spend more time on recovery.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted">
              Empowering Banks, FIs, HFCs & ARCs with intelligent SARFAESI solutions.
            </p>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+919892333340"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium text-white transition hover:opacity-90"
            >
              Request a demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </Reveal>
        </div>
      </div>

      <footer className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-5 py-12 md:flex-row md:items-start">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-white">
                K
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[15px] font-semibold tracking-wide text-text">KAIROLOGIC</span>
                <span className="font-mono text-[9px] tracking-[0.3em] text-muted">TECHNOLOGY</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-xs leading-5 text-muted">
              One case. One record. One source of information — from data to recovery.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-muted">
            <a href="tel:+919892333340" className="flex items-center gap-2.5 transition hover:text-text">
              <Phone className="h-4 w-4 text-accent" /> 9892 333 340
            </a>
            <span className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-accent" />
              504, Atlanta Estate, Opp. Oberoi Mall, Goregaon East, Mumbai
            </span>
            <a href="https://www.sarfaesi.in" className="flex items-center gap-2.5 transition hover:text-text">
              <Globe className="h-4 w-4 text-accent" /> www.sarfaesi.in
            </a>
          </div>
        </div>
        <div className="border-t border-line/60 py-5 text-center text-xs text-muted">
          © {year} Kairologic Technology. All rights reserved.
        </div>
      </footer>
    </section>
  );
}
