import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav stickynavigation-stickyNavigation-position-fixed stickynavigation-stickyNavigation-bottom-0 stickynavigation-stickyNavigation-p-3 stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-boing-container stickynavigation-stickyNavigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__list stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-justify-content-around stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-flex-grow-1';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__item stickynavigation-stickyNavigation-position-relative';

    const link = row.querySelector('a');
    const img = row.querySelector('img');
    const labelSpan = row.querySelector('p:last-of-type'); // Assuming the label is in the last paragraph

    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__link stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-flex-column stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-gap-1 stickynavigation-stickyNavigation-analytics_cta_click';
      if (link.dataset.consent) {
        newLink.setAttribute('data-consent', link.dataset.consent);
      }
      if (link.dataset.link) {
        newLink.setAttribute('data-link', link.dataset.link);
      }
      moveInstrumentation(link, newLink);

      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__icon';
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
      }

      if (labelSpan) {
        const span = document.createElement('span');
        span.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__label';
        span.textContent = labelSpan.textContent;
        moveInstrumentation(labelSpan, span);
        newLink.append(span);
      }
      li.append(newLink);
    }
    ul.append(li);
  });

  section.append(ul);
  block.textContent = '';
  block.append(section);
}
