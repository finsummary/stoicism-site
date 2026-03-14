/**
 * Fetches one Unsplash image per topic using topic-keywords.json and writes
 * data/topic-images.json. Requires UNSPLASH_ACCESS_KEY in .env.local.
 *
 * Get a free key: https://unsplash.com/developers
 * Run: npm run fetch-topic-images
 */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const DATA_DIR = path.join(process.cwd(), 'data');
const TOPICS_PATH = path.join(DATA_DIR, 'topics.json');
const KEYWORDS_PATH = path.join(DATA_DIR, 'topic-keywords.json');
const OUTPUT_PATH = path.join(DATA_DIR, 'topic-images.json');

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function searchUnsplash(query: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) return null;
  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', '1');
  url.searchParams.set('orientation', 'landscape');
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { results?: { urls?: { regular?: string } }[] };
  const first = data.results?.[0]?.urls?.regular;
  if (!first) return null;
  return `${first}?w=800&q=80`;
}

async function main() {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('UNSPLASH_ACCESS_KEY not set. Add it to .env.local (get a key at https://unsplash.com/developers).');
    process.exit(1);
  }

  const topics = JSON.parse(fs.readFileSync(TOPICS_PATH, 'utf-8')) as string[];
  let keywords: Record<string, string> = {};
  try {
    keywords = JSON.parse(fs.readFileSync(KEYWORDS_PATH, 'utf-8'));
  } catch {
    console.warn('topic-keywords.json not found, using topic name as search query.');
  }

  const result: Record<string, string> = {};
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const query = keywords[topic] ?? topic;
    const url = await searchUnsplash(query);
    if (url) {
      result[topic] = url;
      console.log(`[${i + 1}/${topics.length}] ${topic} -> ${url.slice(0, 60)}...`);
    } else {
      console.warn(`[${i + 1}/${topics.length}] ${topic} -> no image found for "${query}"`);
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`\nWrote ${Object.keys(result).length} image URLs to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
