import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'sticky-navigation-sticky-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-sticky-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'sticky-navigation-sticky-bottom-nav__item sticky-navigation-position-relative';

    const linkCell = row.children[0];
    const iconCell = row.children[1];
    const altCell = row.children[2];
    const labelCell = row.children[3];

    const link = linkCell.querySelector('a');
    const icon = iconCell.querySelector('img');
    const altText = altCell.textContent.trim();
    const label = labelCell.textContent.trim();

    if (link && icon && label) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'sticky-navigation-sticky-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 sticky-navigation-analytics_cta_click';
      // Transfer data attributes from the original link
      if (link.dataset.consent) {
        newLink.setAttribute('data-consent', link.dataset.consent);
      }
      if (link.dataset.link) {
        newLink.setAttribute('data-link', link.dataset.link);
      }

      const optimizedPic = createOptimizedPicture(icon.src, altText);
      moveInstrumentation(icon, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('sticky-navigation-sticky-bottom-nav__icon');

      const span = document.createElement('span');
      span.className = 'sticky-navigation-sticky-bottom-nav__label';
      span.textContent = label;

      newLink.append(optimizedPic, span);
      li.append(newLink);
      ul.append(li);
    }
  });

  block.textContent = '';
  section.append(ul);
  block.append(section);
}
