import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('featurecards-container');

  [...block.children].forEach((row) => {
    const item = document.createElement('a');
    moveInstrumentation(row, item);
    item.classList.add('featurecards-bolte-sitare-card', 'analytics_cta_click', 'featurecards-hide-mobile', 'text-decoration-none');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('img')) {
        div.className = 'featurecards-bolte-sitare-card-img';
      } else {
        div.className = 'featurecards-content-wrapper';
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
