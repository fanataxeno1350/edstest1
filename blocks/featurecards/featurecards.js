import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  // Process the title row
  const titleRow = block.children[0];
  if (titleRow) {
    const textWrapper = document.createElement('div');
    textWrapper.id = 'text-68763da680'; // Static ID from HTML
    textWrapper.classList.add('featurecards-text-wrapper');
    moveInstrumentation(titleRow, textWrapper);

    const h1 = document.createElement('h1');
    h1.classList.add('featurecards-title');

    const titleText = titleRow.children[0].textContent.trim();
    const highlightSpan = titleRow.children[1] ? titleRow.children[1].querySelector('span') : null;

    if (highlightSpan) {
      h1.innerHTML = `Welcome to <span class="featurecards-title-highlight">${highlightSpan.textContent}</span>`;
    } else {
      h1.textContent = titleText;
    }
    textWrapper.append(h1);
    featureCardsContainer.append(textWrapper);
  }

  // Process the feature cards
  const cardSectionWrapper = document.createElement('div');
  cardSectionWrapper.classList.add('featurecards-card-section-wrapper');

  // Start from the second row (index 1) as the first row is the title
  Array.from(block.children).slice(1).forEach((row) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section', 'featurecards-card-section');
    moveInstrumentation(row, section);

    const link = row.querySelector('a');
    const newLink = document.createElement('a');
    newLink.classList.add('featurecards-link', 'featurecards-analytics_cta_click');
    if (link) {
      newLink.href = link.href;
      newLink.title = link.title;
      if (link.target) {
        newLink.target = link.target;
      }
      if (link.dataset.ctaLabel) {
        newLink.dataset.ctaLabel = link.dataset.ctaLabel;
      }
    }

    const imageCell = row.children[0];
    const titleCell = row.children[1];
    const descriptionCell = row.children[2];
    const linkCell = row.children[3]; // The original link cell

    // Image Wrapper
    if (imageCell) {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featurecards-image-wrapper');
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('featurecards-image');
        imageWrapper.append(optimizedPic);
      }
      newLink.append(imageWrapper);
    }

    // Content Wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper');

    if (titleCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-card-title', 'featurecards-boing--text__heading-1');
      h2.textContent = titleCell.textContent.trim();
      contentWrapper.append(h2);
    }

    if (descriptionCell) {
      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featurecards-description-wrapper');
      const p = document.createElement('p');
      p.classList.add('featurecards-card-description', 'featurecards-boing--text__body-2', 'featurecards-text-boing-dark');
      p.textContent = descriptionCell.textContent.trim();
      descriptionWrapper.append(p);
      contentWrapper.append(descriptionWrapper);
    }

    // Redirect Button Wrapper (assuming it's always hidden based on HTML)
    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'featurecards-d-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-button');
    // The button content is an SVG path, which is not directly available in block.children
    // For now, we'll leave it empty or add a placeholder if needed.
    // If the SVG path is consistently the same, it could be hardcoded.
    // button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1772185485758.svg+xml';
    redirectButtonWrapper.append(button);
    contentWrapper.append(redirectButtonWrapper);

    newLink.append(contentWrapper);
    section.append(newLink);
    cardSectionWrapper.append(section);
  });

  featureCardsContainer.append(cardSectionWrapper);

  // Append the hidden sections and curve container if they are part of the block's content
  // Based on the provided block JSON, these are not directly mapped to `featurecard` model fields.
  // If these are static elements or derived from other block data, they would be added here.
  // For this exercise, we'll assume they are not dynamically generated from the block.children
  // beyond the initial visible cards.

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(featureCardsContainer);
}
