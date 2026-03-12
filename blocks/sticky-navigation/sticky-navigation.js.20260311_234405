import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__list', 'stickynavigation-stickyNavigation-d-flex', 'stickynavigation-stickyNavigation-justify-content-around', 'stickynavigation-stickyNavigation-align-items-center', 'stickynavigation-stickyNavigation-flex-grow-1');

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__item', 'stickynavigation-stickyNavigation-position-relative');

    const linkElement = itemNode.querySelector('a');
    if (linkElement) {
      const a = document.createElement('a');
      a.href = linkElement.href;
      a.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__link', 'stickynavigation-stickyNavigation-d-flex', 'stickynavigation-stickyNavigation-flex-column', 'stickynavigation-stickyNavigation-align-items-center', 'stickynavigation-stickyNavigation-gap-1', 'stickynavigation-stickyNavigation-analytics_cta_click');

      // Extract data attributes
      if (linkElement.dataset.consent) {
        a.dataset.consent = linkElement.dataset.consent;
      }
      if (linkElement.dataset.link) {
        a.dataset.link = linkElement.dataset.link;
      }

      const imgElement = itemNode.querySelector('[data-aue-prop="icon"]');
      if (imgElement) {
        const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '40' }]);
        const img = picture.querySelector('img');
        img.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__icon');
        a.append(picture);
        moveInstrumentation(imgElement, picture);
      }

      const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
      if (labelElement) {
        const span = document.createElement('span');
        span.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__label');
        span.textContent = labelElement.textContent;
        a.append(span);
        moveInstrumentation(labelElement, span);
      }

      li.append(a);
      moveInstrumentation(linkElement, a);
    }

    ul.append(li);
    moveInstrumentation(itemNode, li);
  });

  block.textContent = '';
  block.append(ul);
  block.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav stickynavigation-stickyNavigation-position-fixed stickynavigation-stickyNavigation-bottom-0 stickynavigation-stickyNavigation-p-3 stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-boing-container stickynavigation-stickyNavigation-bg-boing-primary';
  block.dataset.blockStatus = 'loaded';
}