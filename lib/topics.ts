import topicsData from '@/data/topics.json';

export const topics: string[] = topicsData;

export type ContentType =
  | 'stoic-quotes'
  | 'stoic-exercises'
  | 'stoic-advice'
  | 'stoicism-for'
  | 'what-would-stoics-say'
  | 'stoic-journal-prompts'
  | 'stoicism';
