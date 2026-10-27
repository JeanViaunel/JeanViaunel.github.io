export const site = {
  name: 'Victor Jean Viaunel',
  nameZh: '韋將',
  /** How the name appears in publications (family name Victor) and elsewhere. */
  givenName: 'Jean Viaunel',
  familyName: 'Victor',
  altNames: ['Jean Viaunel Victor', 'J. V. Victor', '韋將'],
  description:
    'Civil engineer who writes software. Scan-to-BIM, IFC and language models for BIM at the NTU H-Team lab.',
  updated: 'October 2026',
  email: 'viocitovictor@caece.net',
  links: {
    linkedin: 'https://www.linkedin.com/in/victor-jean-viaunel-8abaa320b',
    github: 'https://github.com/JeanViaunel',
    hteam: 'https://hteam.caece.net/team/victor-jean-viaunel',
  },
  // Drop the PDFs into public/cv/ with these names and the download buttons appear.
  cv: {
    industry: 'cv/victor-jean-viaunel-resume.pdf',
    academic: 'cv/victor-jean-viaunel-academic-cv.pdf',
  },
};

export const nav = [
  { label: 'Work', path: 'work/' },
  { label: 'Research', path: 'research/' },
  { label: 'About', path: 'about/' },
  { label: 'Now', path: 'now/' },
] as const;
