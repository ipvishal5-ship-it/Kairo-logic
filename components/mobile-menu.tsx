"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TechItem {
  name: string;
  desc: string;
  href: string;
}

const TECH_ITEMS: TechItem[] = [
  {
    name: "SARFAESI Operations",
    desc: "Statutory recovery workflows, DM/CMM automation & auction tracking",
    href: "/technologies/workflow",
  },
  {
    name: "Kairologic Lex (e-Court filing)",
    desc: "Cause list monitoring, hearing radar & automated court filing",
    href: "/technologies/ecourt-filing",
  },
  {
    name: "Manufacturing Suite",
    desc: "Centralised worker records, shift allocation & delivery tracking",
    href: "/technologies/manufacturing",
  },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);
  const pathname = usePathname();
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleBtnRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="mobile-menu-container">
      <button
        ref={toggleBtnRef}
        type="button"
        className="mobile-menu-btn"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>Menu</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="mobile-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="mobile-sheet-header">
            <Link
              href="/"
              className="logo"
              onClick={() => setIsOpen(false)}
              aria-label="Kairologic home"
            >
              <svg viewBox="0 0 80 80" role="img" aria-label="Kairologic">
                <path
                  fill="#102A43"
                  d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8zM28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
                />
                <path fill="#16876D" d="M27 33h14v14H27z" />
              </svg>
              <div>
                <span style={{ color: "#102A43" }}>KAIRO</span>
                <em style={{ color: "#16876D", fontStyle: "normal" }}>LOGIC</em>
                <small>Right time right move</small>
              </div>
            </Link>

            <button
              ref={closeBtnRef}
              type="button"
              className="mobile-close-btn"
              onClick={() => {
                setIsOpen(false);
                toggleBtnRef.current?.focus();
              }}
              aria-label="Close navigation"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="mobile-sheet-nav" aria-label="Mobile navigation links">
            {/* Technologies Accordion */}
            <div className="mobile-accordion">
              <button
                type="button"
                className="mobile-accordion-trigger"
                aria-expanded={techOpen}
                onClick={() => setTechOpen((prev) => !prev)}
              >
                <span>Technologies</span>
                <svg
                  className={`dropdown-chevron ${techOpen ? "open" : ""}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {techOpen && (
                <div className="mobile-accordion-content">
                  {TECH_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="mobile-tech-item"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="tech-item-name">{item.name}</span>
                      <span className="tech-item-desc">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Approach */}
            <Link
              href="/#approach"
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              Approach
            </Link>

            {/* Need a solution */}
            <Link
              href="/need-a-solution"
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              Need a solution
            </Link>

            {/* Pill CTA */}
            <div className="mobile-sheet-cta">
              <Link
                href="/contact"
                className="pill mobile-sheet-pill"
                onClick={() => setIsOpen(false)}
              >
                Talk to our team
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
