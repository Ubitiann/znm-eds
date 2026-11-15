/**
 * Home hero: background image, large title, subtitle and an "open daily" info box.
 * Authored in one cell: image link, h1, subtitle paragraph, hours paragraph.
 */
export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const picture = cell.querySelector('picture');
  const h1 = cell.querySelector('h1');
  const [sub, hours] = [...cell.querySelectorAll('p')].filter((p) => !p.querySelector('picture'));

  block.textContent = '';
  if (picture) {
    const bg = document.createElement('div');
    bg.className = 'hero-bg';
    bg.append(picture);
    block.append(bg);
  }

  const inner = document.createElement('div');
  inner.className = 'hero-inner';

  const spacer = document.createElement('div');
  spacer.className = 'hero-spacer';

  const band = document.createElement('div');
  band.className = 'hero-band';
  const title = document.createElement('div');
  title.className = 'hero-title';
  if (h1) title.append(h1);
  const side = document.createElement('div');
  side.className = 'hero-side';
  const plus = document.createElement('span');
  plus.className = 'hero-plus';
  plus.setAttribute('aria-hidden', 'true');
  side.append(plus);
  if (hours) {
    hours.className = 'hero-hours';
    side.append(hours);
  }
  band.append(title, side);

  const foot = document.createElement('div');
  foot.className = 'hero-foot';
  if (sub) {
    sub.className = 'hero-sub';
    foot.append(sub);
  }
  const arrow = document.createElement('span');
  arrow.className = 'hero-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  foot.append(arrow);

  inner.append(spacer, band, foot);
  block.append(inner);
}
