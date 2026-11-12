import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

/** Generates robots.txt allowing all public pages including /technologies/manufacturing. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/enquiries", "/api/"],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}

