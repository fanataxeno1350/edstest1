import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textContainer = document.createElement('div');
  textContainer.classList.add('whyustext-cmp-text');

  const contentElement = block.querySelector('[data-aue-prop="content"]');

  if (contentElement) {
    textContainer.append(...Array.from(contentElement.children));
    moveInstrumentation(contentElement, textContainer);
  } else {
    // Fallback for non-aue content or direct text in the block
    textContainer.append(...Array.from(block.children));
  }

  block.textContent = '';
  block.append(textContainer);
  block.className = `text block`;
  block.dataset.blockStatus = 'loaded';
}