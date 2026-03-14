import Link from 'next/link';
import { topics } from '@/lib/topics';

export const metadata = {
  title: 'Stoic Exercises by Topic',
  description: 'Practical Stoic exercises for anxiety, stress, discipline, and more.',
};

export default function StoicExercisesIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
        Stoic Exercises by Topic
      </h1>
      <p className="mt-4 text-stone-600 dark:text-stone-400">
        Step-by-step practices based on Stoic philosophy.
      </p>
      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic}>
            <Link
              href={`/stoic-exercises/${topic}`}
              className="block rounded-md py-2 text-stone-700 underline decoration-stone-300 hover:decoration-stone-500 dark:text-stone-300 dark:decoration-stone-600 dark:hover:decoration-stone-400"
            >
              Stoic exercises for {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
