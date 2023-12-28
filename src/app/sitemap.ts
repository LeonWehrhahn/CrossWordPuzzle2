import { MetadataRoute } from "next";
import i18nConfig from "../../i18n-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeRoutes: MetadataRoute.Sitemap =
    i18nConfig.locales
      .filter((locale) => locale !== i18nConfig.defaultLocale)
      .map((locale) => ({
        url: `https://www.crossword-generator.com/${locale}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
      })) ?? [];

  return [
    {
      url: "https://www.crossword-generator.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...homeRoutes,
  ];
}
