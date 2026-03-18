import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('featurecards-container');

  [...block.children].forEach((row) => {
    const item = document.createElement('a');
    moveInstrumentation(row, item);
    item.classList.add('featurecards-boltesitare-card-section', 'featurecards-analytics-cta-click', 'featurecards-text-decoration-none');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('img')) {
        div.classList.add('featurecards-image-wrapper', 'featurecards-w-100', 'featurecards-pb-4');
      } else {
        div.className = 'featurecards-text-center';
      }
    });
    wrapper.append(item);
  });

  wrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(wrapper);
}
