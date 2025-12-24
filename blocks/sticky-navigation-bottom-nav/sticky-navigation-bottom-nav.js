import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';

  const stickyNavigationTransPopUpDiv = document.createElement('div');
  stickyNavigationTransPopUpDiv.className = 'sticky-navigation-trans-pop-up';

  const section = document.createElement('section');
  section.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkField = itemNode.querySelector('[data-aue-prop="link"]');
    const link = linkField ? linkField.querySelector('a') : null;

    const a = document.createElement('a');
    a.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
    if (link) {
      a.href = link.href;
      if (link.dataset.consent) {
        a.dataset.consent = link.dataset.consent;
      }
      if (link.dataset.link) {
        a.dataset.link = link.dataset.link;
      }
      moveInstrumentation(link, a);
    } else {
      a.href = '#'; // Fallback if no link is found
    }

    const iconField = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconField) {
      const picture = createOptimizedPicture(iconField.src, iconField.alt, false, [{ width: '40' }]);
      picture.classList.add('sticky-navigation-bottom-nav__icon');
      a.append(picture);
      moveInstrumentation(iconField, picture);
    }

    const labelField = itemNode.querySelector('[data-aue-prop="label"]');
    const span = document.createElement('span');
    span.className = 'sticky-navigation-bottom-nav__label';
    if (labelField) {
      span.textContent = labelField.textContent;
      moveInstrumentation(labelField, span);
    }
    a.append(span);

    li.append(a);
    ul.append(li);
    moveInstrumentation(itemNode, li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(popUpDiv, stickyNavigationTransPopUpDiv, section);
  block.className = 'sticky-navigation-bottom-nav block';
  block.dataset.blockStatus = 'loaded';
}
