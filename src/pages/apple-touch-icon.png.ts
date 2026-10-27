import type { APIRoute } from 'astro';
import { iconPng } from '../lib/icon';

// iOS shows transparent corners as black, so fill them with the mark's own colour.
export const GET: APIRoute = () => iconPng(180, true);
