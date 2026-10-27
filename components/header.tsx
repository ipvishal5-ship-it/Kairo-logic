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

              {/* 2-Row Unified Mega Dropdown Panel */}
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

                <div className="c-dropdown-product-list">
                  {/* Row 1: Left: SARFAESI | Right: Kairologic Ops (Directly opens product page) */}
                  <Link
                    href="/technologies/workflow"
                    className="c-dropdown-product-row"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div className="c-row-col c-row-col-domain">
                      <span className="c-col-tag">DOMAIN</span>
                      <h4 className="c-col-title">SARFAESI</h4>
                      <p className="c-col-desc">Secured Asset Recovery</p>
                    </div>

                    <div className="c-row-divider" aria-hidden="true" />

                    <div className="c-row-col c-row-col-platform">
                      <div className="c-platform-meta">
                        <span className="c-col-tag c-col-tag-platform">SOLUTION PLATFORM</span>
                        <span className="c-badge-pill c-badge-live">OPEN PRODUCT PAGE</span>
                      </div>
                      <h4 className="c-col-title">Kairologic Ops</h4>
                      <p className="c-col-desc">
                        Live legal notice timelines, case operations & automated secured-asset tracking.
                      </p>
                    </div>

                    <div className="c-row-action-icon">
                      <ArrowRight size={18} />
                    </div>
                  </Link>

                  {/* Row 2: Left: Manufacturing | Right: Kairologic Sales and Service Cloud (Non-directing) */}
                  <a
                    href="#manufacturing"
                    className="c-dropdown-product-row is-soon"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    role="menuitem"
                    aria-disabled="true"
                  >
                    <div className="c-row-col c-row-col-domain">
                      <span className="c-col-tag">DOMAIN</span>
                      <h4 className="c-col-title">Manufacturing</h4>
                      <p className="c-col-desc">Industrial Production</p>
                    </div>

                    <div className="c-row-divider" aria-hidden="true" />

                    <div className="c-row-col c-row-col-platform">
                      <div className="c-platform-meta">
                        <span className="c-col-tag c-col-tag-platform">SOLUTION PLATFORM</span>
                        <span className="c-badge-pill c-badge-soon">COMING SOON</span>
                      </div>
                      <h4 className="c-col-title">Kairologic Sales and Service Cloud</h4>
                      <p className="c-col-desc">
                        Plant shop-floor traceability, customer enquiries & field service SLA tracking.
                      </p>
                    </div>

                    <div className="c-row-action-icon">
                      <Clock size={16} />
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
                  <div>
                    <strong>SARFAESI</strong> · Kairologic Ops
                  </div>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="#manufacturing"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "var(--c-muted)" }}
                >
                  <div>
                    <strong>Manufacturing</strong> · Kairologic Sales and Service Cloud
                  </div>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", background: "rgba(0,0,0,0.06)", padding: "2px 6px" }}>Soon</span>
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
