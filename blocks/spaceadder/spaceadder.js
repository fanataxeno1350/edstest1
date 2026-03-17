import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The SpaceAdder block is an empty block used purely for adding vertical space.
  // Its presence in the DOM is sufficient. No content or complex structure is needed.
  // We just ensure the block has its base class.

  // The block element itself already has the class 'spaceadder-spaceadder' from the authored HTML.
  // We just need to ensure it's treated as a loaded block.
  block.dataset.blockStatus = 'loaded';
}
