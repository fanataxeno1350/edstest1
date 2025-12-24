import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceadderContainer = document.createElement('div');
  spaceadderContainer.className = 'spaceadder-container';

  // Move all original children into the new container
  Array.from(block.children).forEach((child) => {
    spaceadderContainer.append(child);
  });

  block.textContent = '';
  block.append(spaceadderContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
