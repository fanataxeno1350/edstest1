import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textModel = block.querySelector('[data-aue-model="text"]');
  const content = textModel.querySelector('[data-aue-prop="content"]');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('whyustext-cmp-text');

  if (content) {
    const h1Elements = content.querySelectorAll('h1');
    h1Elements.forEach((h1) => {
      h1.classList.add('whyustext-koi-theme');
      wrapperDiv.append(h1);
      moveInstrumentation(h1, h1);
    });
    moveInstrumentation(content, wrapperDiv);
  }

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}