import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('featurecards-featureCards-container');

  const textDiv = block.querySelector('.featurecards-featureCards-text');
  if (textDiv) {
    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('featurecards-featureCards-text');
    const title = textDiv.querySelector('h1');
    if (title) {
      moveInstrumentation(title, titleWrapper);
      titleWrapper.append(title);
    }
    rootDiv.append(titleWrapper);
    moveInstrumentation(textDiv, titleWrapper);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

  const authoredCards = block.querySelectorAll('[data-aue-model="featureCard"]');
  authoredCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('a');
    const cardLink = document.createElement('a');
    cardLink.classList.add('featurecards-featureCards-bolteSitare_cardSection', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
    if (linkElement) {
      cardLink.href = linkElement.href;
      cardLink.title = linkElement.title || '';
      if (linkElement.target) {
        cardLink.target = linkElement.target;
      }
      if (linkElement.dataset.title) {
        cardLink.dataset.title = linkElement.dataset.title;
      }
    }

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
    const img = cardNode.querySelector('img[data-aue-prop="image"]');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').classList.add('featurecards-featureCards-h-100', 'featurecards-featureCards-w-100', 'featurecards-featureCards-card-img');
      imageDiv.append(picture);
      moveInstrumentation(img, imageDiv);
    }
    cardLink.append(imageDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

    const textContentDiv = document.createElement('div');

    const titleElement = cardNode.querySelector('h2[data-aue-prop="title"]') || cardNode.querySelector('.featurecards-featureCards-bolteSitare_cardSection--title');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
      h2.textContent = titleElement.textContent.trim();
      textContentDiv.append(h2);
      moveInstrumentation(titleElement, h2);
    }

    const descriptionElement = cardNode.querySelector('p[data-aue-prop="description"]') || cardNode.querySelector('.featurecards-featureCards-bolteSitare_cardSection--text');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.classList.add('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
      p.textContent = descriptionElement.textContent.trim();
      textContentDiv.append(p);
      moveInstrumentation(descriptionElement, p);
    }
    contentWrapper.append(textContentDiv);

    const buttonDiv = document.createElement('div');
    const button = cardNode.querySelector('.featurecards-featureCards-bolteSitare_cardSection--btn');
    if (button) {
      const newButton = document.createElement('button');
      newButton.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
      newButton.textContent = button.textContent.trim();
      buttonDiv.append(newButton);
      moveInstrumentation(button, newButton);
    }
    contentWrapper.append(buttonDiv);

    cardLink.append(contentWrapper);
    cardsWrapper.append(cardLink);
    moveInstrumentation(cardNode, cardLink);
  });
  rootDiv.append(cardsWrapper);

  const curveContainer = block.querySelector('.featurecards-featureCards-curve-container');
  if (curveContainer) {
    const newCurveContainer = document.createElement('div');
    newCurveContainer.classList.add('featurecards-featureCards-curve-container', 'featurecards-featureCards-d-none');
    rootDiv.append(newCurveContainer);
    moveInstrumentation(curveContainer, newCurveContainer);
  }

  const featureCardSection = block.querySelector('.featurecards-featureCards-feature_card--Section');
  if (featureCardSection) {
    const newFeatureCardSection = document.createElement('section');
    newFeatureCardSection.classList.add('featurecards-featureCards-d-block', 'featurecards-featureCards-feature_card--Section', 'featurecards-featureCards-feature_card', 'featurecards-featureCards-mx-auto');

    const featureCardLink = featureCardSection.querySelector('a');
    if (featureCardLink) {
      const newFeatureCardLink = document.createElement('a');
      newFeatureCardLink.classList.add('featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      newFeatureCardLink.href = featureCardLink.href;
      newFeatureCardLink.title = featureCardLink.title || '';
      if (featureCardLink.dataset.ctaLabel) {
        newFeatureCardLink.dataset.ctaLabel = featureCardLink.dataset.ctaLabel;
      }

      const featureCardImageDiv = document.createElement('div');
      featureCardImageDiv.classList.add('featurecards-featureCards-feature_card--image', 'featurecards-featureCards-w-100', 'featurecards-featureCards-pb-4');
      const featureCardImg = featureCardLink.querySelector('.featurecards-featureCards-feature_card--image img');
      if (featureCardImg) {
        const picture = createOptimizedPicture(featureCardImg.src, featureCardImg.alt);
        picture.querySelector('img').classList.add('featurecards-featureCards-w-100', 'featurecards-featureCards-h-100');
        featureCardImageDiv.append(picture);
        moveInstrumentation(featureCardImg, featureCardImageDiv);
      }
      newFeatureCardLink.append(featureCardImageDiv);

      const featureCardTextCenterDiv = document.createElement('div');
      featureCardTextCenterDiv.classList.add('featurecards-featureCards-text-center');

      const featureCardTitle = featureCardLink.querySelector('.featurecards-featureCards-feature_card--title');
      if (featureCardTitle) {
        const h2 = document.createElement('h2');
        h2.classList.add('featurecards-featureCards-feature_card--title', 'featurecards-featureCards-boing--text__heading-1');
        h2.textContent = featureCardTitle.textContent.trim();
        featureCardTextCenterDiv.append(h2);
        moveInstrumentation(featureCardTitle, h2);
      }

      const featureCardDescDiv = document.createElement('div');
      featureCardDescDiv.classList.add('featurecards-featureCards-pb-5');
      const featureCardDesc = featureCardLink.querySelector('.featurecards-featureCards-feature_card--desc');
      if (featureCardDesc) {
        const p = document.createElement('p');
        p.classList.add('featurecards-featureCards-feature_card--desc', 'featurecards-featureCards-boing--text__body-2', 'featurecards-featureCards-text-boing-dark');
        p.textContent = featureCardDesc.textContent.trim();
        featureCardDescDiv.append(p);
        moveInstrumentation(featureCardDesc, p);
      }
      featureCardTextCenterDiv.append(featureCardDescDiv);

      const redirectedBtnDiv = document.createElement('div');
      redirectedBtnDiv.classList.add('featurecards-featureCards-redirected_btn', 'featurecards-featureCards-d-none');
      const arrowButton = featureCardLink.querySelector('.featurecards-featureCards-redirected_btn button');
      if (arrowButton) {
        const newArrowButton = document.createElement('button');
        newArrowButton.type = 'button';
        newArrowButton.role = 'button';
        newArrowButton.classList.add('featurecards-featureCards-arrow-icon-btn');
        newArrowButton.textContent = arrowButton.textContent.trim();
        redirectedBtnDiv.append(newArrowButton);
        moveInstrumentation(arrowButton, newArrowButton);
      }
      featureCardTextCenterDiv.append(redirectedBtnDiv);

      newFeatureCardLink.append(featureCardTextCenterDiv);
      newFeatureCardSection.append(newFeatureCardLink);
      moveInstrumentation(featureCardLink, newFeatureCardLink);
    }
    rootDiv.append(newFeatureCardSection);
    moveInstrumentation(featureCardSection, newFeatureCardSection);
  }

  block.textContent = '';
  block.append(rootDiv);
  block.className = 'featurecards block';
  block.dataset.blockStatus = 'loaded';
}
