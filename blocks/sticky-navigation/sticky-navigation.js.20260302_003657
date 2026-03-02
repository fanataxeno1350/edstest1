import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'sticky-navigation-pop-up';
  popUpDiv.style.cssText = '';
  block.append(popUpDiv);

  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.classList.add('stickynavigation-sticky-navigation-trans-pop-up');
  block.append(transPopUpDiv);

  const section = document.createElement('section');
  section.classList.add(
    'stickynavigation-sticky-navigation-bottom-nav',
    'stickynavigation-position-fixed',
    'stickynavigation-bottom-0',
    'stickynavigation-p-3',
    'stickynavigation-d-flex',
    'stickynavigation-align-items-center',
    'stickynavigation-boing-container',
    'stickynavigation-bg-boing-primary'
  );

  const ul = document.createElement('ul');
  ul.classList.add(
    'stickynavigation-sticky-navigation-bottom-nav__list',
    'stickynavigation-d-flex',
    'stickynavigation-justify-content-around',
    'stickynavigation-align-items-center',
    'stickynavigation-flex-grow-1'
  );

  [...block.children].forEach((row) => {
    if (row.children.length === 4) { // Assuming each row corresponds to a nav item
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('stickynavigation-sticky-navigation-bottom-nav__item', 'stickynavigation-position-relative');

      const link = document.createElement('a');
      link.classList.add(
        'stickynavigation-sticky-navigation-bottom-nav__link',
        'stickynavigation-d-flex',
        'stickynavigation-flex-column',
        'stickynavigation-align-items-center',
        'stickynavigation-gap-1',
        'stickynavigation-analytics_cta_click'
      );

      const iconCell = row.children[0];
      const labelCell = row.children[1];
      const linkCell = row.children[2];
      const consentCell = row.children[3];

      const img = iconCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        const iconImg = optimizedPic.querySelector('img');
        iconImg.classList.add('stickynavigation-sticky-navigation-bottom-nav__icon');
        link.append(optimizedPic);
      }

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('stickynavigation-sticky-navigation-bottom-nav__label');
      labelSpan.textContent = labelCell.textContent.trim();
      link.append(labelSpan);

      const linkHref = linkCell.textContent.trim();
      if (linkHref) {
        link.href = linkHref;
        link.setAttribute('data-link', linkHref); // Assuming data-link matches href
      }

      const consentValue = consentCell.textContent.trim().toLowerCase() === 'true';
      link.setAttribute('data-consent', consentValue);

      li.append(link);
      ul.append(li);
    }
  });

  section.append(ul);
  block.textContent = '';
  block.append(popUpDiv, transPopUpDiv, section);
}
