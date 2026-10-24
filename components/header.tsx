"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Menu, ArrowRight } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#problem", label: "The Problem" },
  { href: "#record", label: "The Record" },
  { href: "#dashboard", label: "Dashboards" },
  { href: "#trust", label: "Trust" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="#" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-white shadow-lg shadow-accent/20">
            K
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[16px] font-bold tracking-wide text-text">
              KAIROLOGIC
            </span>
            <span className="font-mono text-[9px] tracking-[0.35em] text-muted uppercase">
              TECHNOLOGY
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-text hover:underline underline-offset-4"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/30"
          >
            Request a demo
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-muted hover:text-text"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
