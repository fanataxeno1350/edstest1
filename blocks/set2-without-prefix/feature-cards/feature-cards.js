import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('feature-cards-wrapper');

  // Extract and move the title
  const titleContainer = block.querySelector('.cmp-text');
  if (titleContainer) {
    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('feature-cards-title');
    titleWrapper.append(titleContainer.querySelector('h1'));
    moveInstrumentation(titleContainer.querySelector('h1'), titleWrapper);
    rootDiv.append(titleWrapper);
    moveInstrumentation(titleContainer, titleWrapper);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('feature-cards-grid');

  const authoredCards = block.querySelectorAll('section.feature_card--Section.feature_card');

  authoredCards.forEach((cardNode) => {
    const cardLink = cardNode.querySelector('a');
    if (cardLink) {
      const cardAnchor = document.createElement('a');
      cardAnchor.classList.add('feature-card-item');
      cardAnchor.href = cardLink.href;
      if (cardLink.target) {
        cardAnchor.target = cardLink.target;
      }
      if (cardLink.title) {
        cardAnchor.title = cardLink.title;
      }
      if (cardLink.dataset.ctaLabel) {
        cardAnchor.dataset.ctaLabel = cardLink.dataset.ctaLabel;
      }

      const imageContainer = cardNode.querySelector('.feature_card--image');
      if (imageContainer) {
        const img = imageContainer.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          cardAnchor.append(picture);
          moveInstrumentation(img, picture);
        }
        moveInstrumentation(imageContainer, cardAnchor);
      }

      const textContentWrapper = document.createElement('div');
      textContentWrapper.classList.add('feature-card-content');

      const title = cardNode.querySelector('.feature_card--title');
      if (title) {
        textContentWrapper.append(title);
        moveInstrumentation(title, textContentWrapper);
      }

      const description = cardNode.querySelector('.feature_card--desc');
      if (description) {
        textContentWrapper.append(description);
        moveInstrumentation(description, textContentWrapper);
      }

      cardAnchor.append(textContentWrapper);
      cardsWrapper.append(cardAnchor);
      moveInstrumentation(cardNode, cardAnchor);
    }
  });

  rootDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.className = 'feature-cards block';
  block.dataset.blockStatus = 'loaded';
}
