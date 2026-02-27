import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const whyuscardsContainer = document.createElement('div');
  whyuscardsContainer.classList.add('whyuscards-container');

  const whyuscardsRow = document.createElement('div');
  whyuscardsRow.classList.add('whyuscards-row');

  [...block.children].forEach((row) => {
    moveInstrumentation(row, whyuscardsRow); // Transfer instrumentation to the row container

    [...row.children].forEach((cell) => {
      const whyuscardsCol = document.createElement('div');
      whyuscardsCol.classList.add('whyuscards-col');
      moveInstrumentation(cell, whyuscardsCol); // Transfer instrumentation to the column container

      const whyuscardsCard = document.createElement('div');
      whyuscardsCard.classList.add('whyuscards-card');

      const img = cell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.classList.add('whyuscards-image');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        whyuscardsCard.append(optimizedPic);
      }

      const whyuscardsCardBody = document.createElement('div');
      whyuscardsCardBody.classList.add('whyuscards-card-body');

      const h5Elements = cell.querySelectorAll('h5');
      if (h5Elements.length > 0) {
        const blogCardTitle = document.createElement('h5');
        blogCardTitle.classList.add('whyuscards-blog-card-title');
        blogCardTitle.innerHTML = h5Elements[0].innerHTML; // Use innerHTML to preserve potential nested elements like <p>
        moveInstrumentation(h5Elements[0], blogCardTitle);
        whyuscardsCardBody.append(blogCardTitle);
      }

      if (h5Elements.length > 1) {
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('whyuscards-card-title');
        cardTitle.innerHTML = h5Elements[1].innerHTML; // Use innerHTML to preserve potential nested elements like <p>
        moveInstrumentation(h5Elements[1], cardTitle);
        whyuscardsCardBody.append(cardTitle);
      }

      whyuscardsCard.append(whyuscardsCardBody);
      whyuscardsCol.append(whyuscardsCard);
      whyuscardsRow.append(whyuscardsCol);
    });
  });

  whyuscardsContainer.append(whyuscardsRow);
  block.textContent = '';
  block.append(whyuscardsContainer);
}
