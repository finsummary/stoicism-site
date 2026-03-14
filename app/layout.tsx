import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'StoicSEO – Stoicism Quotes, Exercises & Advice',
  description:
    'Explore Stoic philosophy with quotes, exercises, and advice from Marcus Aurelius, Seneca, and Epictetus. Your guide to Stoicism for modern life.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <header className="border-b border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
              StoicSEO
            </Link>
            <nav className="flex gap-6 text-sm text-stone-600 dark:text-stone-400">
              <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-200">
                Home
              </Link>
              <Link href="/stoic-quotes" className="hover:text-stone-900 dark:hover:text-stone-200">
                Quotes
              </Link>
              <Link href="/stoic-exercises" className="hover:text-stone-900 dark:hover:text-stone-200">
                Exercises
              </Link>
              <Link href="/stoic-advice" className="hover:text-stone-900 dark:hover:text-stone-200">
                Advice
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t border-stone-200 py-8 text-center text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400">
          StoicSEO Engine · Stoicism guides and resources
        </footer>
      </body>
    </html>
  );
}
