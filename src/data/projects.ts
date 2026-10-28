// The single source for every project. The Work page shows `text`; Home and
// share cards show `short` (or `text` when there is no short version).
import { facts as marine } from './marine-debris';
import { isarcSentence } from './publications';
import maischoolShot from '../assets/maischool-courses.png';
import roomwiseShot from '../assets/roomwise-dashboard.jpg';

export const domains = [
  'Reality capture & BIM',
  'Computer vision',
  'AI & data',
  'Web products',
  'Ventures',
] as const;

export type Domain = (typeof domains)[number];

export interface Project {
  id: string;
  domain: Domain;
  status: string;
  title: string;
  /** Full description, used on the Work page. */
  text: string;
  /** Teaser for Home and share cards; a shortened `text`, never a different claim. */
  short?: string;
  /** Outcomes, shown as accent tags. */
  results: string[];
  /** Tools and licences, shown as neutral tags. */
  stack: string[];
  /** Internal path or external URL. Projects without one render as a plain card. */
  href?: string;
  cta?: string;
  /** Position on the Home page (1, 2, 3); absent when not featured. */
  featured?: number;
  /** Shared-element name: the card title morphs into the page heading. */
  vt?: string;
  /** Screenshot of a live product (public or privacy-redacted screens only). */
  shot?: { src: ImageMetadata; alt: string; url: string };
}

// Ordered by strength of outcome: published or ranked first, work in progress last.
export const projects: Project[] = [
  {
    id: '2d-to-bim',
    domain: 'Reality capture & BIM',
    status: 'Published 2026',
    title: 'From 2D drawings to BIM',
    text: isarcSentence,
    results: ['ISARC 2026'],
    stack: ['MCP', 'IFC4', 'ezdxf'],
    href: 'research/2d-to-bim/',
    cta: 'See how it works',
    featured: 2,
    vt: 'case-bim',
  },
  {
    id: 'marine-debris',
    domain: 'Computer vision',
    status: 'Competition 2026',
    title: 'Marine debris detection',
    text: `Finding ${marine.classes} kinds of ocean waste in photos for the National Academy of Marine Research’s international challenge, in a two-person team. Over 37 submissions our public score rose from 0.396 to 0.793 mAP. Most misses came from classes defined by what an object is not.`,
    short: `Finding ${marine.classes} kinds of ocean waste in photos, in a two-person team. Most misses came from classes defined by what an object is not.`,
    results: [`15th of ${marine.teamsEntered} teams`, 'mAP@0.5 0.7917'],
    stack: [],
    href: 'work/marine-debris/',
    cta: 'Read the case study',
    featured: 3,
    vt: 'case-marine',
  },
  {
    id: 'maischool',
    domain: 'Web products',
    status: 'Legend Castle since 2024',
    title: 'MaiSchool',
    text: 'A live online tutoring platform for families: course and teacher browsing, class booking, progress tracking and parent messages. Lead full-stack developer for two years, from design to implementation.',
    short: 'A live online tutoring platform for families. Lead full-stack developer for two years, from design to implementation.',
    results: ['Live product'],
    stack: ['Next.js', 'Convex', 'Clerk', 'Zod'],
    href: 'https://maischool.legendcastle.org',
    cta: 'Visit the site',
    shot: {
      src: maischoolShot,
      alt: "MaiSchool's public course catalogue: search, subject and grade filters, and course cards",
      url: 'maischool.legendcastle.org',
    },
  },
  {
    id: 'roomwise',
    domain: 'Web products',
    status: 'Own product, in team use',
    title: 'Roomwise',
    text: 'A web video-meeting platform my teams use for all our meetings: HD video and screen share, waiting-room security, host and moderator roles, live chat and recordings. The aim was not to replace Google Meet but to stop being limited by it, and to learn the real-time video stack along the way.',
    short: 'A web video-meeting platform my teams use for all our meetings, with waiting rooms, host roles, chat and recordings.',
    results: ['17 registered users', '30 calls'],
    stack: ['Next.js', 'Clerk', 'Stream Video API'],
    href: 'https://video.viocitostudio.me',
    cta: 'Visit the site',
    shot: {
      src: roomwiseShot,
      alt: 'Roomwise dashboard: start an instant or named meeting, join by link, and a list of recent meetings',
      url: 'video.viocitostudio.me',
    },
  },
  {
    id: 'scan-to-bim',
    domain: 'Reality capture & BIM',
    status: 'Research at NTU',
    title: 'Scan-to-BIM with mobile LiDAR',
    text: 'My research area: turning quick scans of existing buildings into IFC models engineers can work with.',
    results: ['ISARC 2026', 'ICCCBE 2026'],
    stack: [],
    href: 'research/',
    cta: 'See the research',
    featured: 1,
  },
  {
    id: 'solar',
    domain: 'Computer vision',
    status: 'AI CUP 2026',
    title: 'Solar panel defect detection',
    text: 'Spotting defects in solar panel images for the Ministry of Education’s AI CUP, one submission at a time.',
    results: ['0.301 → 0.8337', 'about 29th of 121'],
    stack: [],
  },
  {
    id: 'guanin',
    domain: 'Ventures',
    status: 'Founder and developer',
    title: 'GUANIN marketplace',
    text: 'A B2B and B2C marketplace I founded and built, connecting suppliers in Asia with buyers in the Caribbean and Latin America.',
    results: ['guaninbuy.com'],
    stack: [],
    href: 'https://guaninbuy.com',
    cta: 'Visit the site',
  },
  {
    id: 'photoforge',
    domain: 'Computer vision',
    status: 'In progress',
    title: 'PhotoForge',
    text: 'Photogrammetry that runs entirely on your own machine, with SuperPoint, LightGlue, Depth Anything V2 and SAM2.',
    results: ['No cloud upload'],
    stack: ['FastAPI', 'Next.js'],
  },
  {
    id: 'kreyol',
    domain: 'AI & data',
    status: 'In progress',
    title: 'A Kreyòl dataset for language models',
    text: 'A pipeline that collects clean Haitian Creole text and keeps every sentence pair traceable to its source.',
    results: ['42 curated sources'],
    stack: ['MongoDB', 'n8n'],
  },
  {
    id: 'opendrone3d',
    domain: 'Reality capture & BIM',
    status: 'Up next',
    title: 'OpenDrone3D',
    text: 'An open-source, self-hostable platform that turns drone photos into point clouds, meshes, orthophotos and Gaussian splats.',
    results: [],
    stack: ['AGPL-3.0'],
  },
];

export const featured = projects.filter((p) => p.featured).sort((a, b) => a.featured! - b.featured!);
export const projectById = (id: string) => projects.find((p) => p.id === id)!;
