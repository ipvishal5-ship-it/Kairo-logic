export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} width="52" height="52" viewBox="0 0 80 80" aria-hidden="true">
      <path d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8zM28 34 51 10h19L43 40zM28 46l15-6 27 30H51z" fill="currentColor" />
      <path d="M27 33h14v14H27z" fill="#75dfc3" />
    </svg>
  );
}

export default function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand ${inverse ? "brand-inverse" : ""}`}>
      <BrandMark />
      <span className="brand-type">
        <strong>KAIROLOGIC</strong>
        <span>Technologies</span>
      </span>
    </span>
  );
}
