// Site-wide behaviour: scroll reveals, the header's scan-progress line,
// the About timeline, and copy-to-clipboard buttons.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal elements as they enter the viewport.
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduced || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealables.forEach((el) => io.observe(el));
}

// Header progress line and the About timeline both follow the scroll.
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

// Copy buttons: data-copy holds the text, or data-copy-from the id of an element.
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
