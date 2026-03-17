import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const navList = document.createElement('ul');
  navList.classList.add('sticky-bottom-nav__list', 'd-flex', 'justify-content-around', 'align-items-center', 'flex-grow-1');

  const items = block.querySelectorAll('[data-aue-model="stickyNavigationItem"]');
  items.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.classList.add('sticky-bottom-nav__item', 'position-relative');

    const linkElement = itemNode.querySelector('a');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkConsent = linkElement ? linkElement.dataset.consent : 'false';
    const linkDataLink = linkElement ? linkElement.dataset.link : '';

    const anchor = document.createElement('a');
    anchor.href = linkHref;
    anchor.classList.add('sticky-bottom-nav__link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');
    anchor.dataset.consent = linkConsent;
    anchor.dataset.link = linkDataLink;

    const iconImg = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconImg) {
      const picture = createOptimizedPicture(iconImg.src, iconImg.alt);
      picture.classList.add('sticky-bottom-nav__icon');
      anchor.append(picture);
      moveInstrumentation(iconImg, picture);
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('sticky-bottom-nav__label');
    const labelText = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelText) {
      labelSpan.textContent = labelText.textContent;
      anchor.append(labelSpan);
      moveInstrumentation(labelText, labelSpan);
    } else {
      // Fallback for label if data-aue-prop is not found
      const firstP = itemNode.querySelector('p');
      if (firstP) {
        labelSpan.textContent = firstP.textContent;
        anchor.append(labelSpan);
        moveInstrumentation(firstP, labelSpan);
      }
    }

    listItem.append(anchor);
    navList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  block.textContent = '';
  block.classList.add('sticky-bottom-nav', 'position-fixed', 'bottom-0', 'p-3', 'd-flex', 'align-items-center', 'boing-container', 'bg-boing-primary');
  block.append(navList);
  block.dataset.blockStatus = 'loaded';
}