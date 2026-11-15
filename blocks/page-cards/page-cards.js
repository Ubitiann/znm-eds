/**
 * Cards whose content is pulled live from the linked pages (title, image, intro).
 * Authors only list page links; whatever those pages contain is what is shown.
 * If the link text is a readable label (not the URL) it is used as the card title.
 * Add the `detailed` variant to also show the linked page's intro text.
 */
const IMG_EXT = /\.(jpe?g|png|webp|gif|svg)$/i;

async function buildCard(link, detailed) {
  const url = new URL(link.href, window.location);
  const li = document.createElement('li');
  const label = link.textContent.trim();
  const authoredTitle = label && !label.startsWith('/') && !label.startsWith('http') ? label : '';
  try {
    const resp = await fetch(`${url.pathname.replace(/\/$/, '')}.plain.html`);
    if (!resp.ok) throw new Error(resp.status);
    const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
    const title = authoredTitle || doc.querySelector('h1')?.textContent.trim() || label;
    const imgEl = doc.querySelector('img');
    const imgLink = [...doc.querySelectorAll('a[href^="http"]')]
      .find((a) => IMG_EXT.test(new URL(a.href).pathname)
        && a.closest('p')?.textContent.trim() === a.textContent.trim());
    const imgSrc = imgEl?.getAttribute('src') || imgLink?.getAttribute('href');
    const a = document.createElement('a');
    a.href = url.pathname;
    a.className = 'page-cards-card';
    const media = document.createElement('div');
    media.className = 'page-cards-media';
    if (imgSrc) {
      const image = document.createElement('img');
      image.src = imgSrc;
      image.alt = '';
      image.loading = 'lazy';
      media.append(image);
    }
    a.append(media);
    const body = document.createElement('div');
    body.className = 'page-cards-body';
    const h3 = document.createElement('h3');
    h3.textContent = title;
    body.append(h3);
    if (detailed) {
      const intro = [...doc.querySelectorAll('p')]
        .filter((p) => !p.querySelector('img') && p !== imgLink?.closest('p'))
        .map((p) => p.textContent.trim())
        .find((t) => t.length > 40) || '';
      const p = document.createElement('p');
      p.textContent = intro.length > 150 ? `${intro.slice(0, 147).trim()}…` : intro;
      body.append(p);
    }
    const arrow = document.createElement('span');
    arrow.className = 'page-cards-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    body.append(arrow);
    a.append(body);
    li.append(a);
  } catch (e) {
    li.append(link.cloneNode(true));
  }
  return li;
}

export default async function decorate(block) {
  const detailed = block.classList.contains('detailed');
  const links = [...block.querySelectorAll('a')];
  const ul = document.createElement('ul');
  const items = await Promise.all(links.map((l) => buildCard(l, detailed)));
  items.forEach((li) => ul.append(li));
  block.replaceChildren(ul);
}
