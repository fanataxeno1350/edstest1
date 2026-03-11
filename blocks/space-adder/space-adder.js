import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceAdderDiv = document.createElement('div');
  spaceAdderDiv.classList.add('space-adder');

  block.textContent = '';
  block.append(spaceAdderDiv);

  block.className = `spaceadder-space-adder block`;
  block.dataset.blockStatus = 'loaded';
}
