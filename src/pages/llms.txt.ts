import type { APIRoute } from 'astro';
import { SITE, header, assistants, sortedPosts } from '../lib/llms';

export const GET: APIRoute = async () => {
  const posts = await sortedPosts();
  const blog = posts
    .map((p) => `- [${p.data.title}](${SITE}/blog/${p.id}.md): ${p.data.description}`)
    .join('\n');

  const body = `${header}

## Blog

${blog}

## Pages

- [LocalHarness](${SITE}/): product page
- [LocalShift](${SITE}/localshift/): product page
- [Blog index](${SITE}/blog/)
- [llms-full.txt](${SITE}/llms-full.txt): this file plus every article's full text in one document

${assistants}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
