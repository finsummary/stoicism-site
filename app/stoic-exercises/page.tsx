import Link from 'next/link';
import { topics } from '@/lib/topics';

export const metadata = {
  title: 'Stoic Exercises by Topic',
  description: 'Practical Stoic exercises for anxiety, stress, discipline, and more.',
};

export default function StoicExercisesIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
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
              className="block py-2 text-amber-700 underline decoration-amber-200 hover:decoration-amber-400 dark:text-amber-400 dark:decoration-amber-700 dark:hover:decoration-amber-500"
            >
              Stoic exercises for {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
