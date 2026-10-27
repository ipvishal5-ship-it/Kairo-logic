"use client";
import { useEffect, useRef, useState } from "react";
import Link from "./site-link";
import { usePathname } from "next/navigation";
import Brand from "./brand";
import { ChevronDown, ArrowRight, Clock } from "lucide-react";

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

              {/* 2-Row x 2-Column Mega Dropdown Panel */}
              <div
                className={`c-dropdown-menu ${dropdownOpen ? "is-active" : ""}`}
                role="menu"
                aria-label="Technologies sub-menu"
              >
                <div className="c-dropdown-header">
                  <span className="c-dropdown-header-title">Enterprise Solutions</span>
                  <Link
                    href="/technologies"
                    className="c-dropdown-header-link"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View All Overview <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="c-dropdown-grid">
                  {/* Row 1: SARFAESI (opens product page) and Kairologic Ops */}
                  <div className="c-dropdown-row">
                    <Link
                      href="/technologies/workflow"
                      className="c-dropdown-card"
                      onClick={() => setDropdownOpen(false)}
                      role="menuitem"
                    >
                      <div className="c-dropdown-card-top">
                        <span className="c-dropdown-card-badge">SARFAESI · PRODUCT</span>
                        <ArrowRight size={15} className="c-dropdown-card-arrow" />
                      </div>
                      <h4 className="c-dropdown-card-title">SARFAESI</h4>
                      <p className="c-dropdown-card-desc">
                        Direct access to our flagship recovery workspace: automated notice timelines & secured asset intelligence.
                      </p>
                    </Link>

                    <Link
                      href="/technologies/workflow"
                      className="c-dropdown-card"
                      onClick={() => setDropdownOpen(false)}
                      role="menuitem"
                    >
                      <div className="c-dropdown-card-top">
                        <span className="c-dropdown-card-badge">OPERATIONS</span>
                        <ArrowRight size={15} className="c-dropdown-card-arrow" />
                      </div>
                      <h4 className="c-dropdown-card-title">Kairologic Ops</h4>
                      <p className="c-dropdown-card-desc">
                        End-to-end case workflows, collaborative officer dispatch & real-time compliance oversight.
                      </p>
                    </Link>
                  </div>

                  {/* Row 2: Manufacturing (non-directing) and Kairologic Sales & Service Cloud (non-directing) */}
                  <div className="c-dropdown-row">
                    <a
                      href="#manufacturing"
                      className="c-dropdown-card"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      role="menuitem"
                      aria-disabled="true"
                    >
                      <div className="c-dropdown-card-top">
                        <span className="c-dropdown-card-badge is-soon">COMING SOON</span>
                        <Clock size={14} className="c-dropdown-card-arrow" />
                      </div>
                      <h4 className="c-dropdown-card-title">Manufacturing</h4>
                      <p className="c-dropdown-card-desc">
                        Plant operations routing, inventory traceability & shop-floor digital tracking systems.
                      </p>
                    </a>

                    <a
                      href="#sales-service"
                      className="c-dropdown-card"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      role="menuitem"
                      aria-disabled="true"
                    >
                      <div className="c-dropdown-card-top">
                        <span className="c-dropdown-card-badge is-soon">COMING SOON</span>
                        <Clock size={14} className="c-dropdown-card-arrow" />
                      </div>
                      <h4 className="c-dropdown-card-title">Kairologic Sales and Service Cloud</h4>
                      <p className="c-dropdown-card-desc">
                        Customer enquiry pipelines, field service automation & delivery SLA monitoring engine.
                      </p>
                    </a>
                  </div>
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
                  <span>SARFAESI (Product)</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/technologies/workflow"
                  onClick={() => setOpen(false)}
                >
                  <span>Kairologic Ops</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="#manufacturing"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "var(--c-muted)" }}
                >
                  <span>Manufacturing</span>
                  <span style={{ fontSize: "12px", textTransform: "uppercase", background: "rgba(0,0,0,0.06)", padding: "2px 6px" }}>Soon</span>
                </a>
                <a
                  href="#sales-service"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "var(--c-muted)" }}
                >
                  <span>Kairologic Sales and Service Cloud</span>
                  <span style={{ fontSize: "12px", textTransform: "uppercase", background: "rgba(0,0,0,0.06)", padding: "2px 6px" }}>Soon</span>
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
