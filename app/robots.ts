import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Deploy previews and branch deploys are blocked so they never compete
  // with the production site in search results.
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
