import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';
  moveInstrumentation(block.querySelector('#pop-up'), popUpDiv);

  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.className = 'trans-pop-up';
  moveInstrumentation(block.querySelector('.trans-pop-up'), transPopUpDiv);

  const section = document.createElement('section');
  section.className = 'sticky-bottom-nav position-fixed bottom-0 p-3 d-flex align-items-center boing-container bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-bottom-nav__list d-flex justify-content-around align-items-center flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="stickyBottomNavItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'sticky-bottom-nav__item position-relative';

    const linkElement = itemNode.querySelector('a');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkDataConsent = linkElement ? linkElement.dataset.consent : 'false';
    const linkDataLink = linkElement ? linkElement.dataset.link : '';

    const a = document.createElement('a');
    a.href = linkHref;
    a.className = 'sticky-bottom-nav__link d-flex flex-column align-items-center gap-1 analytics_cta_click';
    a.dataset.consent = linkDataConsent;
    a.dataset.link = linkDataLink;

    const imgElement = itemNode.querySelector('[data-aue-prop="icon"]');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      picture.querySelector('img').className = 'sticky-bottom-nav__icon';
      a.append(picture);
      moveInstrumentation(imgElement, picture);
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'sticky-bottom-nav__label';
    const labelContent = itemNode.querySelector('[data-aue-prop="label"]') || itemNode.querySelector('span.sticky-bottom-nav__label');
    if (labelContent) {
      labelSpan.textContent = labelContent.textContent;
      moveInstrumentation(labelContent, labelSpan);
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
