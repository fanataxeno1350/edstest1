import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('feature-cards-section');

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('feature-cards-heading-wrapper');
  const authoredHeading = block.querySelector('.featurecards-featureCards-text h1');
  if (authoredHeading) {
    headingWrapper.append(authoredHeading);
    moveInstrumentation(authoredHeading, headingWrapper);
  }
  rootDiv.append(headingWrapper);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('feature-cards-wrapper');

  const featureCards = block.querySelectorAll('[data-aue-model="featureCard"]');
  featureCards.forEach((cardNode) => {
    const cardLink = cardNode.querySelector('a');
    const linkHref = cardLink ? cardLink.href : '#';
    const linkTitle = cardLink ? cardLink.title : '';
    const linkTarget = cardLink ? cardLink.target : '';

    const cardContainer = document.createElement('a');
    cardContainer.classList.add('feature-card-item');
    cardContainer.href = linkHref;
    cardContainer.title = linkTitle;
    if (linkTarget) {
      cardContainer.target = linkTarget;
    }

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('feature-card-image');
    const authoredImage = cardNode.querySelector('img[data-aue-prop="image"]');
    if (authoredImage) {
      const picture = createOptimizedPicture(authoredImage.src, authoredImage.alt);
      imageDiv.append(picture);
      moveInstrumentation(authoredImage, imageDiv);
    } else {
      // Fallback for image if data-aue-prop is missing but img exists
      const fallbackImage = cardNode.querySelector('img');
      if (fallbackImage) {
        const picture = createOptimizedPicture(fallbackImage.src, fallbackImage.alt);
        imageDiv.append(picture);
        moveInstrumentation(fallbackImage, imageDiv);
      }
    }
    cardContainer.append(imageDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('feature-card-content');

    const title = cardNode.querySelector('[data-aue-prop="title"]');
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title.textContent;
      contentDiv.append(h2);
      moveInstrumentation(title, h2);
    }

    const description = cardNode.querySelector('[data-aue-prop="description"]');
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent;
      contentDiv.append(p);
      moveInstrumentation(description, p);
    }

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('feature-card-button');
    const authoredButton = cardNode.querySelector('button');
    if (authoredButton) {
      const buttonLink = document.createElement('a');
      buttonLink.href = linkHref;
      buttonLink.textContent = authoredButton.textContent;
      buttonLink.classList.add('button'); // Apply default button class
      buttonDiv.append(buttonLink);
      moveInstrumentation(authoredButton, buttonLink);
    }
    contentDiv.append(buttonDiv);
    cardContainer.append(contentDiv);

    cardsWrapper.append(cardContainer);
    moveInstrumentation(cardNode, cardContainer);
  });

  rootDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
