import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'stickynavigation-sticky-bottom-nav-position-fixed stickynavigation-sticky-bottom-nav-bottom-0 stickynavigation-sticky-bottom-nav-p-3 stickynavigation-sticky-bottom-nav-d-flex stickynavigation-sticky-bottom-nav-align-items-center stickynavigation-sticky-bottom-nav-boing-container stickynavigation-sticky-bottom-nav-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'stickynavigation-sticky-bottom-nav__list stickynavigation-sticky-bottom-nav-d-flex stickynavigation-sticky-bottom-nav-justify-content-around stickynavigation-sticky-bottom-nav-align-items-center stickynavigation-sticky-bottom-nav-flex-grow-1';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'stickynavigation-sticky-bottom-nav__item stickynavigation-sticky-bottom-nav-position-relative';

    const link = row.querySelector('a');
    const img = row.querySelector('img');
    const labelSpan = row.querySelector('span');

    if (link && img && labelSpan) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'stickynavigation-sticky-bottom-nav__link stickynavigation-sticky-bottom-nav-d-flex stickynavigation-sticky-bottom-nav-flex-column stickynavigation-sticky-bottom-nav-align-items-center stickynavigation-sticky-bottom-nav-gap-1 stickynavigation-sticky-bottom-nav-analytics_cta_click';
      newLink.setAttribute('data-consent', link.getAttribute('data-consent'));
      newLink.setAttribute('data-link', link.getAttribute('data-link'));

      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      optimizedPic.querySelector('img').className = 'stickynavigation-sticky-bottom-nav__icon';
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      newLink.append(optimizedPic);

      const newLabelSpan = document.createElement('span');
      newLabelSpan.className = 'stickynavigation-sticky-bottom-nav__label';
      newLabelSpan.textContent = labelSpan.textContent;
      newLink.append(newLabelSpan);

      li.append(newLink);
    }
    ul.append(li);
  });

  section.append(ul);
  block.textContent = '';
  block.append(section);
}
