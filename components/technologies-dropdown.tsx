"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TechNavItem {
  domain: string;
  platform: string;
  desc: string;
  href: string;
}

export const TECH_NAV_ITEMS: TechNavItem[] = [
  {
    domain: "SARFAESI",
    platform: "Kairologic Ops",
    desc: "One structured workspace for recovery cases, teams and timelines.",
    href: "/technologies/workflow",
  },
  {
    domain: "Legal Intelligence",
    platform: "Kairologic Lex",
    desc: "Case management, multi-document Liquid Text workspace, and automated e-court filing.",
    href: "/technologies/ecourt-filing",
  },
  {
    domain: "Manufacturing",
    platform: "Kairologic Sales & Service Cloud",
    desc: "Unified workforce, shift and delivery tracking for large plants.",
    href: "/technologies/manufacturing",
  },
];

export default function TechnologiesDropdown({
  isActive = false,
}: {
  isActive?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Close when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // 150ms close delay so moving cursor across gap never flickers
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, [cancelClose]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
      return;
    }

    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => itemRefs.current[0]?.focus(), 50);
      }
      return;
    }

    const activeIndex = itemRefs.current.findIndex(
      (el) => el === document.activeElement
    );

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex =
        activeIndex === -1 || activeIndex === TECH_NAV_ITEMS.length - 1
          ? 0
          : activeIndex + 1;
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        activeIndex <= 0 ? TECH_NAV_ITEMS.length - 1 : activeIndex - 1;
      itemRefs.current[prevIndex]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      itemRefs.current[TECH_NAV_ITEMS.length - 1]?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className="tech-dropdown-container"
      onMouseEnter={() => {
        cancelClose();
        setIsOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
      }}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          scheduleClose();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="nav-trigger-btn"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="technologies-dropdown-menu"
        data-active={isActive ? "true" : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <span>Need a solution</span>
        <svg
          className={`dropdown-chevron ${isOpen ? "open" : ""}`}
          width="11"
          height="11"
          viewBox="0 0 12 12"
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="technologies-dropdown-menu"
          role="menu"
          aria-label="Need a solution"
          className="tech-dropdown-panel"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          onKeyDown={handleKeyDown}
        >
          {TECH_NAV_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              role="menuitem"
              className="tech-dropdown-item"
              onClick={() => setIsOpen(false)}
            >
              <span className="tech-item-name">
                <span>{item.domain}</span>
                <span className="tech-item-sep" aria-hidden="true">
                  |
                </span>
                <span className="tech-item-platform">{item.platform}</span>
              </span>
              <span className="tech-item-desc">{item.desc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

