import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('feature-cards-container');

  const titleDiv = block.querySelector('.featureCards-text');
  if (titleDiv) {
    const h1 = titleDiv.querySelector('h1');
    if (h1) {
      const headingWrapper = document.createElement('div');
      headingWrapper.classList.add('feature-cards-header');
      moveInstrumentation(h1, headingWrapper);
      headingWrapper.append(h1);
      mainDiv.append(headingWrapper);
    }
    moveInstrumentation(titleDiv, mainDiv);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('feature-cards-wrapper');

  const featureCards = block.querySelectorAll('a.featureCards-bolteSitare_cardSection');
  featureCards.forEach((cardLink) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('feature-card');

    const link = document.createElement('a');
    link.href = cardLink.href;
    if (cardLink.target) {
      link.target = cardLink.target;
    }

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('feature-card-image');
    const img = cardLink.querySelector('img');
    if (img) {
      imageDiv.append(createOptimizedPicture(img.src, img.alt));
      moveInstrumentation(img, imageDiv);
    }
    link.append(imageDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('feature-card-content');

    const title = cardLink.querySelector('h2.featureCards-bolteSitare_cardSection--title');
    if (title) {
      moveInstrumentation(title, contentDiv);
      contentDiv.append(title);
    }

    const description = cardLink.querySelector('p.featureCards-bolteSitare_cardSection--text');
    if (description) {
      moveInstrumentation(description, contentDiv);
      contentDiv.append(description);
    }

    const button = cardLink.querySelector('button.featureCards-bolteSitare_cardSection--btn');
    if (button) {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.classList.add('feature-card-button');
      moveInstrumentation(button, buttonWrapper);
      buttonWrapper.append(button);
      contentDiv.append(buttonWrapper);
    }

    link.append(contentDiv);
    cardDiv.append(link);
    moveInstrumentation(cardLink, cardDiv);
    cardsWrapper.append(cardDiv);
  });

  mainDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(mainDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
