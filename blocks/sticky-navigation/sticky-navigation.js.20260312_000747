import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const stickyBottomNav = document.createElement('section');
  stickyBottomNav.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav stickynavigation-stickyNavigation-position-fixed stickynavigation-stickyNavigation-bottom-0 stickynavigation-stickyNavigation-p-3 stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-boing-container stickynavigation-stickyNavigation-bg-boing-primary';

  const stickyBottomNavList = document.createElement('ul');
  stickyBottomNavList.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__list stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-justify-content-around stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-flex-grow-1';

  const navigationItems = block.querySelectorAll('[data-aue-model="navigationItem"]');

  navigationItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__item stickynavigation-stickyNavigation-position-relative';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkDataConsent = linkElement ? linkElement.dataset.consent : 'false';
    const linkDataLink = linkElement ? linkElement.dataset.link : '';

    const anchor = document.createElement('a');
    anchor.href = linkHref;
    anchor.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__link stickynavigation-stickyNavigation-d-flex stickynavigation-stickyNavigation-flex-column stickynavigation-stickyNavigation-align-items-center stickynavigation-stickyNavigation-gap-1 stickynavigation-stickyNavigation-analytics_cta_click';
    anchor.dataset.consent = linkDataConsent;
    anchor.dataset.link = linkDataLink;

    const iconImage = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconImage) {
      const picture = createOptimizedPicture(iconImage.src, iconImage.alt);
      const img = picture.querySelector('img');
      img.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__icon';
      anchor.append(picture);
      moveInstrumentation(iconImage, picture);
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'stickynavigation-stickyNavigation-sticky-bottom-nav__label';
    const labelContent = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelContent) {
      labelSpan.textContent = labelContent.textContent;
      anchor.append(labelSpan);
      moveInstrumentation(labelContent, labelSpan);
    }

    listItem.append(anchor);
    moveInstrumentation(itemNode, listItem);
    stickyBottomNavList.append(listItem);
  });

  stickyBottomNav.append(stickyBottomNavList);

  block.textContent = '';
  block.append(stickyBottomNav);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}