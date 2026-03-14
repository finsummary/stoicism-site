import path from 'path';
import fs from 'fs';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type ContentType =
  | 'stoic-quotes'
  | 'stoic-exercises'
  | 'stoic-advice'
  | 'stoicism-for'
  | 'what-would-stoics-say'
  | 'stoic-journal-prompts'
  | 'stoicism';

/**
 * Get filename for a content type and topic.
 * Pillar pages use stoicism-{topic}.md; others use {contentType}-{topic}.md
 */
export function getContentFilename(contentType: ContentType, topic: string): string {
  const slug = topic.toLowerCase().replace(/\s+/g, '-');
  if (contentType === 'stoicism') {
    return `stoicism-${slug}.md`;
  }
  return `${contentType}-${slug}.md`;
}

/**
 * Load markdown content from /content by contentType and topic.
 * Returns raw markdown string or null if file does not exist.
 */
export function loadMarkdown(contentType: ContentType, topic: string): string | null {
  const filename = getContentFilename(contentType, topic);
  const filePath = path.join(CONTENT_DIR, filename);
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

/**
 * Same as loadMarkdown but for use in Next.js (no fs in edge).
 * Uses path relative to process.cwd() and readFileSync.
 */
export function loadMarkdownSync(contentType: ContentType, topic: string): string | null {
  return loadMarkdown(contentType, topic);
}
