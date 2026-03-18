import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('featurecards-container');

  [...block.children].forEach((row) => {
    const section = document.createElement('section');
    moveInstrumentation(row, section);
    section.classList.add('featurecards-section', 'featurecards-feature_card', 'featurecards-mx-auto');
    while (row.firstElementChild) section.append(row.firstElementChild);
    [...section.children].forEach((div) => {
      if (div.querySelector('h1')) {
        div.className = 'featurecards-text';
      } else if (div.querySelector('img')) {
        div.className = 'featurecards-image-wrapper';
      } else if (div.querySelector('h2')) {
        div.className = 'featurecards-content-wrapper';
      } else if (div.querySelector('p')) {
        div.className = 'featurecards-description-wrapper';
      } else if (div.querySelector('button')) {
        div.className = 'featurecards-redirected-btn-wrapper';
      } else if (div.querySelector('a')) {
        div.classList.add('featurecards-link', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
      }
    });
    wrapper.append(section);
  });

  wrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(wrapper);
}
