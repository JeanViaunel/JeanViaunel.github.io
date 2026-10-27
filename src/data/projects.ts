export const domains = [
  'Reality capture & BIM',
  'Computer vision',
  'AI & data',
  'Web products',
  'Ventures',
] as const;

export type Domain = (typeof domains)[number];

export interface Project {
  domain: Domain;
  status: string;
  title: string;
  text: string;
  metrics: string[];
  /** Internal path or external URL. Projects without one render as a plain card. */
  href?: string;
  cta?: string;
}

export const projects: Project[] = [
  {
    domain: 'Reality capture & BIM',
    status: 'Research · NTU',
    title: 'Scan-to-BIM with mobile LiDAR',
    text: 'My research area: turning quick scans of existing buildings into IFC models engineers can work with.',
    metrics: ['ISARC 2026', 'ICCCBE 2026'],
    href: 'research/',
    cta: 'See the research →',
  },
  {
    domain: 'Web products',
    status: 'Legend Castle · since 2024',
    title: 'MaiSchool',
    text: 'A live online tutoring platform for families: course and teacher browsing, class booking, progress tracking and parent messages. Lead full-stack developer for two years, from design to implementation.',
    metrics: ['Live product', 'Next.js · Convex · Clerk · Zod'],
    href: 'https://maischool.legendcastle.org',
    cta: 'Visit the site ↗',
  },
  {
    domain: 'Reality capture & BIM',
    status: 'Paper · 2026',
    title: 'From 2D drawings to BIM',
    text: 'Using language models to turn a single floor plan into a parametric BIM model, then grow it into a multi-storey building.',
    metrics: ['ISARC 2026'],
    href: 'research/',
    cta: 'See the paper →',
  },
  {
    domain: 'Computer vision',
    status: 'In progress',
    title: 'PhotoForge',
    text: 'Photogrammetry that runs entirely on your own machine, with SuperPoint, LightGlue, Depth Anything V2 and SAM2.',
    metrics: ['No cloud upload', 'FastAPI · Next.js'],
  },
  {
    domain: 'Computer vision',
    status: 'Competition · 2026',
    title: 'Marine debris detection',
    text: 'Finding 34 kinds of ocean waste in photos, in a two-person team. Most misses came from classes defined by what an object is not.',
    metrics: ['15th of 69 teams', 'mAP@0.5 0.7917'],
  },
  {
    domain: 'Computer vision',
    status: 'AI CUP · 2026',
    title: 'Solar panel defect detection',
    text: 'Spotting defects in solar panel images for the Ministry of Education’s AI CUP, one submission at a time.',
    metrics: ['0.301 → 0.8337', 'about 29th of 121'],
  },
  {
    domain: 'AI & data',
    status: 'In progress',
    title: 'A Kreyòl dataset for language models',
    text: 'A pipeline that collects clean Haitian Creole text and keeps every sentence pair traceable to its source.',
    metrics: ['42 curated sources', 'MongoDB · n8n'],
  },
  {
    domain: 'Ventures',
    status: 'Founder & developer',
    title: 'GUANIN marketplace',
    text: 'A B2B and B2C marketplace I founded and built, connecting suppliers in Asia with buyers in the Caribbean and Latin America.',
    metrics: ['guaninbuy.com'],
    href: 'https://guaninbuy.com',
    cta: 'Visit the site ↗',
  },
  {
    domain: 'Reality capture & BIM',
    status: 'Specified · next',
    title: 'OpenDrone3D',
    text: 'An open-source, self-hostable platform that turns drone photos into point clouds, meshes, orthophotos and Gaussian splats.',
    metrics: ['AGPL-3.0'],
  },
];
