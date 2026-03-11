import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('feature-cards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('feature-cards-title-wrapper');
  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    titleWrapper.append(titleElement);
    moveInstrumentation(titleElement, titleWrapper);
  } else {
    const h1 = block.querySelector('h1');
    if (h1) {
      titleWrapper.append(h1);
      moveInstrumentation(h1, titleWrapper);
    }
  }
  rootDiv.append(titleWrapper);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('feature-cards-cards-wrapper');

  const cardItems = block.querySelectorAll('[data-aue-model="card"]');
  cardItems.forEach((cardNode) => {
    const cardLink = cardNode.querySelector('a');
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('feature-card');

    if (cardLink) {
      const link = document.createElement('a');
      link.href = cardLink.href;
      if (cardLink.target) {
        link.target = cardLink.target;
      }
      if (cardLink.title) {
        link.title = cardLink.title;
      }
      link.classList.add('feature-card-link');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('feature-card-image');
      const img = cardNode.querySelector('[data-aue-prop="image"]');
      if (img) {
        imageWrapper.append(createOptimizedPicture(img.src, img.alt));
        moveInstrumentation(img, imageWrapper);
      }
      link.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('feature-card-content');

      const heading = cardNode.querySelector('[data-aue-prop="heading"]');
      if (heading) {
        const h2 = document.createElement('h2');
        h2.classList.add('feature-card-heading');
        h2.append(...heading.childNodes);
        contentWrapper.append(h2);
        moveInstrumentation(heading, h2);
      }

      const description = cardNode.querySelector('[data-aue-prop="description"]');
      if (description) {
        const p = document.createElement('p');
        p.classList.add('feature-card-description');
        p.append(...description.childNodes);
        contentWrapper.append(p);
        moveInstrumentation(description, p);
      }

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('feature-card-button-container');
      const button = cardNode.querySelector('.featurecards-featureCards-bolteSitare_cardSection--btn');
      if (button) {
        const buttonLink = document.createElement('a');
        buttonLink.href = cardLink.href;
        if (cardLink.target) {
          buttonLink.target = cardLink.target;
        }
        buttonLink.textContent = button.textContent.trim();
        buttonLink.classList.add('button');
        buttonContainer.append(buttonLink);
        moveInstrumentation(button, buttonContainer);
      }
      contentWrapper.append(buttonContainer);

      link.append(contentWrapper);
      cardDiv.append(link);
      moveInstrumentation(cardLink, link);
    } else {
      // Fallback for cards without a direct link wrapper
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('feature-card-image');
      const img = cardNode.querySelector('[data-aue-prop="image"]');
      if (img) {
        imageWrapper.append(createOptimizedPicture(img.src, img.alt));
        moveInstrumentation(img, imageWrapper);
      }
      cardDiv.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('feature-card-content');

      const heading = cardNode.querySelector('[data-aue-prop="heading"]');
      if (heading) {
        const h2 = document.createElement('h2');
        h2.classList.add('feature-card-heading');
        h2.append(...heading.childNodes);
        contentWrapper.append(h2);
        moveInstrumentation(heading, h2);
      }

      const description = cardNode.querySelector('[data-aue-prop="description"]');
      if (description) {
        const p = document.createElement('p');
        p.classList.add('feature-card-description');
        p.append(...description.childNodes);
        contentWrapper.append(p);
        moveInstrumentation(description, p);
      }

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('feature-card-button-container');
      const button = cardNode.querySelector('.featurecards-featureCards-bolteSitare_cardSection--btn');
      if (button) {
        // If there's no overall card link, the button itself might be a link
        const buttonLink = document.createElement('a');
        const authoredLink = cardNode.querySelector('[data-aue-prop="link"]');
        if (authoredLink) {
          buttonLink.href = authoredLink.href;
          if (authoredLink.target) {
            buttonLink.target = authoredLink.target;
          }
          moveInstrumentation(authoredLink, buttonLink);
        } else if (cardNode.closest('a')) {
          buttonLink.href = cardNode.closest('a').href;
          if (cardNode.closest('a').target) {
            buttonLink.target = cardNode.closest('a').target;
          }
        }
        buttonLink.textContent = button.textContent.trim();
        buttonLink.classList.add('button');
        buttonContainer.append(buttonLink);
        moveInstrumentation(button, buttonContainer);
      }
      contentWrapper.append(buttonContainer);
      cardDiv.append(contentWrapper);
    }

    cardsWrapper.append(cardDiv);
    moveInstrumentation(cardNode, cardDiv);
  });

  rootDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
