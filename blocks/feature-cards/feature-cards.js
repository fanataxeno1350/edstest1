import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.className = 'feature-cards-container';

  const textDiv = block.querySelector('.featureCards-text');
  if (textDiv) {
    const headerDiv = document.createElement('div');
    headerDiv.className = 'feature-cards-header';
    const h1 = textDiv.querySelector('h1');
    if (h1) {
      headerDiv.append(h1);
      moveInstrumentation(textDiv, headerDiv);
    }
    rootDiv.append(headerDiv);
  }

  const cardSection = document.createElement('div');
  cardSection.className = 'feature-cards-section';

  const featureCardElements = block.querySelectorAll('[data-aue-model="featureCard"]');

  featureCardElements.forEach((cardElement) => {
    const cardLink = document.createElement('a');
    cardLink.className = 'feature-card-item';

    const link = cardElement.querySelector('[data-aue-prop="link"]');
    if (link) {
      cardLink.href = link.href;
      cardLink.title = link.title;
      if (link.target) {
        cardLink.target = link.target;
      }
    }

    const imageDiv = document.createElement('div');
    imageDiv.className = 'feature-card-image';
    const img = cardElement.querySelector('[data-aue-prop="image"]');
    if (img) {
      imageDiv.append(createOptimizedPicture(img.src, img.alt));
      moveInstrumentation(img, imageDiv);
    }
    cardLink.append(imageDiv);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'feature-card-content';

    const titleElement = cardElement.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.className = 'feature-card-title';
      h2.innerHTML = titleElement.innerHTML;
      contentDiv.append(h2);
      moveInstrumentation(titleElement, h2);
    }

    const descriptionElement = cardElement.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.className = 'feature-card-description';
      p.innerHTML = descriptionElement.innerHTML;
      contentDiv.append(p);
      moveInstrumentation(descriptionElement, p);
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'feature-card-button-container';
    const button = cardElement.querySelector('.featureCards-bolteSitare_cardSection--btn');
    if (button) {
      const buttonLink = document.createElement('a');
      buttonLink.className = 'feature-card-button';
      buttonLink.textContent = button.textContent;
      if (link) {
        buttonLink.href = link.href;
        if (link.target) {
          buttonLink.target = link.target;
        }
      }
      buttonContainer.append(buttonLink);
      moveInstrumentation(button, buttonLink);
    }
    contentDiv.append(buttonContainer);

    cardLink.append(contentDiv);
    cardSection.append(cardLink);
    moveInstrumentation(cardElement, cardLink);
  });

  rootDiv.append(cardSection);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
