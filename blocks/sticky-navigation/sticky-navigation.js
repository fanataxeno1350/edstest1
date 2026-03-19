import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav', 'stickynavigation-position-fixed', 'stickynavigation-bottom-0', 'stickynavigation-p-3', 'stickynavigation-d-flex', 'stickynavigation-align-items-center', 'stickynavigation-boing-container', 'stickynavigation-bg-boing-primary');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__item', 'stickynavigation-position-relative');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.querySelector('a')) {
        div.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__link', 'stickynavigation-d-flex', 'stickynavigation-flex-column', 'stickynavigation-align-items-center', 'stickynavigation-gap-1', 'stickynavigation-analytics_cta_click');
      } else {
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
