import Link from 'next/link';

const SUPPORTING_PAGES: { href: string; label: string }[] = [
  { href: 'stoic-quotes', label: 'Stoic quotes' },
  { href: 'stoic-exercises', label: 'Stoic exercises' },
  { href: 'stoic-advice', label: 'Stoic advice' },
  { href: 'stoicism-for', label: 'Stoicism for' },
  { href: 'what-would-stoics-say', label: 'What would Stoics say' },
  { href: 'stoic-journal-prompts', label: 'Stoic journal prompts' },
];

interface HubLinksProps {
  topic: string;
}

export default function HubLinks({ topic }: HubLinksProps) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-200">
        Explore more on this topic
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {SUPPORTING_PAGES.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={`/${href}/${topic}`}
              className="rounded-md bg-stone-100 px-3 py-1.5 text-stone-700 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
            >
              {label} about {topic}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
