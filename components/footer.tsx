import Link from "./site-link";
import Brand from "./brand";
export default function Footer() {
  return <footer className="c-footer"><div className="c-shell"><div className="c-footer-top"><Link href="/" aria-label="Kairologic Technologies home"><Brand inverse /></Link><p>Technology built<br />around your work.</p></div><div className="c-footer-bottom"><p>© {new Date().getFullYear()} Kairologic Technologies</p><nav aria-label="Footer navigation"><Link href="/about">Company</Link><Link href="/technologies">Technologies</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></nav></div></div></footer>;
}
