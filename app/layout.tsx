import type { Metadata } from 'next';
import Link from 'next/link';
import { Cormorant_Garamond, Source_Serif_4 } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700'],
});
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Stoicism Guide – Stoicism Quotes, Exercises & Advice',
  description:
    'Explore Stoic philosophy with quotes, exercises, and advice from Marcus Aurelius, Seneca, and Epictetus. Your guide to Stoicism for modern life.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen">
        <header className="border-b border-warm-200 bg-warm-50/95 dark:border-stone-700 dark:bg-stone-900/95">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link
              href="/"
              className="font-heading text-xl font-semibold text-stone-800 transition-colors hover:text-amber-700 dark:text-stone-100 dark:hover:text-amber-400"
            >
              Stoicism Guide
            </Link>
            <nav className="flex gap-6 text-sm text-stone-600 dark:text-stone-400">
              <Link href="/" className="transition-colors hover:text-amber-700 dark:hover:text-amber-400">
                Home
              </Link>
              <Link href="/stoic-quotes" className="transition-colors hover:text-amber-700 dark:hover:text-amber-400">
                Quotes
              </Link>
              <Link href="/stoic-exercises" className="transition-colors hover:text-amber-700 dark:hover:text-amber-400">
                Exercises
              </Link>
              <Link href="/stoic-advice" className="transition-colors hover:text-amber-700 dark:hover:text-amber-400">
                Advice
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t border-warm-200 py-8 text-center text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400">
          Stoicism Guide · Stoicism guides and resources
        </footer>
      </body>
    </html>
  );
}
