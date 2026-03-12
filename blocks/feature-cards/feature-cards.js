import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('featurecards-container');

  const textDiv = block.querySelector('.featurecards-featureCards-text');
  if (textDiv) {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('featurecards-header-container');
    moveInstrumentation(textDiv, headerContainer);
    headerContainer.append(textDiv);
    rootDiv.append(headerContainer);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featurecards-cards-wrapper');

  const featureCards = block.querySelectorAll('[data-aue-model="featureCard"]');
  featureCards.forEach((cardNode) => {
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

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
    const img = cardNode.querySelector('img[data-aue-prop="image"]');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').classList.add('featurecards-featureCards-h-100', 'featurecards-featureCards-w-100', 'featurecards-featureCards-card-img');
      moveInstrumentation(img, picture);
      imgWrapper.append(picture);
    }
    cardLink.append(imgWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

    const textContentDiv = document.createElement('div');

    const titleElement = cardNode.querySelector('h2[data-aue-prop="title"]') || cardNode.querySelector('h2');
    if (titleElement) {
      titleElement.classList.add('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
      moveInstrumentation(titleElement, textContentDiv);
      textContentDiv.append(titleElement);
    }

    const descriptionElement = cardNode.querySelector('p[data-aue-prop="description"]') || cardNode.querySelector('p');
    if (descriptionElement) {
      descriptionElement.classList.add('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
      moveInstrumentation(descriptionElement, textContentDiv);
      textContentDiv.append(descriptionElement);
    }
    contentWrapper.append(textContentDiv);

    const buttonDiv = document.createElement('div');
    const buttonTextElement = cardNode.querySelector('[data-aue-prop="buttonText"]') || cardNode.querySelector('.button-container a');
    if (buttonTextElement) {
      const button = document.createElement('button');
      button.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
      button.textContent = buttonTextElement.textContent.trim();
      moveInstrumentation(buttonTextElement, button);
      buttonDiv.append(button);
    } else {
      const authoredButton = cardNode.querySelector('button');
      if (authoredButton) {
        authoredButton.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
        moveInstrumentation(authoredButton, buttonDiv);
        buttonDiv.append(authoredButton);
      }
    }
    contentWrapper.append(buttonDiv);
    cardLink.append(contentWrapper);
    cardDiv.append(cardLink);
    moveInstrumentation(cardNode, cardDiv);
    cardsWrapper.append(cardDiv);
  });

  rootDiv.append(cardsWrapper);

  const curveContainer = block.querySelector('.featurecards-featureCards-curve-container');
  if (curveContainer) {
    const curveWrapper = document.createElement('div');
    curveWrapper.classList.add('featurecards-curve-wrapper');
    moveInstrumentation(curveContainer, curveWrapper);
    curveWrapper.append(curveContainer);
    rootDiv.append(curveWrapper);
  }

  const sectionElement = block.querySelector('.featurecards-featureCards-feature_card--Section');
  if (sectionElement) {
    const sectionWrapper = document.createElement('div');
    sectionWrapper.classList.add('featurecards-section-wrapper');
    moveInstrumentation(sectionElement, sectionWrapper);
    sectionWrapper.append(sectionElement);
    rootDiv.append(sectionWrapper);
  }

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
