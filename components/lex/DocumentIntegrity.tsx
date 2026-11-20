"use client";

import { useEffect, useRef } from "react";

const ROWS = [
  {
    title: "Page-count validation",
    desc: "Automated pre-flight and post-flight checks make sure the final page count matches before release.",
  },
  {
    title: "Selective OCR",
    desc: "Existing text layers are detected, and only scanned images are processed.",
  },
  {
    title: "300 DPI rendering",
    desc: "Scans are processed at the court-recommended resolution, without aggressive compression.",
  },
  {
    title: "Inspection logs",
    desc: "A structured summary of sizes, page splits and anomalies, so your team can verify before upload.",
  },
] as const;

export default function DocumentIntegrity() {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="ig">
      <div className="kw">
        <div data-in ref={headRef}>
          <h2 className="kt">
            Built for <mark>document integrity</mark> and verifiable filings.
          </h2>
          <p className="kc">
            Checksums, page-count validation and non-destructive processing keep
            your originals intact and portal-compliant.
          </p>
        </div>

        <div className="igl">
          {ROWS.map((r) => (
            <div key={r.title} className="igr" tabIndex={0}>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
