import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

/** Generates robots.txt allowing all public pages while protecting private routes. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/enquiries", "/api/"],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
