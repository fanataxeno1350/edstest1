import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';
  moveInstrumentation(block.querySelector('#pop-up'), popUpDiv);

  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.className = 'stickyNavigation-trans-pop-up';
  moveInstrumentation(block.querySelector('.stickyNavigation-trans-pop-up'), transPopUpDiv);

  const section = document.createElement('section');
  section.className = 'stickyNavigation-sticky-bottom-nav position-fixed bottom-0 p-3 d-flex align-items-center boing-container bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'stickyNavigation-sticky-bottom-nav__list d-flex justify-content-around align-items-center flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'stickyNavigation-sticky-bottom-nav__item position-relative';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkText = itemNode.querySelector('[data-aue-prop="label"]')?.textContent || '';
    const dataConsent = linkElement ? linkElement.getAttribute('data-consent') : 'false';
    const dataLink = linkElement ? linkElement.getAttribute('data-link') : '';

    const a = document.createElement('a');
    a.href = linkHref;
    a.className = 'stickyNavigation-sticky-bottom-nav__link d-flex flex-column align-items-center gap-1 analytics_cta_click';
    if (dataConsent) {
      a.setAttribute('data-consent', dataConsent);
    }
    if (dataLink) {
      a.setAttribute('data-link', dataLink);
    }

    const iconImg = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconImg) {
      const picture = createOptimizedPicture(iconImg.src, iconImg.alt || '', false, [{ width: '40' }]);
      picture.querySelector('img').className = 'stickyNavigation-sticky-bottom-nav__icon';
      a.append(picture);
      moveInstrumentation(iconImg, picture);
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'stickyNavigation-sticky-bottom-nav__label';
    labelSpan.textContent = linkText;
    if (itemNode.querySelector('[data-aue-prop="label"]')) {
      moveInstrumentation(itemNode.querySelector('[data-aue-prop="label"]'), labelSpan);
    }

    a.append(labelSpan);
    li.append(a);
    moveInstrumentation(itemNode, li);
    ul.append(li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(popUpDiv, transPopUpDiv, section);
  block.className = 'sticky-bottom-nav block';
  block.dataset.blockStatus = 'loaded';
}
