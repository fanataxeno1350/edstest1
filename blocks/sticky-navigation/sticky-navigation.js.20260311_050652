import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';
  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.classList.add('sticky-navigation-trans-pop-up');

  const section = document.createElement('section');
  section.classList.add(
    'sticky-navigation-sticky-bottom-nav',
    'sticky-navigation-position-fixed',
    'sticky-navigation-bottom-0',
    'sticky-navigation-p-3',
    'sticky-navigation-d-flex',
    'sticky-navigation-align-items-center',
    'sticky-navigation-boing-container',
    'sticky-navigation-bg-boing-primary',
  );

  const ul = document.createElement('ul');
  ul.classList.add(
    'sticky-navigation-sticky-bottom-nav__list',
    'sticky-navigation-d-flex',
    'sticky-navigation-justify-content-around',
    'sticky-navigation-align-items-center',
    'sticky-navigation-flex-grow-1',
  );

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add(
      'sticky-navigation-sticky-bottom-nav__item',
      'sticky-navigation-position-relative',
    );

    const linkElement = itemNode.querySelector('a');
    const href = linkElement ? linkElement.getAttribute('href') : '#';
    const dataConsent = linkElement ? linkElement.getAttribute('data-consent') : 'false';
    const dataLink = linkElement ? linkElement.getAttribute('data-link') : '';

    const a = document.createElement('a');
    a.href = href;
    a.classList.add(
      'sticky-navigation-sticky-bottom-nav__link',
      'sticky-navigation-d-flex',
      'sticky-navigation-flex-column',
      'sticky-navigation-align-items-center',
      'sticky-navigation-gap-1',
      'sticky-navigation-analytics_cta_click',
    );
    a.setAttribute('data-consent', dataConsent);
    a.setAttribute('data-link', dataLink);

    const iconImg = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconImg) {
      const picture = createOptimizedPicture(iconImg.src, iconImg.alt);
      picture.classList.add('sticky-navigation-sticky-bottom-nav__icon');
      a.append(picture);
      moveInstrumentation(iconImg, picture);
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('sticky-navigation-sticky-bottom-nav__label');
    const labelContent = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelContent) {
      labelSpan.textContent = labelContent.textContent;
      a.append(labelSpan);
      moveInstrumentation(labelContent, labelSpan);
    } else if (linkElement) {
      // Fallback for label if data-aue-prop is missing
      const linkText = linkElement.querySelector('.sticky-navigation-sticky-bottom-nav__label');
      if (linkText) {
        labelSpan.textContent = linkText.textContent;
        a.append(labelSpan);
        moveInstrumentation(linkText, labelSpan);
      }
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
