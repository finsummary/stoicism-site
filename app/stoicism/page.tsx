import Link from 'next/link';
import { topics } from '@/lib/topics';

export const metadata = {
  title: 'Stoicism Topics – Hub',
  description: 'Explore Stoicism by topic: quotes, exercises, advice, and journal prompts.',
};

export default function StoicismHubIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
        Stoicism by Topic
      </h1>
      <p className="mt-4 text-stone-600 dark:text-stone-400">
        Each topic has a hub page plus supporting pages on quotes, exercises, advice, and more.
      </p>
      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic}>
            <Link
              href={`/stoicism/${topic}`}
              className="block py-2 text-amber-700 underline decoration-amber-200 hover:decoration-amber-400 dark:text-amber-400 dark:decoration-amber-700 dark:hover:decoration-amber-500"
            >
              Stoicism and {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
