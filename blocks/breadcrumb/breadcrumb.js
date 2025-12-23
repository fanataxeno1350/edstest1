import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const breadcrumbDiv = document.createElement('div');
  breadcrumbDiv.classList.add('breadcrumb-breadcrumb');

  const h2 = document.createElement('h2');
  h2.classList.add('breadcrumb-element-invisible');
  h2.textContent = 'You are here';
  breadcrumbDiv.append(h2);

  const linksDiv = document.createElement('div');
  linksDiv.classList.add('breadcrumb-breadcrumb-links');
  breadcrumbDiv.append(linksDiv);

  const linkElements = block.querySelectorAll('div[data-aue-model="breadcrumb"]');

  linkElements.forEach((linkNode) => {
    const linkWrapper = document.createElement('a');
    const linkField = linkNode.querySelector('[data-aue-prop="link"]');
    const labelField = linkNode.querySelector('[data-aue-prop="label"]');

    if (linkField) {
      linkWrapper.href = linkField.textContent.trim();
      moveInstrumentation(linkField, linkWrapper);
    }

    if (labelField) {
      linkWrapper.textContent = labelField.textContent.trim();
      moveInstrumentation(labelField, linkWrapper);
    } else if (linkField) {
      // Fallback to link text if label is missing
      linkWrapper.textContent = linkField.textContent.trim();
    }

    linksDiv.append(linkWrapper);
    moveInstrumentation(linkNode, linkWrapper);
  });

  block.textContent = '';
  block.append(breadcrumbDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
