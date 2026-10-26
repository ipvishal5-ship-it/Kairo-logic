export default function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand ${inverse ? "brand-inverse" : ""}`}>
      <svg
        className="brand-mark"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        aria-hidden="true"
      >
        <path d="M5 5h10v42H5zM20 23 36 5h11L30 26zM20 29l10-6 17 24H35z" fill="currentColor" />
        <path d="m20 26 6-6 6 6-6 6z" fill="#75dfc3" />
      </svg>
      <span className="brand-type">
        <strong>KAIROLOGIC</strong>
        <span>TECHNOLOGY</span>
      </span>
    </span>
  );
}
