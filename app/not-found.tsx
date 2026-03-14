import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-heading text-2xl font-bold text-stone-800 dark:text-stone-100">
        Page not found
      </h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        The page you’re looking for doesn’t exist or the article hasn’t been generated yet.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
      >
        Back to home
      </Link>
    </div>
  );
}
