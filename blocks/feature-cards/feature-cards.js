import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('feature-cards-container');

  const textContent = block.querySelector('.featurecards-featureCards-text');
  if (textContent) {
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('feature-cards-text-wrapper');
    const h1 = textContent.querySelector('h1');
    if (h1) {
      textWrapper.append(h1);
      moveInstrumentation(textContent, textWrapper);
    }
    rootDiv.append(textWrapper);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('feature-cards-cards-wrapper');

  const authoredCards = block.querySelectorAll('[data-aue-model="featureCard"]');

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
      if (cardLink.dataset.title) {
        cardAnchor.dataset.title = cardLink.dataset.title;
      }

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('feature-card-image');
      const img = cardNode.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        imageWrapper.append(picture);
        moveInstrumentation(img, imageWrapper);
      }
      cardAnchor.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('feature-card-content');

      const title = cardNode.querySelector('h2');
      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title.textContent;
        contentWrapper.append(h3);
        moveInstrumentation(title, h3);
      }

      const description = cardNode.querySelector('p');
      if (description) {
        const p = document.createElement('p');
        p.innerHTML = description.innerHTML;
        contentWrapper.append(p);
        moveInstrumentation(description, p);
      }

      const button = cardNode.querySelector('button');
      if (button) {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('feature-card-button');
        const buttonText = document.createElement('span');
        buttonText.textContent = button.textContent;
        buttonDiv.append(buttonText);
        contentWrapper.append(buttonDiv);
        moveInstrumentation(button, buttonDiv);
      }

      cardAnchor.append(contentWrapper);
      cardsWrapper.append(cardAnchor);
      moveInstrumentation(cardNode, cardAnchor);
    }
  });

  rootDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
