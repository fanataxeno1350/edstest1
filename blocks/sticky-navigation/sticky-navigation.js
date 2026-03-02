import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav stickynavigation-position-fixed stickynavigation-bottom-0 stickynavigation-p-3 stickynavigation-d-flex stickynavigation-align-items-center stickynavigation-boing-container stickynavigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__list stickynavigation-d-flex stickynavigation-justify-content-around stickynavigation-align-items-center stickynavigation-flex-grow-1';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__item stickynavigation-position-relative';

    const link = row.querySelector('a');
    const img = row.querySelector('img');
    const span = row.querySelector('span');

    if (link && img && span) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__link stickynavigation-d-flex stickynavigation-flex-column stickynavigation-align-items-center stickynavigation-gap-1 stickynavigation-analytics_cta_click';
      if (link.dataset.consent) {
        newLink.setAttribute('data-consent', link.dataset.consent);
      }
      if (link.dataset.link) {
        newLink.setAttribute('data-link', link.dataset.link);
      }

      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      optimizedPic.querySelector('img').className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__icon';
      moveInstrumentation(img, optimizedPic.querySelector('img'));

      const newSpan = document.createElement('span');
      newSpan.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__label';
      newSpan.textContent = span.textContent;

      newLink.append(optimizedPic);
      newLink.append(newSpan);
      li.append(newLink);
    }
    ul.append(li);
  });

  section.append(ul);
  block.textContent = '';
  block.append(section);
}
