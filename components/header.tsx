import Link from "next/link";
import TechnologiesDropdown from "./technologies-dropdown";
import MobileMenu from "./mobile-menu";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner-row">
        {/* Brand logo + wordmark + tagline */}
        <Link href="/" className="logo" aria-label="Kairologic home">
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

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <TechnologiesDropdown />
          <Link href="/#approach">Approach</Link>
          <Link href="/need-a-solution">Need a solution</Link>
          <Link className="pill" href="/contact">
            Talk to our team
          </Link>
        </nav>

        {/* Mobile Header Actions (visible below 760px) */}
        <div className="mobile-header-actions">
          <Link className="pill mobile-pill" href="/contact">
            Talk to our team
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
