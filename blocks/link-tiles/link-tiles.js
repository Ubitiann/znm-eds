/**
 * Large titled links with the |arrow| button. One link per row.
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.querySelectorAll('a')].forEach((a) => {
    const li = document.createElement('li');
    const link = a.cloneNode(true);
    link.className = 'link-tile';
    li.append(link);
    ul.append(li);
  });
  block.replaceChildren(ul);
}
