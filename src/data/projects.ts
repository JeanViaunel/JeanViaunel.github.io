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
  /** Outcomes, shown as accent tags. */
  results: string[];
  /** Tools and licences, shown as neutral tags. */
  stack: string[];
  /** Internal path or external URL. Projects without one render as a plain card. */
  href?: string;
  cta?: string;
  /** Shared-element name: the card title morphs into the page heading. */
  vt?: string;
}

export const projects: Project[] = [
  {
    domain: 'Reality capture & BIM',
    status: 'Research at NTU',
    title: 'Scan-to-BIM with mobile LiDAR',
    text: 'My research area: turning quick scans of existing buildings into IFC models engineers can work with.',
    results: ['ISARC 2026', 'ICCCBE 2026'],
    stack: [],
    href: 'research/',
    cta: 'See the research',
  },
  {
    domain: 'Web products',
    status: 'Legend Castle since 2024',
    title: 'MaiSchool',
    text: 'A live online tutoring platform for families: course and teacher browsing, class booking, progress tracking and parent messages. Lead full-stack developer for two years, from design to implementation.',
    results: ['Live product'],
    stack: ['Next.js', 'Convex', 'Clerk', 'Zod'],
    href: 'https://maischool.legendcastle.org',
    cta: 'Visit the site',
  },
  {
    domain: 'Reality capture & BIM',
    status: 'Published 2026',
    title: 'From 2D drawings to BIM',
    text: 'An LLM, working through four MCP tools, turns a layered DXF floor plan into an IFC model and stacks it into a multi-storey building.',
    results: ['ISARC 2026'],
    stack: ['MCP', 'IFC4', 'ezdxf'],
    href: 'research/2d-to-bim/',
    cta: 'See how it works',
    vt: 'case-bim',
  },
  {
    domain: 'Computer vision',
    status: 'In progress',
    title: 'PhotoForge',
    text: 'Photogrammetry that runs entirely on your own machine, with SuperPoint, LightGlue, Depth Anything V2 and SAM2.',
    results: ['No cloud upload'],
    stack: ['FastAPI', 'Next.js'],
  },
  {
    domain: 'Computer vision',
    status: 'Competition 2026',
    title: 'Marine debris detection',
    text: 'Finding 34 kinds of ocean waste in photos for the National Academy of Marine Research’s international challenge, in a two-person team. Over 37 submissions our public score rose from 0.396 to 0.793 mAP. Most misses came from classes defined by what an object is not.',
    results: ['15th of 69 teams', 'mAP@0.5 0.7917'],
    stack: [],
    href: 'work/marine-debris/',
    cta: 'Read the case study',
    vt: 'case-marine',
  },
  {
    domain: 'Computer vision',
    status: 'AI CUP 2026',
    title: 'Solar panel defect detection',
    text: 'Spotting defects in solar panel images for the Ministry of Education’s AI CUP, one submission at a time.',
    results: ['0.301 → 0.8337', 'about 29th of 121'],
    stack: [],
  },
  {
    domain: 'AI & data',
    status: 'In progress',
    title: 'A Kreyòl dataset for language models',
    text: 'A pipeline that collects clean Haitian Creole text and keeps every sentence pair traceable to its source.',
    results: ['42 curated sources'],
    stack: ['MongoDB', 'n8n'],
  },
  {
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
    domain: 'Reality capture & BIM',
    status: 'Up next',
    title: 'OpenDrone3D',
    text: 'An open-source, self-hostable platform that turns drone photos into point clouds, meshes, orthophotos and Gaussian splats.',
    results: [],
    stack: ['AGPL-3.0'],
  },
];
