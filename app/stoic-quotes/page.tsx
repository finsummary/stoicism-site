import Link from 'next/link';
import { topics } from '@/lib/topics';

export const metadata = {
  title: 'Stoic Quotes by Topic',
  description: 'Stoic quotes from Marcus Aurelius, Seneca, and Epictetus on anxiety, fear, stress, and more.',
};

export default function StoicQuotesIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
        Stoic Quotes by Topic
      </h1>
      <p className="mt-4 text-stone-600 dark:text-stone-400">
        Explore quotes from the great Stoic philosophers on life’s challenges and themes.
      </p>
      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic}>
            <Link
              href={`/stoic-quotes/${topic}`}
              className="block py-2 text-amber-700 underline decoration-amber-200 hover:decoration-amber-400 dark:text-amber-400 dark:decoration-amber-700 dark:hover:decoration-amber-500"
            >
              Stoic quotes about {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
