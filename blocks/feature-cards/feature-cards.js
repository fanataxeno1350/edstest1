import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('feature-cards-container');

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('feature-cards-heading-wrapper');
  const authoredHeading = block.querySelector('[data-aue-prop="heading"]') || block.querySelector('h1');
  if (authoredHeading) {
    headingWrapper.append(authoredHeading);
    moveInstrumentation(authoredHeading, headingWrapper);
  }
  featureCardsContainer.append(headingWrapper);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('feature-cards-cards-wrapper');

  const featureCardItems = block.querySelectorAll('[data-aue-model="featureCard"]');
  featureCardItems.forEach((itemNode) => {
    const cardSection = document.createElement('section');
    cardSection.classList.add('feature-cards-d-block', 'feature-cards-feature_card--Section', 'feature-cards-feature_card', 'feature-cards-mx-auto');

    const linkElement = itemNode.querySelector('a');
    const cardLink = document.createElement('a');
    cardLink.classList.add('feature-cards-d-flex', 'feature-cards-flex-column', 'feature-cards-analytics_cta_click', 'feature-cards-text-decoration-none');
    if (linkElement) {
      cardLink.href = linkElement.href;
      cardLink.title = linkElement.title;
      if (linkElement.target) {
        cardLink.target = linkElement.target;
      }
      if (linkElement.dataset.ctaLabel) {
        cardLink.dataset.ctaLabel = linkElement.dataset.ctaLabel;
      }
    }

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('feature-cards-feature_card--image', 'feature-cards-w-100', 'feature-cards-pb-4');
    const authoredImage = itemNode.querySelector('[data-aue-prop="image"]');
    if (authoredImage) {
      const picture = createOptimizedPicture(authoredImage.src, authoredImage.alt);
      imageDiv.append(picture);
      moveInstrumentation(authoredImage, imageDiv);
    }
    cardLink.append(imageDiv);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.classList.add('feature-cards-text-center');

    const titleElement = itemNode.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.classList.add('feature-cards-feature_card--title', 'feature-cards-boing--text__heading-1');
      h2.append(...titleElement.childNodes);
      textCenterDiv.append(h2);
      moveInstrumentation(titleElement, h2);
    }

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('feature-cards-pb-5');
    const authoredDescription = itemNode.querySelector('[data-aue-prop="description"]') || itemNode.querySelector('p');
    if (authoredDescription) {
      const p = document.createElement('p');
      p.classList.add('feature-cards-feature_card--desc', 'feature-cards-boing--text__body-2', 'feature-cards-text-boing-dark');
      p.append(...authoredDescription.childNodes);
      descriptionDiv.append(p);
      moveInstrumentation(authoredDescription, p);
    }
    textCenterDiv.append(descriptionDiv);

    // The button is present in the authored HTML but is hidden and its content is an SVG path.
    // The design doesn't show a button, so we'll omit it from the final DOM.

    cardLink.append(textCenterDiv);
    cardSection.append(cardLink);
    cardsWrapper.append(cardSection);
    moveInstrumentation(itemNode, cardSection);
  });

  featureCardsContainer.append(cardsWrapper);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.classList.add('feature-cards', 'block');
  block.dataset.blockStatus = 'loaded';
}
