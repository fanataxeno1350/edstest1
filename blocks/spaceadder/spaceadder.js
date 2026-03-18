import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The Spaceadder block is intentionally empty and does not render any content.
  // Its purpose is to create vertical space, often controlled by CSS.
  // No DOM manipulation is needed for this specific block.
  // We just ensure the block has the correct class and status.

  // Clear any existing content (though for spaceadder, it's usually empty).
  block.textContent = '';

  // Set the block class and status.
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
