import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bottomNavSection = document.createElement('section');
  bottomNavSection.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const bottomNavList = document.createElement('ul');
  bottomNavList.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navigationItems = block.querySelectorAll('[data-aue-model="navigationItem"]');

  navigationItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkElement = itemNode.querySelector('[data-aue-prop="href"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    const consentElement = itemNode.querySelector('[data-aue-prop="consent"]');

    const anchor = document.createElement('a');
    anchor.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 sticky-navigation-analytics_cta_click';

    if (linkElement) {
      const href = linkElement.textContent.trim();
      anchor.href = href;
      anchor.setAttribute('data-link', href);
      moveInstrumentation(linkElement, anchor);
    } else {
      anchor.href = '#';
    }

    if (consentElement) {
      anchor.setAttribute('data-consent', consentElement.textContent.trim().toLowerCase());
      moveInstrumentation(consentElement, anchor);
    }

    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        picture.classList.add('sticky-navigation-bottom-nav__icon');
        anchor.append(picture);
        moveInstrumentation(imageElement, picture);
      }
    }

    if (labelElement) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-bottom-nav__label';
      span.textContent = labelElement.textContent.trim();
      anchor.append(span);
      moveInstrumentation(labelElement, span);
    }

    listItem.append(anchor);
    moveInstrumentation(itemNode, listItem);
    bottomNavList.append(listItem);
  });

  bottomNavSection.append(bottomNavList);

  block.textContent = '';
  block.append(bottomNavSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
