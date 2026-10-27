"use client";
import { useEffect, useRef, useState } from "react";
import Link from "./site-link";
import { usePathname } from "next/navigation";
import Brand from "./brand";
const links = [{ href: "/about", label: "Company" }, { href: "/technologies", label: "Technologies" }];
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);
  return <><a className="c-skip" href="#main">Skip to content</a><header className="c-header"><div className="c-shell c-header-inner">
    <Link href="/" className="c-brand-link" aria-label="Kairologic Technologies home" onClick={() => setOpen(false)}><Brand /></Link>
    <nav className="c-desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname?.startsWith(link.href) ? "page" : undefined}>{link.label}</Link>)}</nav>
    <Link href="/contact" className="c-button c-header-cta">Talk to our team</Link>
    <button ref={toggle} className="c-menu-button" aria-expanded={open} aria-controls="company-mobile-nav" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><span>{open ? "Close" : "Menu"}</span><span className={`c-menu-glyph ${open ? "is-open" : ""}`} aria-hidden="true"><i /><i /></span></button>
  </div>{open && <nav id="company-mobile-nav" className="c-mobile-nav c-shell" aria-label="Mobile navigation">{[{ href: "/", label: "Home" }, ...links, { href: "/contact", label: "Talk to our team" }].map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>}</header></>;
}
