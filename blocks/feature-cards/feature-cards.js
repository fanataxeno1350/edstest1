import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

  let firstRowProcessed = false;

  [...block.children].forEach((row) => {
    if (!firstRowProcessed) {
      // This is the first row, which contains the main title
      const titleWrapper = document.createElement('div');
      titleWrapper.classList.add('featurecards-featureCards-text');
      moveInstrumentation(row, titleWrapper);

      const h1 = row.querySelector('h1');
      if (h1) {
        titleWrapper.append(h1);
      }
      block.append(titleWrapper);
      firstRowProcessed = true;
      return; // Skip to the next row
    }

    // Subsequent rows are for cards
    const cardLink = row.querySelector('a');
    if (cardLink) {
      const newCardLink = document.createElement('a');
      newCardLink.classList.add('featurecards-featureCards-bolteSitare_cardSection', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      newCardLink.href = cardLink.href;
      if (cardLink.title) newCardLink.title = cardLink.title;
      if (cardLink.dataset.title) newCardLink.dataset.title = cardLink.dataset.title;
      if (cardLink.target) newCardLink.target = cardLink.target;
      moveInstrumentation(cardLink, newCardLink);

      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
      const img = cardLink.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('featurecards-featureCards-h-100', 'featurecards-featureCards-w-100', 'featurecards-featureCards-card-img');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imgWrapper.append(optimizedPic);
      }
      newCardLink.append(imgWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

      const textContentDiv = document.createElement('div');
      const h2 = cardLink.querySelector('h2');
      if (h2) {
        h2.classList.add('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
        textContentDiv.append(h2);
      }
      const p = cardLink.querySelector('p');
      if (p) {
        p.classList.add('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
        textContentDiv.append(p);
      }
      contentWrapper.append(textContentDiv);

      const buttonDiv = document.createElement('div');
      const button = cardLink.querySelector('button');
      if (button) {
        button.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
        buttonDiv.append(button);
      }
      contentWrapper.append(buttonDiv);

      newCardLink.append(contentWrapper);
      featureCardsContainer.append(newCardLink);
    }
  });

  block.textContent = '';
  block.append(featureCardsContainer);

  // Handle the last section if it exists in the original block
  const lastSection = block.querySelector('.featurecards-featureCards-feature_card--Section');
  if (lastSection) {
    const newSection = document.createElement('section');
    newSection.classList.add('featurecards-featureCards-d-block', 'featurecards-featureCards-feature_card--Section', 'featurecards-featureCards-feature_card', 'featurecards-featureCards-mx-auto');
    moveInstrumentation(lastSection, newSection);

    const sectionLink = lastSection.querySelector('a');
    if (sectionLink) {
      const newSectionLink = document.createElement('a');
      newSectionLink.classList.add('featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      newSectionLink.href = sectionLink.href;
      if (sectionLink.title) newSectionLink.title = sectionLink.title;
      if (sectionLink.dataset.ctaLabel) newSectionLink.dataset.ctaLabel = sectionLink.dataset.ctaLabel;
      moveInstrumentation(sectionLink, newSectionLink);

      const sectionImgWrapper = document.createElement('div');
      sectionImgWrapper.classList.add('featurecards-featureCards-feature_card--image', 'featurecards-featureCards-w-100', 'featurecards-featureCards-pb-4');
      const sectionImg = sectionLink.querySelector('img');
      if (sectionImg) {
        const optimizedPic = createOptimizedPicture(sectionImg.src, sectionImg.alt);
        optimizedPic.querySelector('img').classList.add('featurecards-featureCards-w-100', 'featurecards-featureCards-h-100');
        moveInstrumentation(sectionImg, optimizedPic.querySelector('img'));
        sectionImgWrapper.append(optimizedPic);
      }
      newSectionLink.append(sectionImgWrapper);

      const sectionTextCenter = document.createElement('div');
      sectionTextCenter.classList.add('featurecards-featureCards-text-center');

      const sectionH2 = sectionLink.querySelector('h2');
      if (sectionH2) {
        sectionH2.classList.add('featurecards-featureCards-feature_card--title', 'featurecards-featureCards-boing--text__heading-1');
        sectionTextCenter.append(sectionH2);
      }

      const sectionPWrapper = document.createElement('div');
      sectionPWrapper.classList.add('featurecards-featureCards-pb-5');
      const sectionP = sectionLink.querySelector('p');
      if (sectionP) {
        sectionP.classList.add('featurecards-featureCards-feature_card--desc', 'featurecards-featureCards-boing--text__body-2', 'featurecards-featureCards-text-boing-dark');
        sectionPWrapper.append(sectionP);
      }
      sectionTextCenter.append(sectionPWrapper);

      const sectionBtnDiv = document.createElement('div');
      sectionBtnDiv.classList.add('featurecards-featureCards-redirected_btn', 'featurecards-featureCards-d-none');
      const sectionButton = sectionLink.querySelector('button');
      if (sectionButton) {
        sectionButton.classList.add('featurecards-featureCards-arrow-icon-btn');
        sectionBtnDiv.append(sectionButton);
      }
      sectionTextCenter.append(sectionBtnDiv);

      newSectionLink.append(sectionTextCenter);
      newSection.append(newSectionLink);
    }
    block.append(newSection);
  }

  // Remove the curve container if it exists
  const curveContainer = block.querySelector('.featurecards-featureCards-curve-container');
  if (curveContainer) {
    curveContainer.remove();
  }
}
