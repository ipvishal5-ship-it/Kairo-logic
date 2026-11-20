"use client";

import { useEffect, useRef } from "react";

const FAQS = [
  {
    q: "Do we need to install any heavy software or PDF drivers on our computers?",
    a: "No installation is required. Kairologic Lex is an instant web service: open your browser, drop your case files, and the cloud engine carries out merging, high-accuracy OCR, Bates stamping, compression, and splitting on demand.",
  },
  {
    q: "Does text recognition (OCR) and document processing happen in the cloud?",
    a: "Yes. The heavy document processing and OCR engine run server-side in the cloud. It accurately converts non-searchable scans into crisp, searchable text without stressing your local machine's memory or CPU.",
  },
  {
    q: "What happens to typed PDFs versus scanned pages?",
    a: "Selective OCR detects pages that already have a text layer and leaves them untouched, while converting scanned pages into searchable text at the court-recommended 300 DPI resolution.",
  },
  {
    q: "Will splitting a large filing cut a document mid-way?",
    a: "No. Kairologic Lex divides the output into portal-ready parts cleanly so individual documents are never split mid-way.",
  },
  {
    q: "What steps run when we click RUN?",
    a: "One click runs the complete routine unattended: merging PDFs, scans and photos, adding an index cover page, running selective OCR, compressing to portal limits, paginating every page, applying the bank seal, and splitting into portal-ready parts.",
  },
  {
    q: "How do we verify the output before uploading to the e-court portal?",
    a: "Automated pre-flight and post-flight page-count checks run alongside structured inspection logs detailing file sizes, page splits and any anomalies before you upload.",
  },
] as const;

export default function LexFaq() {
  const headRef = useRef<HTMLHeadingElement>(null);

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
    <section className="fq" id="n-faq">
      <div className="kw">
        <h2 className="kt" data-in ref={headRef}>
          Questions, <mark>answered.</mark>
        </h2>

        <div className="fl">
          {FAQS.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
