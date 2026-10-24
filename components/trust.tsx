"use client";

import { motion, useReducedMotion } from "motion/react";
import { Monitor, Smartphone, Tablet, Users, Lock, MapPinned } from "lucide-react";
import { SectionHeading } from "./motion-primitives";
import { roles, devices, rollout } from "@/lib/data";

const roleIcons = [Users, Lock, MapPinned];
const deviceIcons = [Monitor, Smartphone, Tablet];

export default function Trust() {
  const reduce = useReducedMotion();
  return (
    <section id="trust" className="border-t border-line/60 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Built for Control"
          title="Access, security and mobile use — planned for the SARFAESI team."
          sub="Data stays in one controlled system. Every change is recorded."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {roles.map((r, i) => {
            const Icon = roleIcons[i];
            return (
              <motion.div
                key={r.t}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-7"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-5 font-display text-lg font-semibold text-text">{r.t}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{r.d}</p>
              </motion.div>
            );
          })}
        </div>

        {/* omnichannel */}
        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {devices.map((d, i) => {
            const Icon = deviceIcons[i];
            return (
              <motion.div
                key={d.t}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card flex items-start gap-4 p-6"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent2" />
                <div>
                  <p className="font-medium text-text">{d.t}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{d.d}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* rollout stepper */}
        <div className="mt-24">
          <SectionHeading eyebrow="Rollout" title="A simple, low-risk path to start." />
          <div className="relative mt-14 grid gap-8 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-line md:block" />
            {rollout.map((r, i) => (
              <motion.div
                key={r.n}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-ink font-mono text-xs text-accent">
                  {r.n}
                </span>
                <p className="mt-4 font-display font-semibold text-text">{r.t}</p>
                <p className="mt-1.5 text-sm leading-6 text-muted">{r.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
