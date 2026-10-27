"use client";
import { useEffect, useRef, useState } from "react";
import Link from "./site-link";
import { usePathname } from "next/navigation";
import Brand from "./brand";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open && !dropdownOpen) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setDropdownOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, dropdownOpen]);

  // Close menus on route change
  useEffect(() => {
    setDropdownOpen(false);
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <a className="c-skip" href="#main">
        Skip to content
      </a>
      <header className="c-header">
        <div className="c-shell c-header-inner">
          <Link
            href="/"
            className="c-brand-link"
            aria-label="Kairologic Technologies home"
            onClick={() => {
              setOpen(false);
              setDropdownOpen(false);
            }}
          >
            <Brand />
          </Link>

          <nav className="c-desktop-nav" aria-label="Main navigation">
            <div
              ref={dropdownRef}
              className="c-nav-item-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/technologies"
                className="c-nav-dropdown-trigger"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-current={pathname?.startsWith("/technologies") ? "page" : undefined}
              >
                <span>Technologies</span>
                <ChevronDown
                  className="c-dropdown-chevron"
                  size={16}
                  aria-hidden="true"
                />
              </Link>

              {/* Sleek Single-Line Dropdown */}
              <div
                className={`c-dropdown-menu ${dropdownOpen ? "is-active" : ""}`}
                role="menu"
                aria-label="Technologies sub-menu"
              >
                <div className="c-dropdown-items-wrap">
                  {/* Line 1: SARFAESI | Kairologic Ops (Directly links to product page) */}
                  <Link
                    href="/technologies/workflow"
                    className="c-dropdown-line-item"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div className="c-line-content">
                      <span className="c-line-domain">SARFAESI</span>
                      <span className="c-line-sep" aria-hidden="true" />
                      <span className="c-line-platform">Kairologic Ops</span>
                    </div>
                    <div className="c-line-meta">
                      <span className="c-line-badge c-badge-live">LIVE</span>
                      <ArrowRight size={16} className="c-line-arrow" />
                    </div>
                  </Link>

                  {/* Line 2: Manufacturing | Kairologic Sales & Service Cloud (Non-directing for now) */}
                  <a
                    href="#manufacturing"
                    className="c-dropdown-line-item is-soon"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    role="menuitem"
                    aria-disabled="true"
                  >
                    <div className="c-line-content">
                      <span className="c-line-domain">Manufacturing</span>
                      <span className="c-line-sep" aria-hidden="true" />
                      <span className="c-line-platform">Kairologic Sales &amp; Service Cloud</span>
                    </div>
                    <div className="c-line-meta">
                      <span className="c-line-badge c-badge-soon">SOON</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          <Link href="/contact" className="c-button c-header-cta">
            Talk to our team
          </Link>

          <button
            ref={toggle}
            className="c-menu-button"
            aria-expanded={open}
            aria-controls="company-mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span
              className={`c-menu-glyph ${open ? "is-open" : ""}`}
              aria-hidden="true"
            >
              <i />
              <i />
            </span>
          </button>
        </div>

        {open && (
          <nav
            id="company-mobile-nav"
            className="c-mobile-nav c-shell"
            aria-label="Mobile navigation"
          >
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <div className="c-mobile-dropdown-group">
              <div className="c-mobile-dropdown-title">Technologies</div>
              <div className="c-mobile-dropdown-items">
                <Link
                  href="/technologies/workflow"
                  onClick={() => setOpen(false)}
                >
                  <div className="c-line-content">
                    <span className="c-line-domain" style={{ fontSize: "16px" }}>SARFAESI</span>
                    <span className="c-line-sep" aria-hidden="true" style={{ height: "14px" }} />
                    <span className="c-line-platform" style={{ fontSize: "15px" }}>Kairologic Ops</span>
                  </div>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="#manufacturing"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "var(--c-muted)" }}
                >
                  <div className="c-line-content">
                    <span className="c-line-domain" style={{ fontSize: "16px" }}>Manufacturing</span>
                    <span className="c-line-sep" aria-hidden="true" style={{ height: "14px" }} />
                    <span className="c-line-platform" style={{ fontSize: "15px" }}>Kairologic Sales &amp; Service Cloud</span>
                  </div>
                  <span className="c-line-badge c-badge-soon">Soon</span>
                </a>
              </div>
            </div>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Talk to our team
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
