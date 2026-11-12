/**
 * Central site configuration for canonical URLs, Open Graph, sitemap, and JSON-LD.
 * Uses NEXT_PUBLIC_SITE_URL when set; defaults to https://kairologic.in.
 */
const normalizedSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://kairologic.in"
).replace(/\/+$/, "");

export const SITE_CONFIG = {
  name: "Kairologic Technologies",
  url: normalizedSiteUrl,
} as const;

