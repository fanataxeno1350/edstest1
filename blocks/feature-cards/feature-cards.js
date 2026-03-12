import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.classList.add('featurecards-wrapper');

  const textContent = block.querySelector('.featurecards-featureCards-text');
  if (textContent) {
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('featurecards-title');
    const h1 = textContent.querySelector('h1');
    if (h1) {
      titleDiv.append(h1);
      moveInstrumentation(textContent, titleDiv);
    }
    featureCardsWrapper.append(titleDiv);
  }

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('featurecards-cards-container');

  const authoredCards = block.querySelectorAll('[data-aue-model="featureCard"]');

  authoredCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('a');
    const cardLink = document.createElement('a');
    cardLink.classList.add('featurecards-featureCards-bolteSitare_cardSection', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
    if (linkElement) {
      cardLink.href = linkElement.href;
      cardLink.title = linkElement.title;
      if (linkElement.target) {
        cardLink.target = linkElement.target;
      }
      moveInstrumentation(linkElement, cardLink);
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
    const img = cardNode.querySelector('img[data-aue-prop="image"]');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      imageWrapper.append(picture);
      moveInstrumentation(img, picture);
    } else {
      const imgFallback = cardNode.querySelector('.featurecards-featureCards-bolteSitare_cardSection--img img');
      if (imgFallback) {
        const picture = createOptimizedPicture(imgFallback.src, imgFallback.alt);
        imageWrapper.append(picture);
        moveInstrumentation(imgFallback, picture);
      }
    }
    cardLink.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

    const textContentDiv = document.createElement('div');

    const titleElement = cardNode.querySelector('h2[data-aue-prop="title"]');
    if (titleElement) {
      textContentDiv.append(titleElement);
      moveInstrumentation(titleElement, textContentDiv);
    } else {
      const h2Fallback = cardNode.querySelector('.featurecards-featureCards-bolteSitare_cardSection--title');
      if (h2Fallback) {
        textContentDiv.append(h2Fallback);
        moveInstrumentation(h2Fallback, textContentDiv);
      }
    }

    const descriptionElement = cardNode.querySelector('p[data-aue-prop="description"]');
    if (descriptionElement) {
      textContentDiv.append(descriptionElement);
      moveInstrumentation(descriptionElement, textContentDiv);
    } else {
      const pFallback = cardNode.querySelector('.featurecards-featureCards-bolteSitare_cardSection--text');
      if (pFallback) {
        textContentDiv.append(pFallback);
        moveInstrumentation(pFallback, textContentDiv);
      }
    }
    contentWrapper.append(textContentDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');

    const buttonTextElement = cardNode.querySelector('[data-aue-prop="buttonText"]');
    if (buttonTextElement) {
      button.textContent = buttonTextElement.textContent;
      moveInstrumentation(buttonTextElement, button);
    } else {
      const buttonFallback = cardNode.querySelector('.featurecards-featureCards-bolteSitare_cardSection--btn');
      if (buttonFallback) {
        button.textContent = buttonFallback.textContent;
        moveInstrumentation(buttonFallback, button);
      }
    }
    buttonDiv.append(button);
    contentWrapper.append(buttonDiv);

    cardLink.append(contentWrapper);
    cardsContainer.append(cardLink);
    moveInstrumentation(cardNode, cardLink);
  });

  featureCardsWrapper.append(cardsContainer);

  block.textContent = '';
  block.append(featureCardsWrapper);
  block.className = `feature-cards block`;
  block.dataset.blockStatus = 'loaded';
}
