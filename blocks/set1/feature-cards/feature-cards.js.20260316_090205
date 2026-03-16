import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsSection = document.createElement('section');
  featureCardsSection.className = 'feature-cards-section';

  const textContainer = block.querySelector('.featureCards-text');
  if (textContainer) {
    const headerDiv = document.createElement('div');
    headerDiv.className = 'feature-cards-header';
    const h1 = textContainer.querySelector('h1');
    if (h1) {
      headerDiv.append(h1);
      moveInstrumentation(textContainer, headerDiv);
    }
    featureCardsSection.append(headerDiv);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'feature-cards-wrapper';

  const authoredCards = block.querySelectorAll('[data-aue-model="featureCard"]');

  authoredCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('a');
    const cardLink = document.createElement('a');
    cardLink.className = 'feature-cards-card-link';
    cardLink.href = linkElement?.href || '#';
    if (linkElement?.target) {
      cardLink.target = linkElement.target;
    }
    if (linkElement?.title) {
      cardLink.title = linkElement.title;
    }
    if (linkElement?.dataset.title) {
      cardLink.dataset.title = linkElement.dataset.title;
    }

    const cardDiv = document.createElement('div');
    cardDiv.className = 'feature-cards-card';

    const imageDiv = document.createElement('div');
    imageDiv.className = 'feature-cards-card-image';
    const img = cardNode.querySelector('[data-aue-prop="image"]');
    if (img) {
      imageDiv.append(createOptimizedPicture(img.src, img.alt));
      moveInstrumentation(img, imageDiv);
    }
    cardDiv.append(imageDiv);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'feature-cards-card-content';

    const title = cardNode.querySelector('[data-aue-prop="title"]');
    if (title) {
      const h2 = document.createElement('h2');
      h2.className = 'feature-cards-card-title';
      h2.append(...title.childNodes);
      contentDiv.append(h2);
      moveInstrumentation(title, h2);
    }

    const description = cardNode.querySelector('[data-aue-prop="description"]');
    if (description) {
      const p = document.createElement('p');
      p.className = 'feature-cards-card-description';
      p.append(...description.childNodes);
      contentDiv.append(p);
      moveInstrumentation(description, p);
    }

    const buttonLabel = cardNode.querySelector('[data-aue-prop="buttonLabel"]');
    if (buttonLabel) {
      const buttonWrapper = document.createElement('div');
      const button = document.createElement('button');
      button.className = 'feature-cards-card-button';
      button.textContent = buttonLabel.textContent.trim();
      buttonWrapper.append(button);
      contentDiv.append(buttonWrapper);
      moveInstrumentation(buttonLabel, button);
    }

    cardDiv.append(contentDiv);
    cardLink.append(cardDiv);
    cardsWrapper.append(cardLink);
    moveInstrumentation(cardNode, cardLink);
  });

  featureCardsSection.append(cardsWrapper);

  block.textContent = '';
  block.append(featureCardsSection);
  block.className = `feature-cards block`;
  block.dataset.blockStatus = 'loaded';
}