import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getImageForTopic } from '@/lib/images';
import AppCTA from './AppCTA';
import RelatedTopics from './RelatedTopics';
import HubLinks from './HubLinks';

function getTextFromNode(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getTextFromNode).join('');
  if (node && typeof node === 'object' && 'props' in node && node.props?.children)
    return getTextFromNode((node as React.ReactElement).props.children);
  return '';
}

function FaqListItem({ children }: { children: React.ReactNode }) {
  const raw = getTextFromNode(children);
  const hasFaq = /Q:\s*/i.test(raw) && /\s+A:\s+/i.test(raw);
  if (!hasFaq) {
    return <li>{children}</li>;
  }
  const parts = raw.split(/\s+A:\s+/i);
  const questionPart = parts[0]?.replace(/^\*\*?Q:\s*\*\*?/i, '').replace(/^Q:\s*/i, '').trim() ?? '';
  const answerPart = parts.slice(1).join(' A: ').trim();
  return (
    <li className="list-none">
      <div className="mb-6 border-b border-warm-200 pb-6 last:border-0 last:pb-0 dark:border-stone-700">
        <p className="font-body font-semibold text-stone-800 dark:text-stone-100">Q:</p>
        <p className="mt-0.5 text-stone-700 dark:text-stone-300">{questionPart}</p>
        <p className="mt-3 font-body font-semibold text-stone-800 dark:text-stone-100">A:</p>
        <p className="mt-0.5 text-stone-700 dark:text-stone-300">{answerPart}</p>
      </div>
    </li>
  );
}

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
    <article className="mx-auto w-full max-w-3xl px-4 py-8 min-w-0">
      <div className="relative mb-8 aspect-[3/1] min-h-[140px] overflow-hidden rounded-lg bg-warm-200 dark:bg-stone-800">
        <Image
          src={getImageForTopic(topic)}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
        />
        <div className="absolute inset-0 bg-stone-900/30 dark:bg-stone-900/50" />
      </div>
      <h1 className="font-heading text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
        {title}
      </h1>
      {!isPillar && (
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          Part of our guide to Stoicism and {topic}.{' '}
          <Link
            href={`/stoicism/${topic}`}
            className="text-amber-700 underline decoration-amber-200 hover:decoration-amber-400 dark:text-amber-400 dark:decoration-amber-700 dark:hover:decoration-amber-500"
          >
            See full hub page →
          </Link>
        </p>
      )}
      <div className="article-content mt-6 space-y-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: () => null,
            h2: ({ children }) => (
              <h2 className="mt-8 font-heading text-xl font-semibold text-stone-800 dark:text-stone-100">
                {children}
              </h2>
            ),
            h3: ({ children }) => {
              const raw = getTextFromNode(children);
              const isFaqQuestion = /^Q:\s*/i.test(raw.trim());
              if (isFaqQuestion) {
                const questionText = raw.replace(/^Q:\s*/i, '').trim();
                return (
                  <div className="mt-6">
                    <p className="font-body font-semibold text-stone-800 dark:text-stone-100">Q:</p>
                    <p className="mt-0.5 font-heading text-lg font-semibold text-stone-800 dark:text-stone-100">
                      {questionText}
                    </p>
                  </div>
                );
              }
              return (
                <h3 className="mt-6 font-heading text-lg font-semibold text-stone-800 dark:text-stone-100">
                  {children}
                </h3>
              );
            },
            p: ({ children }) => {
              const raw = getTextFromNode(children);
              const trimmed = raw.trim();
              // Single paragraph that starts with "A:" (after a ### Q: heading)
              const isFaqAnswer = /^A:\s*/i.test(trimmed);
              if (isFaqAnswer && !/\s+Q:\s+/i.test(trimmed)) {
                const answerText = raw.replace(/^A:\s*/i, '').trim();
                return (
                  <p className="mb-6 mt-3">
                    <span className="font-body font-semibold text-stone-800 dark:text-stone-100">A:</span>
                    <br />
                    <span className="text-stone-700 dark:text-stone-300">{answerText}</span>
                  </p>
                );
              }
              // One paragraph containing "Q: ... A: ..." pairs (with or without intro; Q: may be at start)
              const hasFaqPair = /\s+A:\s+/i.test(trimmed) && (/Q:\s+/i.test(trimmed) || /^Q:\s+/i.test(trimmed));
              const hasMultipleFaq = hasFaqPair && trimmed.length > 50;
              if (hasMultipleFaq) {
                const segments = trimmed.split(/Q:\s+/i);
                const intro = segments[0]?.trim();
                const isIntro = intro && !/^A:\s+/i.test(intro) && segments.length > 1;
                const pairs: { q: string; a: string }[] = [];
                for (let i = isIntro ? 1 : 0; i < segments.length; i++) {
                  const seg = segments[i]?.trim();
                  if (!seg) continue;
                  const aMatch = seg.match(/\s+A:\s+/i);
                  if (!aMatch || aMatch.index === undefined) continue;
                  const question = seg.slice(0, aMatch.index).replace(/^Q:\s*/i, '').trim();
                  const answer = seg.slice(aMatch.index + aMatch[0].length).trim();
                  if (question && answer) pairs.push({ q: question, a: answer });
                }
                if (pairs.length > 0) {
                  return (
                    <div className="faq-paragraph">
                      {isIntro && (
                        <p className="mb-4 text-stone-700 dark:text-stone-300">{intro}</p>
                      )}
                      {pairs.map(({ q, a }, idx) => (
                        <div
                          key={idx}
                          className="mb-6 border-b border-warm-200 pb-6 last:border-0 last:pb-0 dark:border-stone-700"
                        >
                          <p className="font-body font-semibold text-stone-800 dark:text-stone-100">Q:</p>
                          <p className="mt-0.5 text-stone-700 dark:text-stone-300">{q}</p>
                          <p className="mt-3 font-body font-semibold text-stone-800 dark:text-stone-100">A:</p>
                          <p className="mt-0.5 text-stone-700 dark:text-stone-300">{a}</p>
                        </div>
                      ))}
                    </div>
                  );
                }
              }
              return <p>{children}</p>;
            },
            ul: ({ children }) => (
              <ul className="list-inside list-disc space-y-1 [&>li.list-none]:list-item-none [&>li.list-none]:ml-0 [&>li.list-none]:pl-0">
                {children}
              </ul>
            ),
            li: ({ children }) => <FaqListItem>{children}</FaqListItem>,
            ol: ({ children }) => (
              <ol className="list-inside list-decimal space-y-1">{children}</ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-amber-400 pl-4 italic text-stone-700 dark:border-amber-600 dark:text-stone-300">
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
