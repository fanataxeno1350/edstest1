import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const stickyNavEl = document.createElement('div');
  stickyNavEl.classList.add('sticky-bottom-nav');

  const stickyNavList = document.createElement('ul');
  stickyNavList.classList.add('sticky-bottom-nav__list');

  const navItems = block.querySelectorAll('[data-aue-model="stickyNavItem"]');

  navItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.classList.add('sticky-bottom-nav__item');

    const linkEl = itemNode.querySelector('a');
    if (linkEl) {
      linkEl.classList.add(
        'sticky-bottom-nav__link',
        'd-flex',
        'flex-column',
        'align-items-center',
        'gap-1',
        'analytics_cta_click',
      );

      const iconEl = itemNode.querySelector('[data-aue-prop="icon"]');
      if (iconEl) {
        const picture = createOptimizedPicture(iconEl.src, iconEl.alt, false, [{ width: '40' }]);
        picture.classList.add('sticky-bottom-nav__icon');
        linkEl.prepend(picture);
        moveInstrumentation(iconEl, picture);
      }

      const labelEl = itemNode.querySelector('[data-aue-prop="label"]');
      if (labelEl) {
        const span = document.createElement('span');
        span.classList.add('sticky-bottom-nav__label');
        span.textContent = labelEl.textContent;
        linkEl.append(span);
        moveInstrumentation(labelEl, span);
      }

      listItem.append(linkEl);
      moveInstrumentation(itemNode, listItem);
      stickyNavList.append(listItem);
    }
  });

  stickyNavEl.append(stickyNavList);

  block.textContent = '';
  block.append(stickyNavEl);
  block.classList.add('position-fixed', 'bottom-0', 'p-3', 'd-flex', 'align-items-center', 'boing-container', 'bg-boing-primary');
  block.dataset.blockStatus = 'loaded';
}
