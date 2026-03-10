import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

  const titleDiv = block.querySelector('.featurecards-featureCards-text');
  if (titleDiv) {
    const newTitleDiv = document.createElement('div');
    newTitleDiv.classList.add('featurecards-featureCards-text');
    moveInstrumentation(titleDiv, newTitleDiv);
    newTitleDiv.innerHTML = titleDiv.innerHTML;
    block.append(newTitleDiv);
  }

  [...block.children].forEach((row) => {
    // Check if the row is actually a card row based on the presence of an anchor tag
    const linkElement = row.querySelector('a');
    if (linkElement && linkElement.classList.contains('featurecards-featureCards-bolteSitare_cardSection')) {
      const cardLink = document.createElement('a');
      moveInstrumentation(row, cardLink);
      cardLink.classList.add('featurecards-featureCards-bolteSitare_cardSection', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      cardLink.href = linkElement.href;
      cardLink.title = linkElement.title;
      if (linkElement.target) {
        cardLink.target = linkElement.target;
      }
      if (linkElement.dataset.title) {
        cardLink.dataset.title = linkElement.dataset.title;
      }

      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
      const img = row.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imgWrapper.append(optimizedPic);
      }
      cardLink.append(imgWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

      const textContentDiv = document.createElement('div');
      const title = row.querySelector('h2');
      if (title) {
        const newTitle = document.createElement('h2');
        newTitle.classList.add('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
        moveInstrumentation(title, newTitle);
        newTitle.textContent = title.textContent.trim();
        textContentDiv.append(newTitle);
      }

      const description = row.querySelector('p');
      if (description) {
        const newDescription = document.createElement('p');
        newDescription.classList.add('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
        moveInstrumentation(description, newDescription);
        newDescription.textContent = description.textContent.trim();
        textContentDiv.append(newDescription);
      }
      contentWrapper.append(textContentDiv);

      const buttonDiv = document.createElement('div');
      const button = row.querySelector('button');
      if (button) {
        const newButton = document.createElement('button');
        newButton.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
        moveInstrumentation(button, newButton);
        newButton.textContent = button.textContent.trim();
        buttonDiv.append(newButton);
      }
      contentWrapper.append(buttonDiv);

      cardLink.append(contentWrapper);
      featureCardsContainer.append(cardLink);
    }
  });

  // Handle the single feature card section at the bottom
  const singleFeatureCardSection = block.querySelector('.featurecards-featureCards-feature_card--Section');
  if (singleFeatureCardSection) {
    const newSection = document.createElement('section');
    newSection.classList.add('featurecards-featureCards-d-block', 'featurecards-featureCards-feature_card--Section', 'featurecards-featureCards-feature_card', 'featurecards-featureCards-mx-auto');
    moveInstrumentation(singleFeatureCardSection, newSection);

    const link = singleFeatureCardSection.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.classList.add('featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      newLink.href = link.href;
      newLink.title = link.title;
      if (link.dataset.ctaLabel) {
        newLink.dataset.ctaLabel = link.dataset.ctaLabel;
      }
      moveInstrumentation(link, newLink);

      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('featurecards-featureCards-feature_card--image', 'featurecards-featureCards-w-100', 'featurecards-featureCards-pb-4');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imgWrapper.append(optimizedPic);
      }
      newLink.append(imgWrapper);

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('featurecards-featureCards-text-center');

      const title = link.querySelector('h2');
      if (title) {
        const newTitle = document.createElement('h2');
        newTitle.classList.add('featurecards-featureCards-feature_card--title', 'featurecards-featureCards-boing--text__heading-1');
        moveInstrumentation(title, newTitle);
        newTitle.textContent = title.textContent.trim();
        textCenterDiv.append(newTitle);
      }

      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('featurecards-featureCards-pb-5');
      const description = link.querySelector('p');
      if (description) {
        const newDescription = document.createElement('p');
        newDescription.classList.add('featurecards-featureCards-feature_card--desc', 'featurecards-featureCards-boing--text__body-2', 'featurecards-featureCards-text-boing-dark');
        moveInstrumentation(description, newDescription);
        newDescription.textContent = description.textContent.trim();
        descriptionDiv.append(newDescription);
      }
      textCenterDiv.append(descriptionDiv);

      const redirectedBtnDiv = document.createElement('div');
      redirectedBtnDiv.classList.add('featurecards-featureCards-redirected_btn', 'featurecards-featureCards-d-none');
      const button = link.querySelector('.featurecards-featureCards-arrow-icon-btn');
      if (button) {
        const newButton = document.createElement('button');
        newButton.type = 'button';
        newButton.role = 'button';
        newButton.classList.add('featurecards-featureCards-arrow-icon-btn');
        moveInstrumentation(button, newButton);
        newButton.textContent = button.textContent.trim();
        redirectedBtnDiv.append(newButton);
      }
      textCenterDiv.append(redirectedBtnDiv);

      newLink.append(textCenterDiv);
      newSection.append(newLink);
    }
    block.append(newSection);
  }

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(featureCardsContainer);

  // Append the curve container if it exists
  const curveContainer = block.querySelector('.featurecards-featureCards-curve-container');
  if (curveContainer) {
    const newCurveContainer = document.createElement('div');
    newCurveContainer.classList.add('featurecards-featureCards-curve-container', 'featurecards-featureCards-d-none');
    moveInstrumentation(curveContainer, newCurveContainer);
    block.append(newCurveContainer);
  }
}
