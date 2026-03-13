import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-container');

  const heading = block.querySelector('[data-aue-prop="heading"]') || block.querySelector('h2');
  if (heading) {
    const headingWrapper = document.createElement('h2');
    headingWrapper.classList.add('cards-heading');
    headingWrapper.append(...heading.childNodes);
    moveInstrumentation(heading, headingWrapper);
    cardsContainer.append(headingWrapper);
  }

  const subHeading = block.querySelector('[data-aue-prop="subHeading"]') || block.querySelector('p');
  if (subHeading) {
    const subHeadingWrapper = document.createElement('p');
    subHeadingWrapper.classList.add('cards-sub-heading');
    subHeadingWrapper.append(...subHeading.childNodes);
    moveInstrumentation(subHeading, subHeadingWrapper);
    cardsContainer.append(subHeadingWrapper);
  }

  const cardItems = block.querySelectorAll('[data-aue-model="card"]');
  if (cardItems.length > 0) {
    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('cards-wrapper');

    cardItems.forEach((cardNode) => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card-item');

      const image = cardNode.querySelector('[data-aue-prop="image"]');
      if (image) {
        const picture = createOptimizedPicture(image.src, image.alt);
        cardDiv.append(picture);
        moveInstrumentation(image, picture);
      }

      const icon = cardNode.querySelector('[data-aue-prop="icon"]');
      if (icon) {
        const iconImg = document.createElement('img');
        iconImg.src = icon.src;
        iconImg.alt = icon.alt;
        iconImg.classList.add('card-icon');
        cardDiv.append(iconImg);
        moveInstrumentation(icon, iconImg);
      }

      cardsWrapper.append(cardDiv);
      moveInstrumentation(cardNode, cardDiv);
    });
    cardsContainer.append(cardsWrapper);
  }

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]') || block.querySelector('.diy-cards-button a');
  if (ctaLink) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('cards-cta');
    const link = document.createElement('a');
    link.href = ctaLink.href;
    link.textContent = ctaLink.textContent.trim();
    if (ctaLink.target) {
      link.target = ctaLink.target;
    }
    ctaWrapper.append(link);
    moveInstrumentation(ctaLink, ctaWrapper);
    cardsContainer.append(ctaWrapper);
  }

  block.textContent = '';
  block.append(cardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}