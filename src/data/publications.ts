/** How my name appears in author lists; rendered bold. */
export const SELF = 'J. V. Victor';

export interface Publication {
  key: string;
  title: string;
  /** Full author list in published order; include SELF where I appear. */
  authors: string[];
  year: number;
  venue?: string;
  summary: string;
  links: { label: string; href: string }[];
  bibtex: string;
}

// Newest first. BibTeX for the ISARC paper is IAARC's own entry. The ICCCBE
// entry is built from the conference programme (Session 8B, 25 March 2026).
export const publications: Publication[] = [
  {
    key: 'isarc2026',
    title: 'From 2D Drawings to BIM Models: An LLM-Assisted Approach',
    authors: [SELF, 'P. Kumar', 'S.-H. Hsieh'],
    year: 2026,
    venue: 'Proceedings of the 43rd ISARC, Singapore, 2026, pp. 2410–2414',
    summary:
      'Language models can read a single floor plan, build a parametric BIM model from it, and scale that into a multi-storey building while keeping geometry and semantics consistent.',
    links: [
      { label: 'DOI', href: 'https://doi.org/10.22260/ISARC2026/0307' },
      { label: 'PDF', href: 'https://www.iaarc.org/publications/fulltext/ISARC2026_1432.pdf' },
      {
        label: 'BibTeX',
        href: 'https://www.iaarc.org/publications/2026_proceedings_of_the_43rd_isarc_singapore/from_2d_drawings_to_bim_models-an_llm_assisted_approach.bib',
      },
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
    key: 'icccbe2026',
    title: 'A Review on Scan-to-BIM for Building Energy Retrofit',
    authors: [SELF, 'Y.-T. Chang', 'S.-H. Hsieh'],
    year: 2026,
    venue: 'ICCCBE 2026, International Conference on Computing in Civil and Building Engineering',
    summary:
      'A systematic review of scan-to-BIM methods, read through one question: what does a team retrofitting an older building for energy performance need from the model?',
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
    year: 2025,
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
