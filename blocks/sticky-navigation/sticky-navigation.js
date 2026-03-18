import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('stickynavigation-sticky-navigation-bottom-nav', 'stickynavigation-sticky-navigation-position-fixed', 'stickynavigation-sticky-navigation-bottom-0', 'stickynavigation-sticky-navigation-p-3', 'stickynavigation-sticky-navigation-d-flex', 'stickynavigation-sticky-navigation-align-items-center', 'stickynavigation-sticky-navigation-boing-container', 'stickynavigation-sticky-navigation-bg-boing-primary');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('stickynavigation-sticky-navigation-bottom-nav__item', 'stickynavigation-sticky-navigation-position-relative');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.querySelector('a')) {
        div.classList.add('stickynavigation-sticky-navigation-bottom-nav__link', 'stickynavigation-sticky-navigation-d-flex', 'stickynavigation-sticky-navigation-flex-column', 'stickynavigation-sticky-navigation-align-items-center', 'stickynavigation-sticky-navigation-gap-1', 'stickynavigation-sticky-navigation-analytics_cta_click');
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
