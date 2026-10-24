"use client";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";
import { Reveal } from "./motion-primitives";
import { Brand } from "./header";
export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="page-shell">
        <Reveal className="contact-main">
          <div>
            <p className="eyebrow">YOUR NEXT MOVE</p>
            <h2>
              Less chasing.
              <br />
              <span>More recovery.</span>
            </h2>
            <p>See what one connected case can do for your team.</p>
          </div>
          <div className="contact-action">
            <a href="tel:+919892333340" className="button button-primary">
              Request a demo <ArrowUpRight size={20} />
            </a>
            <a className="contact-phone" href="tel:+919892333340">
              <Phone size={17} /> +91 9892 333 340
            </a>
            <span>Start with a focused pilot.</span>
          </div>
        </Reveal>
        <footer className="site-footer">
          <a href="#home" aria-label="Kairologic home">
            <Brand />
          </a>
          <p>
            <MapPin size={17} /> 504, Atlanta Estate, Goregaon East, Mumbai
          </p>
          <a href="https://www.sarfaesi.in" target="_blank" rel="noreferrer">
            sarfaesi.in <ArrowUpRight size={16} />
          </a>
        </footer>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kairologic Technology.</span>
          <span>One case. One record. Total control.</span>
        </div>
      </div>
    </section>
  );
}
