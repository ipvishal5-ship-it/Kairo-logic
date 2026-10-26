export default function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand ${inverse ? "brand-inverse" : ""}`}>
      <svg
        className="brand-mark"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path d="M5 5h10v38H5z" fill="currentColor" />
        <path d="M19 24 35 5h12L30 24l17 19H35z" fill="currentColor" />
        <path d="M19 24 27 14h7l-8 10 8 10h-7z" fill="#22b99b" />
      </svg>
      <span className="brand-type">
        <strong>kairologic</strong>
        <span>TECHNOLOGY</span>
      </span>
    </span>
  );
}
