import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const whyUsCardsContainer = document.createElement('div');
  whyUsCardsContainer.className = 'whyuscards-container';

  const whyUsCardsRow = document.createElement('div');
  whyUsCardsRow.className = 'whyuscards-row';

  const cards = [...block.children];
  cards.forEach((card) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'whyuscards-col-xl-4 whyuscards-col-lg-6 whyuscards-pb-md-0 whyuscards-pb-4 whyuscards-row-gap-4 whyuscards-koi-rscard-padding';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'whyuscards-card whyuscards-rs-card';

    const imageField = card.querySelector('[data-aue-prop="image"]');
    let picture;
    if (imageField) {
      picture = createOptimizedPicture(imageField.src, imageField.alt);
      picture.querySelector('img').className = 'whyuscards-w-100 whyuscards-kitchens-image';
      cardDiv.append(picture);
      moveInstrumentation(imageField, picture);
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'whyuscards-card-body';

    const titleField = card.querySelector('[data-aue-prop="title"]');
    if (titleField) {
      const h5Title = document.createElement('h5');
      h5Title.className = 'whyuscards-blog-card-title';
      h5Title.append(...titleField.childNodes);
      cardBody.append(h5Title);
      moveInstrumentation(titleField, h5Title);
    } else {
      const h5Title = card.querySelector('h5:first-of-type');
      if (h5Title) {
        h5Title.className = 'whyuscards-blog-card-title';
        cardBody.append(h5Title);
      }
    }

    const descriptionField = card.querySelector('[data-aue-prop="description"]');
    if (descriptionField) {
      const h5Description = document.createElement('h5');
      h5Description.className = 'whyuscards-card-title';
      h5Description.append(...descriptionField.childNodes);
      cardBody.append(h5Description);
      moveInstrumentation(descriptionField, h5Description);
    } else {
      const h5Description = card.querySelector('h5:last-of-type');
      if (h5Description) {
        h5Description.className = 'whyuscards-card-title';
        cardBody.append(h5Description);
      }
    }

    cardDiv.append(cardBody);
    cardWrapper.append(cardDiv);
    whyUsCardsRow.append(cardWrapper);
    moveInstrumentation(card, cardWrapper);
  });

  whyUsCardsContainer.append(whyUsCardsRow);

  block.textContent = '';
  block.append(whyUsCardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}