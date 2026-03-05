import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const row = block.children[0];
  if (row) {
    const textContent = row.children[0];
    if (textContent) {
      moveInstrumentation(textContent, block);
      block.innerHTML = textContent.innerHTML;
    }
  }
}
