import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const stickyNav = document.createElement('section');
  stickyNav.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav stickynavigation-position-fixed stickynavigation-bottom-0 stickynavigation-p-3 stickynavigation-d-flex stickynavigation-align-items-center stickynavigation-boing-container stickynavigation-bg-boing-primary';

  const list = document.createElement('ul');
  list.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__list stickynavigation-d-flex stickynavigation-justify-content-around stickynavigation-align-items-center stickynavigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__item stickynavigation-position-relative';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.textContent.trim() : '#';

    const anchor = document.createElement('a');
    anchor.href = linkHref;
    anchor.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__link stickynavigation-d-flex stickynavigation-flex-column stickynavigation-align-items-center stickynavigation-gap-1 stickynavigation-analytics_cta_click';

    const consentElement = itemNode.querySelector('[data-aue-prop="consent"]');
    if (consentElement) {
      anchor.dataset.consent = consentElement.textContent.trim();
    }
    anchor.dataset.link = linkHref;

    const iconElement = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconElement) {
      const img = iconElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        const icon = picture.querySelector('img');
        icon.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__icon';
        anchor.append(picture);
        moveInstrumentation(img, picture);
        moveInstrumentation(iconElement, anchor);
      }
    }

    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const span = document.createElement('span');
      span.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__label';
      span.textContent = labelElement.textContent.trim();
      anchor.append(span);
      moveInstrumentation(labelElement, span);
    }

    listItem.append(anchor);
    list.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  stickyNav.append(list);

  block.textContent = '';
  block.append(stickyNav);
  block.className = `stickynavigation-sticky-navigation block`;
  block.dataset.blockStatus = 'loaded';
}
