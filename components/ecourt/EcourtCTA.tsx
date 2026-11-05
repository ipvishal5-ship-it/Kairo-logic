"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Monitor, MessageSquare } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  { n: "1", title: "Drop the documents", desc: "Put the case folder's PDFs and scans into the input folder — order is handled naturally, so Exhibit 2 stays before Exhibit 10." },
  { n: "2", title: "Click RUN", desc: "One button. The tick-list shows every step light up green as it finishes — no guessing what it is doing." },
  { n: "3", title: "Upload with confidence", desc: "Portal-ready parts land in the output folder with a written report of every step, size and timing." },
];

export const EcourtCTA = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ecta-el", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative py-24 lg:py-32 bg-slate-950 border-t border-slate-800/60 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(56,132,255,0.12),transparent_60%)] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <span className="ecta-el inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 tracking-widest uppercase">
          Getting started
        </span>
        <h2 className="ecta-el mt-6 text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Three steps. Then it is{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            just a habit.
          </span>
        </h2>

        <div className="ecta-el mt-14 grid md:grid-cols-3 gap-5 text-left">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              whileHover={{ y: -5 }}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-7"
            >
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400/70 to-teal-400/40">
                {s.n}
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-3 text-base lg:text-lg text-slate-400 leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-4 h-5 w-5 text-slate-700" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="ecta-el mt-14 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-0.5"
          >
            <Monitor className="h-5 w-5" />
            Get Kairologic Lex for your team
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 hover:border-cyan-400/60 text-slate-300 hover:text-white rounded-xl font-semibold text-lg transition-all"
          >
            <MessageSquare className="h-5 w-5" />
            Talk to us about your filing portal
          </a>
        </div>
        <p className="ecta-el mt-8 text-base text-slate-500">
          Installed in minutes · no admin rights needed · works without internet
        </p>
      </div>
    </section>
  );
};
