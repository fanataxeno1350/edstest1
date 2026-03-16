import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('feature-cards-wrapper');

  const headingContainer = document.createElement('div');
  headingContainer.classList.add('feature-cards-heading-container');
  const authoredHeading = block.querySelector('.cmp-text h1');
  if (authoredHeading) {
    const h1 = document.createElement('h1');
    h1.innerHTML = authoredHeading.innerHTML;
    headingContainer.append(h1);
    moveInstrumentation(authoredHeading, h1);
  } else {
    const firstP = block.querySelector('p');
    if (firstP) {
      const h1 = document.createElement('h1');
      h1.innerHTML = firstP.innerHTML;
      headingContainer.append(h1);
      moveInstrumentation(firstP, h1);
    }
  }
  rootDiv.append(headingContainer);

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('feature-cards-container');

  const authoredCards = block.querySelectorAll('[data-aue-model="featureCard"]');

  authoredCards.forEach((cardNode) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('feature-card-item');

    const linkElement = cardNode.querySelector('a');
    const cardLink = document.createElement('a');
    if (linkElement) {
      cardLink.href = linkElement.href;
      cardLink.title = linkElement.title;
      if (linkElement.target) {
        cardLink.target = linkElement.target;
      }
      cardLink.classList.add('feature-card-link');
      moveInstrumentation(linkElement, cardLink);
    }

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('feature-card-image');
    const authoredImage = cardNode.querySelector('[data-aue-prop="image"]');
    if (authoredImage) {
      const picture = createOptimizedPicture(authoredImage.src, authoredImage.alt);
      imageDiv.append(picture);
      moveInstrumentation(authoredImage, picture);
    }
    cardLink.append(imageDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('feature-card-content');

    const titleElement = cardNode.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.innerHTML = titleElement.innerHTML;
      contentDiv.append(h2);
      moveInstrumentation(titleElement, h2);
    }

    const descriptionElement = cardNode.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.innerHTML = descriptionElement.innerHTML;
      contentDiv.append(p);
      moveInstrumentation(descriptionElement, p);
    }

    cardLink.append(contentDiv);
    cardWrapper.append(cardLink);
    cardsContainer.append(cardWrapper);

    moveInstrumentation(cardNode, cardWrapper);
  });

  rootDiv.append(cardsContainer);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `feature-cards block`;
  block.dataset.blockStatus = 'loaded';
}
