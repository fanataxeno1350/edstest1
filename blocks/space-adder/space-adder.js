import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The Space-Adder block intentionally renders an empty div.
  // No content extraction or DOM manipulation is required for this specific block.
  // It serves purely as a visual spacer.

  // Ensure the block is empty before setting its final state.
  block.textContent = '';

  // Set block class and status as per standard EDS block decoration.
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
