import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('rs-cards-rs-cards');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('rs-cards-row');
  mainDiv.append(rowDiv);

  [...block.children].forEach((row) => {
    // Each row in the authored block corresponds to a card item
    const cardWrapperDiv = document.createElement('div');
    cardWrapperDiv.classList.add('rs-cards-col-xl-4', 'rs-cards-col-lg-6', 'rs-cards-pb-md-0', 'rs-cards-pb-4', 'rs-cards-row-gap-4', 'rs-cards-koi-rscard-padding');
    moveInstrumentation(row, cardWrapperDiv);

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('rs-cards-card', 'rs-cards-rs-card');

    const cells = [...row.children];

    // Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('rs-cards-w-100', 'rs-cards-kitchens-image');
        // Transfer instrumentation from the original img to the optimized img
        moveInstrumentation(img, picture.querySelector('img'));
        cardDiv.append(picture);
      }
    }

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('rs-cards-card-body');

    // Title
    const titleCell = cells[1];
    if (titleCell) {
      const h5Title = document.createElement('h5');
      h5Title.classList.add('rs-cards-blog-card-title');
      h5Title.textContent = titleCell.textContent.trim();
      moveInstrumentation(titleCell, h5Title);
      cardBodyDiv.append(h5Title);
    }

    // Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const h5Description = document.createElement('h5');
      h5Description.classList.add('rs-cards-card-title');
      // The description is expected to be a rich text, so append its children
      [...descriptionCell.children].forEach((child) => {
        h5Description.append(child.cloneNode(true));
      });
      moveInstrumentation(descriptionCell, h5Description);
      cardBodyDiv.append(h5Description);
    }

    cardDiv.append(cardBodyDiv);
    cardWrapperDiv.append(cardDiv);
    rowDiv.append(cardWrapperDiv);
  });

  const tabParaDiv = document.createElement('div');
  tabParaDiv.classList.add('rs-cards-tab-para');
  rowDiv.append(tabParaDiv);

  block.textContent = '';
  block.append(mainDiv);
}
