import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add(
    'stickynavigation-stickyNavigation-sticky-bottom-nav__list',
    'stickynavigation-stickyNavigation-d-flex',
    'stickynavigation-stickyNavigation-justify-content-around',
    'stickynavigation-stickyNavigation-align-items-center',
    'stickynavigation-stickyNavigation-flex-grow-1',
  );

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add(
      'stickynavigation-stickyNavigation-sticky-bottom-nav__item',
      'stickynavigation-stickyNavigation-position-relative',
    );

    const linkEl = itemNode.querySelector('a');
    const link = document.createElement('a');
    link.classList.add(
      'stickynavigation-stickyNavigation-sticky-bottom-nav__link',
      'stickynavigation-stickyNavigation-d-flex',
      'stickynavigation-stickyNavigation-flex-column',
      'stickynavigation-stickyNavigation-align-items-center',
      'stickynavigation-stickyNavigation-gap-1',
      'stickynavigation-stickyNavigation-analytics_cta_click',
    );
    if (linkEl) {
      link.href = linkEl.href;
      if (linkEl.dataset.consent) {
        link.dataset.consent = linkEl.dataset.consent;
      }
      if (linkEl.dataset.link) {
        link.dataset.link = linkEl.dataset.link;
      }
      moveInstrumentation(linkEl, link);
    }

    const imgEl = itemNode.querySelector('img[data-aue-prop="icon"]');
    if (imgEl) {
      const picture = createOptimizedPicture(imgEl.src, imgEl.alt, false, [{
        width: 'auto',
      }]);
      const img = picture.querySelector('img');
      img.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__icon');
      link.append(picture);
      moveInstrumentation(imgEl, picture);
    }

    const labelSpan = itemNode.querySelector('span[data-aue-prop="label"]');
    if (labelSpan) {
      const span = document.createElement('span');
      span.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__label');
      span.textContent = labelSpan.textContent;
      link.append(span);
      moveInstrumentation(labelSpan, span);
    }

    li.append(link);
    moveInstrumentation(itemNode, li);
    ul.append(li);
  });

  block.textContent = '';
  block.classList.add(
    'stickynavigation-stickyNavigation-sticky-bottom-nav',
    'stickynavigation-stickyNavigation-position-fixed',
    'stickynavigation-stickyNavigation-bottom-0',
    'stickynavigation-stickyNavigation-p-3',
    'stickynavigation-stickyNavigation-d-flex',
    'stickynavigation-stickyNavigation-align-items-center',
    'stickynavigation-stickyNavigation-boing-container',
    'stickynavigation-stickyNavigation-bg-boing-primary',
  );
  block.append(ul);
  block.dataset.blockStatus = 'loaded';
}
