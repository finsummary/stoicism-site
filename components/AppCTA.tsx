export default function AppCTA() {
  return (
    <section className="mt-12 rounded-xl border border-warm-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800/50 dark:text-stone-200">
      <h2 className="font-heading text-xl font-semibold text-stone-800 dark:text-stone-100">
        Talk to a Stoic Mentor
      </h2>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        Inside the Stoicism AI Guide app you can:
      </p>
      <ul className="mt-2 list-inside list-disc space-y-1 text-stone-600 dark:text-stone-400">
        <li>ask Stoic questions</li>
        <li>practice Stoic exercises</li>
        <li>receive daily Stoic reflections</li>
        <li>journal using Stoic prompts</li>
      </ul>
      <a
        href="https://apps.apple.com/app/stoicism-ai-guide"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
      >
        Download on the App Store
      </a>
    </section>
  );
}
