import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.className = 'featurecards-container';

  const titleContainer = block.querySelector('.featurecards-featureCards-text');
  if (titleContainer) {
    const h1 = titleContainer.querySelector('h1');
    if (h1) {
      const newTitleDiv = document.createElement('div');
      newTitleDiv.className = 'featurecards-title-container';
      newTitleDiv.append(h1);
      moveInstrumentation(titleContainer, newTitleDiv);
      rootDiv.append(newTitleDiv);
    }
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'featurecards-wrapper';

  const authoredCards = block.querySelectorAll('a.featurecards-featureCards-bolteSitare_cardSection');

  authoredCards.forEach((cardLink) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'featurecards-card';

    const imageDiv = cardLink.querySelector('.featurecards-featureCards-bolteSitare_cardSection--img');
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        cardDiv.append(picture);
        moveInstrumentation(img, picture);
        moveInstrumentation(imageDiv, cardDiv);
      }
    }

    const contentWrapper = cardLink.querySelector('.featurecards-featureCards-content-wrapper');
    if (contentWrapper) {
      const textContentDiv = document.createElement('div');
      textContentDiv.className = 'featurecards-card-text-content';

      const title = contentWrapper.querySelector('h2.featurecards-featureCards-bolteSitare_cardSection--title');
      if (title) {
        textContentDiv.append(title);
        moveInstrumentation(title, textContentDiv);
      }

      const description = contentWrapper.querySelector('p.featurecards-featureCards-bolteSitare_cardSection--text');
      if (description) {
        textContentDiv.append(description);
        moveInstrumentation(description, textContentDiv);
      }

      const button = contentWrapper.querySelector('button.featurecards-featureCards-bolteSitare_cardSection--btn');
      if (button) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'featurecards-card-button-container';
        const newLink = document.createElement('a');
        newLink.href = cardLink.href;
        newLink.textContent = button.textContent;
        newLink.className = 'featurecards-card-button';
        if (cardLink.target) {
          newLink.target = cardLink.target;
        }
        buttonContainer.append(newLink);
        moveInstrumentation(button, buttonContainer);
        textContentDiv.append(buttonContainer);
      }

      cardDiv.append(textContentDiv);
      moveInstrumentation(contentWrapper, cardDiv);
    }

    const newCardLink = document.createElement('a');
    newCardLink.href = cardLink.href;
    newCardLink.title = cardLink.title;
    newCardLink.className = 'featurecards-card-link';
    if (cardLink.target) {
      newCardLink.target = cardLink.target;
    }
    newCardLink.append(cardDiv);
    moveInstrumentation(cardLink, newCardLink);
    cardsWrapper.append(newCardLink);
  });

  rootDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
