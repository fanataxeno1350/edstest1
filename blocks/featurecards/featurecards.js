import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('featurecards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('featurecards-text-wrapper');

  const mainTitle = document.createElement('h1');
  mainTitle.classList.add('featurecards-title-main');

  const authoredTitle = block.querySelector('h1.featurecards-title-main');
  if (authoredTitle) {
    const highlightSpan = authoredTitle.querySelector('.featurecards-title-highlight');
    if (highlightSpan) {
      // Move text content before the highlight span
      const textBefore = document.createTextNode(authoredTitle.firstChild.textContent.trim());
      mainTitle.append(textBefore);
      mainTitle.append(highlightSpan);
      moveInstrumentation(authoredTitle.firstChild, mainTitle);
      moveInstrumentation(highlightSpan, mainTitle);
    } else {
      mainTitle.textContent = authoredTitle.textContent.trim();
    }
    moveInstrumentation(authoredTitle, mainTitle);
  }
  titleWrapper.append(mainTitle);
  rootDiv.append(titleWrapper);
  moveInstrumentation(block.querySelector('.featurecards-text-wrapper'), titleWrapper);

  const cardSectionWrapper = document.createElement('div');
  cardSectionWrapper.classList.add('featurecards-card-section-wrapper');

  const authoredCards = block.querySelectorAll('section.featurecards-card-section');
  authoredCards.forEach((cardSection) => {
    const cardLink = cardSection.querySelector('a.featurecards-link');
    if (cardLink) {
      const newCardLink = document.createElement('a');
      newCardLink.classList.add('featurecards-link', 'analytics_cta_click');
      newCardLink.href = cardLink.href;
      newCardLink.title = cardLink.title;
      if (cardLink.target) {
        newCardLink.target = cardLink.target;
      }
      if (cardLink.dataset.ctaLabel) {
        newCardLink.dataset.ctaLabel = cardLink.dataset.ctaLabel;
      }

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featurecards-image-wrapper', 'featurecards-image-wrapper-pb-4');
      const img = cardLink.querySelector('img.featurecards-image');
      if (img) {
        imageWrapper.append(createOptimizedPicture(img.src, img.alt));
        moveInstrumentation(img, imageWrapper);
      }
      newCardLink.append(imageWrapper);
      moveInstrumentation(cardLink.querySelector('.featurecards-image-wrapper'), imageWrapper);

      const textCenter = document.createElement('div');
      textCenter.classList.add('featurecards-text-center');

      const cardTitle = document.createElement('h2');
      cardTitle.classList.add('featurecards-card-title', 'boing--text__heading-1');
      const authoredCardTitle = cardLink.querySelector('h2.featurecards-card-title');
      if (authoredCardTitle) {
        cardTitle.textContent = authoredCardTitle.textContent.trim();
        moveInstrumentation(authoredCardTitle, cardTitle);
      }
      textCenter.append(cardTitle);

      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featurecards-pb-5');
      const cardDesc = document.createElement('p');
      cardDesc.classList.add('featurecards-card-desc', 'boing--text__body-2', 'featurecards-text-boing-dark');
      const authoredCardDesc = cardLink.querySelector('p.featurecards-card-desc');
      if (authoredCardDesc) {
        cardDesc.textContent = authoredCardDesc.textContent.trim();
        moveInstrumentation(authoredCardDesc, cardDesc);
      }
      descriptionWrapper.append(cardDesc);
      textCenter.append(descriptionWrapper);
      moveInstrumentation(cardLink.querySelector('.featurecards-pb-5'), descriptionWrapper);

      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('featurecards-redirected-btn', 'featurecards-d-none');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featurecards-arrow-icon-btn');
      // The button content is an SVG path, which is not directly rendered as text
      // For now, we'll keep it empty as per the original HTML structure for the button.
      // If an actual SVG element needs to be added, it would be created here.
      buttonDiv.append(button);
      textCenter.append(buttonDiv);
      moveInstrumentation(cardLink.querySelector('.featurecards-redirected-btn'), buttonDiv);

      newCardLink.append(textCenter);
      moveInstrumentation(cardLink.querySelector('.featurecards-text-center'), textCenter);

      cardSectionWrapper.append(newCardLink);
      moveInstrumentation(cardLink, newCardLink);
    }
    moveInstrumentation(cardSection, newCardLink);
  });
  rootDiv.append(cardSectionWrapper);

  const bolteSitareCardSectionWrapper = document.createElement('div');
  bolteSitareCardSectionWrapper.classList.add('featurecards-bolte-sitare-card-section-wrapper-container');

  const authoredBolteSitareCards = block.querySelectorAll('a.featurecards-bolte-sitare-card-section');
  authoredBolteSitareCards.forEach((bolteSitareCard) => {
    const newBolteSitareCard = document.createElement('a');
    newBolteSitareCard.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'analytics_cta_click');
    newBolteSitareCard.href = bolteSitareCard.href;
    newBolteSitareCard.title = bolteSitareCard.title;
    if (bolteSitareCard.target) {
      newBolteSitareCard.target = bolteSitareCard.target;
    }
    if (bolteSitareCard.dataset.title) {
      newBolteSitareCard.dataset.title = bolteSitareCard.dataset.title;
    }

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('featurecards-bolte-sitare-card-section-wrapper');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('featurecards-bolte-sitare-card-section-img');
    const img = bolteSitareCard.querySelector('img.featurecards-card-img');
    if (img) {
      imageDiv.append(createOptimizedPicture(img.src, img.alt));
      moveInstrumentation(img, imageDiv);
    }
    cardWrapper.append(imageDiv);
    moveInstrumentation(bolteSitareCard.querySelector('.featurecards-bolte-sitare-card-section-img'), imageDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');

    const textContentDiv = document.createElement('div');

    const title = document.createElement('h2');
    title.classList.add('featurecards-bolte-sitare-card-section-title', 'boing--text__heading-3', 'featurecards-text-boing-dark');
    const authoredTitle = bolteSitareCard.querySelector('h2.featurecards-bolte-sitare-card-section-title');
    if (authoredTitle) {
      title.textContent = authoredTitle.textContent.trim();
      moveInstrumentation(authoredTitle, title);
    }
    textContentDiv.append(title);

    const description = document.createElement('p');
    description.classList.add('featurecards-bolte-sitare-card-section-text', 'boing--text__body-3', 'featurecards-text-boing-dark');
    const authoredDescription = bolteSitareCard.querySelector('p.featurecards-bolte-sitare-card-section-text');
    if (authoredDescription) {
      description.textContent = authoredDescription.textContent.trim();
      moveInstrumentation(authoredDescription, description);
    }
    textContentDiv.append(description);
    contentWrapper.append(textContentDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('featurecards-bolte-sitare-card-section-btn', 'featurecards-text-white', 'boing--text__body-4', 'featurecards-d-inline-block');
    const authoredButton = bolteSitareCard.querySelector('button.featurecards-bolte-sitare-card-section-btn');
    if (authoredButton) {
      button.textContent = authoredButton.textContent.trim();
      moveInstrumentation(authoredButton, button);
    }
    buttonDiv.append(button);
    contentWrapper.append(buttonDiv);

    cardWrapper.append(contentWrapper);
    moveInstrumentation(bolteSitareCard.querySelector('.featurecards-content-wrapper'), contentWrapper);

    newBolteSitareCard.append(cardWrapper);
    moveInstrumentation(bolteSitareCard.querySelector('.featurecards-bolte-sitare-card-section-wrapper'), cardWrapper);

    bolteSitareCardSectionWrapper.append(newBolteSitareCard);
    moveInstrumentation(bolteSitareCard, newBolteSitareCard);
  });
  rootDiv.append(bolteSitareCardSectionWrapper);

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
  rootDiv.append(curveContainer);
  moveInstrumentation(block.querySelector('.featurecards-curve-container'), curveContainer);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `featurecards block`;
  block.dataset.blockStatus = 'loaded';
}
