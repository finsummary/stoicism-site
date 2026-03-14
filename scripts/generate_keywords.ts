import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const TOPICS_PATH = path.join(DATA_DIR, 'topics.json');
const TEMPLATES_PATH = path.join(DATA_DIR, 'templates.json');
const KEYWORDS_PATH = path.join(DATA_DIR, 'keywords.json');

type TemplateSlug =
  | 'stoic-quotes'
  | 'stoic-exercises'
  | 'stoic-advice'
  | 'stoicism-for'
  | 'what-would-stoics-say'
  | 'stoic-journal-prompts';

const TEMPLATE_TO_CONTENT_TYPE: Record<string, TemplateSlug> = {
  'stoic quotes about {topic}': 'stoic-quotes',
  'stoic exercises for {topic}': 'stoic-exercises',
  'stoic advice for {topic}': 'stoic-advice',
  'stoicism for {topic}': 'stoicism-for',
  'what would stoics say about {topic}': 'what-would-stoics-say',
  'stoic journal prompts for {topic}': 'stoic-journal-prompts',
};

interface KeywordEntry {
  keyword: string;
  topic: string;
  template: string;
  slug: string;
  contentType: TemplateSlug;
  pillarSlug: string;
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function main() {
  const topics: string[] = JSON.parse(fs.readFileSync(TOPICS_PATH, 'utf-8'));
  const templates: string[] = JSON.parse(fs.readFileSync(TEMPLATES_PATH, 'utf-8'));
  const keywords: KeywordEntry[] = [];

  for (const topic of topics) {
    const topicSlug = slugify(topic);
    for (const template of templates) {
      const keyword = template.replace(/\{topic\}/gi, topic);
      const contentType = TEMPLATE_TO_CONTENT_TYPE[template];
      if (!contentType) continue;
      keywords.push({
        keyword,
        topic: topicSlug,
        template,
        slug: `${contentType}/${topicSlug}`,
        contentType,
        pillarSlug: `stoicism/${topicSlug}`,
      });
    }
  }

  fs.writeFileSync(KEYWORDS_PATH, JSON.stringify(keywords, null, 2), 'utf-8');
  console.log(`Generated ${keywords.length} keywords from ${topics.length} topics.`);
}

main();
