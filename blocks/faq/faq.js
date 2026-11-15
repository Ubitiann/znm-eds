export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [q, a] = [...row.children];
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = q.textContent.trim();
    const body = document.createElement('div');
    body.className = 'faq-answer';
    body.append(...a.childNodes);
    details.append(summary, body);
    row.replaceWith(details);
  });
}
