import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main section element
  const section = document.createElement('section');
  section.classList.add('itc-how-shift');

  // Get all rows from the block
  const rows = [...block.children];

  // First row is the main image and its alt text
  const mainImageRow = rows.shift();
  const mainImageCell = mainImageRow.children[0];
  const mainImage = mainImageCell.querySelector('img');
  const mainImageAlt = mainImageCell.children[1]?.textContent || '';

  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('left-image-div');
  leftImageDiv.id = 'leftDivId';
  if (mainImage) {
    const optimizedMainPic = createOptimizedPicture(mainImage.src, mainImage.alt || mainImageAlt);
    moveInstrumentation(mainImage, optimizedMainPic.querySelector('img'));
    leftImageDiv.append(optimizedMainPic);
  }
  section.append(leftImageDiv);

  // Second row contains the rest of the content
  const contentRow = rows.shift();
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('container', 'read-more');
  moveInstrumentation(contentRow, contentDiv);

  // Extract heading
  const headingCell = contentRow.children[0];
  const heading = headingCell.querySelector('h1');
  if (heading) {
    heading.classList.add('text-center', 'pb-4', 'rs-heading');
    contentDiv.append(heading);
  }

  // Extract subheading and description
  const subheadingDescriptionCell = contentRow.children[1];
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('read-more-text');
  // Assuming subheading and description are directly inside the cell as h2 and p
  const subheading = subheadingDescriptionCell.querySelector('h2');
  const description = subheadingDescriptionCell.querySelector('p');
  if (subheading) {
    readMoreTextDiv.append(subheading);
  }
  if (description) {
    readMoreTextDiv.append(description);
  }
  contentDiv.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('readMore');
  contentDiv.append(readMoreSpan);

  // Extract delicacy cards
  const delicacyCardsWrapper = document.createElement('div');
  delicacyCardsWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'why-shift-wrapper');
  contentDiv.append(delicacyCardsWrapper);

  // The remaining rows are the delicacy cards
  rows.forEach((row) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('mb-md-0', 'mb-3', 'text-center');
    moveInstrumentation(row, cardDiv);

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('itc-health-goal-wrapper');
    const cardImage = row.children[0].querySelector('img');
    if (cardImage) {
      const optimizedCardPic = createOptimizedPicture(cardImage.src, cardImage.alt);
      moveInstrumentation(cardImage, optimizedCardPic.querySelector('img'));
      cardImageWrapper.append(optimizedCardPic);
    }
    cardDiv.append(cardImageWrapper);

    const cardLink = row.children[1].querySelector('a');
    if (cardLink) {
      cardLink.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
      cardDiv.append(cardLink);
    }
    delicacyCardsWrapper.append(cardDiv);
  });

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('d-md-none', 'd-block');
  contentDiv.append(emptyDiv);

  // Extract CTA button
  const ctaRow = block.children[block.children.length - 1]; // Assuming CTA is the last row
  const ctaCell = ctaRow.children[0];
  const ctaLink = ctaCell.querySelector('a');
  if (ctaLink) {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button', 'how-shift-button');

    const newCtaLink = document.createElement('a');
    newCtaLink.href = ctaLink.href;
    newCtaLink.setAttribute('alt', ctaLink.getAttribute('alt') || '');
    newCtaLink.classList.add('cmp-button');
    if (ctaLink.target) {
      newCtaLink.target = ctaLink.target;
    }
    if (ctaLink.id) {
      newCtaLink.id = ctaLink.id;
    }
    if (ctaLink.getAttribute('data-cmp-data-layer')) {
      newCtaLink.setAttribute('data-cmp-data-layer', ctaLink.getAttribute('data-cmp-data-layer'));
    }

    const spanText = document.createElement('span');
    spanText.classList.add('cmp-button__text');
    spanText.textContent = ctaLink.textContent;
    newCtaLink.append(spanText);

    if (newCtaLink.target === '_blank') {
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      newCtaLink.append(screenReaderSpan);
    }
    moveInstrumentation(ctaLink, newCtaLink);
    buttonDiv.append(newCtaLink);
    contentDiv.append(buttonDiv);
  }

  section.append(contentDiv);

  block.textContent = '';
  block.append(section);
}
