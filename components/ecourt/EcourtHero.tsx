"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ScanText, ArrowRight, ShieldOff, Clock3, Check,
  Stamp, Hash, FileType2, FileWarning, FileText,
  FileDown, Split, Sparkles, Play, Pause, RotateCcw,
  ShieldCheck, CheckCircle2, Lock, FileCheck, Scale,
  AlertTriangle, Cpu, Layers, HardDrive, Eye
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ────────── PIPELINE STAGES ────────── */
interface PipelineStep {
  id: string;
  num: string;
  icon: typeof FileType2;
  label: string;
  shortLabel: string;
  tagline: string;
  metric: string;
  color: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "merge",
    num: "01",
    icon: FileType2,
    label: "Merge Case Files",
    shortLabel: "Merge",
    tagline: "3 PDFs & scans combined into one indexed docket",
    metric: "3 Files → 1 Dossier",
    color: "#38bdf8", // Sky blue
  },
  {
    id: "ocr",
    num: "02",
    icon: ScanText,
    label: "Smart OCR Recognition",
    shortLabel: "OCR",
    tagline: "300 DPI image scans converted to searchable text layer",
    metric: "142/142 Pages Searchable",
    color: "#2dd4bf", // Teal
  },
  {
    id: "compress",
    num: "03",
    icon: FileDown,
    label: "Dynamic Compression",
    shortLabel: "Compress",
    tagline: "Downsampled without quality loss for court portal upload",
    metric: "48.4 MB → 6.8 MB (-86%)",
    color: "#818cf8", // Indigo
  },
  {
    id: "numbering",
    num: "04",
    icon: Hash,
    label: "Bates Numbering",
    shortLabel: "Bates",
    tagline: "Every page paginated exactly where the court portal requires",
    metric: "Page 14 of 142 Stamped",
    color: "#34d399", // Emerald
  },
  {
    id: "seal",
    num: "05",
    icon: Stamp,
    label: "Bank Seal Affixation",
    shortLabel: "Bank Seal",
    tagline: "Authorized bank recovery seal applied with tamper verification",
    metric: "Official Seal Applied",
    color: "#fbbf24", // Amber Gold
  },
  {
    id: "split",
    num: "06",
    icon: Split,
    label: "Portal Splitting",
    shortLabel: "Split",
    tagline: "Intelligently divided into sub-10 MB court filing bundles",
    metric: "2 Parts < 10 MB Ceiling",
    color: "#60a5fa", // Blue
  },
];

