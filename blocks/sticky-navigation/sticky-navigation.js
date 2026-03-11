import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.className = 'sticky-navigation';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation__list';

  const items = block.querySelectorAll('[data-aue-model="stickyNavigationItem"]');
  items.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'sticky-navigation__item';

    const link = itemNode.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'sticky-navigation__link';
      if (link.dataset.consent) {
        newLink.dataset.consent = link.dataset.consent;
      }
      if (link.dataset.link) {
        newLink.dataset.link = link.dataset.link;
      }

      const iconImg = itemNode.querySelector('[data-aue-prop="icon"]');
      if (iconImg) {
        const picture = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '40' }]);
        picture.className = 'sticky-navigation__icon';
        newLink.append(picture);
        moveInstrumentation(iconImg, picture);
      } else {
        // Fallback for image if data-aue-prop is missing but img exists
        const img = itemNode.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
          picture.className = 'sticky-navigation__icon';
          newLink.append(picture);
          moveInstrumentation(img, picture);
        }
      }

      const labelSpan = itemNode.querySelector('[data-aue-prop="label"]');
      if (labelSpan) {
        const newLabelSpan = document.createElement('span');
        newLabelSpan.className = 'sticky-navigation__label';
        newLabelSpan.textContent = labelSpan.textContent;
        newLink.append(newLabelSpan);
        moveInstrumentation(labelSpan, newLabelSpan);
      } else {
        // Fallback for label if data-aue-prop is missing but span exists
        const span = itemNode.querySelector('span');
        if (span) {
          const newLabelSpan = document.createElement('span');
          newLabelSpan.className = 'sticky-navigation__label';
          newLabelSpan.textContent = span.textContent;
          newLink.append(newLabelSpan);
          moveInstrumentation(span, newLabelSpan);
        }
      }

      li.append(newLink);
      moveInstrumentation(link, newLink);
    }
    ul.append(li);
    moveInstrumentation(itemNode, li);
  });

  nav.append(ul);

  block.textContent = '';
  block.append(nav);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
