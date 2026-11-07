import React from "react";

export function BrandMark({
  className = "brand-mark",
  width = 38,
  height = 38,
}: {
  className?: string;
  width?: number | string;
  height?: number | string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 80 80"
      role="img"
      aria-label="Kairologic"
      style={{ flex: "none" }}
    >
      <path
        fill="#102A43"
        d="M8 10h17v18H8zM8 31h17v18H8zM8 52h17v18H8zM28 34 51 10h19L43 40zM28 46l15-6 27 30H51z"
      />
      <path fill="#16876D" d="M27 33h14v14H27z" />
    </svg>
  );
}

export default function Brand({
  tagline = "Right time right move",
}: {
  inverse?: boolean;
  tagline?: string;
}) {
  return (
    <span className="logo" style={{ textDecoration: "none" }}>
      <BrandMark />
      <div>
        <span style={{ color: "#102A43" }}>KAIRO</span>
        <em style={{ color: "#16876D", fontStyle: "normal" }}>LOGIC</em>
        {tagline && <small>{tagline}</small>}
      </div>
    </span>
  );
}
