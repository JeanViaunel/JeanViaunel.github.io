import type { APIRoute } from 'astro';
import { publications } from '../data/publications';

export const GET: APIRoute = () =>
  new Response(publications.map((p) => p.bibtex).join('\n\n') + '\n', {
    headers: { 'Content-Type': 'application/x-bibtex; charset=utf-8' },
  });
