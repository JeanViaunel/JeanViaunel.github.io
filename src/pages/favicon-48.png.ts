import type { APIRoute } from 'astro';
import { iconPng } from '../lib/icon';

export const GET: APIRoute = () => iconPng(48);
