"use client";

import { useEffect, useRef } from "react";
import Link from "@/components/site-link";

const cl = (x: number) => Math.max(0, Math.min(1, x));
const sm = (x: number) => {
  const c = cl(x);
  return c * c * (3 - 2 * c);
};

export default function StatementSection() {
  const stmtRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const stmt = stmtRef.current;
    if (!stmt) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const words = stmt.querySelectorAll<HTMLElement>(".w");

    const updateWordLighting = () => {
      if (reducedQuery.matches) {
        words.forEach((w) => (w.style.opacity = "1"));
        stmt.classList.add("done");
        return;
      }

      const rect = stmt.getBoundingClientRect();
      const progress = cl(
        (window.innerHeight * 0.85 - rect.top) / (window.innerHeight * 0.4)
      );

      words.forEach((w, i) => {
        const wordValue = sm(progress * words.length * 1.2 - i);
        w.style.opacity = String(0.16 + 0.84 * wordValue);
      });

      stmt.classList.toggle("done", progress > 0.97);
    };

    window.addEventListener("scroll", updateWordLighting, { passive: true });
    window.addEventListener("resize", updateWordLighting, { passive: true });

    // Initial check
    updateWordLighting();

    return () => {
      window.removeEventListener("scroll", updateWordLighting);
      window.removeEventListener("resize", updateWordLighting);
    };
  }, []);

  return (
    <section className="st">
      <div className="wrap">
        <h2 className="stmt" ref={stmtRef} id="stmt">
          <span className="w">Good</span>{" "}
          <span className="w">systems</span>{" "}
          <span className="w">begin</span>{" "}
          <span className="w">with</span>{" "}
          <span className="u">
            <span className="w">how</span>{" "}
            <span className="w">people</span>{" "}
            <span className="w">work.</span>
          </span>
        </h2>
        <div className="stsub">
          <div>
            <p>
              Every business has its own information, responsibilities and decisions. We build around that context, so the technology supports the way your team gets things done.
            </p>
            <Link href="/need-a-solution" className="lnk">
              Need a solution
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

