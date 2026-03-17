import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('sticky-navigation-wrapper');

  const navElement = document.createElement('nav');
  navElement.classList.add(
    'sticky-bottom-nav',
    'position-fixed',
    'bottom-0',
    'p-3',
    'd-flex',
    'align-items-center',
    'boing-container',
    'bg-boing-primary',
  );

  const ul = document.createElement('ul');
  ul.classList.add(
    'sticky-bottom-nav__list',
    'd-flex',
    'justify-content-around',
    'align-items-center',
    'flex-grow-1',
  );

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add('sticky-bottom-nav__item', 'position-relative');

    const linkElement = itemNode.querySelector('.button-container a');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkText = linkElement ? linkElement.textContent : '';

    const a = document.createElement('a');
    a.href = linkHref;
    a.classList.add(
      'sticky-bottom-nav__link',
      'd-flex',
      'flex-column',
      'align-items-center',
      'gap-1',
      'analytics_cta_click',
    );

    const dataConsent = linkElement ? linkElement.dataset.consent : 'false';
    if (dataConsent) {
      a.setAttribute('data-consent', dataConsent);
    }

    const dataLink = linkElement ? linkElement.dataset.link : '';
    if (dataLink) {
      a.setAttribute('data-link', dataLink);
    }

    const imgElement = itemNode.querySelector('[data-aue-prop="icon"]');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt || '', false, [{ width: '40' }]);
      const icon = picture.querySelector('img');
      icon.classList.add('sticky-bottom-nav__icon');
      a.append(picture);
      moveInstrumentation(imgElement, picture);
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('sticky-bottom-nav__label');
    const labelText = itemNode.querySelector('[data-aue-prop="label"]') || itemNode.querySelector('p:last-of-type');
    if (labelText) {
      labelSpan.textContent = labelText.textContent;
      a.append(labelSpan);
      moveInstrumentation(labelText, labelSpan);
    } else if (linkText) {
      labelSpan.textContent = linkText;
      a.append(labelSpan);
    }

    li.append(a);
    ul.append(li);
    moveInstrumentation(itemNode, li);
    if (linkElement) {
      moveInstrumentation(linkElement, a);
    }
  });

  navElement.append(ul);
  rootDiv.append(navElement);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
