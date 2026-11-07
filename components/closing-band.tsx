"use client";

import { useEffect, useRef } from "react";
import Link from "@/components/site-link";

export default function ClosingBand() {
  const lgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const lg = lgRef.current;
    if (!lg) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      lg.classList.add("in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lg.classList.add("in");
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(lg);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="cl">
      <div className="wrap">
        <div>
          <h2>What should work better?</h2>
          <p>
            Tell us about the work your team manages and where you want to improve it.
          </p>
          <Link className="btn cta" href="/need-a-solution">
            Tell us about your project
          </Link>
        </div>
        <svg className="lg" id="lg" ref={lgRef} viewBox="0 0 80 80" aria-hidden="true">
          <path pathLength={1} d="M8 10h17v18H8z" />
          <path pathLength={1} d="M8 31h17v18H8z" />
          <path pathLength={1} d="M8 52h17v18H8z" />
          <path pathLength={1} d="M28 34 51 10h19L43 40z" />
          <path pathLength={1} d="M28 46l15-6 27 30H51z" />
          <path pathLength={1} d="M27 33h14v14H27z" />
        </svg>
      </div>
    </section>
  );
}

