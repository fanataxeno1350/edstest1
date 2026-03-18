import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('featureCards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('featureCards-title-wrapper');
  const titleContent = block.querySelector('.featureCards-cmp-text');
  if (titleContent) {
    titleWrapper.append(titleContent);
    moveInstrumentation(titleContent, titleWrapper);
  }
  rootDiv.append(titleWrapper);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featureCards-cards-wrapper');

  const featureCards = block.querySelectorAll('section.featureCards-feature_card--Section');

  featureCards.forEach((card) => {
    const cardLink = card.querySelector('a');
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('featureCards-card');
    if (cardLink) {
      cardWrapper.href = cardLink.href;
      cardWrapper.title = cardLink.title;
      if (cardLink.target) {
        cardWrapper.target = cardLink.target;
      }
      if (cardLink.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = cardLink.dataset.ctaLabel;
      }
      cardWrapper.classList.add('d-flex', 'flex-column', 'analytics_cta_click', 'text-decoration-none');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featureCards-feature_card--image', 'w-100', 'pb-4');
      const img = card.querySelector('.featureCards-feature_card--image img');
      if (img) {
        imageWrapper.append(createOptimizedPicture(img.src, img.alt));
        moveInstrumentation(img, imageWrapper);
      }
      cardWrapper.append(imageWrapper);

      const textContentWrapper = document.createElement('div');
      textContentWrapper.classList.add('text-center');

      const title = card.querySelector('.featureCards-feature_card--title');
      if (title) {
        textContentWrapper.append(title);
        moveInstrumentation(title, textContentWrapper);
      }

      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('pb-5');
      const description = card.querySelector('.featureCards-feature_card--desc');
      if (description) {
        descriptionWrapper.append(description);
        moveInstrumentation(description, descriptionWrapper);
      }
      textContentWrapper.append(descriptionWrapper);

      cardWrapper.append(textContentWrapper);
      cardsWrapper.append(cardWrapper);
      moveInstrumentation(card, cardWrapper);
    }
  });

  rootDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
