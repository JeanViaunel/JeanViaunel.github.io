# Victor Jean Viaunel — portfolio

Personal site at **https://jeanviaunel.github.io**, built with [Astro](https://astro.build) as a fully
static site and deployed to GitHub Pages.

Pages: Home, Work (filterable), Research, About (with CV downloads), Now, three case studies
(`/work/scan-to-bim/`, `/work/marine-debris/` and `/research/2d-to-bim/`), and a 404 page. The build also generates
`publications.bib`, `sitemap.xml`, `robots.txt`, share images under `/og/` and the favicons.

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

Every project, paper and news item is written **once**, in `src/data/`. Home, Work, Research, the
case studies and the share images all read from those files, so a change there shows up everywhere.

| What | Where |
| --- | --- |
| Name, name variants, email, links, "last updated", Search Console token | `src/data/site.ts` |
| Projects (Work page, Home cards, filter categories) | `src/data/projects.ts` |
| Papers (Research page, Home research list, BibTeX, structured data) | `src/data/publications.ts` |
| News list on Home | `src/data/news.ts` |
| Marine debris case study: submissions and both leaderboards | `src/data/marine-debris.ts` |
| 2D-to-BIM figure: the floor plan, request and layer table | `src/data/dxf-demo.ts` |
| Experience, education, toolbox | `src/pages/about.astro` |
| Now page | `src/pages/now.astro` |
| Share image text per page | `src/pages/og/[slug].png.ts` |

### Fields that control what appears where

**Projects** (`projects.ts`)

| Field | Effect |
| --- | --- |
| `text` | Full description, shown on the Work page. |
| `short` | Optional teaser for Home. Keep it a shortened `text`, never a different claim. Without it, Home shows `text`. |
| `featured` | `1`, `2` or `3` puts the project on Home in that position. Featured projects also need an illustration in `src/components/ProjectArt.astro`, matched by `id`. |
| `results` / `stack` | Orange outcome tags and grey tool tags. |
| `href` + `cta` | Makes the card clickable. Without `href` it renders as a plain card, which suits projects with no write-up yet. |
| `vt` | Shared-element name: the card title morphs into the page heading. Use the same value on that page's `<h1 data-vt style="--vt: …">`. |

**Papers** (`publications.ts`)

| Field | Effect |
| --- | --- |
| `summary` | Shown on the Research page. |
| `short` | Optional teaser for Home, a shortened `summary`. |
| `featured` + `meta` | `featured: true` lists the paper under Selected research on Home; `meta` gives its margin lines (venue, kind, place or date). |
| `authors` / `authorsFull` | Short names for display (your name in bold) and full names for search engines. |
| `page` | An internal explainer page, shown as a "How it works" link. |
| `bibtex` | Used by "Copy BibTeX" and the generated `publications.bib`. |

**CV downloads:** the PDFs live at `public/cv/victor-jean-viaunel-resume.pdf` and
`public/cv/victor-jean-viaunel-academic-cv.pdf`, and their sources are in `cv/` (`resume.html`,
`academic-cv.html`, shared `cv.css`). Edit the HTML, then run `npm run cv` to print both PDFs. It uses
Brave by default; set `BROWSER` to the path of another Chromium-based browser if needed. The résumé must
stay on one page. Each About-page download button appears only if its file exists.

**Images:** the portrait (`src/assets/portrait.jpg`) and the MaiSchool screenshot
(`src/assets/maischool-courses.png`) go through Astro's image pipeline, which writes resized WebP files at
build time. Only use screenshots of public pages, never a signed-in view.

## Styles

`src/styles/global.css` imports one file per concern, in cascade order:

| File | Covers |
| --- | --- |
| `base.css` | Design tokens (colours, fonts, motion timings), reset, base elements |
| `layout.css` | Containers, type, page heads, numbered section heads |
| `components.css` | Buttons, tags, viewfinder frame, header, title-block footer, contact band |
| `pages.css` | Page-specific styles: Home, Work, Research, About, Now, phone tweaks |
| `motion.css` | All animation, plus the reduced-motion overrides |
| `charts.css` | Case-study pages and the build-time SVG charts |
| `pipeline.css` | The 2D-to-BIM figure, in tab mode and pinned scroll mode |

## Design and motion

The site reads as an engineering drawing set: numbered sections, a drafting grid behind page headers,
and a title-block footer with a sheet number on every page.

Motion uses one system, defined in `base.css`. There are three UI durations: `--dur-fast` (180 ms),
`--dur-base` (320 ms) and `--dur-slow` (640 ms). `--dur-draw` (1200 ms) is for illustrations that draw
themselves. There are two curves: `--ease` for things arriving and `--ease-std` for things changing.

| Behaviour | How to use it |
| --- | --- |
| Fade in on scroll | `data-reveal`, plus `style="--d: 1"` to stagger. Reserved for section heads, figures and card grids; body text should simply appear. |
| Trigger without a fade | `data-inview` adds `.is-in` when the element scrolls into view (used by drawings and timeline dots). |
| Heading rises line by line | `data-lines` on a heading. |
| Number counts up | `<span data-count="0.7917" data-decimals="4">0.7917</span>` |
| Card-to-page morph | `data-vt` with `--vt` (see Projects above). |

| Piece | Where |
| --- | --- |
| Hero scan-to-model figure | `src/components/ScanFigure.astro` |
| 2D-to-BIM pipeline (pinned scroll on large screens, tabs elsewhere) | `src/components/figures/DxfPipeline.astro` |
| Case-study charts | `src/components/charts/` |
| Reveals, line headings, count-ups, header progress, copy buttons | `src/scripts/motion.ts` |

Visitors who ask their system for reduced motion get a static site. Append `?pin` to the 2D-to-BIM
page to force pinned mode on a small screen when testing.

## Deploy to GitHub Pages

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it. In
the repo's **Settings → Pages**, the source must be **GitHub Actions**.

The workflow reads the Pages URL from GitHub, so links work either way:

- Repo named `JeanViaunel.github.io` → served at `https://jeanviaunel.github.io/`
- Any other repo name, e.g. `portfolio` → served at `https://jeanviaunel.github.io/portfolio/`

For a custom domain, add it under **Settings → Pages**. The workflow picks it up automatically.
