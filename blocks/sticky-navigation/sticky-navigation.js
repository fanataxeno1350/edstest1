import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const stickyNavigationSection = document.createElement('div');
  stickyNavigationSection.id = 'sticky-navigation';
  stickyNavigationSection.className = 'sticky-navigation-section sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-container sticky-navigation-bg-boing-primary';

  const stickyNavigationList = document.createElement('ul');
  stickyNavigationList.className = 'sticky-navigation-list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navigationItems = block.querySelectorAll('[data-aue-model="navigationItem"]');

  navigationItems.forEach((itemNode) => {
    const stickyNavigationItem = document.createElement('li');
    stickyNavigationItem.className = 'sticky-navigation-item sticky-navigation-position-relative';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const href = linkElement ? linkElement.textContent.trim() : '#';
    const dataLink = linkElement ? linkElement.textContent.trim() : '';

    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.className = 'sticky-navigation-link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
    anchor.setAttribute('data-link', dataLink);

    const iconElement = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconElement) {
      const img = iconElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        const imgInPicture = picture.querySelector('img');
        imgInPicture.className = 'sticky-navigation-icon';
        anchor.append(picture);
        moveInstrumentation(iconElement, picture);
      }
    }

    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-label';
      span.textContent = labelElement.textContent.trim();
      anchor.append(span);
      moveInstrumentation(labelElement, span);
    }

    stickyNavigationItem.append(anchor);
    stickyNavigationList.append(stickyNavigationItem);
    moveInstrumentation(itemNode, stickyNavigationItem);
  });

  stickyNavigationSection.append(stickyNavigationList);

  block.textContent = '';
  block.append(stickyNavigationSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}