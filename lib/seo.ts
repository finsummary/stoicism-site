import type { Metadata } from 'next';

export type ContentType =
  | 'stoic-quotes'
  | 'stoic-exercises'
  | 'stoic-advice'
  | 'stoicism-for'
  | 'what-would-stoics-say'
  | 'stoic-journal-prompts'
  | 'stoicism';

const TITLE_MAP: Record<ContentType, (topic: string) => string> = {
  'stoic-quotes': (t) => `Stoic Quotes About ${capitalize(t)}`,
  'stoic-exercises': (t) => `Stoic Exercises for ${capitalize(t)}`,
  'stoic-advice': (t) => `Stoic Advice for ${capitalize(t)}`,
  'stoicism-for': (t) => `Stoicism for ${capitalize(t)}`,
  'what-would-stoics-say': (t) => `What Would Stoics Say About ${capitalize(t)}`,
  'stoic-journal-prompts': (t) => `Stoic Journal Prompts for ${capitalize(t)}`,
  stoicism: (t) => `Stoicism and ${capitalize(t)}: A Guide`,
};

const DESC_MAP: Record<ContentType, (topic: string) => string> = {
  'stoic-quotes': (t) =>
    `Discover Stoic quotes about ${t} from Marcus Aurelius, Seneca, and Epictetus. Learn how ancient wisdom applies to modern life.`,
  'stoic-exercises': (t) =>
    `Practical Stoic exercises for ${t}. Step-by-step practices based on ancient philosophy to build resilience and clarity.`,
  'stoic-advice': (t) =>
    `Stoic advice for dealing with ${t}. Evidence-based guidance from the great Stoic philosophers.`,
  'stoicism-for': (t) =>
    `How Stoicism can help with ${t}. A concise guide to applying ancient wisdom to everyday challenges.`,
  'what-would-stoics-say': (t) =>
    `What would the Stoics say about ${t}? Explore the perspective of Marcus Aurelius, Seneca, and Epictetus.`,
  'stoic-journal-prompts': (t) =>
    `Stoic journal prompts for ${t}. Reflect and grow with guided questions rooted in Stoic philosophy.`,
  stoicism: (t) =>
    `A complete Stoic guide to ${t}. Quotes, exercises, advice, and reflection prompts from the ancient Stoics.`,
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function getMetadata(contentType: ContentType, topic: string): Metadata {
  const title = TITLE_MAP[contentType](topic);
  const description = DESC_MAP[contentType](topic);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stoicismguide.com';
  const url = `${baseUrl}/${contentType}/${topic}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function buildFaqSchema(questions: string[], topic: string) {
  const q = questions.length
    ? questions
    : [
        `What did Stoics say about ${topic}?`,
        `How did Marcus Aurelius deal with ${topic}?`,
        `What Stoic exercise helps with ${topic}?`,
      ];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: q.map((question) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: '',
      },
    })),
  };
}
