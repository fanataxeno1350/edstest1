import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceadderContainer = document.createElement('div');
  spaceadderContainer.className = 'spaceadder-container';

  // Move all child nodes from the original block to the new container
  while (block.firstChild) {
    spaceadderContainer.appendChild(block.firstChild);
  }

  block.textContent = '';
  block.append(spaceadderContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
