import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const whyUsCardsContainer = document.createElement('div');
  whyUsCardsContainer.className = 'whyuscards-container';

  const whyUsCardsRow = document.createElement('div');
  whyUsCardsRow.className = 'whyuscards-row';

  const cards = [...block.children];
  block.textContent = '';

  cards.forEach((card) => {
    const whyUsCardsCol = document.createElement('div');
    whyUsCardsCol.className = 'whyuscards-col-xl-4 whyuscards-col-lg-6 whyuscards-pb-md-0 whyuscards-pb-4 whyuscards-row-gap-4 whyuscards-koi-rscard-padding';

    const whyUsCardDiv = document.createElement('div');
    whyUsCardDiv.className = 'whyuscards-card whyuscards-rs-card';

    const imageElement = card.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        picture.querySelector('img').className = 'whyuscards-w-100 whyuscards-kitchens-image';
        whyUsCardDiv.append(picture);
        moveInstrumentation(imageElement, picture);
      } else {
        const fallbackImg = card.querySelector('a[href$=".webp"], a[href$=".jpeg"], a[href$=".jpg"], a[href$=".png"]');
        if (fallbackImg) {
          const picture = createOptimizedPicture(fallbackImg.href, '', false, [{ width: '750' }]);
          picture.querySelector('img').className = 'whyuscards-w-100 whyuscards-kitchens-image';
          whyUsCardDiv.append(picture);
          moveInstrumentation(fallbackImg, picture);
        }
      }
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'whyuscards-card-body';

    const titleElement = card.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const h5Title = document.createElement('h5');
      h5Title.className = 'whyuscards-blog-card-title';
      h5Title.append(...titleElement.childNodes);
      cardBody.append(h5Title);
      moveInstrumentation(titleElement, h5Title);
    } else {
      const fallbackTitle = card.querySelector('h1, h2, h3, h4, h5, h6');
      if (fallbackTitle) {
        const h5Title = document.createElement('h5');
        h5Title.className = 'whyuscards-blog-card-title';
        h5Title.append(...fallbackTitle.childNodes);
        cardBody.append(h5Title);
        moveInstrumentation(fallbackTitle, h5Title);
      }
    }

    const descriptionElement = card.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const h5Description = document.createElement('h5');
      h5Description.className = 'whyuscards-card-title';
      h5Description.append(...descriptionElement.childNodes);
      cardBody.append(h5Description);
      moveInstrumentation(descriptionElement, h5Description);
    } else {
      const fallbackDescription = card.querySelector('p');
      if (fallbackDescription) {
        const h5Description = document.createElement('h5');
        h5Description.className = 'whyuscards-card-title';
        h5Description.append(...fallbackDescription.childNodes);
        cardBody.append(h5Description);
        moveInstrumentation(fallbackDescription, h5Description);
      }
    }

    whyUsCardDiv.append(cardBody);
    whyUsCardsCol.append(whyUsCardDiv);
    whyUsCardsRow.append(whyUsCardsCol);
    moveInstrumentation(card, whyUsCardsCol);
  });

  whyUsCardsContainer.append(whyUsCardsRow);
  block.append(whyUsCardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
