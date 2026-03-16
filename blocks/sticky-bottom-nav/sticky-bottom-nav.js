import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('sticky-bottom-nav__list', 'd-flex', 'justify-content-around', 'align-items-center', 'flex-grow-1');

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add('sticky-bottom-nav__item', 'position-relative');

    const linkElement = itemNode.querySelector('a');
    if (linkElement) {
      const link = document.createElement('a');
      link.classList.add('sticky-bottom-nav__link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');
      link.href = linkElement.href;
      if (linkElement.dataset.consent) {
        link.dataset.consent = linkElement.dataset.consent;
      }
      if (linkElement.dataset.link) {
        link.dataset.link = linkElement.dataset.link;
      }

      const imgElement = itemNode.querySelector('[data-aue-prop="icon"]');
      if (imgElement) {
        const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '40' }]);
        picture.querySelector('img').classList.add('sticky-bottom-nav__icon');
        link.append(picture);
        moveInstrumentation(imgElement, picture);
      }

      const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
      if (labelElement) {
        const span = document.createElement('span');
        span.classList.add('sticky-bottom-nav__label');
        span.textContent = labelElement.textContent;
        link.append(span);
        moveInstrumentation(labelElement, span);
      }

      li.append(link);
      moveInstrumentation(linkElement, link);
    }

    ul.append(li);
    moveInstrumentation(itemNode, li);
  });

  block.textContent = '';
  block.append(ul);
  block.classList.add('sticky-bottom-nav', 'position-fixed', 'bottom-0', 'p-3', 'd-flex', 'align-items-center', 'boing-container', 'bg-boing-primary');
  block.dataset.blockStatus = 'loaded';
}