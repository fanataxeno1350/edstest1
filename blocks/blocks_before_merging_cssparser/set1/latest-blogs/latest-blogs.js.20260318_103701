import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('latestblogs-wrapper');

  [...block.children].forEach((row) => {
    const item = document.createElement('a');
    moveInstrumentation(row, item);
    item.classList.add('latestblogs-cardWrapper', 'latestblogs-analytics_cta_click');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('img')) {
        div.className = 'latestblogs-cardImageWrapper';
      } else {
        div.className = 'latestblogs-cards_content--wrapper';
      }
    });
    section.append(item);
  });

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(section);
}
