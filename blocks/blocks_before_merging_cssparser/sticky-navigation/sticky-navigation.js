import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('sticky-navigation-section', 'position-fixed', 'bottom-0', 'p-3', 'd-flex', 'align-items-center', 'sticky-navigation-boing-container', 'bg-boing-primary');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('sticky-navigation-item', 'position-relative');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.querySelector('a')) {
        div.classList.add('sticky-navigation-link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');
      }
    });
    section.append(li);
  });

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(section);
}
