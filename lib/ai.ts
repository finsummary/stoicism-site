import Groq from 'groq-sdk';

const getClient = () => {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not set in environment variables.');
  }
  return { client: new Groq({ apiKey }), model };
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Parse "Please try again in 2m7.008s" from Groq 429 message. Returns ms or 130_000 default. */
function parseRetryAfterMs(message: string): number {
  const match = message.match(/try again in (\d+)m(\d+(?:\.\d+)?)s/i);
  if (match) {
    const minutes = parseInt(match[1], 10);
    const seconds = parseFloat(match[2]);
    return (minutes * 60 + seconds) * 1000;
  }
  return 130_000; // 2m10s default
}

const MAX_RETRIES_ON_RATE_LIMIT = 5;

/**
 * Generate text using Groq chat completions API.
 * On 429 rate limit, waits and retries up to MAX_RETRIES_ON_RATE_LIMIT times.
 */
export async function generateText(prompt: string): Promise<string> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt <= MAX_RETRIES_ON_RATE_LIMIT; attempt++) {
    try {
      const { client, model } = getClient();
      const completion = await client.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
      });
      const content = completion.choices[0]?.message?.content;
      if (content == null) {
        throw new Error('Groq API returned empty content.');
      }
      return content;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      lastError = err instanceof Error ? err : new Error(message);
      const isRateLimit = message.includes('429') || message.includes('rate_limit_exceeded');
      if (isRateLimit && attempt < MAX_RETRIES_ON_RATE_LIMIT) {
        const waitMs = parseRetryAfterMs(message);
        console.warn(`[Groq] Rate limited. Waiting ${Math.round(waitMs / 1000)}s before retry (${attempt + 1}/${MAX_RETRIES_ON_RATE_LIMIT})...`);
        await sleep(waitMs);
        continue;
      }
      console.error('[Groq] Generation failed:', message);
      throw new Error(`AI generation failed: ${message}`);
    }
  }
  console.error('[Groq] Generation failed after retries:', lastError?.message);
  throw new Error(`AI generation failed: ${lastError?.message}`);
}
