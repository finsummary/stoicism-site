import fs from 'fs';
import path from 'path';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80';

let cachedTopicImages: Record<string, string> | null = null;

function loadTopicImages(): Record<string, string> {
  if (cachedTopicImages) return cachedTopicImages;
  try {
    const filePath = path.join(process.cwd(), 'data', 'topic-images.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    cachedTopicImages = JSON.parse(raw) as Record<string, string>;
    return cachedTopicImages ?? {};
  } catch {
    return {};
  }
}

/**
 * Returns the image URL for a given topic. Uses data/topic-images.json if present,
 * otherwise falls back to DEFAULT_IMAGE. Safe for use in both server components and build.
 */
export function getImageForTopic(topic: string): string {
  const slug = topic.toLowerCase().trim();
  const map = loadTopicImages();
  const url = map[slug];
  if (url && typeof url === 'string') return url;
  return DEFAULT_IMAGE;
}
