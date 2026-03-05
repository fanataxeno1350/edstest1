import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textModel = block.querySelector('[data-aue-model="text"]');
  const contentProp = textModel.querySelector('[data-aue-prop="content"]');

  const whyUsTextCmpTextDiv = document.createElement('div');
  whyUsTextCmpTextDiv.classList.add('whyustext-cmp-text');

  if (contentProp) {
    const h1Elements = contentProp.querySelectorAll('h1');
    h1Elements.forEach((h1) => {
      const newH1 = document.createElement('h1');
      newH1.classList.add('whyustext-koi-theme');
      newH1.innerHTML = h1.innerHTML;
      whyUsTextCmpTextDiv.append(newH1);
      moveInstrumentation(h1, newH1);
    });
    moveInstrumentation(contentProp, whyUsTextCmpTextDiv);
  }

  block.textContent = '';
  block.append(whyUsTextCmpTextDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
