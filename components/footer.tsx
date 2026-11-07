import Link from "./site-link";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="top">
          <Link href="/" className="logo" aria-label="Kairologic Technologies home">
            <svg viewBox="0 0 80 80" role="img" aria-label="Kairologic" width={38} height={38}>
              <path
                fill="#E4F0EC"
                d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8zM28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
              />
              <path fill="#2FB594" d="M27 33h14v14H27z" />
            </svg>
            <div>
              <span style={{ color: "#E4F0EC" }}>KAIRO</span>
              <em style={{ color: "#7FE0C3", fontStyle: "normal" }}>LOGIC</em>
              <small>Right time right move</small>
            </div>
          </Link>
          <h2>Technology built around your work.</h2>
        </div>
        <div className="bot">
          <span>© 2026 Kairologic Technologies</span>
          <nav aria-label="Footer navigation">
            <Link href="/need-a-solution">Need a solution</Link>
            <Link href="/technologies">Technologies</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
