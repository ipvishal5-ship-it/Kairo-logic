import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

/** Generates sitemap.xml with all public marketing and product routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/technologies",
    "/technologies/workflow",
    "/technologies/ecourt-filing",
    "/technologies/manufacturing",
    "/need-a-solution",
    "/faq",
    "/contact",
    "/privacy",
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route.startsWith("/technologies/") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/technologies/") ? 0.9 : 0.7,
  }));
}
