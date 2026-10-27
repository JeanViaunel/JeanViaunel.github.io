// Site-wide behaviour: scroll reveals, line-by-line headings, number count-ups,
// the header's scan-progress line, the About timeline, and copy buttons.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Headings revealed line by line ----------
   Each word sits in its own mask; words on the same line share a delay, so a
   heading rises one line at a time and still wraps naturally on resize. */
function splitLines(el: HTMLElement) {
  if (!el.querySelector('.h-word')) {
    const words = (el.textContent ?? '').trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const outer = document.createElement('span');
      outer.className = 'h-word';
      const inner = document.createElement('span');
      inner.textContent = w;
      outer.append(inner);
      el.append(outer);
      if (i < words.length - 1) el.append(' ');
    });
  }
  let line = -1;
  let top = -Infinity;
  // Page coordinates, not offsetTop: words inside a positioned span (the hero's
  // underlined phrase) would otherwise be measured from that span.
  for (const w of el.querySelectorAll<HTMLElement>('.h-word')) {
    const y = w.getBoundingClientRect().top;
    if (y > top + 4) {
      line++;
      top = y;
    }
    w.style.setProperty('--line', String(line));
  }
  el.classList.add('is-split');
}
document.querySelectorAll<HTMLElement>('[data-lines]').forEach((el) => {
  if (reduced) el.classList.add('is-split');
  else splitLines(el);
});

/* ---------- Count-ups ----------
   data-count holds the final value; the element already shows it, so without
   JS (or with reduced motion) nothing changes. */
const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
const fmt = (el: HTMLElement, v: number) => {
  const d = Number(el.dataset.decimals ?? 0);
  return v.toFixed(d);
};
function countUp(el: HTMLElement) {
  const end = Number(el.dataset.count);
  const dur = 1100;
  const t0 = performance.now();
  el.classList.add('is-counting');
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - t, 4);
    el.textContent = fmt(el, end * e);
    if (t < 1) requestAnimationFrame(step);
    else {
      el.textContent = fmt(el, end);
      el.classList.remove('is-counting');
    }
  };
  requestAnimationFrame(step);
}
if (!reduced) counters.forEach((el) => (el.textContent = fmt(el, 0)));
counters.forEach((el) => el.classList.add('is-ready'));

/* ---------- Reveals and in-view triggers ---------- */
const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-inview], [data-count]');
if (reduced || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-in');
        if (el.dataset.count !== undefined) countUp(el);
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => io.observe(el));
}

/* ---------- Scroll-linked: header progress line, About timeline ---------- */
const header = document.querySelector<HTMLElement>('.site-header');
const timeline = document.querySelector<HTMLElement>('.timeline');
let ticking = false;

const onScroll = () => {
  ticking = false;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  header?.style.setProperty('--p', max > 0 ? String(Math.min(1, window.scrollY / max)) : '0');

  if (timeline && !reduced) {
    const r = timeline.getBoundingClientRect();
    const seen = (window.innerHeight * 0.7 - r.top) / r.height;
    timeline.style.setProperty('--tp', String(Math.max(0, Math.min(1, seen))));
  }
};
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true },
);
window.addEventListener('resize', onScroll);
onScroll();

/* ---------- Copy buttons ----------
   data-copy holds the text, or data-copy-from the id of an element. */
document.addEventListener('click', async (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-copy], [data-copy-from]');
  if (!btn || btn.classList.contains('is-done')) return;
  const text =
    btn.dataset.copy ?? document.getElementById(btn.dataset.copyFrom ?? '')?.textContent ?? '';
  try {
    await navigator.clipboard.writeText(text.trim());
    const label = (btn.dataset.label ??= btn.textContent ?? '');
    btn.textContent = 'Copied';
    btn.classList.add('is-done');
    setTimeout(() => {
      btn.textContent = label;
      btn.classList.remove('is-done');
    }, 1600);
  } catch {
    // Clipboard blocked: leave the button as it was.
  }
});
