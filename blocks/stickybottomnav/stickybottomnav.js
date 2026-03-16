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
  section.className = 'stickyNavigation-sticky-bottom-nav stickyNavigation-position-fixed stickyNavigation-bottom-0 stickyNavigation-p-3 stickyNavigation-d-flex stickyNavigation-align-items-center stickyNavigation-boing-container stickyNavigation-bg-boing-primary';
  moveInstrumentation(block.querySelector('section'), section);

  const ul = document.createElement('ul');
  ul.className = 'stickyNavigation-sticky-bottom-nav__list stickyNavigation-d-flex stickyNavigation-justify-content-around stickyNavigation-align-items-center stickyNavigation-flex-grow-1';
  moveInstrumentation(block.querySelector('ul'), ul);

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'stickyNavigation-sticky-bottom-nav__item stickyNavigation-position-relative';

    const a = document.createElement('a');
    a.className = 'stickyNavigation-sticky-bottom-nav__link stickyNavigation-d-flex stickyNavigation-flex-column stickyNavigation-align-items-center stickyNavigation-gap-1 stickyNavigation-analytics_cta_click';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      a.href = linkElement.textContent;
      a.setAttribute('data-link', linkElement.textContent);
      moveInstrumentation(linkElement, a);
    }

    const consentElement = itemNode.querySelector('[data-aue-prop="consent"]');
    if (consentElement) {
      a.setAttribute('data-consent', consentElement.textContent);
      moveInstrumentation(consentElement, a);
    }

    const imgElement = itemNode.querySelector('[data-aue-prop="icon"]');
    if (imgElement) {
      const altElement = itemNode.querySelector('[data-aue-prop="alt"]');
      const altText = altElement ? altElement.textContent : '';
      const picture = createOptimizedPicture(imgElement.src, altText);
      picture.querySelector('img').className = 'stickyNavigation-sticky-bottom-nav__icon';
      a.append(picture);
      moveInstrumentation(imgElement, picture);
      if(altElement) moveInstrumentation(altElement, picture);
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
    ul.append(li);
    moveInstrumentation(itemNode, li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(popUpDiv, transPopUpDiv, section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}