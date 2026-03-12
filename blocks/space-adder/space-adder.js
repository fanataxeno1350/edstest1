import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.textContent = '';
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
