export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');
  const ol = document.createElement('ol');
  cells.forEach((cell, i) => {
    const li = document.createElement('li');
    li.append(...cell.childNodes);
    if (i === cells.length - 1) li.setAttribute('aria-current', 'page');
    ol.append(li);
  });
  nav.append(ol);
  block.replaceChildren(nav);
}
