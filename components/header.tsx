"use client";
import { useEffect, useRef, useState } from "react";
import Link from "./site-link";
import { usePathname } from "next/navigation";
import Brand from "./brand";
import {
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Scale,
  Factory,
} from "lucide-react";

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

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setDropdownOpen(false);
    setOpen(false);
  }

  return (
    <>
      <a className="c-skip" href="#main">
        Skip to content
      </a>
      <header className="c-header">
        <div className="c-shell c-header-inner">
          {/* Brand Logo */}
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

          {/* Desktop Navigation */}
          <nav className="c-desktop-nav" aria-label="Main navigation">
            {/* Technologies Dropdown */}
            <div
              ref={dropdownRef}
              className="c-nav-item-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                className={`c-nav-dropdown-trigger ${dropdownOpen ? "is-open" : ""}`}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-current={pathname?.startsWith("/technologies") ? "page" : undefined}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>Technologies</span>
                <ChevronDown
                  className={`c-dropdown-chevron ${dropdownOpen ? "is-rotated" : ""}`}
                  size={14}
                  aria-hidden="true"
                />
              </button>

              {/* Clean, Creative, Visible Dual-Identity Dropdown */}
              <div
                className={`c-dropdown-clean-menu ${dropdownOpen ? "is-active" : ""}`}
                role="menu"
                aria-label="Technologies sub-menu"
              >
                <div className="c-clean-menu-header">
                  <span>ENTERPRISE OPERATING SUITE</span>
                </div>

                <div className="c-clean-menu-list">
                  {/* Item 1: SARFAESI | Kairologic Ops */}
                  <Link
                    href="/technologies/workflow"
                    className="c-clean-menu-item item-sarfaesi"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div className="c-clean-icon icon-green">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="c-clean-names">
                      <span className="c-clean-domain">SARFAESI</span>
                      <span className="c-clean-sep" aria-hidden="true" />
                      <span className="c-clean-platform">Kairologic Ops</span>
                    </div>
                    <ArrowRight size={15} className="c-clean-arrow" />
                  </Link>

                  {/* Item 2: ecourt  */}
                  <Link
                    href="/technologies/ecourt-filing"
                    className="c-clean-menu-item item-lex"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div className="c-clean-icon icon-blue">
                      <Scale size={18} />
                    </div>
                    <div className="c-clean-names">
                      <span className="c-clean-domain">eCourt Filing</span>
                      <span className="c-clean-sep" aria-hidden="true" />
                      <span className="c-clean-platform">Kairologic Lex</span>
                    </div>
                    <ArrowRight size={15} className="c-clean-arrow" />
                  </Link>

                  {/* Item 3: Manufacturing | Kairologic Sales & Service Cloud */}
                  <Link
                    href="/technologies/manufacturing"
                    className="c-clean-menu-item item-mfg"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div className="c-clean-icon icon-amber">
                      <Factory size={18} />
                    </div>
                    <div className="c-clean-names">
                      <span className="c-clean-domain">Manufacturing</span>
                      <span className="c-clean-sep" aria-hidden="true" />
                      <span className="c-clean-platform">Kairologic Sales &amp; Service Cloud</span>
                    </div>
                    <ArrowRight size={15} className="c-clean-arrow" />
                  </Link>
                </div>

                <div className="c-clean-menu-footer">
                  <Link
                    href="/technologies"
                    className="c-clean-all-link"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>View all technologies</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Approach Link */}
            <Link href="/#approach" className="c-nav-link">
              Approach
            </Link>

            {/* Need a solution Link */}
            <Link
              href="/need-a-solution"
              className={`c-nav-link ${pathname === "/need-a-solution" ? "is-active" : ""}`}
              aria-current={pathname === "/need-a-solution" ? "page" : undefined}
            >
              Need a solution
            </Link>
          </nav>

          {/* Action CTA */}
          <Link href="/contact" className="c-button c-header-cta">
            <span>Talk to our team</span>
            <ArrowRight size={15} className="c-cta-arrow" />
          </Link>

          {/* Mobile Menu Toggle Button */}
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

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav
            id="company-mobile-nav"
            className="c-mobile-nav c-shell"
            aria-label="Mobile navigation"
          >
            <Link href="/" onClick={() => setOpen(false)} className="c-mobile-main-link">
              Home
            </Link>

            <div className="c-mobile-dropdown-group">
              <div className="c-mobile-dropdown-title">Technologies</div>
              <div className="c-mobile-dropdown-items">
                <Link
                  href="/technologies/workflow"
                  onClick={() => setOpen(false)}
                  className="c-mobile-sublink"
                >
                  <div className="c-mobile-item-title">
                    <span className="c-mobile-icon c-icon-green">
                      <ShieldCheck size={16} />
                    </span>
                    <div className="c-mobile-names">
                      <strong>SARFAESI</strong>
                      <span className="c-mobile-sep" />
                      <span>Kairologic Ops</span>
                    </div>
                  </div>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/technologies/ecourt-filing"
                  onClick={() => setOpen(false)}
                  className="c-mobile-sublink"
                >
                  <div className="c-mobile-item-title">
                    <span className="c-mobile-icon c-icon-blue">
                      <Scale size={16} />
                    </span>
                    <div className="c-mobile-names">
                      <strong>eCourt Filing</strong>
                      <span className="c-mobile-sep" />
                      <span>Kairologic Lex</span>
                    </div>
                  </div>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/technologies/manufacturing"
                  onClick={() => setOpen(false)}
                  className="c-mobile-sublink"
                >
                  <div className="c-mobile-item-title">
                    <span className="c-mobile-icon c-icon-amber">
                      <Factory size={16} />
                    </span>
                    <div className="c-mobile-names">
                      <strong>Manufacturing</strong>
                      <span className="c-mobile-sep" />
                      <span>Kairologic Sales &amp; Service Cloud</span>
                    </div>
                  </div>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <Link href="/#approach" onClick={() => setOpen(false)} className="c-mobile-main-link">
              Approach
            </Link>

            <Link href="/need-a-solution" onClick={() => setOpen(false)} className="c-mobile-main-link">
              Need a solution
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)} className="c-mobile-main-link">
              Contact
            </Link>

            <div className="c-mobile-cta-wrap">
              <Link href="/contact" onClick={() => setOpen(false)} className="c-button c-mobile-cta">
                Talk to our team <ArrowRight size={16} />
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
