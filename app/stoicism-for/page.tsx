import Link from 'next/link';
import { topics } from '@/lib/topics';

export const metadata = {
  title: 'Stoicism Guides by Topic',
  description: 'How Stoicism can help with discipline, anxiety, leadership, and more.',
};

export default function StoicismForIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
        Stoicism for…
      </h1>
      <p className="mt-4 text-stone-600 dark:text-stone-400">
        Topic-based guides applying Stoic wisdom to everyday life.
      </p>
      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic}>
            <Link
              href={`/stoicism-for/${topic}`}
              className="block rounded-md py-2 text-stone-700 underline decoration-stone-300 hover:decoration-stone-500 dark:text-stone-300 dark:decoration-stone-600 dark:hover:decoration-stone-400"
            >
              Stoicism for {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
