import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('feature-cards-container');

  // Extract and append the heading
  const headingWrapper = block.querySelector('div:first-child > div:first-child');
  if (headingWrapper) {
    const heading = headingWrapper.querySelector('h1');
    if (heading) {
      const newHeadingWrapper = document.createElement('div');
      newHeadingWrapper.classList.add('feature-cards-heading');
      newHeadingWrapper.append(heading);
      moveInstrumentation(headingWrapper, newHeadingWrapper);
      featureCardsContainer.append(newHeadingWrapper);
    }
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('feature-cards-wrapper');

  const featureCardItems = block.querySelectorAll('section.featureCards-feature_card--Section');

  featureCardItems.forEach((cardItem) => {
    const cardLink = cardItem.querySelector('a');
    if (cardLink) {
      const card = document.createElement('a');
      card.classList.add('feature-card');
      card.href = cardLink.href;
      if (cardLink.target) {
        card.target = cardLink.target;
      }
      if (cardLink.title) {
        card.title = cardLink.title;
      }

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('feature-card-image');
      const img = cardLink.querySelector('img');
      if (img) {
        imageWrapper.append(createOptimizedPicture(img.src, img.alt));
        moveInstrumentation(img, imageWrapper);
      }
      card.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('feature-card-content');

      const title = cardLink.querySelector('.featureCards-feature_card--title');
      if (title) {
        const newTitle = document.createElement('h2');
        newTitle.textContent = title.textContent.trim();
        contentWrapper.append(newTitle);
        moveInstrumentation(title, newTitle);
      }

      const description = cardLink.querySelector('.featureCards-feature_card--desc');
      if (description) {
        const newDescription = document.createElement('p');
        newDescription.textContent = description.textContent.trim();
        contentWrapper.append(newDescription);
        moveInstrumentation(description, newDescription);
      }
      card.append(contentWrapper);
      cardsWrapper.append(card);
      moveInstrumentation(cardItem, card);
    }
  });

  featureCardsContainer.append(cardsWrapper);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = 'feature-cards block';
  block.dataset.blockStatus = 'loaded';
}