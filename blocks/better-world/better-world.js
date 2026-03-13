import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.className = 'our-values-cmp-our-values--better-world';

  // Main Title
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'our-values-cmp-our-values__title-wrapper';
  const mainTitle = document.createElement('h1');
  mainTitle.className = 'our-values-cmp-our-values__title our-values-star-icon';
  const authoredMainTitle = block.querySelector('[data-aue-prop="mainTitle"]') || block.querySelector('h1');
  if (authoredMainTitle) {
    mainTitle.append(...authoredMainTitle.childNodes);
    moveInstrumentation(authoredMainTitle, mainTitle);
  }
  titleWrapper.append(mainTitle);
  rootDiv.append(titleWrapper);
  moveInstrumentation(block.querySelector('.our-values-cmp-our-values__title-wrapper'), titleWrapper);

  // Items Container
  const itemContainer = document.createElement('div');
  itemContainer.className = 'our-values-cmp-our-values__item-container';

  const authoredItems = block.querySelectorAll('[data-aue-model="betterWorldItem"]');
  authoredItems.forEach((itemNode) => {
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'our-values-cmp-our-values__details-container';

    // Item Image
    const itemImageContainer = document.createElement('div');
    itemImageContainer.className = 'our-values-cmp-our-values__item-image-container';
    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.className = 'our-values-lazy-image-container';

    const authoredImage = itemNode.querySelector('[data-aue-prop="image"]');
    if (authoredImage) {
      const img = authoredImage.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').className = 'our-values-cmp-our-values__item-image our-values-lazy-image our-values-loaded';
        lazyImageContainer.append(picture);
        moveInstrumentation(authoredImage, lazyImageContainer);
      }
    }
    itemImageContainer.append(lazyImageContainer);
    detailsContainer.append(itemImageContainer);
    moveInstrumentation(itemNode.querySelector('.our-values-cmp-our-values__item-image-container'), itemImageContainer);

    // Item Content
    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.className = 'our-values-cmp-our-values__item-content-wrapper';

    const itemTitle = document.createElement('div');
    itemTitle.className = 'our-values-cmp-our-values__item-title';
    const authoredItemTitle = itemNode.querySelector('[data-aue-prop="title"]') || itemNode.querySelector('div:nth-child(2) > div:nth-child(1)');
    if (authoredItemTitle) {
      itemTitle.append(...authoredItemTitle.childNodes);
      moveInstrumentation(authoredItemTitle, itemTitle);
    }
    itemContentWrapper.append(itemTitle);

    const itemDescription = document.createElement('div');
    itemDescription.className = 'our-values-cmp-our-values__item-title--description';
    const authoredItemDescription = itemNode.querySelector('[data-aue-prop="description"]') || itemNode.querySelector('div:nth-child(2) > div:nth-child(2)');
    if (authoredItemDescription) {
      itemDescription.append(...authoredItemDescription.childNodes);
      moveInstrumentation(authoredItemDescription, itemDescription);
    }
    itemContentWrapper.append(itemDescription);
    detailsContainer.append(itemContentWrapper);
    moveInstrumentation(itemNode.querySelector('.our-values-cmp-our-values__item-content-wrapper'), itemContentWrapper);

    itemContainer.append(detailsContainer);
    moveInstrumentation(itemNode, detailsContainer);
  });
  rootDiv.append(itemContainer);
  moveInstrumentation(block.querySelector('.our-values-cmp-our-values__item-container'), itemContainer);

  // Description Container
  const descriptionContainer = document.createElement('div');
  descriptionContainer.className = 'our-values-cmp-our-values__description-container';
  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'our-values-cmp-our-values__description';
  const authoredDescription = block.querySelector('[data-aue-prop="description"]') || block.querySelector('.our-values-cmp-our-values__description');
  if (authoredDescription) {
    descriptionDiv.append(...authoredDescription.childNodes);
    moveInstrumentation(authoredDescription, descriptionDiv);
  }
  descriptionContainer.append(descriptionDiv);
  rootDiv.append(descriptionContainer);
  moveInstrumentation(block.querySelector('.our-values-cmp-our-values__description-container'), descriptionContainer);

  // CTA Button
  const ctaButtonDiv = document.createElement('div');
  ctaButtonDiv.className = 'our-values-button our-values-cmp-button--primary-anchor our-values-cmp-button--primary-anchor-undefined';
  const authoredCtaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (authoredCtaLink) {
    const link = authoredCtaLink.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.className = 'our-values-cmp-button';
      newLink.href = link.href;
      if (link.target) {
        newLink.target = link.target;
      }
      const span = document.createElement('span');
      span.className = 'our-values-cmp-button__text';
      span.textContent = link.textContent.trim();
      newLink.append(span);
      ctaButtonDiv.append(newLink);
      moveInstrumentation(authoredCtaLink, ctaButtonDiv);
    }
  }
  rootDiv.append(ctaButtonDiv);
  moveInstrumentation(block.querySelector('.our-values-button'), ctaButtonDiv);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
