import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const stickyNavigationSection = document.createElement('div');
  stickyNavigationSection.id = 'sticky-navigation';
  stickyNavigationSection.className = 'sticky-navigation-section sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-container sticky-navigation-bg-boing-primary';

  const stickyNavigationList = document.createElement('ul');
  stickyNavigationList.className = 'sticky-navigation-list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const items = block.querySelectorAll('[data-aue-model="stickyNavigationItem"]');
  items.forEach((itemNode) => {
    const stickyNavigationItem = document.createElement('li');
    stickyNavigationItem.className = 'sticky-navigation-item sticky-navigation-position-relative';

    const linkElement = document.createElement('a');
    linkElement.className = 'sticky-navigation-link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    if (link) {
      const linkHref = link.querySelector('a') ? link.querySelector('a').href : link.textContent.trim();
      linkElement.href = linkHref;
      linkElement.dataset.link = link.querySelector('a') ? link.querySelector('a').dataset.link : linkHref;
      moveInstrumentation(link, linkElement);
    }

    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        const iconImg = picture.querySelector('img');
        iconImg.className = 'sticky-navigation-icon';
        linkElement.append(picture);
        moveInstrumentation(icon, picture);
      }
    }

    const label = itemNode.querySelector('[data-aue-prop="label"]');
    if (label) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-label';
      span.textContent = label.textContent.trim();
      linkElement.append(span);
      moveInstrumentation(label, span);
    }

    stickyNavigationItem.append(linkElement);
    stickyNavigationList.append(stickyNavigationItem);
    moveInstrumentation(itemNode, stickyNavigationItem);
  });

  stickyNavigationSection.append(stickyNavigationList);

  block.textContent = '';
  block.append(stickyNavigationSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
