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
  moveInstrumentation(block.querySelector('section.stickyNavigation-sticky-bottom-nav'), section);

  const ul = document.createElement('ul');
  ul.className = 'stickyNavigation-sticky-bottom-nav__list d-flex justify-content-around align-items-center flex-grow-1';
  moveInstrumentation(block.querySelector('ul.stickyNavigation-sticky-bottom-nav__list'), ul);

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'stickyNavigation-sticky-bottom-nav__item position-relative';

    const linkElement = itemNode.querySelector('a');
    const link = document.createElement('a');
    link.href = linkElement?.href || '#';
    link.className = 'stickyNavigation-sticky-bottom-nav__link d-flex flex-column align-items-center gap-1 analytics_cta_click';
    if (linkElement?.dataset.consent) {
      link.dataset.consent = linkElement.dataset.consent;
    }
    if (linkElement?.dataset.link) {
      link.dataset.link = linkElement.dataset.link;
    }
    moveInstrumentation(linkElement, link);

    const imgElement = itemNode.querySelector('[data-aue-prop="icon"]');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      picture.querySelector('img').className = 'stickyNavigation-sticky-bottom-nav__icon';
      link.append(picture);
      moveInstrumentation(imgElement, picture);
    }

    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    const span = document.createElement('span');
    span.className = 'stickyNavigation-sticky-bottom-nav__label';
    if (labelElement) {
      span.textContent = labelElement.textContent;
      moveInstrumentation(labelElement, span);
    } else {
      span.textContent = linkElement.querySelector('span')?.textContent || '';
    }
    link.append(span);

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
