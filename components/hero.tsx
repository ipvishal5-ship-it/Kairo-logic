"use client";
import Image from "next/image";
import { ArrowDown, ArrowRight, MapPin, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="hero-section" id="home">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="page-shell hero-layout">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-copy"
        >
          <p className="eyebrow">
            <span className="status-dot" /> SARFAESI INTELLIGENCE
          </p>
          <h1>
            One case.
            <br />
            One record.
            <br />
            <span>Total control.</span>
          </h1>
          <p className="hero-description">
            From the first notice to final recovery.
            <br className="desktop-break" /> Your entire case, connected.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#contact">
              Request a demo <ArrowRight size={19} />
            </a>
            <a className="text-link" href="#record">
              Explore the platform <ArrowDown size={18} />
            </a>
          </div>
          <p className="hero-audience">Built for Banks · NBFCs · HFCs · ARCs</p>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="asset-scene"
        >
          <Image
            src="/images/hero-industrial-estate.webp"
            alt="Illustrative industrial estate in Mumbai at dusk"
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            priority
            className="asset-photo"
          />
          <div className="scene-shade" />
          <div className="scene-top">
            <span className="scene-label">ASSET INTELLIGENCE</span>
            <span className="scene-label">ILLUSTRATIVE VIEW</span>
          </div>
          <div className="asset-pin" aria-hidden="true">
            <span />
            <MapPin size={24} />
          </div>
          <div className="asset-caption">
            <MapPin size={16} /> Industrial property · Mumbai
          </div>
          <div className="floating-case">
            <div className="case-heading">
              <span className="eyebrow">ONE CONNECTED RECORD</span>
              <span className="sample-pill">Demo case</span>
            </div>
            <h3>ABC Industries</h3>
            <div
              className="case-progress"
              aria-label="Illustrative case progress: order received, possession next"
            >
              <i />
              <i />
              <i />
              <i />
              <i className="current" />
              <i />
              <i />
            </div>
            <div className="case-action">
              <span>
                <Check size={17} /> Section 14 order received
              </span>
              <strong>
                Possession next <ArrowRight size={16} />
              </strong>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="page-shell value-strip">
        <span>One source of truth.</span>
        <p>Case data</p>
        <b>+</b>
        <p>Legal documents</p>
        <b>+</b>
        <p>Field evidence</p>
        <b>+</b>
        <p>Management visibility</p>
      </div>
    </section>
  );
}
