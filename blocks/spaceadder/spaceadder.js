import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.className = 'space-adder-wrapper';

  // The SpaceAdder block doesn't have any specific content or structure
  // beyond its container. We just need to ensure the block element is clean
  // and has the correct class.

  block.textContent = '';
  block.append(rootDiv);
  block.className = 'spaceadder block';
  block.dataset.blockStatus = 'loaded';
}
