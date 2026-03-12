import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__list', 'stickynavigation-stickyNavigation-d-flex', 'stickynavigation-stickyNavigation-justify-content-around', 'stickynavigation-stickyNavigation-align-items-center', 'stickynavigation-stickyNavigation-flex-grow-1');

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__item', 'stickynavigation-stickyNavigation-position-relative');

    const linkElement = itemNode.querySelector('a');
    if (linkElement) {
      const newLink = document.createElement('a');
      newLink.href = linkElement.href;
      newLink.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__link', 'stickynavigation-stickyNavigation-d-flex', 'stickynavigation-stickyNavigation-flex-column', 'stickynavigation-stickyNavigation-align-items-center', 'stickynavigation-stickyNavigation-gap-1', 'stickynavigation-stickyNavigation-analytics_cta_click');
      if (linkElement.dataset.consent) {
        newLink.dataset.consent = linkElement.dataset.consent;
      }
      if (linkElement.dataset.link) {
        newLink.dataset.link = linkElement.dataset.link;
      }

      const img = itemNode.querySelector('[data-aue-prop="icon"]');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__icon');
        newLink.append(picture);
        moveInstrumentation(img, picture);
      }

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav__label');
      const labelContent = itemNode.querySelector('[data-aue-prop="label"]');
      if (labelContent) {
        labelSpan.append(...labelContent.childNodes);
        moveInstrumentation(labelContent, labelSpan);
      } else {
        // Fallback for label if data-aue-prop is not found directly on span
        const authoredLabel = linkElement.querySelector('.stickynavigation-stickyNavigation-sticky-bottom-nav__label');
        if (authoredLabel) {
          labelSpan.append(...authoredLabel.childNodes);
          moveInstrumentation(authoredLabel, labelSpan);
        }
      }
      newLink.append(labelSpan);

      li.append(newLink);
      moveInstrumentation(linkElement, newLink);
    }

    ul.append(li);
    moveInstrumentation(itemNode, li);
  });

  block.textContent = '';
  block.classList.add('stickynavigation-stickyNavigation-sticky-bottom-nav', 'stickynavigation-stickyNavigation-position-fixed', 'stickynavigation-stickyNavigation-bottom-0', 'stickynavigation-stickyNavigation-p-3', 'stickynavigation-stickyNavigation-d-flex', 'stickynavigation-stickyNavigation-align-items-center', 'stickynavigation-stickyNavigation-boing-container', 'stickynavigation-stickyNavigation-bg-boing-primary');
  block.append(ul);
  block.dataset.blockStatus = 'loaded';
}
