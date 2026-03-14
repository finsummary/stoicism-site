import Image from 'next/image';
import Link from 'next/link';
import topicsData from '@/data/topics.json';

const topics: string[] = topicsData;
const SAMPLE_TOPICS = topics.slice(0, 6);

const SECTIONS = [
  { path: 'stoic-quotes', title: 'Stoic Quotes', desc: 'Quotes from Marcus Aurelius, Seneca, and Epictetus on life’s challenges.' },
  { path: 'stoic-exercises', title: 'Stoic Exercises', desc: 'Practical exercises to build resilience and clarity.' },
  { path: 'stoic-advice', title: 'Stoic Advice', desc: 'Stoic guidance for emotions, work, and relationships.' },
  { path: 'stoicism-for', title: 'Stoicism Guides', desc: 'Topic-based guides applying Stoicism to modern life.' },
];

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1577543599916-551c9c4c1ca8?w=1200&q=80';

export default function HomePage() {
  return (
    <div>
      <div className="relative mx-auto max-w-5xl px-4 pt-6">
        <div className="relative aspect-[21/9] min-h-[180px] overflow-hidden rounded-xl bg-warm-200 dark:bg-stone-800">
          <Image
            src={HERO_IMAGE}
            alt="Stoicism and classical wisdom"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-stone-900/40 dark:bg-stone-900/60" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl">
              Stoicism for Modern Life
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-400">
        This site offers guides, quotes, exercises, and advice rooted in Stoic philosophy.
        Explore how the wisdom of Marcus Aurelius, Seneca, and Epictetus can help with
        anxiety, stress, discipline, and more.
      </p>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold text-stone-800 dark:text-stone-100">
          Browse by category
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {SECTIONS.map(({ path, title, desc }) => (
            <li key={path}>
              <Link
                href={`/${path}`}
                className="block rounded-xl border border-warm-200 bg-white p-5 shadow-sm transition-colors hover:border-amber-200 hover:shadow-md dark:border-stone-700 dark:bg-stone-800/50 dark:hover:border-amber-800/50"
              >
                <span className="font-heading font-semibold text-stone-800 dark:text-stone-100">
                  {title}
                </span>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold text-stone-800 dark:text-stone-100">
          Popular topics
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {SAMPLE_TOPICS.map((topic) => (
            <li key={topic}>
              <Link
                href={`/stoicism/${topic}`}
                className="rounded-lg bg-warm-100 px-3 py-1.5 text-stone-700 transition-colors hover:bg-amber-100 hover:text-amber-800 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-amber-900/30 dark:hover:text-amber-200"
              >
                {topic}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      </div>
    </div>
  );
}
