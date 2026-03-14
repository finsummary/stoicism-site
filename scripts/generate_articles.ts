import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env.local so GROQ_API_KEY is available when running this script directly
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { generateText } from '../lib/ai';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTENT_DIR = path.join(process.cwd(), 'content');
const KEYWORDS_PATH = path.join(DATA_DIR, 'keywords.json');

const OVERWRITE = false; // set to true to regenerate existing files

interface KeywordEntry {
  keyword: string;
  topic: string;
  template: string;
  slug: string;
  contentType: string;
  pillarSlug: string;
}

const TITLE_BY_TYPE: Record<string, (topic: string) => string> = {
  'stoic-quotes': (t) => `Stoic Quotes About ${capitalize(t)}`,
  'stoic-exercises': (t) => `Stoic Exercises for ${capitalize(t)}`,
  'stoic-advice': (t) => `Stoic Advice for ${capitalize(t)}`,
  'stoicism-for': (t) => `Stoicism for ${capitalize(t)}`,
  'what-would-stoics-say': (t) => `What Would Stoics Say About ${capitalize(t)}`,
  'stoic-journal-prompts': (t) => `Stoic Journal Prompts for ${capitalize(t)}`,
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function buildPrompt(entry: KeywordEntry): string {
  const title = TITLE_BY_TYPE[entry.contentType]?.(entry.topic) ?? entry.keyword;
  return `Write a detailed Stoicism article titled:

"${title}"

Include these sections in markdown (use ## for each section):

## Introduction

## Stoic Quotes

## Interpretation

## Stoic Exercise

## Reflection Questions

## FAQ

Requirements:
- Minimum 700 words.
- Use clear, educational language.
- Include quotes from Marcus Aurelius, Seneca, and Epictetus where relevant.
- Avoid repetition and filler.
- FAQ must have exactly 3 questions and short answers.
- Output only the markdown article, no preamble.`;
}

function getFilename(entry: KeywordEntry): string {
  if (entry.contentType === 'stoicism') return `stoicism-${entry.topic}.md`;
  return `${entry.contentType}-${entry.topic}.md`;
}

async function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  const keywords: KeywordEntry[] = JSON.parse(fs.readFileSync(KEYWORDS_PATH, 'utf-8'));
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < keywords.length; i++) {
    const entry = keywords[i];
    const filename = getFilename(entry);
    const filePath = path.join(CONTENT_DIR, filename);

    if (!OVERWRITE && fs.existsSync(filePath)) {
      skipped++;
      if (i % 50 === 0) console.log(`Progress: ${i + 1}/${keywords.length}`);
      continue;
    }

    try {
      const prompt = buildPrompt(entry);
      const markdown = await generateText(prompt);
      // Small delay between requests to reduce chance of hitting rate limits
      await new Promise((r) => setTimeout(r, 2000));
      const withH1 = markdown.trimStart().startsWith('#')
        ? markdown
        : `# ${TITLE_BY_TYPE[entry.contentType]?.(entry.topic) ?? entry.keyword}\n\n${markdown}`;
      fs.writeFileSync(filePath, withH1, 'utf-8');
      generated++;
      console.log(`[${i + 1}/${keywords.length}] ${filename}`);
    } catch (err) {
      failed++;
      console.error(`Failed ${filename}:`, err);
    }
  }

  // Pillar pages: one per topic
  const topics = Array.from(new Set(keywords.map((k) => k.topic)));
  for (const topic of topics) {
    const filename = `stoicism-${topic}.md`;
    const filePath = path.join(CONTENT_DIR, filename);
    if (!OVERWRITE && fs.existsSync(filePath)) {
      skipped++;
      continue;
    }
    try {
      const prompt = `Write a Stoicism hub article titled:

"Stoicism and ${capitalize(topic)}: A Guide"

This is a pillar page that introduces the topic and links to subtopics. Include in markdown:

## Introduction

## Key Stoic Perspectives

## Quotes from the Stoics

## Practical Applications

## Further Reading (mention: Stoic quotes, exercises, advice, journal prompts for this topic)

## FAQ

Minimum 700 words. Clear, educational language. Output only markdown.`;
      const markdown = await generateText(prompt);
      const withH1 = markdown.trimStart().startsWith('#')
        ? markdown
        : `# Stoicism and ${capitalize(topic)}: A Guide\n\n${markdown}`;
      fs.writeFileSync(filePath, withH1, 'utf-8');
      generated++;
      console.log(`Pillar: ${filename}`);
    } catch (err) {
      failed++;
      console.error(`Failed pillar ${filename}:`, err);
    }
  }

  console.log(`Done. Generated: ${generated}, Skipped: ${skipped}, Failed: ${failed}`);
}

main();
