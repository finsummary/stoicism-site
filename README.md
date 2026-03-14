# Stoicism Guide

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

5. **Topic images (optional)**

   Article pages show an image per topic. To fetch one Unsplash photo per topic and save URLs to `data/topic-images.json`:

   - Get a free [Unsplash API key](https://unsplash.com/developers), add `UNSPLASH_ACCESS_KEY=your_key` to `.env.local`.
   - Run: `npm run fetch-topic-images`
   - Edit `data/topic-keywords.json` to change the search query used for each topic.

   Without running this step, a single default image is used for all articles.

6. **Run dev server**

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

## Deploy via GitHub + Vercel

1. **Create a new repository on GitHub** (e.g. `stoicism-site`). Do not add a README or .gitignore.

2. **Add remote and push** (replace `YOUR_USERNAME` and `YOUR_REPO`):

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect repo in Vercel:** [vercel.com](https://vercel.com) → your project → **Settings** → **Git** → **Connect Git Repository** → choose GitHub and select the repo. Future pushes to `main` will trigger automatic deploys.

4. **Secrets:** In Vercel → **Settings** → **Environment Variables**, add `GROQ_API_KEY` (and optionally `GROQ_MODEL`) if you run builds that need the API.

## Custom domain (e.g. stoicismguide.com)

1. **Vercel:** Project → **Settings** → **Domains** → **Add** → enter `stoicismguide.com` and `www.stoicismguide.com`. Vercel will show required DNS records.
2. **Namecheap:** Domain List → **Manage** next to your domain → **Advanced DNS**.
   - For **apex** (stoicismguide.com): Add **A Record**, Host `@`, Value the IP Vercel shows (e.g. `216.198.79.1` — use the one from your Vercel Domains page).
   - For **www**: Add **CNAME Record**, Host `www`, Value `cname.vercel-dns.com`.
   - Remove or leave default A/CNAME if Namecheap added any.
3. Back in Vercel, click **Verify** on each domain. Propagation can take a few minutes up to 48 hours.
4. Optional: In Vercel → **Environment Variables** add `NEXT_PUBLIC_SITE_URL=https://stoicismguide.com` so Open Graph links use your domain.

## Project structure

- `app/` – Next.js App Router pages (home, category indexes, topic pages)
- `components/` – ArticleLayout, AppCTA, RelatedTopics, HubLinks
- `content/` – Generated markdown articles
- `data/` – topics.json, templates.json, keywords.json, topic-keywords.json, topic-images.json (from fetch-topic-images)
- `lib/` – ai.ts, images.ts (topic image URL), markdown.ts, seo.ts
- `scripts/` – generate_keywords.ts, generate_articles.ts, fetch_topic_images.ts

## Scaling

- **V1:** 30 topics × 6 templates = 180 supporting pages + 30 hub pages (+ category indexes).
- Expand `data/topics.json` to 250 topics for ~1750 pages, then run `generate-keywords` and `generate-articles` again.
