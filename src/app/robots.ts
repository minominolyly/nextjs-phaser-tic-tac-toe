import AppConfig from "@/configurations/app.config";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: AppConfig.BASE_URL,
    sitemap: `${AppConfig.BASE_URL}/sitemap.xml`,
  };
}
