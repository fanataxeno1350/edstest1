import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceAdderDiv = document.createElement('div');
  spaceAdderDiv.className = 'space-adder';

  // The block has no authored content, so we just append the empty div
  // and instrument the block itself.
  block.textContent = '';
  block.append(spaceAdderDiv);
  moveInstrumentation(block, spaceAdderDiv);

  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
