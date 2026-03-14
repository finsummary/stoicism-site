import Link from 'next/link';
import { topics } from '@/lib/topics';

export const metadata = {
  title: 'Stoic Journal Prompts by Topic',
  description: 'Stoic journal prompts for reflection on anxiety, gratitude, discipline, and more.',
};

export default function StoicJournalPromptsIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
        Stoic Journal Prompts by Topic
      </h1>
      <p className="mt-4 text-stone-600 dark:text-stone-400">
        Guided reflection questions rooted in Stoic philosophy.
      </p>
      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic}>
            <Link
              href={`/stoic-journal-prompts/${topic}`}
              className="block py-2 text-amber-700 underline decoration-amber-200 hover:decoration-amber-400 dark:text-amber-400 dark:decoration-amber-700 dark:hover:decoration-amber-500"
            >
              Stoic journal prompts for {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
