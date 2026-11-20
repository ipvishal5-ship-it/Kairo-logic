"use client";

export default function CourtFilingPanel({ hidden }: { hidden?: boolean }) {
  return (
    <section className="pn" id="p2" hidden={hidden}>
      <div className="cp">
        <span className="lab">Court Filing</span>
        <h2>A day of filing work, automated in one click.</h2>
        <p>
          Merge, smart OCR, compress, paginate, apply the bank seal, and split
          into portal-ready bundles — all inside your web browser, nothing to
          install, running unattended while your team handles the next case.
        </p>
        <ul>
          <li>1-click full pipeline</li>
          <li>Selective OCR (scan-aware)</li>
          <li>Court-mandated pagination</li>
          <li>Bank seal on every page</li>
          <li>Portal bundle splitting</li>
        </ul>
        <p style={{ marginTop: "18px" }}>
          <a
            href="#n-watch"
            style={{ fontWeight: 600, color: "var(--green)" }}
          >
            See filing automation ↓
          </a>
        </p>
      </div>

      <div className="dg">
        <span className="lb">Seven stages, one run</span>
        <div className="pl" style={{ gap: "8px" }}>
          <span className="pill a">Merge</span>
          <span className="pill a">Cover</span>
          <span className="pill a">Text</span>
          <span className="pill a">Compress</span>
          <span className="pill a">Pagination</span>
          <span className="pill a">Seal</span>
          <span className="pill a">Split</span>
        </div>
        <div className="bc" style={{ marginTop: "18px" }}>
          <div className="ch on" />
          <div className="ch on" />
          <div className="ch on" />
        </div>
        <p className="hn">Portal-ready parts</p>
      </div>
    </section>
  );
}
