import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.getElementById('pop-up');
  if (popUpDiv) {
    popUpDiv.remove();
  }

  const stickyNavigationTransPopUp = document.querySelector('.sticky-navigation-trans-pop-up');
  if (stickyNavigationTransPopUp) {
    stickyNavigationTransPopUp.remove();
  }

  const section = document.createElement('section');
  section.className = 'sticky-navigation-sticky-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-sticky-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const items = block.querySelectorAll('[data-aue-model="stickyBottomNavItem"]');
  items.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'sticky-navigation-sticky-bottom-nav__item sticky-navigation-position-relative';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkDataConsent = linkElement ? linkElement.dataset.consent : 'false';
    const linkDataLink = linkElement ? linkElement.dataset.link : '';

    const a = document.createElement('a');
    a.href = linkHref;
    a.className = 'sticky-navigation-sticky-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 sticky-navigation-analytics_cta_click';
    a.dataset.consent = linkDataConsent;
    a.dataset.link = linkDataLink;

    const imgElement = itemNode.querySelector('[data-aue-prop="icon"]');
    if (imgElement) {
      const altText = itemNode.querySelector('[data-aue-prop="altText"]')?.textContent || imgElement.alt;
      const picture = createOptimizedPicture(imgElement.src, altText, false, [{ width: '40' }]);
      const img = picture.querySelector('img');
      img.className = 'sticky-navigation-sticky-bottom-nav__icon';
      a.append(picture);
      moveInstrumentation(imgElement, picture);
    }

    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-sticky-bottom-nav__label';
      span.textContent = labelElement.textContent;
      a.append(span);
      moveInstrumentation(labelElement, span);
    }

    li.append(a);
    moveInstrumentation(linkElement, a);
    ul.append(li);
    moveInstrumentation(itemNode, li);
  });

  section.append(ul);

  block.textContent = '';
  block.className = `${block.dataset.blockName} block`;
  block.append(section);
  block.dataset.blockStatus = 'loaded';
}
