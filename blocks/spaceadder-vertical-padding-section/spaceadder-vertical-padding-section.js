import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const classNames = Array.from(block.classList).filter((className) => className !== block.dataset.blockName);
  const section = document.createElement('section');
  section.classList.add(...classNames);
  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
