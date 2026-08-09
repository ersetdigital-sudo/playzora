import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getActiveGames } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const games = await getActiveGames();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...games.map((game) => ({
      url: `${site.url}/top-up/${game.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
