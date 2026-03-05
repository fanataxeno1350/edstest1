import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  moveInstrumentation(block.firstElementChild, section);

  const row = block.children[0];
  const cell = row.children[0];

  const verticalPaddingClass = cell.className.match(/spaceadder-padding-(\d+)/);
  if (verticalPaddingClass && verticalPaddingClass[1]) {
    section.classList.add(`padding-${verticalPaddingClass[1]}`);
  }

  block.textContent = '';
  block.append(section);
}
