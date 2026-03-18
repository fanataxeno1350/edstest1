import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('featureCards');

  [...block.children].forEach((row) => {
    const item = document.createElement('a');
    moveInstrumentation(row, item);
    item.classList.add('d-none', 'featureCards-bolteSitare_cardSection', 'analytics_cta_click', 'text-decoration-none');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('img')) {
        div.className = 'featureCards-bolteSitare_cardSection--img';
      } else {
        div.classList.add('featureCards-content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');
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
