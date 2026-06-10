import type { APIRoute } from 'astro';
import { SITE, header, assistants, sortedPosts } from '../lib/llms';

export const GET: APIRoute = async () => {
  const posts = await sortedPosts();
  const articles = posts
    .map(
      (p) => `---

# ${p.data.title}

${p.data.description}
(${p.data.author}, ${p.data.date.toISOString().slice(0, 10)} — ${SITE}/blog/${p.id}/)

${p.body?.trim() ?? ''}`
    )
    .join('\n\n');

  const body = `${header}

${articles}

---

${assistants}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
