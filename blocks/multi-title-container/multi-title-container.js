import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('multi-title-container-wrapper');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('multi-title-container-cmp-container');
  rootDiv.append(containerDiv);

  // Extract background image and aria label
  const authoredContainer = block.querySelector('[data-aue-model="multiTitleContainer"]');
  if (authoredContainer) {
    const backgroundImage = authoredContainer.querySelector('[data-aue-prop="backgroundImage"]');
    if (backgroundImage) {
      const bgUrl = backgroundImage.getAttribute('data-aue-prop-value');
      if (bgUrl) {
        containerDiv.style.backgroundImage = `url(${bgUrl})`;
        containerDiv.style.backgroundSize = 'cover';
        containerDiv.style.backgroundRepeat = 'no-repeat';
      }
    }
    const ariaLabel = authoredContainer.querySelector('[data-aue-prop="ariaLabel"]');
    if (ariaLabel) {
      containerDiv.setAttribute('aria-label', ariaLabel.getAttribute('data-aue-prop-value'));
    }
    moveInstrumentation(authoredContainer, containerDiv);
  }

  const gridDiv = document.createElement('div');
  gridDiv.classList.add('multi-title-container-aem-Grid', 'multi-title-container-aem-Grid--12', 'multi-title-container-aem-Grid--default--12');
  containerDiv.append(gridDiv);

  const gridColumnDiv = document.createElement('div');
  gridColumnDiv.classList.add('multi-title-container-container', 'multi-title-container-responsivegrid', 'multi-title-container-aem-GridColumn', 'multi-title-container-aem-GridColumn--default--12');
  gridDiv.append(gridColumnDiv);

  const innerContainerDiv = document.createElement('div');
  innerContainerDiv.classList.add('multi-title-container-cmp-container');
  gridColumnDiv.append(innerContainerDiv);

  // Titles
  const titles = [
    { prop: 'title1', class: '' },
    { prop: 'title2', class: 'multi-title-container-color-text-primary-2' },
    { prop: 'title3', class: 'multi-title-container-color-text-primary-3' },
    { prop: 'title4', class: 'multi-title-container-color-text-primary-5' },
  ];

  titles.forEach((titleDef) => {
    const titleElement = block.querySelector(`[data-aue-prop="${titleDef.prop}"]`);
    if (titleElement) {
      const titleWrapper = document.createElement('div');
      titleWrapper.classList.add('multi-title-container-title');
      if (titleDef.class) {
        titleWrapper.classList.add(titleDef.class);
      }
      const h1 = document.createElement('h1');
      h1.classList.add('multi-title-container-cmp-title__text');
      h1.textContent = titleElement.textContent;
      titleWrapper.append(h1);
      innerContainerDiv.append(titleWrapper);
      moveInstrumentation(titleElement, h1);
    }
  });

  // Description
  const textGridColumnDiv = document.createElement('div');
  textGridColumnDiv.classList.add('multi-title-container-text', 'multi-title-container-aem-GridColumn', 'multi-title-container-aem-GridColumn--default--12');
  gridDiv.append(textGridColumnDiv);

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const textCmpDiv = document.createElement('div');
    textCmpDiv.classList.add('multi-title-container-cmp-text');

    Array.from(descriptionElement.children).forEach((p) => {
      if (p.tagName === 'P') {
        textCmpDiv.append(p);
      }
    });
    textGridColumnDiv.append(textCmpDiv);
    moveInstrumentation(descriptionElement, textCmpDiv);
  }

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
