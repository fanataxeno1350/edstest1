import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerListWrapper = document.createElement('div');
  footerListWrapper.className = 'footerList';

  const ulElement = document.createElement('ul');
  ulElement.className = 'footerList-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');

  footerLinks.forEach((linkItem) => {
    const liElement = document.createElement('li');
    liElement.className = 'footerList-list__item';

    const linkElement = document.createElement('a');
    linkElement.className = 'cta-analytics analytics_cta_click footerList-list__item--link d-inline-block';
    linkElement.setAttribute('data-link-region', 'Footer List');

    const linkHref = linkItem.querySelector('[data-aue-prop="link"]');
    if (linkHref) {
      linkElement.href = linkHref.textContent.trim();
      moveInstrumentation(linkHref, linkElement);
    }

    const linkText = linkItem.querySelector('[data-aue-prop="text"]');
    if (linkText) {
      linkElement.textContent = linkText.textContent.trim();
      moveInstrumentation(linkText, linkElement);
    }

    liElement.append(linkElement);
    ulElement.append(liElement);
    moveInstrumentation(linkItem, liElement);
  });

  footerListWrapper.append(ulElement);

  block.textContent = '';
  block.append(footerListWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
