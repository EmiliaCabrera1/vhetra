import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vhetra.com.ar";
  const lastModified = new Date();

  return ["es", "en"].flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/${locale}/tarjeta`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/es/tarjeta`,
          en: `${baseUrl}/en/tarjeta`,
        },
      },
    },
  ]);
}
