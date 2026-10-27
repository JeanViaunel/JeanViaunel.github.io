// Hover and keyboard tooltips for the build-time SVG charts. Each chart's
// <g class="hits"> holds one transparent rect per data point, carrying the
// point position (data-x / data-y, in viewBox units) and the tooltip text.

for (const chart of document.querySelectorAll<HTMLElement>('[data-chart]')) {
  const svg = chart.querySelector<SVGSVGElement>('svg');
  const tip = chart.querySelector<HTMLElement>('.chart-tip');
  if (!svg || !tip) continue;

  const hits = Array.from(svg.querySelectorAll<SVGRectElement>('.hits rect'));
  const crosshair = svg.querySelector<SVGLineElement>('.crosshair');
  const ring = svg.querySelector<SVGCircleElement>('.focus-ring');
  const rowFocus = svg.querySelector<SVGRectElement>('.row-focus');
  const vbWidth = svg.viewBox.baseVal.width;
  const tValue = tip.querySelector<HTMLElement>('.tip-value')!;
  const tTitle = tip.querySelector<HTMLElement>('.tip-title')!;
  const tNote = tip.querySelector<HTMLElement>('.tip-note')!;
  let current = -1;

  const show = (i: number) => {
    const hit = hits[i];
    if (!hit) return;
    current = i;
    const px = Number(hit.dataset.x);
    const py = Number(hit.dataset.y);

    tValue.textContent = hit.dataset.value ?? '';
    tTitle.textContent = hit.dataset.title ?? '';
    tNote.textContent = hit.dataset.note ?? '';
    tNote.hidden = !hit.dataset.note;

    crosshair?.setAttribute('x1', String(px));
    crosshair?.setAttribute('x2', String(px));
    ring?.setAttribute('cx', String(px));
    ring?.setAttribute('cy', String(py));
    rowFocus?.setAttribute('y', hit.dataset.row ?? '-40');
    chart.classList.add('is-active');

    const s = svg.getBoundingClientRect();
    const c = chart.getBoundingClientRect();
    const scale = s.width / vbWidth;
    tip.hidden = false;
    const left = s.left - c.left + px * scale;
    const top = s.top - c.top + py * scale;
    const half = tip.offsetWidth / 2;
    tip.style.left = `${Math.max(half + 4, Math.min(c.width - half - 4, left))}px`;
    tip.style.top = `${top}px`;
  };

  const hide = () => {
    current = -1;
    tip.hidden = true;
    chart.classList.remove('is-active');
  };

  hits.forEach((hit, i) => {
    hit.addEventListener('pointerenter', () => show(i));
  });
  svg.addEventListener('pointerleave', () => {
    if (document.activeElement !== svg) hide();
  });

  svg.addEventListener('focus', () => show(current < 0 ? 0 : current));
  svg.addEventListener('blur', hide);
  svg.addEventListener('keydown', (e) => {
    const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (e.key in step) {
      e.preventDefault();
      show(Math.max(0, Math.min(hits.length - 1, current + step[e.key])));
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      show(e.key === 'Home' ? 0 : hits.length - 1);
    } else if (e.key === 'Escape') {
      hide();
    }
  });
}
