import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('feature-cards-container');

  // Handle the initial text/heading if present
  const firstRow = block.children[0];
  if (firstRow && firstRow.querySelector('h1')) {
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('featurecards-featureCards-text');
    const h1 = firstRow.querySelector('h1');
    if (h1) {
      textWrapper.append(h1.cloneNode(true));
      moveInstrumentation(h1, textWrapper.querySelector('h1'));
    }
    featureCardsContainer.append(textWrapper);
    firstRow.remove(); // Remove the processed row from the block
  }

  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('featurecards-featureCards-card-wrapper');

  [...block.children].forEach((row) => {
    // Check if the row contains an anchor element, indicating a feature card
    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.title = link.title;
      if (link.target) {
        newLink.target = link.target;
      }
      newLink.classList.add('featurecards-featureCards-bolteSitare_cardSection', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      moveInstrumentation(link, newLink);

      const wrapperDiv = document.createElement('div');
      wrapperDiv.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

      const imgDiv = document.createElement('div');
      imgDiv.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('featurecards-featureCards-h-100', 'featurecards-featureCards-w-100', 'featurecards-featureCards-card-img');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imgDiv.append(optimizedPic);
      }
      wrapperDiv.append(imgDiv);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

      const textContentDiv = document.createElement('div');
      const h2 = link.querySelector('h2');
      if (h2) {
        const newH2 = document.createElement('h2');
        newH2.classList.add('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
        newH2.textContent = h2.textContent;
        moveInstrumentation(h2, newH2);
        textContentDiv.append(newH2);
      }

      const p = link.querySelector('p');
      if (p) {
        const newP = document.createElement('p');
        newP.classList.add('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
        newP.textContent = p.textContent;
        moveInstrumentation(p, newP);
        textContentDiv.append(newP);
      }
      contentWrapper.append(textContentDiv);

      const buttonDiv = document.createElement('div');
      const button = link.querySelector('button');
      if (button) {
        const newButton = document.createElement('button');
        newButton.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
        newButton.textContent = button.textContent;
        moveInstrumentation(button, newButton);
        buttonDiv.append(newButton);
      }
      contentWrapper.append(buttonDiv);

      wrapperDiv.append(contentWrapper);
      newLink.append(wrapperDiv);
      cardWrapper.append(newLink);
    }
  });

  featureCardsContainer.append(cardWrapper);

  // Handle the curve container if it exists
  const curveContainer = block.querySelector('.featurecards-featureCards-curve-container');
  if (curveContainer) {
    featureCardsContainer.append(curveContainer.cloneNode(true));
    curveContainer.remove(); // Remove the original
  }

  // Handle the section with feature_card class
  const featureCardSection = block.querySelector('.featurecards-featureCards-feature_card--Section');
  if (featureCardSection) {
    const newFeatureCardSection = document.createElement('section');
    newFeatureCardSection.classList.add('featurecards-featureCards-d-block', 'featurecards-featureCards-feature_card--Section', 'featurecards-featureCards-feature_card', 'featurecards-featureCards-mx-auto');
    moveInstrumentation(featureCardSection, newFeatureCardSection);

    const link = featureCardSection.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.title = link.title;
      newLink.classList.add('featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      moveInstrumentation(link, newLink);

      const imgDiv = document.createElement('div');
      imgDiv.classList.add('featurecards-featureCards-feature_card--image', 'featurecards-featureCards-w-100', 'featurecards-featureCards-pb-4');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('featurecards-featureCards-w-100', 'featurecards-featureCards-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imgDiv.append(optimizedPic);
      }
      newLink.append(imgDiv);

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('featurecards-featureCards-text-center');

      const h2 = link.querySelector('h2');
      if (h2) {
        const newH2 = document.createElement('h2');
        newH2.classList.add('featurecards-featureCards-feature_card--title', 'featurecards-featureCards-boing--text__heading-1');
        newH2.textContent = h2.textContent;
        moveInstrumentation(h2, newH2);
        textCenterDiv.append(newH2);
      }

      const pDiv = document.createElement('div');
      pDiv.classList.add('featurecards-featureCards-pb-5');
      const p = link.querySelector('p');
      if (p) {
        const newP = document.createElement('p');
        newP.classList.add('featurecards-featureCards-feature_card--desc', 'featurecards-featureCards-boing--text__body-2', 'featurecards-featureCards-text-boing-dark');
        newP.textContent = p.textContent;
        moveInstrumentation(p, newP);
        pDiv.append(newP);
      }
      textCenterDiv.append(pDiv);

      const redirectedBtnDiv = document.createElement('div');
      redirectedBtnDiv.classList.add('featurecards-featureCards-redirected_btn', 'featurecards-featureCards-d-none');
      const button = link.querySelector('button');
      if (button) {
        const newButton = document.createElement('button');
        newButton.type = 'button';
        newButton.role = 'button';
        newButton.classList.add('featurecards-featureCards-arrow-icon-btn');
        newButton.textContent = button.textContent;
        moveInstrumentation(button, newButton);
        redirectedBtnDiv.append(newButton);
      }
      textCenterDiv.append(redirectedBtnDiv);

      newLink.append(textCenterDiv);
      newFeatureCardSection.append(newLink);
    }
    featureCardsContainer.append(newFeatureCardSection);
    featureCardSection.remove(); // Remove the original
  }

  block.textContent = '';
  block.append(featureCardsContainer);
}
