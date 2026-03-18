import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The SpaceAdder block is an empty block used purely for spacing.
  // It does not contain any authored content or complex structure.
  // Therefore, no DOM manipulation or content extraction is needed.
  // The block itself is the final desired element.

  // Clear any existing content (though for SpaceAdder, it should be empty).
  block.textContent = '';

  // Set the block status to loaded.
  block.dataset.blockStatus = 'loaded';
}
