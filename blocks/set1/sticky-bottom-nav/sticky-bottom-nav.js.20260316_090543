import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const navList = document.createElement('ul');
  navList.className = 'sticky-bottom-nav__list d-flex justify-content-around align-items-center flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'sticky-bottom-nav__item position-relative';

    const linkElement = itemNode.querySelector('.button-container a') || itemNode.querySelector('a');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkText = linkElement ? linkElement.textContent.trim() : '';

    const dataConsent = linkElement ? linkElement.getAttribute('data-consent') : 'false';
    const dataLink = linkElement ? linkElement.getAttribute('data-link') : '';

    const anchor = document.createElement('a');
    anchor.href = linkHref;
    anchor.className = 'sticky-bottom-nav__link d-flex flex-column align-items-center gap-1 analytics_cta_click';
    if (dataConsent) {
      anchor.setAttribute('data-consent', dataConsent);
    }
    if (dataLink) {
      anchor.setAttribute('data-link', dataLink);
    }

    const iconImg = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconImg) {
      const picture = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '40' }]);
      picture.classList.add('sticky-bottom-nav__icon');
      anchor.append(picture);
      moveInstrumentation(iconImg, picture);
    } else {
      // Fallback for icon if not found by data-aue-prop
      const imgFallback = itemNode.querySelector('img');
      if (imgFallback) {
        const picture = createOptimizedPicture(imgFallback.src, imgFallback.alt, false, [{ width: '40' }]);
        picture.classList.add('sticky-bottom-nav__icon');
        anchor.append(picture);
        moveInstrumentation(imgFallback, picture);
      }
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'sticky-bottom-nav__label';
    const authoredLabel = itemNode.querySelector('[data-aue-prop="label"]');
    if (authoredLabel) {
      labelSpan.textContent = authoredLabel.textContent.trim();
      moveInstrumentation(authoredLabel, labelSpan);
    } else if (linkText) {
      // Fallback to link text if label is not found by data-aue-prop
      labelSpan.textContent = linkText;
    }
    anchor.append(labelSpan);

    listItem.append(anchor);
    moveInstrumentation(linkElement, anchor);
    moveInstrumentation(itemNode, listItem);
    navList.append(listItem);
  });

  block.textContent = '';
  block.append(navList);
  block.className = 'sticky-bottom-nav sticky-bottom-nav--fixed sticky-bottom-nav--bottom-0 sticky-bottom-nav--p-3 sticky-bottom-nav--d-flex sticky-bottom-nav--align-items-center sticky-bottom-nav--boing-container sticky-bottom-nav--bg-boing-primary';
  block.dataset.blockStatus = 'loaded';
}
