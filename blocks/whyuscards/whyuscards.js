import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const whyuscardsContainer = document.createElement('div');
  whyuscardsContainer.className = 'whyuscards-container';

  const whyuscardsRow = document.createElement('div');
  whyuscardsRow.className = 'whyuscards-row';

  const cards = [...block.children];

  cards.forEach((card) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'whyuscards-col-xl-4 whyuscards-col-lg-6 whyuscards-pb-md-0 whyuscards-pb-4 whyuscards-row-gap-4 whyuscards-koi-rscard-padding';

    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'whyuscards-card whyuscards-rs-card';

    const imageField = card.querySelector('[data-aue-prop="image"]');
    let picture;
    if (imageField) {
      const img = imageField.querySelector('img');
      if (img) {
        picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        picture.querySelector('img').className = 'whyuscards-w-100 whyuscards-kitchens-image';
        cardWrapper.append(picture);
        moveInstrumentation(imageField, picture);
      }
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'whyuscards-card-body';

    const titleField = card.querySelector('[data-aue-prop="title"]');
    if (titleField) {
      const titleElement = document.createElement('h5');
      titleElement.className = 'whyuscards-blog-card-title';
      titleElement.textContent = titleField.textContent.trim();
      cardBody.append(titleElement);
      moveInstrumentation(titleField, titleElement);
    }

    const descriptionField = card.querySelector('[data-aue-prop="description"]');
    if (descriptionField) {
      const descriptionElement = document.createElement('h5');
      descriptionElement.className = 'whyuscards-card-title';
      const p = descriptionField.querySelector('p');
      if (p) {
        descriptionElement.append(p);
      } else {
        descriptionElement.textContent = descriptionField.textContent.trim();
      }
      cardBody.append(descriptionElement);
      moveInstrumentation(descriptionField, descriptionElement);
    }

    cardWrapper.append(cardBody);
    colDiv.append(cardWrapper);
    whyuscardsRow.append(colDiv);
    moveInstrumentation(card, colDiv);
  });

  whyuscardsContainer.append(whyuscardsRow);

  block.textContent = '';
  block.append(whyuscardsContainer);
  block.className = `whyuscards block`;
  block.dataset.blockStatus = 'loaded';
}
