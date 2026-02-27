import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');
  moveInstrumentation(block, latestblogsWrapper);

  const latestblogsContainer = document.createElement('div');
  latestblogsContainer.classList.add('latestblogs-container', 'latestblogs-position-relative');
  latestblogsWrapper.append(latestblogsContainer);

  // First section: Heading, Description, CTA
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-section--first', 'latestblogs-text-white', 'latestblogs-text-center');
  latestblogsContainer.append(firstSection);

  const rows = [...block.children];

  // Extract header content from the first row
  if (rows.length > 0) {
    const headerRow = rows[0];
    const headerCells = [...headerRow.children];

    const heading = headerCells[0].querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      const h2 = document.createElement('h2');
      h2.classList.add('latestblogs-title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
      h2.textContent = heading.textContent;
      moveInstrumentation(heading, h2);
      firstSection.append(h2);
    }

    const description = headerCells[1].querySelector('p');
    if (description) {
      const pDesc = document.createElement('p');
      pDesc.classList.add('latestblogs-desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
      pDesc.textContent = description.textContent;
      moveInstrumentation(description, pDesc);
      firstSection.append(pDesc);
    }

    const ctaLink = headerCells[2].querySelector('a');
    if (ctaLink) {
      const btnWrapper = document.createElement('div');
      btnWrapper.classList.add('latestblogs-btnWrapper');
      const newCtaLink = document.createElement('a');
      newCtaLink.href = ctaLink.href;
      newCtaLink.title = ctaLink.title || ctaLink.textContent.trim();
      newCtaLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-btn', 'latestblogs-analytics_cta_click');
      newCtaLink.textContent = ctaLink.textContent.split('/content/dam')[0].trim(); // Remove image path if present
      moveInstrumentation(ctaLink, newCtaLink);
      btnWrapper.append(newCtaLink);
      firstSection.append(btnWrapper);
    }
  }

  // Second section: Blog cards
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-section--second', 'latestblogs-d-flex');
  latestblogsContainer.append(secondSection);

  // Loop through remaining rows for blog cards
  rows.slice(1).forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 4) { // Expecting URL, Image, Date, Title
      const urlCell = cells[0];
      const imageCell = cells[1];
      const dateCell = cells[2];
      const titleCell = cells[3];

      const cardLink = urlCell.querySelector('a');
      const img = imageCell.querySelector('img');
      const dateP = dateCell.querySelector('p');
      const titleP = titleCell.querySelector('p');

      if (cardLink && img && dateP && titleP) {
        const newCardLink = document.createElement('a');
        newCardLink.href = cardLink.href;
        newCardLink.classList.add('latestblogs-cardWrapper', 'latestblogs-analytics_cta_click');
        newCardLink.setAttribute('data-cta-label', titleP.textContent.trim());
        moveInstrumentation(row, newCardLink); // Transfer instrumentation from the row to the new card link

        const cardsDiv = document.createElement('div');
        cardsDiv.classList.add('latestblogs-cards');
        newCardLink.append(cardsDiv);

        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
        cardsDiv.append(cardImageWrapper);

        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('latestblogs-cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);

        const cardsContentWrapper = document.createElement('div');
        cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');
        cardsDiv.append(cardsContentWrapper);

        const publishedDateP = document.createElement('p');
        publishedDateP.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-published_date');
        publishedDateP.textContent = dateP.textContent;
        if (dateP.hasAttribute('data-date')) {
          publishedDateP.setAttribute('data-date', dateP.getAttribute('data-date'));
        }
        moveInstrumentation(dateP, publishedDateP);
        cardsContentWrapper.append(publishedDateP);

        const cardTitleP = document.createElement('p');
        cardTitleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        cardTitleP.textContent = titleP.textContent;
        moveInstrumentation(titleP, cardTitleP);
        cardsContentWrapper.append(cardTitleP);

        secondSection.append(newCardLink);
      }
    }
  });

  block.textContent = '';
  block.append(latestblogsWrapper);
}
