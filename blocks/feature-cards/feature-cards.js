import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.className = 'feature-cards-wrapper';

  // Extract and move the main title
  const titleContainer = block.querySelector('.featureCards-cmp-text');
  if (titleContainer) {
    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'feature-cards-title-wrapper';
    titleWrapper.append(titleContainer);
    moveInstrumentation(titleContainer, titleWrapper);
    rootDiv.append(titleWrapper);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'feature-cards-grid';

  // Extract multifield items using data-aue-model="featureCard"
  const authoredCards = block.querySelectorAll('[data-aue-model="featureCard"]');

  authoredCards.forEach((cardElement) => {
    const link = cardElement.querySelector('a');
    const cardLink = document.createElement('a');
    if (link) {
      cardLink.href = link.href;
      if (link.target) {
        cardLink.target = link.target;
      }
      if (link.title) {
        cardLink.title = link.title;
      }
      moveInstrumentation(link, cardLink);
    }
    cardLink.className = 'feature-card-item';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'feature-card-image';
    const img = cardElement.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      imageContainer.append(picture);
      moveInstrumentation(img, picture);
    }
    cardLink.append(imageContainer);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'feature-card-content';

    const title = cardElement.querySelector('h2');
    if (title) {
      contentWrapper.append(title);
      moveInstrumentation(title, contentWrapper);
    }

    const description = cardElement.querySelector('p');
    if (description) {
      contentWrapper.append(description);
      moveInstrumentation(description, contentWrapper);
    }

    const button = cardElement.querySelector('button');
    if (button) {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.className = 'feature-card-button';
      buttonWrapper.append(button);
      moveInstrumentation(button, buttonWrapper);
      contentWrapper.append(buttonWrapper);
    }

    cardLink.append(contentWrapper);
    cardsWrapper.append(cardLink);
    moveInstrumentation(cardElement, cardLink);
  });

  rootDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
