import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const stickyNavigationPopUp = document.getElementById('sticky-navigation-pop-up');
  if (stickyNavigationPopUp) {
    stickyNavigationPopUp.remove();
  }
  const stickyNavigationTransPopUp = document.querySelector('.sticky-navigation-trans-pop-up');
  if (stickyNavigationTransPopUp) {
    stickyNavigationTransPopUp.remove();
  }

  const section = document.createElement('section');
  section.className = 'sticky-navigation-sticky-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-sticky-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');

  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'sticky-navigation-sticky-bottom-nav__item sticky-navigation-position-relative';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const consentElement = itemNode.querySelector('[data-aue-prop="consent"]');
    const iconElement = itemNode.querySelector('[data-aue-prop="icon"]');
    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');

    const a = document.createElement('a');
    a.className = 'sticky-navigation-sticky-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 sticky-navigation-analytics_cta_click';

    if (linkElement) {
      const link = linkElement.querySelector('a');
      if (link) {
        a.href = link.href;
        a.setAttribute('data-link', link.getAttribute('href'));
      } else {
        a.href = '#';
        a.setAttribute('data-link', '#');
      }
    } else {
      a.href = '#';
      a.setAttribute('data-link', '#');
    }

    if (consentElement) {
      a.setAttribute('data-consent', consentElement.textContent.trim().toLowerCase());
    } else {
      a.setAttribute('data-consent', 'false');
    }

    if (iconElement) {
      const img = iconElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        const imgInPicture = picture.querySelector('img');
        imgInPicture.className = 'sticky-navigation-sticky-bottom-nav__icon';
        a.append(picture);
      }
      moveInstrumentation(iconElement, a);
    }

    const span = document.createElement('span');
    span.className = 'sticky-navigation-sticky-bottom-nav__label';
    if (labelElement) {
      span.textContent = labelElement.textContent.trim();
      moveInstrumentation(labelElement, span);
    }
    a.append(span);

    li.append(a);
    ul.append(li);
    moveInstrumentation(itemNode, li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
