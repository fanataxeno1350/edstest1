import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const stickyBottomNav = document.createElement('div');
  stickyBottomNav.classList.add('sticky-bottom-nav', 'position-fixed', 'bottom-0', 'p-3', 'd-flex', 'align-items-center', 'boing-container', 'bg-boing-primary');

  const list = document.createElement('ul');
  list.classList.add('sticky-bottom-nav__list', 'd-flex', 'justify-content-around', 'align-items-center', 'flex-grow-1');

  const items = block.querySelectorAll('[data-aue-model="stickyNavigationItem"]');
  items.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.classList.add('sticky-bottom-nav__item', 'position-relative');

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.getAttribute('href') : '#';
    const linkDataConsent = linkElement ? linkElement.getAttribute('data-consent') : 'false';
    const linkDataLink = linkElement ? linkElement.getAttribute('data-link') : '';

    const anchor = document.createElement('a');
    anchor.classList.add('sticky-bottom-nav__link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');
    anchor.href = linkHref;
    anchor.setAttribute('data-consent', linkDataConsent);
    anchor.setAttribute('data-link', linkDataLink);

    const iconElement = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconElement) {
      const picture = createOptimizedPicture(iconElement.src, iconElement.alt, false, [{ width: '40' }]);
      picture.querySelector('img').classList.add('sticky-bottom-nav__icon');
      anchor.append(picture);
      moveInstrumentation(iconElement, picture);
    }

    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    const span = document.createElement('span');
    span.classList.add('sticky-bottom-nav__label');
    if (labelElement) {
      span.textContent = labelElement.textContent;
      anchor.append(span);
      moveInstrumentation(labelElement, span);
    }

    listItem.append(anchor);
    moveInstrumentation(linkElement, anchor);
    moveInstrumentation(itemNode, listItem);
    list.append(listItem);
  });

  stickyBottomNav.append(list);

  block.textContent = '';
  block.append(stickyBottomNav);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
