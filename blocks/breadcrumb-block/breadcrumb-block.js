import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const breadcrumbTitle = block.querySelector('[data-aue-prop="breadcrumbTitle"]');
  const breadcrumbLink = block.querySelector('[data-aue-prop="breadcrumbLink"]');

  const breadcrumbBlock = document.createElement('div');
  breadcrumbBlock.className = 'breadcrumb-block';

  const h2 = document.createElement('h2');
  h2.className = 'breadcrumb-element-invisible';
  if (breadcrumbTitle) {
    h2.append(...breadcrumbTitle.childNodes);
    moveInstrumentation(breadcrumbTitle, h2);
  } else {
    h2.textContent = 'You are here';
  }

  const breadcrumbPath = document.createElement('div');
  breadcrumbPath.className = 'breadcrumb-path';
  if (breadcrumbLink) {
    const linkElement = breadcrumbLink.querySelector('a');
    if (linkElement) {
      breadcrumbPath.append(linkElement);
      moveInstrumentation(breadcrumbLink, breadcrumbPath);
    } else {
      const fallbackLink = document.createElement('a');
      fallbackLink.href = 'index.html';
      fallbackLink.textContent = 'Home';
      breadcrumbPath.append(fallbackLink);
    }
  } else {
    const fallbackLink = document.createElement('a');
    fallbackLink.href = 'index.html';
    fallbackLink.textContent = 'Home';
    breadcrumbPath.append(fallbackLink);
  }

  breadcrumbBlock.append(h2, breadcrumbPath);

  block.textContent = '';
  block.append(breadcrumbBlock);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
