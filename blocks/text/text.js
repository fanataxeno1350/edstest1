import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const content = block.querySelector('div');
  if (content) {
    moveInstrumentation(block.firstElementChild, content);
    block.textContent = '';
    block.append(content);
  }
}
