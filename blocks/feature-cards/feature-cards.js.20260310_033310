import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featureCards-container');

  // Handle the title section
  const titleRow = block.children[0];
  if (titleRow) {
    const titleDiv = document.createElement('div');
    moveInstrumentation(titleRow, titleDiv);
    titleDiv.id = 'text-68763da680'; // Assuming this ID is static or can be derived
    titleDiv.classList.add('featureCards-text');

    const h1 = document.createElement('h1');
    h1.classList.add('featureCards-title');
    h1.innerHTML = titleRow.children[0].innerHTML; // Transfer innerHTML directly
    titleDiv.append(h1);
    featureCardsContainer.append(titleDiv);
  }

  // Handle the curve container (static element)
  const curveDiv = document.createElement('div');
  curveDiv.classList.add('featureCards-curve-container');

  const cardList = document.createElement('div'); // A wrapper for the cards
  cardList.classList.add('featureCards-cards-wrapper');

  // Loop through the remaining rows (cards)
  // Start from index 1 to skip the title row
  [...block.children].slice(1).forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const section = document.createElement('section');
      moveInstrumentation(row, section);
      section.classList.add('featureCards-feature_card--Section', 'featureCards-feature_card', 'featureCards-mx-auto');

      const newLink = document.createElement('a');
      newLink.classList.add('featureCards-link-wrapper', 'analytics_cta_click', 'featureCards-text-decoration-none');
      newLink.href = link.href;
      newLink.title = link.title;
      if (link.target) {
        newLink.target = link.target;
      }
      if (link.dataset.ctaLabel) {
        newLink.dataset.ctaLabel = link.dataset.ctaLabel;
      }
      // Transfer data-title if it exists on the original link
      if (link.dataset.title) {
        newLink.dataset.title = link.dataset.title;
      }

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featureCards-feature_card--image', 'featureCards-w-100', 'featureCards-pb-4');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('featureCards-w-100', 'featureCards-h-100');
        imageWrapper.append(optimizedPic);
      }
      newLink.append(imageWrapper);

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('featureCards-text-center');

      const titleElement = link.querySelector('h2');
      if (titleElement) {
        const h2 = document.createElement('h2');
        h2.classList.add('featureCards-feature_card--title', 'featureCards-text__heading-1');
        h2.textContent = titleElement.textContent.trim();
        textCenterDiv.append(h2);
      }

      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featureCards-pb-5');
      const descriptionElement = link.querySelector('p');
      if (descriptionElement) {
        const p = document.createElement('p');
        p.classList.add('featureCards-feature_card--desc', 'featureCards-text__body-2', 'featureCards-text-boing-dark');
        p.textContent = descriptionElement.textContent.trim();
        descriptionWrapper.append(p);
      }
      textCenterDiv.append(descriptionWrapper);

      const buttonWrapper = document.createElement('div');
      buttonWrapper.classList.add('featureCards-redirected_btn');
      const buttonElement = link.querySelector('button');
      if (buttonElement) {
        const button = document.createElement('button');
        button.type = 'button';
        button.role = 'button';
        button.classList.add('featureCards-arrow-icon-btn');
        // Assuming the button text is the SVG path, or it's empty
        button.innerHTML = buttonElement.innerHTML;
        buttonWrapper.append(button);
      } else if (link.querySelector('.featureCards-bolteSitare_cardSection--btn')) {
        // Handle the 'Explore' button for the initial card format
        const oldButton = link.querySelector('.featureCards-bolteSitare_cardSection--btn');
        if (oldButton) {
          const button = document.createElement('button');
          button.type = 'button';
          button.role = 'button';
          button.classList.add('featureCards-arrow-icon-btn'); // Use the new class for consistency
          button.innerHTML = oldButton.textContent.trim(); // Use text content for these buttons
          buttonWrapper.append(button);
        }
      }
      textCenterDiv.append(buttonWrapper);
      newLink.append(textCenterDiv);
      section.append(newLink);
      cardList.append(section);
    }
  });

  featureCardsContainer.append(curveDiv);
  featureCardsContainer.append(cardList);

  block.textContent = '';
  block.append(featureCardsContainer);
}
