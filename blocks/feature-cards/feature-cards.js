import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Root container for the entire block
  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.className = 'featureCards-wrapper';

  // Section 1: Title
  const titleWrapper = document.querySelector('.cmp-text');
  if (titleWrapper) {
    const headerSection = document.createElement('div');
    headerSection.className = 'featureCards-header-section text-center';
    const h1 = titleWrapper.querySelector('h1');
    if (h1) {
      h1.className = 'featureCards-header-title boing--text__heading-1 text-boing-dark';
      moveInstrumentation(h1, headerSection);
      headerSection.append(h1);
    }
    moveInstrumentation(titleWrapper, headerSection);
    featureCardsWrapper.append(headerSection);
  }

  // Section 2: Cards container
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'featureCards-cards-container d-flex flex-wrap justify-content-center';

  // Select all authored featureCard items
  const featureCardItems = block.querySelectorAll('[data-aue-model="featureCard"]');

  featureCardItems.forEach((itemNode) => {
    // Extract content for each card
    const imageEl = itemNode.querySelector('[data-aue-prop="image"] img');
    const altText = itemNode.querySelector('[data-aue-prop="altText"]')?.textContent.trim() || '';
    const titleEl = itemNode.querySelector('[data-aue-prop="title"]');
    const descriptionEl = itemNode.querySelector('[data-aue-prop="description"]');
    const linkEl = itemNode.querySelector('[data-aue-prop="link"] a');

    if (linkEl && titleEl && descriptionEl && imageEl) {
      // Create the main anchor wrapper for the card
      const cardAnchor = document.createElement('a');
      cardAnchor.className = 'featureCards-bolteSitare_cardSection analytics_cta_click text-decoration-none';
      cardAnchor.href = linkEl.href;
      cardAnchor.title = linkEl.title || titleEl.textContent.trim();
      cardAnchor.setAttribute('data-title', titleEl.textContent.trim());
      // Move instrumentation for the link element to the new anchor
      moveInstrumentation(linkEl, cardAnchor);

      // Create the inner card wrapper
      const cardWrapper = document.createElement('div');
      cardWrapper.className = 'd-flex featureCards-bolteSitare_cardSection--wrapper';

      // Create image wrapper
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'featureCards-bolteSitare_cardSection--img';

      // Create optimized picture for the image
      const picture = createOptimizedPicture(imageEl.src, altText);
      const img = picture.querySelector('img');
      img.className = 'h-100 w-100 featureCards-card-img';
      moveInstrumentation(imageEl, imageWrapper);
      imageWrapper.append(picture);

      // Create content wrapper
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'featureCards-content-wrapper d-flex flex-column justify-content-between';

      // Create text content div
      const textContentDiv = document.createElement('div');

      // Title
      const h2Title = document.createElement('h2');
      h2Title.className = 'featureCards-bolteSitare_cardSection--title boing--text__heading-3 text-boing-dark';
      h2Title.textContent = titleEl.textContent.trim();
      moveInstrumentation(titleEl, textContentDiv);
      textContentDiv.append(h2Title);

      // Description
      const pDesc = document.createElement('p');
      pDesc.className = 'featureCards-bolteSitare_cardSection--text boing--text__body-3 text-boing-dark';
      pDesc.textContent = descriptionEl.textContent.trim();
      moveInstrumentation(descriptionEl, textContentDiv);
      textContentDiv.append(pDesc);

      contentWrapper.append(textContentDiv);

      // Button wrapper
      const buttonWrapper = document.createElement('div');
      const button = document.createElement('button');
      button.className = 'featureCards-bolteSitare_cardSection--btn text-white boing--text__body-4 d-inline-block';
      button.textContent = linkEl.textContent.trim() || 'Explore'; // Use link text for button, default to 'Explore'
      buttonWrapper.append(button);

      contentWrapper.append(buttonWrapper);

      // Assemble card
      cardWrapper.append(imageWrapper, contentWrapper);
      cardAnchor.append(cardWrapper);

      // Move instrumentation for the entire item node to the card anchor
      moveInstrumentation(itemNode, cardAnchor);
      cardsContainer.append(cardAnchor);
    }
  });

  featureCardsWrapper.append(cardsContainer);

  // Clear the original block content and append the new structure
  block.textContent = '';
  block.append(featureCardsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';

  // Remove the curve container if it exists and is empty
  const curveContainer = block.querySelector('.featureCards-curve-container.d-none');
  if (curveContainer) {
    curveContainer.remove();
  }

  // Remove the extra sections if they exist
  block.querySelectorAll('section.featureCards-feature_card--Section').forEach((section) => section.remove());
}