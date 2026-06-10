import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../../lib/llms';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { id: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const body = `# ${post.data.title}

${post.data.description}
(${post.data.author}, ${post.data.date.toISOString().slice(0, 10)} — canonical: ${SITE}/blog/${post.id}/)

${post.body?.trim() ?? ''}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
