import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Groups every heading with the list/paragraphs that follow it into a column.
 * @param {Element} wrapper the default content wrapper
 */
function buildColumns(wrapper) {
  const headings = [...wrapper.querySelectorAll(':scope > h4')];
  if (headings.length < 2) return;
  headings.forEach((h) => {
    const col = document.createElement('div');
    col.className = 'footer-col';
    h.before(col);
    col.append(h);
    while (col.nextElementSibling && col.nextElementSibling.tagName !== 'H4'
      && !col.nextElementSibling.classList.contains('footer-col')) {
      col.append(col.nextElementSibling);
    }
  });
  wrapper.classList.add('footer-columns');
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  footer.querySelectorAll('.default-content-wrapper').forEach(buildColumns);
  ['instagram', 'youtube', 'x', 'facebook', 'linkedin'].forEach((name) => {
    const host = name === 'x' ? 'x.com' : name;
    footer.querySelectorAll(`a[href*="${host}"]`).forEach((a) => a.classList.add(`social-${name}`));
  });

  block.append(footer);
}
