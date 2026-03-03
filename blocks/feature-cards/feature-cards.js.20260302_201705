import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsSection = document.createElement('section');
  featureCardsSection.className = 'featurecards-featureCards-d-block featurecards-featureCards-feature_card--Section featurecards-featureCards-feature_card featurecards-featureCards-mx-auto';

  // First, handle the title if it exists in the first row
  const firstRow = block.children[0];
  if (firstRow && firstRow.querySelector('h1')) {
    const titleDiv = document.createElement('div');
    titleDiv.className = 'featurecards-featureCards-cmp-text';
    const h1 = firstRow.querySelector('h1').cloneNode(true);
    titleDiv.append(h1);
    featureCardsSection.append(titleDiv);
    moveInstrumentation(firstRow, titleDiv);
  }

  // Process the rest of the rows as individual feature cards
  [...block.children].forEach((row, index) => {
    // Skip the first row if it was a title row, or if it's not a card row
    if (index === 0 && row.querySelector('h1')) {
      return;
    }

    const link = row.querySelector('a');
    if (!link) {
      return;
    }

    const cardLink = document.createElement('a');
    moveInstrumentation(row, cardLink);
    cardLink.className = 'featurecards-featureCards-d-flex featurecards-featureCards-flex-column featurecards-featureCards-analytics_cta_click featurecards-featureCards-text-decoration-none';
    cardLink.href = link.href;
    if (link.target) {
      cardLink.target = link.target;
    }
    if (link.title) {
      cardLink.title = link.title;
    }
    if (link.dataset.title) {
      cardLink.setAttribute('data-cta-label', link.dataset.title);
    }

    const wrapperDiv = link.querySelector('.featurecards-featureCards-d-flex.featurecards-featureCards-bolteSitare_cardSection--wrapper') || link.querySelector('.featurecards-featureCards-feature_card--image')?.parentElement;

    // Image Section
    const imgWrapper = wrapperDiv?.querySelector('.featurecards-featureCards-bolteSitare_cardSection--img') || wrapperDiv?.querySelector('.featurecards-featureCards-feature_card--image');
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) {
        const newImgWrapper = document.createElement('div');
        newImgWrapper.className = 'featurecards-featureCards-feature_card--image featurecards-featureCards-w-100 featurecards-featureCards-pb-4';
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newImgWrapper.append(optimizedPic);
        cardLink.append(newImgWrapper);
      }
    }

    // Content Section
    const contentWrapper = wrapperDiv?.querySelector('.featurecards-featureCards-content-wrapper') || wrapperDiv?.querySelector('.featurecards-featureCards-text-center');
    if (contentWrapper) {
      const newContentWrapper = document.createElement('div');
      newContentWrapper.className = 'featurecards-featureCards-text-center';

      const titleElement = contentWrapper.querySelector('h2');
      if (titleElement) {
        const newTitle = document.createElement('h2');
        newTitle.className = 'featurecards-featureCards-feature_card--title featurecards-featureCards-boing--text__heading-1';
        newTitle.textContent = titleElement.textContent;
        newContentWrapper.append(newTitle);
      }

      const descriptionElement = contentWrapper.querySelector('p');
      if (descriptionElement) {
        const descDiv = document.createElement('div');
        descDiv.className = 'featurecards-featureCards-pb-5';
        const newDesc = document.createElement('p');
        newDesc.className = 'featurecards-featureCards-feature_card--desc featurecards-featureCards-boing--text__body-2 featurecards-featureCards-text-boing-dark';
        newDesc.textContent = descriptionElement.textContent;
        descDiv.append(newDesc);
        newContentWrapper.append(descDiv);
      }

      // Button/CTA
      const buttonElement = contentWrapper.querySelector('button');
      if (buttonElement) {
        const btnDiv = document.createElement('div');
        btnDiv.className = 'featurecards-featureCards-redirected_btn featurecards-featureCards-d-none'; // This class seems to hide it, based on the HTML
        const newButton = document.createElement('button');
        newButton.type = 'button';
        newButton.role = 'button';
        newButton.className = 'featurecards-featureCards-arrow-icon-btn';
        newButton.textContent = buttonElement.textContent.trim(); // Use button text
        btnDiv.append(newButton);
        newContentWrapper.append(btnDiv);
      }
      cardLink.append(newContentWrapper);
    }

    featureCardsSection.append(cardLink);
  });

  block.textContent = '';
  block.append(featureCardsSection);
}
