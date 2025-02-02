import { MetadataRoute } from "next";
import AppConfig from "@/configurations/app.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];
  sitemap.push({
    url: AppConfig.BASE_URL,
    images: [`${AppConfig.BASE_URL}/images/eyecatch.webp`],
    lastModified: new Date(),
    priority: 1,
  });

  return sitemap;
}
