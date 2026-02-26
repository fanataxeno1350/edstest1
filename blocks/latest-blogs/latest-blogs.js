import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('div');
  latestblogsWrapper.classList.add('latestblogs-wrapper');
  moveInstrumentation(block, latestblogsWrapper);

  const latestblogsContainer = document.createElement('div');
  latestblogsContainer.classList.add('latestblogs-container', 'latestblogs-position-relative');
  latestblogsWrapper.append(latestblogsContainer);

  // First section (static content)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const h2 = document.createElement('h2');
  h2.classList.add('latestblogs-title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
  h2.textContent = 'More Boings';
  firstSection.append(h2);

  const pDesc = document.createElement('p');
  pDesc.classList.add('latestblogs-desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
  pDesc.textContent = 'Stay updated with our latest news, blogs and events';
  firstSection.append(pDesc);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');

  const viewAllLink = document.createElement('a');
  viewAllLink.href = '/bolte-sitare/boingwale-blogs.html';
  viewAllLink.title = 'View All';
  viewAllLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-btn', 'latestblogs-analytics_cta_click');
  viewAllLink.textContent = 'View All';
  btnWrapper.append(viewAllLink);
  firstSection.append(btnWrapper);

  latestblogsContainer.append(firstSection);

  // Second section (dynamic blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-section--second', 'latestblogs-d-flex');

  // Loop through the block's children (each row represents a blog card)
  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // Extract data from the cells based on the JSON model
    const cardLinkCell = cells[0];
    const imageCell = cells[1];
    const dateCell = cells[2];
    const titleCell = cells[3];

    const cardLink = cardLinkCell.querySelector('a');
    const img = imageCell.querySelector('img');
    const dateText = dateCell.textContent.trim();
    const titleText = titleCell.textContent.trim();

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'latestblogs-analytics_cta_click');
    moveInstrumentation(row, cardWrapper);

    if (cardLink) {
      cardWrapper.href = cardLink.href;
      cardWrapper.setAttribute('data-cta-label', cardLink.textContent.trim());
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');

    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      optimizedPic.querySelector('img').classList.add('latestblogs-cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      cardImageWrapper.append(optimizedPic);
    }
    cardsDiv.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const publishedDate = document.createElement('p');
    publishedDate.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-published_date');
    publishedDate.textContent = dateText;
    // Assuming the date in the HTML has a data-date attribute, if not, we can skip it or parse from text
    const originalDateElement = dateCell.querySelector('p[data-date]');
    if (originalDateElement) {
      publishedDate.setAttribute('data-date', originalDateElement.getAttribute('data-date'));
    }
    cardsContentWrapper.append(publishedDate);

    const blogTitle = document.createElement('p');
    blogTitle.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
    blogTitle.textContent = titleText;
    cardsContentWrapper.append(blogTitle);

    cardsDiv.append(cardsContentWrapper);
    cardWrapper.append(cardsDiv);
    secondSection.append(cardWrapper);
  });

  latestblogsContainer.append(secondSection);

  block.textContent = '';
  block.append(latestblogsWrapper);
}