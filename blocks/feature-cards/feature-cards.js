import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('featurecards-featureCards');

  [...block.children].forEach((row) => {
    const item = document.createElement('a');
    moveInstrumentation(row, item);
    item.classList.add('featurecards-d-none', 'featurecards-featureCards-bolteSitare_cardSection', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('img')) {
        div.classList.add('featurecards-h-100', 'featurecards-w-100', 'featurecards-featureCards-card-img');
      } else {
        div.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');
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
