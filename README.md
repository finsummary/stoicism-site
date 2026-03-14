# StoicSEO Engine

Programmatic SEO website for Stoicism content. Generates static pages from a topic dataset and AI-generated markdown articles (Groq).

## Tech stack

- **Next.js** (App Router), **TypeScript**, **Tailwind CSS**
- **Groq API** for article generation
- **Vercel**-ready

## Run steps

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Add environment variables**

   Copy `.env.local.example` to `.env.local` and set your Groq API key:

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local`:

   ```
   GROQ_API_KEY=your_groq_api_key
   GROQ_MODEL=llama-3.3-70b-versatile
   ```

3. **Generate keywords**

   Builds `data/keywords.json` from `data/topics.json` and `data/templates.json`:

   ```bash
   npm run generate-keywords
   ```

4. **Generate articles**

   Generates markdown files in `content/` using Groq (skips existing files by default):

   ```bash
   npm run generate-articles
   ```

   To overwrite existing articles, set `OVERWRITE = true` in `scripts/generate_articles.ts`.

5. **Run dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

Or deploy to Vercel (set `GROQ_API_KEY` and `GROQ_MODEL` in project settings).

## Project structure

- `app/` – Next.js App Router pages (home, category indexes, topic pages)
- `components/` – ArticleLayout, AppCTA, RelatedTopics, HubLinks
- `content/` – Generated markdown articles
- `data/` – topics.json, templates.json, keywords.json
- `lib/` – ai.ts (Groq), markdown.ts, seo.ts
- `scripts/` – generate_keywords.ts, generate_articles.ts

## Scaling

- **V1:** 30 topics × 6 templates = 180 supporting pages + 30 hub pages (+ category indexes).
- Expand `data/topics.json` to 250 topics for ~1750 pages, then run `generate-keywords` and `generate-articles` again.
