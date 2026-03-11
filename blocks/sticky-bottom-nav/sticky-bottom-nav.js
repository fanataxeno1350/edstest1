import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';

  const stickyNavigationTransPopUpDiv = document.createElement('div');
  stickyNavigationTransPopUpDiv.classList.add('sticky-navigation-trans-pop-up');

  const section = document.createElement('section');
  section.classList.add('sticky-navigation-sticky-bottom-nav', 'sticky-navigation-position-fixed', 'sticky-navigation-bottom-0', 'sticky-navigation-p-3', 'sticky-navigation-d-flex', 'sticky-navigation-align-items-center', 'sticky-navigation-boing-container', 'sticky-navigation-bg-boing-primary');

  const ul = document.createElement('ul');
  ul.classList.add('sticky-navigation-sticky-bottom-nav__list', 'sticky-navigation-d-flex', 'sticky-navigation-justify-content-around', 'sticky-navigation-align-items-center', 'sticky-navigation-flex-grow-1');

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');

  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add('sticky-navigation-sticky-bottom-nav__item', 'sticky-navigation-position-relative');

    const anchor = document.createElement('a');
    anchor.classList.add('sticky-navigation-sticky-bottom-nav__link', 'sticky-navigation-d-flex', 'sticky-navigation-flex-column', 'sticky-navigation-align-items-center', 'sticky-navigation-gap-1', 'sticky-navigation-analytics_cta_click');

    const linkField = itemNode.querySelector('[data-aue-prop="link"]');
    if (linkField) {
      anchor.href = linkField.textContent.trim();
      anchor.dataset.link = linkField.textContent.trim();
      moveInstrumentation(linkField, anchor);
    }

    const consentField = itemNode.querySelector('[data-aue-prop="consent"]');
    if (consentField) {
      anchor.dataset.consent = consentField.textContent.trim().toLowerCase();
      moveInstrumentation(consentField, anchor);
    }

    const iconField = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconField) {
      const img = iconField.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        const pictureImg = picture.querySelector('img');
        pictureImg.classList.add('sticky-navigation-sticky-bottom-nav__icon');
        anchor.append(picture);
        moveInstrumentation(iconField, picture);
      }
    }

    const labelField = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelField) {
      const span = document.createElement('span');
      span.classList.add('sticky-navigation-sticky-bottom-nav__label');
      span.textContent = labelField.textContent.trim();
      anchor.append(span);
      moveInstrumentation(labelField, span);
    }

    li.append(anchor);
    ul.append(li);
    moveInstrumentation(itemNode, li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(popUpDiv, stickyNavigationTransPopUpDiv, section);
  block.className = 'sticky-bottom-nav block';
  block.dataset.blockStatus = 'loaded';
}