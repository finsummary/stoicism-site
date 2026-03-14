export default function AppCTA() {
  return (
    <section className="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6 text-stone-800 dark:border-stone-700 dark:bg-stone-800/50 dark:text-stone-200">
      <h2 className="text-xl font-semibold">Talk to a Stoic Mentor</h2>
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
        className="mt-4 inline-block rounded-lg bg-stone-800 px-4 py-2 text-white hover:bg-stone-700 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300"
      >
        Download on the App Store
      </a>
    </section>
  );
}
