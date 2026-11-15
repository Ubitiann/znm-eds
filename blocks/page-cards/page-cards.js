/**
 * Cards whose content is pulled live from the linked pages (title, image, intro).
 * Authors only list page links; whatever those pages contain is what is shown.
 */
async function buildCard(link) {
  const url = new URL(link.href, window.location);
  const li = document.createElement('li');
  try {
    const resp = await fetch(`${url.pathname.replace(/\/$/, '')}.plain.html`);
    if (!resp.ok) throw new Error(resp.status);
    const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
    const title = doc.querySelector('h1')?.textContent.trim() || link.textContent.trim();
    const imgEl = doc.querySelector('img');
    const imgLink = [...doc.querySelectorAll('a[href^="http"]')]
      .find((a) => /\.(jpe?g|png|webp|gif|svg)$/i.test(new URL(a.href).pathname)
        && a.textContent.trim() === a.getAttribute('href'));
    const imgSrc = imgEl?.getAttribute('src') || imgLink?.getAttribute('href');
    const intro = [...doc.querySelectorAll('p')]
      .map((p) => p.textContent.trim())
      .find((t) => t.length > 40) || '';
    const a = document.createElement('a');
    a.href = url.pathname;
    a.className = 'page-cards-card';
    if (imgSrc) {
      const media = document.createElement('div');
      media.className = 'page-cards-media';
      const image = document.createElement('img');
      image.src = imgSrc;
      image.alt = '';
      image.loading = 'lazy';
      media.append(image);
      a.append(media);
    }
    const body = document.createElement('div');
    body.className = 'page-cards-body';
    const h3 = document.createElement('h3');
    h3.textContent = title;
    const p = document.createElement('p');
    p.textContent = intro.length > 150 ? `${intro.slice(0, 147).trim()}…` : intro;
    body.append(h3, p);
    a.append(body);
    li.append(a);
  } catch (e) {
    li.append(link.cloneNode(true));
  }
  return li;
}

export default async function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  const ul = document.createElement('ul');
  const items = await Promise.all(links.map(buildCard));
  items.forEach((li) => ul.append(li));
  block.replaceChildren(ul);
}
