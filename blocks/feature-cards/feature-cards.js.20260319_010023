import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const titleWrapper = block.querySelector('.featureCards-text');
  const cards = block.querySelectorAll('a.featureCards-bolteSitare_cardSection');
  const featureCardSection = block.querySelector('.featureCards-feature_card--Section');

  const section = document.createElement('section');
  section.classList.add('feature-cards-section');

  if (titleWrapper) {
    const h1 = titleWrapper.querySelector('h1');
    if (h1) {
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('feature-cards-title');
      titleDiv.append(h1);
      moveInstrumentation(titleWrapper, titleDiv);
      section.append(titleDiv);
    }
  }

  if (cards.length > 0) {
    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('feature-cards-wrapper');

    cards.forEach((card) => {
      const cardLink = document.createElement('a');
      cardLink.classList.add('feature-card');
      cardLink.href = card.href;
      if (card.target) {
        cardLink.target = card.target;
      }
      if (card.title) {
        cardLink.title = card.title;
      }

      const imgWrapper = card.querySelector('.featureCards-bolteSitare_cardSection--img');
      const img = imgWrapper ? imgWrapper.querySelector('img') : null;
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        cardLink.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
        moveInstrumentation(imgWrapper, picture);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('feature-card-content');

      const title = card.querySelector('.featureCards-bolteSitare_cardSection--title');
      if (title) {
        const h2 = document.createElement('h2');
        h2.textContent = title.textContent;
        contentWrapper.append(h2);
        moveInstrumentation(title, h2);
      }

      const description = card.querySelector('.featureCards-bolteSitare_cardSection--text');
      if (description) {
        const p = document.createElement('p');
        p.textContent = description.textContent;
        contentWrapper.append(p);
        moveInstrumentation(description, p);
      }

      const button = card.querySelector('.featureCards-bolteSitare_cardSection--btn');
      if (button) {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-container');
        const buttonLink = document.createElement('a');
        buttonLink.href = card.href;
        buttonLink.textContent = button.textContent;
        buttonDiv.append(buttonLink);
        contentWrapper.append(buttonDiv);
        moveInstrumentation(button, buttonLink);
      }

      cardLink.append(contentWrapper);
      cardsWrapper.append(cardLink);
      moveInstrumentation(card, cardLink);
    });
    section.append(cardsWrapper);
  }

  if (featureCardSection) {
    const featureCardLink = featureCardSection.querySelector('a');
    if (featureCardLink) {
      const featureCardDiv = document.createElement('div');
      featureCardDiv.classList.add('feature-card-large');
      featureCardDiv.href = featureCardLink.href;
      if (featureCardLink.title) {
        featureCardDiv.title = featureCardLink.title;
      }

      const imgWrapper = featureCardLink.querySelector('.featureCards-feature_card--image');
      const img = imgWrapper ? imgWrapper.querySelector('img') : null;
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        featureCardDiv.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
        moveInstrumentation(imgWrapper, picture);
      }

      const textContentDiv = document.createElement('div');
      textContentDiv.classList.add('feature-card-large-content');

      const title = featureCardLink.querySelector('.featureCards-feature_card--title');
      if (title) {
        const h2 = document.createElement('h2');
        h2.textContent = title.textContent;
        textContentDiv.append(h2);
        moveInstrumentation(title, h2);
      }

      const description = featureCardLink.querySelector('.featureCards-feature_card--desc');
      if (description) {
        const p = document.createElement('p');
        p.textContent = description.textContent;
        textContentDiv.append(p);
        moveInstrumentation(description, p);
      }

      const buttonContainer = featureCardLink.querySelector('.featureCards-redirected_btn');
      if (buttonContainer) {
        const button = buttonContainer.querySelector('button');
        if (button) {
          const buttonDiv = document.createElement('div');
          buttonDiv.classList.add('button-container');
          const buttonLink = document.createElement('a');
          buttonLink.href = featureCardLink.href;
          buttonLink.textContent = 'Explore'; // Default text if not available
          buttonDiv.append(buttonLink);
          textContentDiv.append(buttonDiv);
          moveInstrumentation(button, buttonLink);
        }
      }

      featureCardDiv.append(textContentDiv);
      section.append(featureCardDiv);
      moveInstrumentation(featureCardSection, featureCardDiv);
    }
  }

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
