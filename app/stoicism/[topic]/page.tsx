import { notFound } from 'next/navigation';
import { loadMarkdown } from '@/lib/markdown';
import { getMetadata } from '@/lib/seo';
import { topics } from '@/lib/topics';
import ArticleLayout from '@/components/ArticleLayout';

type Props = { params: Promise<{ topic: string }> };

export async function generateStaticParams() {
  return topics.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props) {
  const { topic } = await params;
  return getMetadata('stoicism', topic);
}

export default async function StoicismTopicPage({ params }: Props) {
  const { topic } = await params;
  const content = loadMarkdown('stoicism', topic);
  if (!content) notFound();
  const title = `Stoicism and ${topic.charAt(0).toUpperCase() + topic.slice(1)}: A Guide`;
  return (
    <ArticleLayout
      title={title}
      content={content}
      topic={topic}
      isPillar
    />
  );
}
