import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
        Page not found
      </h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        The page you’re looking for doesn’t exist or the article hasn’t been generated yet.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-stone-800 px-4 py-2 text-white hover:bg-stone-700 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300"
      >
        Back to home
      </Link>
    </div>
  );
}
