export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const [num, label] = [...row.children];
    const li = document.createElement('li');
    const n = document.createElement('span');
    n.className = 'pillars-number';
    n.textContent = num ? num.textContent.trim() : '';
    const a = label ? label.querySelector('a') : null;
    if (a) {
      a.className = 'pillars-link';
      li.append(a, n);
    } else {
      li.append(label ? label.textContent.trim() : '', n);
    }
    ul.append(li);
  });
  block.replaceChildren(ul);
}
