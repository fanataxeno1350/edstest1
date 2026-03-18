import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const heading = block.querySelector('h1');
  const cards = block.querySelectorAll('a.featureCards-bolteSitare_cardSection');

  const section = document.createElement('section');
  section.className = 'feature-cards-section';

  if (heading) {
    const headingWrapper = document.createElement('div');
    headingWrapper.className = 'feature-cards-heading-wrapper';
    headingWrapper.append(heading);
    moveInstrumentation(block.querySelector('div:first-child'), headingWrapper);
    section.append(headingWrapper);
  }

  if (cards.length > 0) {
    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'feature-cards-wrapper';

    cards.forEach((card) => {
      const cardLink = card.querySelector('a');
      const cardItem = document.createElement('div');
      cardItem.className = 'feature-card-item';

      const imageWrapper = card.querySelector('.featureCards-bolteSitare_cardSection--img');
      const img = imageWrapper ? imageWrapper.querySelector('img') : null;
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        cardItem.append(picture);
        moveInstrumentation(img, picture);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'feature-card-content';

      const title = card.querySelector('.featureCards-bolteSitare_cardSection--title');
      if (title) {
        contentWrapper.append(title);
        moveInstrumentation(title, contentWrapper);
      }

      const description = card.querySelector('.featureCards-bolteSitare_cardSection--text');
      if (description) {
        contentWrapper.append(description);
        moveInstrumentation(description, contentWrapper);
      }

      const button = card.querySelector('.featureCards-bolteSitare_cardSection--btn');
      if (button) {
        const buttonLink = document.createElement('a');
        buttonLink.href = card.href;
        buttonLink.className = 'button primary';
        buttonLink.textContent = button.textContent;
        contentWrapper.append(buttonLink);
        moveInstrumentation(button, buttonLink);
      }

      cardItem.append(contentWrapper);
      const finalCardLink = document.createElement('a');
      finalCardLink.href = card.href;
      if (card.target) {
        finalCardLink.target = card.target;
      }
      finalCardLink.append(cardItem);
      cardsWrapper.append(finalCardLink);
      moveInstrumentation(card, finalCardLink);
    });
    section.append(cardsWrapper);
  }

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
