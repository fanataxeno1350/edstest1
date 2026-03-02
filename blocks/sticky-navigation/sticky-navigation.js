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
    const labelSpan = row.querySelector('span');

    if (link && img && labelSpan) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__link stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-flex-column stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-gap-1 stickynavigation-stickyNavigation-analytics_cta_click';
      
      const dataConsent = link.getAttribute('data-consent');
      if (dataConsent) {
        newLink.setAttribute('data-consent', dataConsent);
      }
      const dataLink = link.getAttribute('data-link');
      if (dataLink) {
        newLink.setAttribute('data-link', dataLink);
      }

      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      const newImg = optimizedPic.querySelector('img');
      if (newImg) {
        moveInstrumentation(img, newImg);
        newImg.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__icon';
        newLink.append(optimizedPic);
      }

      const newLabelSpan = document.createElement('span');
      newLabelSpan.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__label';
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
