// Structured data (schema.org JSON-LD) shared across pages.
import { site } from '../data/site';
import type { Publication } from '../data/publications';
import { url } from './url';

const abs = (path: string, base: URL | undefined) => new URL(url(path), base).href;

/** The person behind the site, referenced by @id from every other entity. */
export function person(base: URL | undefined) {
  return {
    '@type': 'Person',
    '@id': abs('#person', base),
    name: site.name,
    givenName: site.givenName,
    familyName: site.familyName,
    alternateName: site.altNames,
    url: abs('', base),
    image: abs('images/victor.jpg', base),
    email: `mailto:${site.email}`,
    jobTitle: 'Assistant Researcher',
    worksFor: {
      '@type': 'Organization',
      name: 'H-Team lab, Department of Civil Engineering, National Taiwan University',
      url: 'https://hteam.caece.net',
    },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'National Taiwan University' },
      { '@type': 'CollegeOrUniversity', name: 'National Yang Ming Chiao Tung University' },
    ],
    knowsAbout: ['Scan-to-BIM', 'Building Information Modeling', 'IFC', 'LiDAR', 'Computer vision', 'Large language models', 'Full-stack development'],
    sameAs: [site.links.linkedin, site.links.github, site.links.hteam],
  };
}

export const personRef = (base: URL | undefined) => ({ '@id': abs('#person', base) });

export function website(base: URL | undefined) {
  return {
    '@type': 'WebSite',
    '@id': abs('#website', base),
    url: abs('', base),
    name: site.name,
    inLanguage: 'en',
    publisher: personRef(base),
  };
}

export function breadcrumbs(base: URL | undefined, trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path, base) })),
  };
}

export function scholarlyArticle(p: Publication, base: URL | undefined) {
  const doi = p.links.find((l) => l.label === 'DOI')?.href;
  const pdf = p.links.find((l) => l.label === 'PDF')?.href;
  return {
    '@type': 'ScholarlyArticle',
    headline: p.title,
    name: p.title,
    abstract: p.summary,
    datePublished: p.date,
    author: p.authorsFull.map((name) =>
      name === 'Jean Viaunel Victor' ? { ...personRef(base), '@type': 'Person', name } : { '@type': 'Person', name },
    ),
    ...(p.venue ? { isPartOf: { '@type': 'PublicationIssue', name: p.venue } } : {}),
    ...(doi ? { sameAs: doi, identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: doi.replace('https://doi.org/', '') } } : {}),
    ...(pdf ? { url: pdf } : {}),
  };
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
