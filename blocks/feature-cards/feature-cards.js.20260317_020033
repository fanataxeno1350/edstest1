import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('featureCards-container');

  const textDiv = document.querySelector('.featureCards-text');
  if (textDiv) {
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('featureCards-header');
    const h1 = textDiv.querySelector('h1');
    if (h1) {
      headerDiv.append(h1);
      moveInstrumentation(textDiv, headerDiv);
      rootDiv.append(headerDiv);
    }
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featureCards-wrapper');

  const authoredCards = block.querySelectorAll('a.featureCards-bolteSitare_cardSection');

  authoredCards.forEach((cardLink) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('featureCards-card');

    const link = document.createElement('a');
    link.classList.add('featureCards-bolteSitare_cardSection', 'featureCards-analytics_cta_click', 'featureCards-text-decoration-none');
    link.href = cardLink.href;
    if (cardLink.title) {
      link.title = cardLink.title;
    }
    if (cardLink.dataset.title) {
      link.dataset.title = cardLink.dataset.title;
    }
    if (cardLink.target) {
      link.target = cardLink.target;
    }

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('featureCards-bolteSitare_cardSection--wrapper');

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('featureCards-bolteSitare_cardSection--img');
    const img = cardLink.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      imgWrapper.append(picture);
      picture.querySelector('img').classList.add('featureCards-h-100', 'featureCards-w-100', 'featureCards-card-img');
      moveInstrumentation(img, picture);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featureCards-content-wrapper', 'featureCards-d-flex', 'featureCards-flex-column', 'featureCards-justify-content-between');

    const textContentDiv = document.createElement('div');
    const title = cardLink.querySelector('h2.featureCards-bolteSitare_cardSection--title');
    if (title) {
      textContentDiv.append(title);
    }
    const description = cardLink.querySelector('p.featureCards-bolteSitare_cardSection--text');
    if (description) {
      textContentDiv.append(description);
    }

    const buttonDiv = document.createElement('div');
    const button = cardLink.querySelector('button.featureCards-bolteSitare_cardSection--btn');
    if (button) {
      buttonDiv.append(button);
    }

    contentWrapper.append(textContentDiv, buttonDiv);
    cardWrapper.append(imgWrapper, contentWrapper);
    link.append(cardWrapper);
    cardDiv.append(link);
    cardsWrapper.append(cardDiv);
    moveInstrumentation(cardLink, cardDiv);
  });

  rootDiv.append(cardsWrapper);

  const curveContainer = block.querySelector('.featureCards-curve-container');
  if (curveContainer) {
    rootDiv.append(curveContainer);
    moveInstrumentation(curveContainer, rootDiv);
  }

  const featureCardSection = block.querySelector('section.featureCards-feature_card--Section');
  if (featureCardSection) {
    const featureCardDiv = document.createElement('div');
    featureCardDiv.classList.add('featureCards-feature_card--Section', 'featureCards-feature_card', 'featureCards-mx-auto');

    const featureCardLink = featureCardSection.querySelector('a');
    if (featureCardLink) {
      const linkElement = document.createElement('a');
      linkElement.classList.add('featureCards-d-flex', 'featureCards-flex-column', 'featureCards-analytics_cta_click', 'featureCards-text-decoration-none');
      linkElement.href = featureCardLink.href;
      if (featureCardLink.title) {
        linkElement.title = featureCardLink.title;
      }
      if (featureCardLink.dataset.ctaLabel) {
        linkElement.dataset.ctaLabel = featureCardLink.dataset.ctaLabel;
      }

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featureCards-feature_card--image', 'featureCards-w-100', 'featureCards-pb-4');
      const featureImg = featureCardLink.querySelector('img');
      if (featureImg) {
        const picture = createOptimizedPicture(featureImg.src, featureImg.alt);
        imageWrapper.append(picture);
        picture.querySelector('img').classList.add('featureCards-w-100', 'featureCards-h-100');
        moveInstrumentation(featureImg, picture);
      }

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('featureCards-text-center');

      const featureTitle = featureCardLink.querySelector('h2.featureCards-feature_card--title');
      if (featureTitle) {
        textCenterDiv.append(featureTitle);
      }

      const pb5Div = document.createElement('div');
      pb5Div.classList.add('featureCards-pb-5');
      const featureDesc = featureCardLink.querySelector('p.featureCards-feature_card--desc');
      if (featureDesc) {
        pb5Div.append(featureDesc);
      }
      textCenterDiv.append(pb5Div);

      const redirectedBtn = featureCardLink.querySelector('.featureCards-redirected_btn');
      if (redirectedBtn) {
        textCenterDiv.append(redirectedBtn);
      }

      linkElement.append(imageWrapper, textCenterDiv);
      featureCardDiv.append(linkElement);
      rootDiv.append(featureCardDiv);
      moveInstrumentation(featureCardSection, featureCardDiv);
    }
  }

  block.textContent = '';
  block.append(rootDiv);
  block.className = `feature-cards block`;
  block.dataset.blockStatus = 'loaded';
}
