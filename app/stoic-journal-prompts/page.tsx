import Link from 'next/link';
import { topics } from '@/lib/topics';

export const metadata = {
  title: 'Stoic Journal Prompts by Topic',
  description: 'Stoic journal prompts for reflection on anxiety, gratitude, discipline, and more.',
};

export default function StoicJournalPromptsIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
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
              className="block rounded-md py-2 text-stone-700 underline decoration-stone-300 hover:decoration-stone-500 dark:text-stone-300 dark:decoration-stone-600 dark:hover:decoration-stone-400"
            >
              Stoic journal prompts for {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
