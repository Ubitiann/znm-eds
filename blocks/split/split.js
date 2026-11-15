/**
 * Two-column intro: text on the left, image on the right, a thin divider between.
 * Authored as one row: [text cell | image cell].
 */
export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const [text, media] = [...row.children];
  if (text) text.classList.add('split-text');
  if (media) media.classList.add('split-media');
}
