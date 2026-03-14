import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AppCTA from './AppCTA';
import RelatedTopics from './RelatedTopics';
import HubLinks from './HubLinks';

interface ArticleLayoutProps {
  title: string;
  content: string;
  topic: string;
  isPillar?: boolean;
  faqQuestions?: string[];
}

export default function ArticleLayout({
  title,
  content,
  topic,
  isPillar = false,
  faqQuestions = [],
}: ArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
        {title}
      </h1>
      {!isPillar && (
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          Part of our guide to Stoicism and {topic}.{' '}
          <Link href={`/stoicism/${topic}`} className="underline hover:no-underline">
            See full hub page →
          </Link>
        </p>
      )}
      <div className="article-content mt-6 space-y-4 text-stone-700 dark:text-stone-300">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: () => null,
            h2: ({ children }) => (
              <h2 className="mt-8 font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-6 font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                {children}
              </h3>
            ),
            p: ({ children }) => <p className="leading-relaxed">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-inside list-disc space-y-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-inside list-decimal space-y-1">{children}</ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-stone-300 pl-4 italic dark:border-stone-600">
                {children}
              </blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
      <AppCTA />
      {isPillar && <HubLinks topic={topic} />}
      <RelatedTopics currentTopic={topic} />
      {faqQuestions.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqQuestions.map((q) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: '' },
              })),
            }),
          }}
        />
      )}
    </article>
  );
}
