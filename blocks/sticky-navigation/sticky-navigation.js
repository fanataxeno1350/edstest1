import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';

  const stickyNavigationTransPopUpDiv = document.createElement('div');
  stickyNavigationTransPopUpDiv.className = 'sticky-navigation-trans-pop-up';

  const section = document.createElement('section');
  section.className = 'sticky-navigation-sticky-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-sticky-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'sticky-navigation-sticky-bottom-nav__item sticky-navigation-position-relative';

    const linkField = itemNode.querySelector('[data-aue-prop="link"]');
    const linkHref = linkField ? linkField.textContent.trim() : '#';
    const linkDataLink = linkField ? linkField.textContent.trim() : '';

    const consentField = itemNode.querySelector('[data-aue-prop="consent"]');
    const dataConsent = consentField ? consentField.textContent.trim() : 'false';

    const a = document.createElement('a');
    a.href = linkHref;
    a.className = 'sticky-navigation-sticky-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 sticky-navigation-analytics_cta_click';
    a.setAttribute('data-consent', dataConsent);
    a.setAttribute('data-link', linkDataLink);

    const iconField = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconField) {
      const img = iconField.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        const imgElement = picture.querySelector('img');
        imgElement.className = 'sticky-navigation-sticky-bottom-nav__icon';
        a.append(picture);
        moveInstrumentation(img, picture);
      }
      moveInstrumentation(iconField, a);
    }

    const labelField = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelField) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-sticky-bottom-nav__label';
      span.textContent = labelField.textContent.trim();
      a.append(span);
      moveInstrumentation(labelField, span);
    }
    li.append(a);
    moveInstrumentation(itemNode, li);
    ul.append(li);
  });

  section.append(ul);

  block.textContent = '';
  block.className = `${block.dataset.blockName} block`;
  block.append(popUpDiv, stickyNavigationTransPopUpDiv, section);
  block.dataset.blockStatus = 'loaded';
}
