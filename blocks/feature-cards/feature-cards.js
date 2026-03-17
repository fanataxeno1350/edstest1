import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContent = block.querySelector('[data-aue-prop="header"]');
  const cardsContent = block.querySelectorAll('[data-aue-model="featureCard"]');

  const section = document.createElement('section');
  section.classList.add('featureCards-feature_card--Section', 'featureCards-feature_card', 'mx-auto');

  if (headerContent) {
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('featureCards-cmp-text');
    headerDiv.append(headerContent);
    moveInstrumentation(headerContent, headerDiv);
    block.prepend(headerDiv);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featureCards-cards-wrapper');

  cardsContent.forEach((cardContent) => {
    const link = cardContent.querySelector('a');
    if (link) {
      const cardLink = document.createElement('a');
      cardLink.classList.add('d-flex', 'flex-column', 'analytics_cta_click', 'text-decoration-none');
      cardLink.href = link.href;
      cardLink.title = link.title;
      if (link.target) {
        cardLink.target = link.target;
      }
      if (link.dataset.ctaLabel) {
        cardLink.dataset.ctaLabel = link.dataset.ctaLabel;
      }

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('featureCards-feature_card--image', 'w-100', 'pb-4');
      const image = cardContent.querySelector('img');
      if (image) {
        cardImageWrapper.append(createOptimizedPicture(image.src, image.alt));
        moveInstrumentation(image, cardImageWrapper);
      }

      const textContentWrapper = document.createElement('div');
      textContentWrapper.classList.add('text-center');

      const title = cardContent.querySelector('[data-aue-prop="title"]');
      if (title) {
        const titleElement = document.createElement('h2');
        titleElement.classList.add('featureCards-feature_card--title', 'boing--text__heading-1');
        titleElement.append(title);
        moveInstrumentation(title, titleElement);
        textContentWrapper.append(titleElement);
      }

      const description = cardContent.querySelector('[data-aue-prop="description"]');
      if (description) {
        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('pb-5');
        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('featureCards-feature_card--desc', 'boing--text__body-2', 'text-boing-dark');
        descriptionElement.append(description);
        moveInstrumentation(description, descriptionElement);
        descriptionWrapper.append(descriptionElement);
        textContentWrapper.append(descriptionWrapper);
      }

      cardLink.append(cardImageWrapper, textContentWrapper);
      moveInstrumentation(cardContent, cardLink);
      cardsWrapper.append(cardLink);
    }
  });

  block.textContent = '';
  block.append(cardsWrapper);
  block.className = 'feature-cards block';
  block.dataset.blockStatus = 'loaded';
}
