import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('featureCards-container');

  // Extract and move the heading
  const headingContainer = block.querySelector('div:first-child');
  if (headingContainer) {
    const headingDiv = document.createElement('div');
    headingDiv.classList.add('featureCards-heading-container');
    const heading = headingContainer.querySelector('.cmp-text h1');
    if (heading) {
      headingDiv.append(heading);
      moveInstrumentation(headingContainer, headingDiv);
      rootDiv.append(headingDiv);
    }
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featureCards-wrapper');

  const featureCards = block.querySelectorAll('[data-aue-model="featureCard"]');

  featureCards.forEach((cardNode) => {
    const link = cardNode.querySelector('a');
    if (!link) return;

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

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('featureCards-feature_card--image', 'w-100', 'pb-4');
    const img = cardNode.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      imageDiv.append(picture);
      moveInstrumentation(img, picture);
    }
    cardLink.append(imageDiv);

    const textContentDiv = document.createElement('div');
    textContentDiv.classList.add('text-center');

    const title = cardNode.querySelector('.featureCards-feature_card--title');
    if (title) {
      textContentDiv.append(title);
      moveInstrumentation(title, textContentDiv);
    }

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('pb-5');
    const description = cardNode.querySelector('.featureCards-feature_card--desc');
    if (description) {
      descriptionWrapper.append(description);
      moveInstrumentation(description, descriptionWrapper);
    }
    textContentDiv.append(descriptionWrapper);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('featureCards-redirected_btn', 'd-none');
    const button = cardNode.querySelector('.featureCards-arrow-icon-btn');
    if (button) {
      buttonDiv.append(button);
      moveInstrumentation(button, buttonDiv);
    }
    textContentDiv.append(buttonDiv);

    cardLink.append(textContentDiv);

    const section = document.createElement('section');
    section.classList.add('d-block', 'featureCards-feature_card--Section', 'featureCards-feature_card', 'mx-auto');
    section.append(cardLink);
    moveInstrumentation(cardNode, section);
    cardsWrapper.append(section);
  });

  rootDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.classList.add('feature-cards', 'block');
  block.dataset.blockStatus = 'loaded';
}