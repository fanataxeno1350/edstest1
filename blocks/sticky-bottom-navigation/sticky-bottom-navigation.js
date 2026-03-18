import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('stickyNavigation-sticky-bottom-nav', 'stickyNavigation-position-fixed', 'stickyNavigation-bottom-0', 'stickyNavigation-p-3', 'stickyNavigation-d-flex', 'stickyNavigation-align-items-center', 'stickyNavigation-boing-container', 'stickyNavigation-bg-boing-primary');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('stickyNavigation-sticky-bottom-nav__item', 'stickyNavigation-position-relative');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.querySelector('a')) {
        div.classList.add('stickyNavigation-sticky-bottom-nav__link', 'stickyNavigation-d-flex', 'stickyNavigation-flex-column', 'stickyNavigation-align-items-center', 'stickyNavigation-gap-1', 'stickyNavigation-analytics_cta_click');
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
