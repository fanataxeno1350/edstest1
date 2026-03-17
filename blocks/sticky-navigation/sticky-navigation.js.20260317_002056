import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const stickyNavContainer = document.createElement('section');
  stickyNavContainer.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav stickynavigation-stickyNavigation-position-fixed stickynavigation-stickyNavigation-bottom-0 stickynavigation-stickyNavigation-p-3 stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-boing-container stickynavigation-stickyNavigation-bg-boing-primary';

  const navList = document.createElement('ul');
  navList.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__list stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-justify-content-around stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');

  navItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__item stickynavigation-stickyNavigation-position-relative';

    const linkElement = itemNode.querySelector('a');
    if (linkElement) {
      const newLink = document.createElement('a');
      newLink.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__link stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-flex-column stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-gap-1 stickynavigation-stickyNavigation-analytics_cta_click';
      newLink.href = linkElement.href;
      if (linkElement.dataset.consent) {
        newLink.dataset.consent = linkElement.dataset.consent;
      }
      if (linkElement.dataset.link) {
        newLink.dataset.link = linkElement.dataset.link;
      }

      const imgElement = itemNode.querySelector('[data-aue-prop="icon"]');
      if (imgElement) {
        const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{
          width: '40'
        }]);
        picture.querySelector('img').className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__icon';
        newLink.append(picture);
        moveInstrumentation(imgElement, picture);
      }

      const labelSpan = document.createElement('span');
      labelSpan.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__label';
      const labelText = itemNode.querySelector('[data-aue-prop="label"]');
      if (labelText) {
        labelSpan.textContent = labelText.textContent;
        newLink.append(labelSpan);
        moveInstrumentation(labelText, labelSpan);
      } else if (linkElement.textContent) {
        labelSpan.textContent = linkElement.textContent.trim();
        newLink.append(labelSpan);
      }

      listItem.append(newLink);
      moveInstrumentation(linkElement, newLink);
    }

    navList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  stickyNavContainer.append(navList);

  block.textContent = '';
  block.append(stickyNavContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}