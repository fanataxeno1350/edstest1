import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';
  popUpDiv.className = 'stickyNavigation-pop-up';

  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.className = 'stickyNavigation-trans-pop-up';

  const section = document.createElement('section');
  section.className = 'stickyNavigation-sticky-bottom-nav position-fixed bottom-0 p-3 d-flex align-items-center boing-container bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'stickyNavigation-sticky-bottom-nav__list d-flex justify-content-around align-items-center flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'stickyNavigation-sticky-bottom-nav__item position-relative';

    const linkElement = itemNode.querySelector('a');
    const href = linkElement ? linkElement.href : '#';
    const dataConsent = linkElement ? linkElement.getAttribute('data-consent') : 'false';
    const dataLink = linkElement ? linkElement.getAttribute('data-link') : '';

    const a = document.createElement('a');
    a.href = href;
    a.className = 'stickyNavigation-sticky-bottom-nav__link d-flex flex-column align-items-center gap-1 analytics_cta_click';
    a.setAttribute('data-consent', dataConsent);
    a.setAttribute('data-link', dataLink);

    const imgElement = itemNode.querySelector('[data-aue-prop="icon"]');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      picture.querySelector('img').className = 'stickyNavigation-sticky-bottom-nav__icon';
      a.append(picture);
      moveInstrumentation(imgElement, picture);
    }

    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const span = document.createElement('span');
      span.className = 'stickyNavigation-sticky-bottom-nav__label';
      span.textContent = labelElement.textContent;
      a.append(span);
      moveInstrumentation(labelElement, span);
    }

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
