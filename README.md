# Victor Jean Viaunel — portfolio

Personal site built with [Astro](https://astro.build) as a fully static build and deployed to GitHub Pages.

Pages: Home, Work (filterable), Research, About (with CV), Now, plus a 404 page and a generated
`publications.bib`.

## Develop

Requires Node 22.23.4+ (Node 24 LTS recommended).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve the build
npm run check    # type check
```

## Edit content

| What | Where |
| --- | --- |
| Name, email, social links, "last updated" | `src/data/site.ts` |
| Work page projects and filter categories | `src/data/projects.ts` |
| Publications and BibTeX | `src/data/publications.ts` |
| Experience, education, toolbox | `src/pages/about.astro` |
| Now page | `src/pages/now.astro` |
| Colours, type, spacing | `src/styles/global.css` (tokens at the top) |

**CV downloads:** put the PDFs at `public/cv/victor-jean-viaunel-resume.pdf` and
`public/cv/victor-jean-viaunel-academic-cv.pdf`. The download buttons on the About page appear for
each file that exists. Until then the page shows a "Request my CV" email button.

**Project links:** a project in `projects.ts` with an `href` renders as a clickable card. Without one
it renders as a plain card, which suits projects with no write-up yet.

## Design and motion

The site reads as an engineering drawing set: numbered sections, a drafting grid behind page
headers, and a title-block footer with a sheet number on every page.

| Piece | Where |
| --- | --- |
| Hero scan-to-model figure (canvas points, SVG model, draggable divider) | `src/components/ScanFigure.astro` |
| Scroll reveals, header progress line, About timeline, copy buttons | `src/scripts/motion.ts` |
| All animations | the `prefers-reduced-motion: no-preference` block at the end of `src/styles/global.css` |

Add `data-reveal` to any element to fade it in on scroll, and `style="--d: 1"` to stagger it.
Visitors who ask their system for reduced motion get a fully static site.

## Deploy to GitHub Pages

1. Push this repo to GitHub on the `main` branch.
2. In the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes the site.

The workflow reads the Pages URL from GitHub, so links work either way:

- Repo named `JeanViaunel.github.io` → served at `https://jeanviaunel.github.io/`
- Any other repo name, e.g. `portfolio` → served at `https://jeanviaunel.github.io/portfolio/`

For a custom domain, add it under **Settings → Pages**. The workflow picks it up automatically.
