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

    const linkElement = itemNode.querySelector('a');
    const link = document.createElement('a');
    if (linkElement) {
      link.href = linkElement.href;
      link.className = 'stickyNavigation-sticky-bottom-nav__link d-flex flex-column align-items-center gap-1 analytics_cta_click';
      if (linkElement.dataset.consent) {
        link.dataset.consent = linkElement.dataset.consent;
      }
      if (linkElement.dataset.link) {
        link.dataset.link = linkElement.dataset.link;
      }
      moveInstrumentation(linkElement, link);
    }

    const iconImg = itemNode.querySelector('img[data-aue-prop="icon"]');
    if (iconImg) {
      const picture = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{
        width: '100px'
      }]);
      const img = picture.querySelector('img');
      img.className = 'stickyNavigation-sticky-bottom-nav__icon';
      link.append(picture);
      moveInstrumentation(iconImg, picture);
    }

    const labelSpan = itemNode.querySelector('span[data-aue-prop="label"]');
    if (labelSpan) {
      const span = document.createElement('span');
      span.className = 'stickyNavigation-sticky-bottom-nav__label';
      span.textContent = labelSpan.textContent;
      link.append(span);
      moveInstrumentation(labelSpan, span);
    }

    li.append(link);
    ul.append(li);
    moveInstrumentation(itemNode, li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(popUpDiv, transPopUpDiv, section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}