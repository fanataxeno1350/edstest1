import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('featureCards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('featureCards-title-wrapper');
  const authoredTitleDiv = block.querySelector('.featurecards-featureCards-text');
  if (authoredTitleDiv) {
    const titleElement = authoredTitleDiv.querySelector('h1');
    if (titleElement) {
      titleWrapper.append(titleElement);
      moveInstrumentation(authoredTitleDiv, titleWrapper);
    }
  }
  if (titleWrapper.hasChildNodes()) {
    rootDiv.append(titleWrapper);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featureCards-cards-wrapper');

  const authoredCards = block.querySelectorAll('a.featurecards-featureCards-bolteSitare_cardSection');

  authoredCards.forEach((cardLink) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('featureCards-card');

    const link = document.createElement('a');
    link.href = cardLink.href;
    link.title = cardLink.title;
    if (cardLink.target) {
      link.target = cardLink.target;
    }
    link.classList.add('featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('featureCards-card-image');
    const imgElement = cardLink.querySelector('img');
    if (imgElement) {
      imageWrapper.append(createOptimizedPicture(imgElement.src, imgElement.alt));
      moveInstrumentation(imgElement, imageWrapper);
    }
    link.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featureCards-card-content');

    const titleElement = cardLink.querySelector('h2');
    if (titleElement) {
      contentWrapper.append(titleElement);
      moveInstrumentation(titleElement, contentWrapper);
    }

    const descriptionElement = cardLink.querySelector('p');
    if (descriptionElement) {
      contentWrapper.append(descriptionElement);
      moveInstrumentation(descriptionElement, contentWrapper);
    }

    const buttonContainer = cardLink.querySelector('.featurecards-featureCards-bolteSitare_cardSection--btn');
    if (buttonContainer) {
      const buttonLink = document.createElement('a');
      buttonLink.href = cardLink.href;
      buttonLink.textContent = buttonContainer.textContent.trim();
      buttonLink.classList.add('featureCards-card-button');
      if (cardLink.target) {
        buttonLink.target = cardLink.target;
      }
      contentWrapper.append(buttonLink);
      moveInstrumentation(buttonContainer, buttonLink);
    }

    link.append(contentWrapper);
    cardDiv.append(link);
    cardsWrapper.append(cardDiv);
    moveInstrumentation(cardLink, cardDiv);
  });

  rootDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
