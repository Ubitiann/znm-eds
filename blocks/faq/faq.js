/**
 * Accordion list. Rows are [title | text]; a row without text is a plain titled row.
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [q, a] = [...row.children];
    const title = q.textContent.trim();
    const hasBody = a && a.textContent.trim();
    if (!hasBody) {
      const plain = document.createElement('div');
      plain.className = 'faq-row';
      plain.textContent = title;
      row.replaceWith(plain);
      return;
    }
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = title;
    const body = document.createElement('div');
    body.className = 'faq-answer';
    body.append(...a.childNodes);
    details.append(summary, body);
    row.replaceWith(details);
  });
}
