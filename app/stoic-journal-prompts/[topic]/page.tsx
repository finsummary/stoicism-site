import { notFound } from 'next/navigation';
import { loadMarkdown } from '@/lib/markdown';
import { getMetadata, buildFaqSchema } from '@/lib/seo';
import { topics } from '@/lib/topics';
import ArticleLayout from '@/components/ArticleLayout';

type Props = { params: Promise<{ topic: string }> };

export async function generateStaticParams() {
  return topics.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props) {
  const { topic } = await params;
  return getMetadata('stoic-journal-prompts', topic);
}

export default async function StoicJournalPromptsTopicPage({ params }: Props) {
  const { topic } = await params;
  const content = loadMarkdown('stoic-journal-prompts', topic);
  if (!content) notFound();
  const title = `Stoic Journal Prompts for ${topic.charAt(0).toUpperCase() + topic.slice(1)}`;
  const faqSchema = buildFaqSchema([], topic);
  const faqQuestions = faqSchema.mainEntity.map((q: { name: string }) => q.name);
  return (
    <ArticleLayout
      title={title}
      content={content}
      topic={topic}
      faqQuestions={faqQuestions}
    />
  );
}
