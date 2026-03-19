import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const navList = document.createElement('ul');
  navList.className = 'stickyNavigation-sticky-bottom-nav__list d-flex justify-content-around align-items-center flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');

  navItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'stickyNavigation-sticky-bottom-nav__item position-relative';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const iconElement = itemNode.querySelector('[data-aue-prop="icon"]');
    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');

    const anchor = document.createElement('a');
    anchor.className = 'stickyNavigation-sticky-bottom-nav__link d-flex flex-column align-items-center gap-1 analytics_cta_click';

    if (linkElement) {
      anchor.href = linkElement.getAttribute('href') || '#';
      if (linkElement.dataset.consent) {
        anchor.dataset.consent = linkElement.dataset.consent;
      }
      if (linkElement.dataset.link) {
        anchor.dataset.link = linkElement.dataset.link;
      }
      moveInstrumentation(linkElement, anchor);
    }

    if (iconElement) {
      const picture = createOptimizedPicture(iconElement.src, iconElement.alt, false, [{ width: '40' }]);
      picture.querySelector('img').className = 'stickyNavigation-sticky-bottom-nav__icon';
      anchor.append(picture);
      moveInstrumentation(iconElement, picture);
    }

    if (labelElement) {
      const span = document.createElement('span');
      span.className = 'stickyNavigation-sticky-bottom-nav__label';
      span.textContent = labelElement.textContent;
      anchor.append(span);
      moveInstrumentation(labelElement, span);
    }

    listItem.append(anchor);
    moveInstrumentation(itemNode, listItem);
    navList.append(listItem);
  });

  block.textContent = '';
  block.className = 'stickyNavigation-sticky-bottom-nav position-fixed bottom-0 p-3 d-flex align-items-center boing-container bg-boing-primary block';
  block.append(navList);
  block.dataset.blockStatus = 'loaded';
}