/* ────────── MINI DOCUMENT LINES ────────── */
function DocLines({ widths, tone = "raw" }: { widths: number[]; tone?: "raw" | "done" | "ocr" }) {
  return (
    <div className="px-3.5 py-2.5 space-y-1.5">
      {widths.map((w, j) => (
        <div
          key={j}
          className={`h-1.5 rounded-full transition-colors duration-500 ${
            tone === "done"
              ? "bg-teal-400/40"
              : tone === "ocr"
              ? "bg-sky-400/40"
              : "bg-slate-700/60"
          }`}
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}

/* ────────── MAIN COMPONENT ────────── */
export const EcourtHero = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ec-stat", {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1,
        ease: "power3.out", delay: 0.3,
      });
      gsap.to(".ec-glow", {
        scale: 1.15, opacity: 0.35, duration: 4,
        yoyo: true, repeat: -1, ease: "sine.inOut",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Autonomous step cycler
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % PIPELINE_STEPS.length;
        setCompletedSteps((done) => {
          if (next === 0) return [0];
          return Array.from(new Set([...done, next]));
        });
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    setCompletedSteps((prev) => {
      const updated = Array.from({ length: index + 1 }, (_, i) => i);
      return Array.from(new Set([...prev, ...updated]));
    });
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleRestart = useCallback(() => {
    setActiveStep(0);
    setCompletedSteps([0]);
    setIsPlaying(true);
  }, []);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, 120]);

  const currentStepData = PIPELINE_STEPS[activeStep];
  const StepIcon = currentStepData.icon;

  return (
    <section ref={rootRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#030712] py-16 lg:py-24">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,132,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(56,132,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Atmospheric ambient glows */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
        <div className="ec-glow absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="ec-glow absolute top-1/3 right-0 h-[460px] w-[460px] rounded-full bg-teal-500/12 blur-[120px]" />
        <div className="ec-glow absolute bottom-10 left-1/3 h-[380px] w-[380px] rounded-full bg-indigo-500/8 blur-[120px]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.02fr_1.18fr] gap-12 lg:gap-14 items-center">

          {/* ═══════════════════════════════════════════════════
             LEFT COLUMN: Editorial Brand Authority Copy
             ═══════════════════════════════════════════════════ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-blue-300 border border-blue-500/25 tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
                </span>
                KAIROLOGIC LEX · COURT FILING AUTOMATION
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-white tracking-tight leading-[1.08]"
            >
              A day of filing work,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">
                automated in one click.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl"
            >
              Merging, compressing, converting scans to text, numbering every page,
              applying the bank seal, splitting for the portal — the whole routine
              runs unattended on your own PC, and the documents never leave the office.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-col sm:flex-row gap-3.5"
            >
              <a
                href="#pipeline"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5"
              >
                <span>See how it works</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#compare"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-700/80 hover:border-slate-500 hover:bg-slate-850 text-slate-300 hover:text-white rounded-xl font-semibold text-sm sm:text-base transition-all bg-slate-900/40"
              >
                <Eye className="h-4 w-4 text-slate-400" />
                <span>The manual routine, visualised</span>
              </a>
            </motion.div>

            {/* Proof Metrics Strip - Responsive, No Overflow Clipping */}
            <div className="mt-10 grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-slate-800/90 bg-slate-800/60 shadow-xl">
              {[
                { value: "1 Click", label: "Complete routine automated" },
                { value: "Hands-Free", label: "Runs in background unattended" },
                { value: "Cloud-Secure", label: "Role-based access, anywhere" },
              ].map((s) => (
                <div key={s.label} className="ec-stat bg-[#070d18] px-3.5 py-4 sm:px-4 sm:py-5 flex flex-col justify-between">
                  <div className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300 tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[11px] sm:text-xs text-slate-400 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>


          {/* ═══════════════════════════════════════════════════
             RIGHT COLUMN: Premium Interactive Workflow Stage
             UI/UX Pro Max · Zero Clutter · Unified Color System
             ═══════════════════════════════════════════════════ */}
          <div className="w-full">
            <div className="relative rounded-3xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-xl shadow-2xl shadow-blue-950/50 p-5 sm:p-6 overflow-hidden">
              {/* Outer stage frame subtle top highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

              {/* ── STAGE TOP BAR: Controls & Step Scrubber ── */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                    KAIROLOGIC LEX WORKFLOW ENGINE
                  </span>
                </div>

                {/* Scrubber Play / Pause / Replay Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                    title={isPlaying ? "Pause auto-run" : "Resume auto-run"}
                  >
                    {isPlaying ? (
                      <>
                        <Pause size={11} className="text-amber-400" />
                        <span className="text-[11px]">Pause</span>
                      </>
                    ) : (
                      <>
                        <Play size={11} className="text-emerald-400" />
                        <span className="text-[11px]">Auto-Run</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="p-1 rounded-lg border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Restart sequence"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>
              </div>

              {/* Step Scrubber Pills (NO CLUNKY SCROLLBAR, Clean Flex Wrap/Scroll Mask) */}
              <div className="py-3.5 flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {PIPELINE_STEPS.map((s, idx) => {
                  const isActive = activeStep === idx;
                  const isDone = completedSteps.includes(idx);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleStepClick(idx)}
                      className={`group shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-600/25 text-white border border-blue-400/60 shadow-sm shadow-blue-500/20"
                          : isDone
                          ? "bg-slate-800/60 text-slate-300 border border-slate-700/70 hover:border-slate-600"
                          : "bg-slate-900/50 text-slate-500 border border-slate-800/60 hover:text-slate-400"
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: isActive ? s.color : isDone ? "#34d399" : "#475569" }}
                      />
                      <span>{s.num}. {s.shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* ── STAGE MAIN CANVAS: 3-ZONE TRANSFORMATION ── */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.1fr] gap-4 sm:gap-5 items-stretch pt-2">

                {/* ZONE 1: RAW INCOMING CASE FILES (The Problem) */}
                <div className="relative rounded-2xl border border-slate-800/90 bg-[#070e1b] p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800/80">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        INCOMING RAW FILES
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        Unsorted · 48.4 MB
                      </span>
                    </div>

                    {/* Staggered Case Documents Stack */}
                    <div className="relative flex items-center justify-center my-4 min-h-[190px]">
                      {/* Document 3 (Back) */}
                      <div className="absolute w-[170px] h-[150px] rounded-xl border border-slate-800 bg-[#091222] p-3 shadow-lg transform rotate-6 translate-x-3 translate-y-3 pointer-events-none">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-mono">
                          <FileText size={11} />
                          <span className="truncate">Valuation_Report.pdf</span>
                        </div>
                        <DocLines widths={[85, 60, 75, 45, 65]} tone="raw" />
                      </div>

                      {/* Document 2 (Middle) */}
                      <div className="absolute w-[175px] h-[155px] rounded-xl border border-slate-750 bg-[#0c172a] p-3 shadow-lg transform -rotate-3 -translate-x-2 translate-y-1 pointer-events-none">
                        <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono mb-1">
                          <span className="flex items-center gap-1 truncate">
                            <FileWarning size={11} className="text-amber-400 shrink-0" />
                            <span>Notice_u_s13_2.pdf</span>
                          </span>
                        </div>
                        <DocLines widths={[90, 70, 80, 50, 70]} tone="raw" />
                        <div className="mt-1 px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700 text-[9px] font-medium text-slate-400 inline-flex items-center gap-1">
                          <AlertTriangle size={9} className="text-amber-400" />
                          <span>No Bates numbers</span>
                        </div>
                      </div>

                      {/* Document 1 (Front Active) */}
                      <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 w-[185px] h-[165px] rounded-xl border border-slate-700/90 bg-[#0f1d35] p-3 shadow-2xl"
                      >
                        <div className="flex items-center justify-between text-slate-300 text-[10px] font-mono mb-1 pb-1 border-b border-slate-800">
                          <span className="flex items-center gap-1 font-semibold truncate">
                            <FileType2 size={12} className="text-blue-400 shrink-0" />
                            <span>Loan_Agreement.scan</span>
                          </span>
                        </div>
                        <DocLines widths={[95, 75, 85, 65, 80, 40]} tone={activeStep >= 1 ? "ocr" : "raw"} />
                        <div className="mt-2 flex items-center justify-between">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border inline-flex items-center gap-1 ${
                            activeStep >= 1
                              ? "bg-teal-500/15 border-teal-500/30 text-teal-300"
                              : "bg-slate-800 border-slate-700 text-slate-400"
                          }`}>
                            {activeStep >= 1 ? (
                              <>
                                <Check size={10} className="text-teal-400" />
                                <span>Scans OCR&apos;d</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={10} className="text-amber-400" />
                                <span>300 DPI (No Text)</span>
                              </>
                            )}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">Page 1/142</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Footnote Tag */}
                  <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 border-t border-slate-800/80">
                    <AlertTriangle size={12} className="text-amber-400 shrink-0" />
                    <span>Eliminates tedious page-by-page manual formatting</span>
                  </div>
                </div>


                {/* ZONE 2: THE ENGINE CONDUIT (Center Active Processing) */}
                <div className="flex md:flex-col items-center justify-center gap-3 py-2 md:py-0">
                  <div className="relative w-full md:w-1 md:h-24 flex items-center justify-center">
                    <div className="hidden md:block w-0.5 h-full bg-gradient-to-b from-blue-500/30 via-cyan-400/80 to-teal-400/30" />
                    <div className="md:hidden h-0.5 w-full bg-gradient-to-r from-blue-500/30 via-cyan-400/80 to-teal-400/30" />

                    {/* Central Play / Trigger Button */}
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="relative z-10 p-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title={isPlaying ? "Pause pipeline" : "Run pipeline"}
                    >
                      <ArrowRight size={16} className="md:rotate-0 rotate-90" />
                    </button>
                  </div>

                  {/* Active Step Telemetry Pill */}
                  <div className="text-center px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 shadow-md min-w-[130px]">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-white">
                      <StepIcon size={13} style={{ color: currentStepData.color }} />
                      <span>{currentStepData.shortLabel}</span>
                    </div>
                    <div className="text-[10px] font-mono text-cyan-300 mt-0.5 font-semibold">
                      {currentStepData.metric}
                    </div>
                  </div>
                </div>


                {/* ZONE 3: PERFECTED COURT-COMPLIANT DOSSIER (The Solution) */}
                <div className="relative rounded-2xl border border-teal-500/30 bg-[#06141a] p-4 flex flex-col justify-between shadow-xl">
                  <div>
                    {/* Header Bar */}
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-teal-500/20">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-teal-400" />
                        <span className="text-[10px] font-mono font-bold tracking-wider text-teal-300 uppercase">
                          READY TO eFILE
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/15 border border-teal-500/30 text-teal-300 inline-flex items-center gap-1">
                        <Check size={10} />
                        <span>100% Compliant</span>
                      </span>
                    </div>

                    {/* High-Fidelity Court Dossier Document Card */}
                    <div className="relative rounded-xl border border-teal-500/40 bg-gradient-to-b from-[#091a21] to-[#040e13] p-3.5 shadow-2xl overflow-hidden flex flex-col justify-between">

                      {/* Active OCR Laser Scan Beam (Animated) */}
                      <motion.div
                        className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-teal-400/15 to-transparent z-20 pointer-events-none"
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                      />

                      {/* Document Header Particulars */}
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-teal-500/20 text-[10px] font-mono">
                          <span className="text-teal-300 font-semibold flex items-center gap-1">
                            <Scale size={12} className="text-teal-400" />
                            <span>HIGH COURT DOCKET</span>
                          </span>
                          <span className="text-slate-400">COMM-SUIT/2026/894</span>
                        </div>

                        <div className="mt-2 text-[10px] text-slate-200 font-medium leading-tight">
                          Apex Bank Ltd. <span className="text-slate-500">vs.</span> M/s Nova Logistics
                        </div>

                        {/* Paginated Text Lines */}
                        <DocLines widths={[94, 82, 88, 68, 92, 74, 80]} tone="done" />
                      </div>

                      {/* Bates Numbering Row */}
                      <div className="mt-2 px-2.5 py-1.5 rounded-lg border border-teal-500/30 bg-teal-500/10 flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-1.5 font-mono text-teal-200 font-bold">
                          <Hash size={12} className="text-teal-300" />
                          <span>PAGE 14 OF 142</span>
                        </span>
                        <span className="text-[9px] text-teal-300/90 font-medium">Bates Verified</span>
                      </div>

                      {/* Official Seal Row */}
                      <div className="mt-2.5 pt-2 border-t border-teal-500/15 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Stamp size={12} className="text-amber-400" />
                          <span>Seal affixed</span>
                        </div>

                        {/* Official Gold Seal Stamp */}
                        <motion.div
                          animate={{
                            scale: activeStep === 4 ? [1, 1.15, 1] : 1,
                            rotate: [0, -3, 3, 0],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="h-8 w-8 rounded-full border border-amber-400/80 bg-amber-400/10 flex items-center justify-center shadow-[0_0_8px_rgba(251,191,36,0.25)]"
                        >
                          <span className="text-[6px] font-extrabold text-amber-300 text-center leading-tight">
                            OFFICIAL<br />SEAL
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Output Portal Ready Split Breakdown */}
                  <div className="mt-3 pt-2 border-t border-teal-500/20 flex flex-wrap items-center justify-between gap-1.5 text-[10px] text-slate-300">
                    <span className="flex items-center gap-1 text-teal-300 font-semibold font-mono">
                      <CheckCircle2 size={12} />
                      <span>Part 1 (6.8 MB) · Part 2 (5.4 MB)</span>
                    </span>
                    <span className="text-slate-400 font-mono">Portal Limit: 10 MB</span>
                  </div>
                </div>

              </div>

              {/* ── STAGE BOTTOM TELEMETRY BAR: Security & Engine Confidence ── */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <Lock size={12} className="text-teal-400" />
                    <span>Air-gapped: Documents never leave office PC</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <ShieldCheck size={12} className="text-blue-400" />
                    <span>Encrypted · Role-Based Access · Cloud Delivery</span>
                  </span>
                </div>
                <div className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Cpu size={12} className="text-cyan-400" />
                  <span>Cloud Engine: <strong className="text-slate-300 font-normal">Unattended server-side processing</strong></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
