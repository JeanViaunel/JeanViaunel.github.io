/** How my name appears in author lists; rendered bold. */
export const SELF = 'J. V. Victor';

/** The one sentence that describes the ISARC paper everywhere on the site. */
export const isarcSentence =
  'An LLM calls four tools through the Model Context Protocol to turn a layered DXF floor plan into a multi-storey IFC model.';

export interface Publication {
  key: string;
  title: string;
  /** Full author list in published order; include SELF where I appear. */
  authors: string[];
  /** Full names for structured data, in published order. */
  authorsFull: string[];
  year: number;
  /** ISO date (or year-month) of publication or presentation. */
  date: string;
  venue?: string;
  /** Full summary, used on the Research page. */
  summary: string;
  /** Teaser for Home; a shortened `summary`, never a different claim. */
  short?: string;
  /** Shown in the Selected research list on Home. */
  featured?: boolean;
  /** Margin lines on Home, e.g. venue, kind, place or date. */
  meta?: string[];
  /** Internal page explaining the work, if there is one. */
  page?: string;
  links: { label: string; href: string }[];
  bibtex: string;
}

// Newest first. BibTeX for the ISARC paper is IAARC's own entry. The ICCCBE
// entry is built from the conference programme (Session 8B, 25 March 2026).
// The i3CE entry comes from the co-authors' announcement; ASCE proceedings
// are forthcoming, so it has no DOI or page numbers yet.
export const publications: Publication[] = [
  {
    key: 'isarc2026',
    title: 'From 2D Drawings to BIM Models: An LLM-Assisted Approach',
    authors: [SELF, 'P. Kumar', 'S.-H. Hsieh'],
    authorsFull: ['Jean Viaunel Victor', 'Pavan Kumar', 'Shang-Hsien Hsieh'],
    year: 2026,
    date: '2026-06',
    venue: 'Proceedings of the 43rd ISARC, Singapore, 2026, pp. 2410–2414',
    summary:
      isarcSentence,
    featured: true,
    meta: ['ISARC 2026', 'Proceedings', 'Singapore'],
    page: 'research/2d-to-bim/',
    links: [
      { label: 'DOI', href: 'https://doi.org/10.22260/ISARC2026/0307' },
      { label: 'PDF', href: 'https://www.iaarc.org/publications/fulltext/ISARC2026_1432.pdf' },
    ],
    bibtex: `@inproceedings{10.22260/ISARC2026/0307,
	doi = {10.22260/ISARC2026/0307},
	year = 2026,
	month = {June},
	author = {Victor, Jean Viaunel and Kumar, Pavan and Hsieh, Shang-Hsien},
	title = {From 2D Drawings to BIM Models: An LLM-Assisted Approach},
	booktitle = {Proceedings of the 43rd International Symposium on Automation and Robotics in Construction},
	isbn = {978-0-6458322-3-5},
	issn = {2413-5844},
	publisher = {International Association for Automation and Robotics in Construction (IAARC)},
	editor = {Chen, Qian and Lee, Gaang and Liang, Ci-Jyun and Zhang, Jiansong and Kamat, Vineet},
	pages = {2410-2414},
	address = {Singapore}
}`,
  },
  {
    key: 'i3ce2026',
    title: 'From Scan to Field: AR Visualization of TLS-Based As-Laid Utility Geometry',
    authors: ['V. P. Vignesh', SELF, 'V. Senthilkumar', 'S.-H. Hsieh'],
    authorsFull: ['Vignesh V P', 'Jean Viaunel Victor', 'Senthilkumar V', 'Shang-Hsien Hsieh'],
    year: 2026,
    date: '2026-06',
    venue: 'i3CE 2026, ASCE International Conference on Computing in Civil Engineering, Incheon (proceedings forthcoming)',
    summary:
      'Bringing terrestrial laser scans of as-laid underground utilities into the field with augmented reality. Part of an Indo–Taiwan research project supported by DST–GITA.',
    links: [],
    bibtex: `@inproceedings{vignesh2026scantofield,
	year = 2026,
	month = {June},
	author = {Vignesh, V. P. and Victor, Jean Viaunel and Senthilkumar, V. and Hsieh, Shang-Hsien},
	title = {From Scan to Field: AR Visualization of TLS-Based As-Laid Utility Geometry},
	booktitle = {ASCE International Conference on Computing in Civil Engineering (i3CE 2026)},
	address = {Incheon, South Korea},
	note = {Proceedings forthcoming}
}`,
  },
  {
    key: 'icccbe2026',
    title: 'A Review on Scan-to-BIM for Building Energy Retrofit',
    authors: [SELF, 'Y.-T. Chang', 'S.-H. Hsieh'],
    authorsFull: ['Jean Viaunel Victor', 'Yun-Tsui Chang', 'Shang-Hsien Hsieh'],
    year: 2026,
    date: '2026-03-25',
    venue: 'ICCCBE 2026, International Conference on Computing in Civil and Building Engineering',
    summary:
      'A systematic review of scan-to-BIM methods, read through one question: what does a team retrofitting an older building for energy performance need from the model?',
    short: 'What a team retrofitting an older building for energy performance needs from a scan-to-BIM model.',
    featured: true,
    meta: ['ICCCBE 2026', 'Talk', '25 March 2026'],
    links: [
      { label: 'Programme', href: 'https://easychair.org/smart-program/ICCCBE2026/2026-03-25.html' },
    ],
    bibtex: `@inproceedings{victor2026scantobim,
	year = 2026,
	month = {March},
	author = {Victor, Jean Viaunel and Chang, Yun-Tsui and Hsieh, Shang-Hsien},
	title = {A Review on Scan-to-BIM for Building Energy Retrofit},
	booktitle = {International Conference on Computing in Civil and Building Engineering (ICCCBE 2026)}
}`,
  },
  {
    key: 'housing2025',
    title:
      'Revisit Public Housing Design in Taiwan: Automated Design and Evaluation Workflow Integrating Shape Machine and Local Data',
    authors: ['J.-C. Chang', 'C.-T. Yang', SELF, 'et al.'],
    authorsFull: ['J.-C. Chang', 'C.-T. Yang', 'Jean Viaunel Victor'],
    year: 2025,
    date: '2025',
    summary:
      'An automated workflow that generates public housing designs with Shape Machine and evaluates them against local data.',
    links: [],
    bibtex: `@misc{chang2025publichousing,
	year = 2025,
	author = {Chang, J.-C. and Yang, C.-T. and Victor, Jean Viaunel and others},
	title = {Revisit Public Housing Design in Taiwan: Automated Design and Evaluation Workflow Integrating Shape Machine and Local Data}
}`,
  },
];
