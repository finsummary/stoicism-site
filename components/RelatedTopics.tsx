import Link from 'next/link';
import topicsData from '@/data/topics.json';

const CONTENT_TYPES: { path: string; label: string }[] = [
  { path: 'stoic-quotes', label: 'Stoic quotes about' },
  { path: 'stoic-exercises', label: 'Stoic exercises for' },
  { path: 'stoic-advice', label: 'Stoic advice for' },
];

const topics: string[] = topicsData;

function pickOtherTopics(currentTopic: string, count: number): string[] {
  const idx = topics.indexOf(currentTopic);
  const others = topics.filter((t) => t !== currentTopic);
  const start = idx >= 0 ? idx % others.length : 0;
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(others[(start + i) % others.length]);
  }
  return result;
}

interface RelatedTopicsProps {
  currentTopic: string;
  count?: number;
}

export default function RelatedTopics({ currentTopic, count = 6 }: RelatedTopicsProps) {
  const otherTopics = pickOtherTopics(currentTopic, count);
  const links: { href: string; label: string }[] = [];
  const typeCount = CONTENT_TYPES.length;
  otherTopics.forEach((topic, i) => {
    const type = CONTENT_TYPES[i % typeCount];
    links.push({
      href: `/${type.path}/${topic}`,
      label: `${type.label} ${topic}`,
    });
  });

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-200">
        Related topics
      </h2>
      <ul className="mt-3 space-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-stone-600 underline decoration-stone-300 hover:decoration-stone-500 dark:text-stone-400 dark:decoration-stone-600 dark:hover:decoration-stone-400"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
