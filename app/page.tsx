import Link from 'next/link';
import topicsData from '@/data/topics.json';

const topics: string[] = topicsData;
const SAMPLE_TOPICS = topics.slice(0, 6);

const SECTIONS = [
  { path: 'stoic-quotes', title: 'Stoic Quotes', desc: 'Quotes from Marcus Aurelius, Seneca, and Epictetus on life’s challenges.' },
  { path: 'stoic-exercises', title: 'Stoic Exercises', desc: 'Practical exercises to build resilience and clarity.' },
  { path: 'stoic-advice', title: 'Stoic Advice', desc: 'Stoic guidance for emotions, work, and relationships.' },
  { path: 'stoicism-for', title: 'Stoicism Guides', desc: 'Topic-based guides applying Stoicism to modern life.' },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100">
        Stoicism for Modern Life
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
        This site offers guides, quotes, exercises, and advice rooted in Stoic philosophy.
        Explore how the wisdom of Marcus Aurelius, Seneca, and Epictetus can help with
        anxiety, stress, discipline, and more.
      </p>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Browse by category
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {SECTIONS.map(({ path, title, desc }) => (
            <li key={path}>
              <Link
                href={`/${path}`}
                className="block rounded-lg border border-stone-200 p-4 hover:border-stone-300 hover:bg-stone-50 dark:border-stone-700 dark:hover:border-stone-600 dark:hover:bg-stone-800/50"
              >
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {title}
                </span>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Popular topics
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {SAMPLE_TOPICS.map((topic) => (
            <li key={topic}>
              <Link
                href={`/stoicism/${topic}`}
                className="rounded-md bg-stone-100 px-3 py-1.5 text-stone-700 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
              >
                {topic}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
