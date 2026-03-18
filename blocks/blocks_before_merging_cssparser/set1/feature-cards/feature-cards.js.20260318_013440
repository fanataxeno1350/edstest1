import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('feature-cards-main');

  const titleContainer = block.querySelector('div:first-child > div');
  if (titleContainer) {
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('feature-cards-title');
    moveInstrumentation(titleContainer, titleDiv);
    titleDiv.append(...titleContainer.children);
    mainDiv.append(titleDiv);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('feature-cards-wrapper');

  const featureCards = block.querySelectorAll('[data-aue-model="featureCard"]');
  featureCards.forEach((cardNode) => {
    const cardSection = document.createElement('section');
    cardSection.classList.add('d-block', 'featureCards-feature_card--Section', 'featureCards-feature_card', 'mx-auto');

    const linkElement = cardNode.querySelector('a');
    if (linkElement) {
      const newLink = document.createElement('a');
      newLink.classList.add('d-flex', 'flex-column', 'analytics_cta_click', 'text-decoration-none');
      newLink.href = linkElement.href;
      if (linkElement.title) newLink.title = linkElement.title;
      if (linkElement.target) newLink.target = linkElement.target;
      if (linkElement.dataset.ctaLabel) newLink.dataset.ctaLabel = linkElement.dataset.ctaLabel;

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featureCards-feature_card--image', 'w-100', 'pb-4');
      const img = cardNode.querySelector('[data-aue-prop="image"]');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        imageWrapper.append(picture);
        moveInstrumentation(img, picture);
      }
      newLink.append(imageWrapper);

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('text-center');

      const titleElement = cardNode.querySelector('[data-aue-prop="title"]');
      if (titleElement) {
        const h2 = document.createElement('h2');
        h2.classList.add('featureCards-feature_card--title', 'boing--text__heading-1');
        h2.textContent = titleElement.textContent.trim();
        textCenterDiv.append(h2);
        moveInstrumentation(titleElement, h2);
      }

      const descDiv = document.createElement('div');
      descDiv.classList.add('pb-5');
      const descriptionElement = cardNode.querySelector('[data-aue-prop="description"]');
      if (descriptionElement) {
        const p = document.createElement('p');
        p.classList.add('featureCards-feature_card--desc', 'boing--text__body-2', 'text-boing-dark');
        p.textContent = descriptionElement.textContent.trim();
        descDiv.append(p);
        moveInstrumentation(descriptionElement, p);
      }
      textCenterDiv.append(descDiv);

      const redirectedBtnDiv = document.createElement('div');
      redirectedBtnDiv.classList.add('featureCards-redirected_btn', 'd-none');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featureCards-arrow-icon-btn');
      // Assuming the button content is static or from a different source not in JSON
      // For now, it's hardcoded based on the sample HTML
      button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773821148332.svg+xml';
      redirectedBtnDiv.append(button);
      textCenterDiv.append(redirectedBtnDiv);

      newLink.append(textCenterDiv);
      cardSection.append(newLink);
      moveInstrumentation(linkElement, newLink);
    }
    cardsWrapper.append(cardSection);
    moveInstrumentation(cardNode, cardSection);
  });

  mainDiv.append(cardsWrapper);

  const bolteSitareCards = block.querySelectorAll('a.featureCards-bolteSitare_cardSection');
  if (bolteSitareCards.length > 0) {
    const bolteSitareWrapper = document.createElement('div');
    bolteSitareWrapper.classList.add('feature-cards-bolte-sitare-wrapper');
    bolteSitareCards.forEach((cardNode) => {
      const newLink = document.createElement('a');
      newLink.classList.add('d-none', 'featureCards-bolteSitare_cardSection', 'analytics_cta_click', 'text-decoration-none');
      newLink.href = cardNode.href;
      if (cardNode.title) newLink.title = cardNode.title;
      if (cardNode.target) newLink.target = cardNode.target;
      if (cardNode.dataset.title) newLink.dataset.title = cardNode.dataset.title;

      const wrapperDiv = document.createElement('div');
      wrapperDiv.classList.add('d-flex', 'featureCards-bolteSitare_cardSection--wrapper');

      const imgDiv = document.createElement('div');
      imgDiv.classList.add('featureCards-bolteSitare_cardSection--img');
      const img = cardNode.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('h-100', 'w-100', 'featureCards-card-img');
        imgDiv.append(picture);
        moveInstrumentation(img, picture);
      }
      wrapperDiv.append(imgDiv);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featureCards-content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');

      const textContentDiv = document.createElement('div');
      const h2 = document.createElement('h2');
      h2.classList.add('featureCards-bolteSitare_cardSection--title', 'boing--text__heading-3', 'text-boing-dark');
      h2.textContent = cardNode.querySelector('h2').textContent.trim();
      textContentDiv.append(h2);

      const p = document.createElement('p');
      p.classList.add('featureCards-bolteSitare_cardSection--text', 'boing--text__body-3', 'text-boing-dark');
      p.textContent = cardNode.querySelector('p').textContent.trim();
      textContentDiv.append(p);
      contentWrapper.append(textContentDiv);

      const buttonDiv = document.createElement('div');
      const button = document.createElement('button');
      button.classList.add('featureCards-bolteSitare_cardSection--btn', 'text-white', 'boing--text__body-4', 'd-inline-block');
      button.textContent = cardNode.querySelector('button').textContent.trim();
      buttonDiv.append(button);
      contentWrapper.append(buttonDiv);

      wrapperDiv.append(contentWrapper);
      newLink.append(wrapperDiv);
      bolteSitareWrapper.append(newLink);
      moveInstrumentation(cardNode, newLink);
    });
    mainDiv.append(bolteSitareWrapper);
  }

  const curveContainer = block.querySelector('.featureCards-curve-container');
  if (curveContainer) {
    const newCurveContainer = document.createElement('div');
    newCurveContainer.classList.add('featureCards-curve-container', 'd-none');
    mainDiv.append(newCurveContainer);
    moveInstrumentation(curveContainer, newCurveContainer);
  }

  block.textContent = '';
  block.append(mainDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
