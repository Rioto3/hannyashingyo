import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://heartsutra.app';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          ja: `${baseUrl}?lang=ja`,
          en: `${baseUrl}?lang=en`,
        },
      },
    },
  ];
}
