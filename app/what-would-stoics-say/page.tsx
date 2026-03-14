import Link from 'next/link';
import { topics } from '@/lib/topics';

export const metadata = {
  title: 'What Would Stoics Say',
  description: 'Explore what Marcus Aurelius, Seneca, and Epictetus would say about modern challenges.',
};

export default function WhatWouldStoicsSayIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
        What Would Stoics Say About…
      </h1>
      <p className="mt-4 text-stone-600 dark:text-stone-400">
        The Stoic perspective on life’s challenges and themes.
      </p>
      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic}>
            <Link
              href={`/what-would-stoics-say/${topic}`}
              className="block py-2 text-amber-700 underline decoration-amber-200 hover:decoration-amber-400 dark:text-amber-400 dark:decoration-amber-700 dark:hover:decoration-amber-500"
            >
              What would Stoics say about {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
