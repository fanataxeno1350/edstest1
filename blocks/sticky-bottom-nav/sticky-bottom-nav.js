import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'sticky-bottom-nav sticky-bottom-nav--light sticky-bottom-nav--visible';

  const navList = document.createElement('ul');
  navList.className = 'sticky-bottom-nav__list';

  const navItems = block.querySelectorAll('[data-aue-model="stickyBottomNavItem"]');
  navItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'sticky-bottom-nav__item';

    const linkElement = itemNode.querySelector('.button-container a') || itemNode.querySelector('a');
    if (linkElement) {
      const linkWrapper = document.createElement('a');
      linkWrapper.href = linkElement.href;
      linkWrapper.className = 'sticky-bottom-nav__link';

      const imgElement = itemNode.querySelector('img');
      if (imgElement) {
        const picture = createOptimizedPicture(imgElement.src, imgElement.alt || '', false, [{ width: '40' }]);
        const img = picture.querySelector('img');
        img.className = 'sticky-bottom-nav__icon';
        linkWrapper.append(picture);
        moveInstrumentation(imgElement, picture);
      }

      const labelElement = itemNode.querySelector('[data-aue-prop="label"]') || itemNode.querySelector('span');
      if (labelElement) {
        const labelSpan = document.createElement('span');
        labelSpan.className = 'sticky-bottom-nav__label';
        labelSpan.textContent = labelElement.textContent;
        linkWrapper.append(labelSpan);
        moveInstrumentation(labelElement, labelSpan);
      }

      listItem.append(linkWrapper);
      moveInstrumentation(linkElement, linkWrapper);
    }

    navList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  mainDiv.append(navList);

  block.textContent = '';
  block.append(mainDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}