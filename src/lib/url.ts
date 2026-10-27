// Prefix an internal path with the configured base, so links work both at a
// user site (https://name.github.io/) and a project site (https://name.github.io/repo/).
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path.startsWith('#')) return path;
  return `${base}/${path.replace(/^\//, '')}`;
}

export function isExternal(href: string): boolean {
  return /^(https?:|mailto:)/.test(href);
}

export function href(target: string): string {
  return isExternal(target) ? target : url(target);
}
