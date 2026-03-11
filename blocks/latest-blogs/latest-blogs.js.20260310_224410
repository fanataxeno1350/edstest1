import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-latestBlogs-article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');
  wrapper.append(articleListing);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');
  articleListing.append(firstSection);

  // Assuming the first row of the block contains the main title, description, and view all link
  const headerRow = block.children[0];
  if (headerRow) {
    moveInstrumentation(headerRow, firstSection);

    const titleCell = headerRow.children[0];
    if (titleCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
      h2.innerHTML = titleCell.innerHTML;
      firstSection.append(h2);
    }

    const descriptionCell = headerRow.children[1];
    if (descriptionCell) {
      const pDesc = document.createElement('p');
      pDesc.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
      pDesc.innerHTML = descriptionCell.innerHTML;
      firstSection.append(pDesc);
    }

    const viewAllLinkCell = headerRow.children[2];
    if (viewAllLinkCell) {
      const btnWrapper = document.createElement('div');
      btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');
      const link = viewAllLinkCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.title = link.title || link.textContent;
        newLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
        newLink.textContent = link.textContent;
        btnWrapper.append(newLink);
      }
      firstSection.append(btnWrapper);
    }
  }

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');
  articleListing.append(secondSection);

  // Loop through the remaining rows for blog cards
  [...block.children].slice(1).forEach((row) => {
    const cardLink = row.children[0].querySelector('a');
    const image = row.children[1].querySelector('img');
    const dateText = row.children[2].textContent;
    const textContent = row.children[3].textContent;

    if (cardLink) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = cardLink.href;
      cardWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
      if (cardLink.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = cardLink.dataset.ctaLabel;
      }
      moveInstrumentation(row, cardWrapper);

      const cardsDiv = document.createElement('div');
      cardsDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');
      cardWrapper.append(cardsDiv);

      if (image) {
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
        const optimizedPic = createOptimizedPicture(image.src, image.alt);
        optimizedPic.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(image, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
        cardsDiv.append(cardImageWrapper);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

      if (dateText) {
        const pDate = document.createElement('p');
        pDate.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
        // Assuming the date is in a format that can be directly used or needs parsing
        // For now, directly setting textContent
        pDate.textContent = dateText;
        // If data-date attribute is present in the original cell, transfer it
        const originalDateElement = row.children[2].querySelector('[data-date]');
        if (originalDateElement && originalDateElement.dataset.date) {
          pDate.dataset.date = originalDateElement.dataset.date;
        }
        contentWrapper.append(pDate);
      }

      if (textContent) {
        const pText = document.createElement('p');
        pText.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        pText.textContent = textContent;
        contentWrapper.append(pText);
      }

      cardsDiv.append(contentWrapper);
      secondSection.append(cardWrapper);
    }
  });

  block.textContent = '';
  block.append(wrapper);
}
