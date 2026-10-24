"use client";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
const links = [
  { href: "#record", label: "The platform" },
  { href: "#dashboard", label: "Intelligence" },
  { href: "#trust", label: "In the field" },
];
export function Brand() {
  return (
    <span className="brand-wordmark">
      <strong>
        KAIROLOGIC<span className="brand-dot">.</span>
      </strong>
      <small>TECHNOLOGY</small>
    </span>
  );
}
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a href="#home" aria-label="Kairologic Technology home">
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((l) => (
            <a href={l.href} key={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a href="#contact" className="header-cta">
            Let’s talk <ArrowUpRight size={17} />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map((l) => (
            <a onClick={() => setOpen(false)} href={l.href} key={l.href}>
              {l.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
          <a onClick={() => setOpen(false)} href="#contact">
            Contact us <ArrowUpRight size={18} />
          </a>
        </nav>
      )}
    </header>
  );
}
