import type { MetadataRoute } from "next";
import { site } from "@/site.config";

/**
 * /c und /embed sind nicht gesperrt, sondern tragen noindex.
 * Sonst könnte Google das noindex gar nicht lesen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
