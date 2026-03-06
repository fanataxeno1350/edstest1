import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  moveInstrumentation(block.firstElementChild, section);

  const paddingCell = block.firstElementChild.firstElementChild;
  if (paddingCell) {
    const paddingValue = paddingCell.textContent.trim();
    if (paddingValue) {
      section.classList.add(`spaceadder-padding-${paddingValue}`);
    }
  }

  block.textContent = '';
  block.append(section);
}
