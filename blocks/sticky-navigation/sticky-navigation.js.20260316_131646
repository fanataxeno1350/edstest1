import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainNav = document.createElement('ul');
  mainNav.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__list', 'stickynavigation-stickyNavigation-d-flex', 'stickynavigation-stickyNavigation-justify-content-around', 'stickynavigation-stickyNavigation-align-items-center', 'stickynavigation-stickyNavigation-flex-grow-1');

  const navItems = block.querySelectorAll('[data-aue-model="stickyNavigationItem"]');
  navItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__item', 'stickynavigation-stickyNavigation-position-relative');

    const linkElement = itemNode.querySelector('.stickynavigation-stickyNavigation-sticky-bottom-nav__link');
    if (linkElement) {
      const newLink = document.createElement('a');
      newLink.href = linkElement.href;
      newLink.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__link', 'stickynavigation-stickyNavigation-d-flex', 'stickynavigation-stickyNavigation-flex-column', 'stickynavigation-stickyNavigation-align-items-center', 'stickynavigation-stickyNavigation-gap-1', 'stickynavigation-stickyNavigation-analytics_cta_click');

      // Copy data attributes
      if (linkElement.dataset.consent) {
        newLink.dataset.consent = linkElement.dataset.consent;
      }
      if (linkElement.dataset.link) {
        newLink.dataset.link = linkElement.dataset.link;
      }

      const iconElement = itemNode.querySelector('[data-aue-prop="icon"]');
      if (iconElement) {
        const picture = createOptimizedPicture(iconElement.src, iconElement.alt, false, [{
          width: '400',
        }]);
        const img = picture.querySelector('img');
        img.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__icon');
        newLink.append(picture);
        moveInstrumentation(iconElement, picture);
      }

      const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
      if (labelElement) {
        const span = document.createElement('span');
        span.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__label');
        span.textContent = labelElement.textContent;
        newLink.append(span);
        moveInstrumentation(labelElement, span);
      }

      listItem.append(newLink);
      moveInstrumentation(linkElement, newLink);
    }

    mainNav.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  block.textContent = '';
  block.append(mainNav);
  block.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav', 'stickynavigation-stickyNavigation-position-fixed', 'stickynavigation-stickyNavigation-bottom-0', 'stickynavigation-stickyNavigation-p-3', 'stickynavigation-stickyNavigation-d-flex', 'stickynavigation-stickyNavigation-align-items-center', 'stickynavigation-stickyNavigation-boing-container', 'stickynavigation-stickyNavigation-bg-boing-primary');
  block.dataset.blockStatus = 'loaded';
}
