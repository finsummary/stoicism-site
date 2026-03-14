import type { MetadataRoute } from 'next';
import { topics } from '@/lib/topics';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stoicismguide.com';

const CONTENT_TYPES = [
  'stoic-quotes',
  'stoic-exercises',
  'stoic-advice',
  'stoicism-for',
  'what-would-stoics-say',
  'stoic-journal-prompts',
] as const;
const CATEGORY_PATHS = [...CONTENT_TYPES, 'stoicism'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...CATEGORY_PATHS.map((path) => ({
      url: `${BASE_URL}/${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];

  const topicPages: MetadataRoute.Sitemap = [];
  for (const topic of topics) {
    for (const contentType of CONTENT_TYPES) {
      topicPages.push({
        url: `${BASE_URL}/${contentType}/${topic}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    }
    topicPages.push({
      url: `${BASE_URL}/stoicism/${topic}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    });
  }

  return [...staticPages, ...topicPages];
}
