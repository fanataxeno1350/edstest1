import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-section-container';
  moveInstrumentation(block, cardsContainer);

  const cardsRow = document.createElement('div');
  cardsRow.className = 'cards-section-row';
  cardsContainer.append(cardsRow);

  [...block.children].forEach((row) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'cards-section-col-xl-4 cards-section-col-lg-6 cards-section-pb-md-0 cards-section-pb-4 cards-section-row-gap-4 cards-section-koi-rscard-padding';
    moveInstrumentation(row, cardWrapper);

    const card = document.createElement('div');
    card.className = 'cards-section-card cards-section-rs-card';
    cardWrapper.append(card);

    const imgCell = row.children[0];
    const titleCell = row.children[1];
    const descriptionCell = row.children[2];

    // Image
    const img = imgCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('cards-section-w-100', 'cards-section-kitchens-image');
      optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
      card.append(optimizedPic);
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'cards-section-card-body';
    card.append(cardBody);

    // Title
    if (titleCell) {
      const h5Title = document.createElement('h5');
      h5Title.className = 'cards-section-blog-card-title';
      h5Title.innerHTML = titleCell.innerHTML;
      cardBody.append(h5Title);
    }

    // Description
    if (descriptionCell) {
      const h5Description = document.createElement('h5');
      h5Description.className = 'cards-section-card-title';
      h5Description.innerHTML = descriptionCell.innerHTML;
      cardBody.append(h5Description);
    }

    cardsRow.append(cardWrapper);
  });

  const tabPara = document.createElement('div');
  tabPara.className = 'cards-section-tab-para';
  cardsContainer.append(tabPara);

  block.textContent = '';
  block.append(cardsContainer);
}
