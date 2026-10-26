"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Brand from "./brand";
const links = [
  { href: "#platform", label: "The workflow" },
  { href: "#dashboard", label: "The visibility" },
  { href: "#security", label: "The control" },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            href="#home"
            className="brand-link"
            aria-label="Kairologic Technology home"
          >
            <Brand inverse />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((l) => (
              <a href={l.href} key={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a href="#contact" className="header-contact">
              Let’s connect <ArrowUpRight size={21} />
            </a>
            <button
              ref={toggle}
              className="menu-toggle"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            className="mobile-nav container"
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {[
              ...links,
              { href: "#contact", label: "Request a demonstration" },
            ].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
                <ArrowUpRight size={20} />
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
