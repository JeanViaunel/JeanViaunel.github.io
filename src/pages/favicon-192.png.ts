import type { APIRoute } from 'astro';
import { iconPng } from '../lib/icon';

// Larger size for Google results and Android home screens.
export const GET: APIRoute = () => iconPng(192);
