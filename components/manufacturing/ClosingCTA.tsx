"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Phone, MonitorPlay } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  "Centralised worker records for 500+ staff",
  "Automatic shift & task allocation",
  "Live production line monitoring",
  "Instant delivery search & tracking",
  "Role-based access & audit trail",
  "Management analytics & reports",
];

export const ClosingCTA = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-el", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative py-24 lg:py-32 bg-slate-950 border-t border-slate-800/60 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(56,132,255,0.12),transparent_60%)] pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <span className="cta-el inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-300 tracking-widest uppercase">
          Ready when you are
        </span>
        <h2 className="cta-el mt-6 text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Give your plant the system{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            it deserves.
          </span>
        </h2>
        <p className="cta-el mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Kailogic replaces the folder-and-Excel scramble with one organised,
          searchable, animated workspace — worker records, shift planning,
          production tracking and delivery details, all in seconds.
        </p>

        <div className="cta-el mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
          {capabilities.map((c) => (
            <motion.div
              key={c}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 shrink-0" />
              <span className="text-base md:text-lg text-slate-300">{c}</span>
            </motion.div>
          ))}
        </div>

        <div className="cta-el mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-0.5"
          >
            Book a live demo
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 hover:border-cyan-400/60 text-slate-300 hover:text-white rounded-xl font-semibold text-lg transition-all"
          >
            <Phone className="h-5 w-5" />
            Talk to our team
          </a>
        </div>

        <p className="cta-el mt-8 text-base text-slate-500 flex items-center justify-center gap-2">
          <MonitorPlay className="h-4 w-4" />
          Live walkthrough available — sample plant data included.
        </p>
      </div>
    </section>
  );
};
