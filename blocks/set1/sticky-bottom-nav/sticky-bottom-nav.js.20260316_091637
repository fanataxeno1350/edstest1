import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const navList = document.createElement('ul');
  navList.className = 'sticky-bottom-nav__list d-flex justify-content-around align-items-center flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'sticky-bottom-nav__item position-relative';

    const linkElement = itemNode.querySelector('a');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkText = itemNode.querySelector('[data-aue-prop="label"]') || itemNode.querySelector('span.stickyNavigation-sticky-bottom-nav__label');
    const linkDataConsent = linkElement ? linkElement.getAttribute('data-consent') : null;
    const linkDataLink = linkElement ? linkElement.getAttribute('data-link') : null;

    const anchor = document.createElement('a');
    anchor.href = linkHref;
    anchor.className = 'sticky-bottom-nav__link d-flex flex-column align-items-center gap-1 analytics_cta_click';
    if (linkDataConsent !== null) {
      anchor.setAttribute('data-consent', linkDataConsent);
    }
    if (linkDataLink !== null) {
      anchor.setAttribute('data-link', linkDataLink);
    }

    const iconImg = itemNode.querySelector('[data-aue-prop="icon"]') || itemNode.querySelector('img.stickyNavigation-sticky-bottom-nav__icon');
    if (iconImg) {
      const picture = createOptimizedPicture(iconImg.src, iconImg.alt || '', false, [{ width: '40' }]);
      picture.className = 'sticky-bottom-nav__icon';
      anchor.append(picture);
      moveInstrumentation(iconImg, picture);
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'sticky-bottom-nav__label';
    if (linkText) {
      labelSpan.textContent = linkText.textContent;
      moveInstrumentation(linkText, labelSpan);
    }
    anchor.append(labelSpan);

    listItem.append(anchor);
    moveInstrumentation(itemNode, listItem);
    navList.append(listItem);
  });

  block.textContent = '';
  block.className = 'sticky-bottom-nav sticky-bottom-nav--fixed sticky-bottom-nav--bottom-0 sticky-bottom-nav--p-3 sticky-bottom-nav--d-flex sticky-bottom-nav--align-items-center sticky-bottom-nav--boing-container sticky-bottom-nav--bg-boing-primary block';
  block.append(navList);
  block.dataset.blockStatus = 'loaded';
}
