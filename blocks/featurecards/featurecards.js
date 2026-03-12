import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featurecardsWrapper = document.createElement('div');
  featurecardsWrapper.classList.add('featurecards-wrapper');

  const titleContainer = document.createElement('div');
  titleContainer.id = 'text-68763da680';
  titleContainer.classList.add('featurecards-text-container');
  const titleElement = document.createElement('h1');
  titleElement.classList.add('featurecards-title');

  const authoredTitle = block.querySelector('h1');
  if (authoredTitle) {
    const titleText = authoredTitle.textContent.split('LetsBoing!');
    const spanElement = document.createElement('span');
    spanElement.classList.add('featurecards-title-highlight');
    spanElement.textContent = 'LetsBoing!';
    titleElement.append(titleText[0].trim(), spanElement);
    if (titleText[1]) {
      titleElement.append(titleText[1].trim());
    }
    moveInstrumentation(authoredTitle, titleElement);
  } else {
    titleElement.textContent = 'Welcome to ';
    const spanElement = document.createElement('span');
    spanElement.classList.add('featurecards-title-highlight');
    spanElement.textContent = 'LetsBoing!';
    titleElement.append(spanElement);
  }
  titleContainer.append(titleElement);
  featurecardsWrapper.append(titleContainer);

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container');

  const featureCardItems = block.querySelectorAll('[data-aue-model="featurecard"]');
  const boltesitareCardSectionWrapper = document.createElement('div');
  boltesitareCardSectionWrapper.classList.add('featurecards-boltesitare-card-section-wrapper');

  featureCardItems.forEach((itemNode) => {
    const linkElement = itemNode.querySelector('a');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkTitle = linkElement ? linkElement.title : '';
    const linkTarget = linkElement ? linkElement.target : '_self';
    const linkDataTitle = linkElement ? linkElement.dataset.title : '';

    const cardLink = document.createElement('a');
    cardLink.classList.add('featurecards-boltesitare-card-section', 'featurecards-analytics-cta-click', 'featurecards-text-decoration-none');
    cardLink.href = linkHref;
    cardLink.title = linkTitle;
    cardLink.target = linkTarget;
    cardLink.dataset.title = linkDataTitle;

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('featurecards-boltesitare-card-section--wrapper');

    const cardImgContainer = document.createElement('div');
    cardImgContainer.classList.add('featurecards-boltesitare-card-section--img');

    const imgElement = itemNode.querySelector('[data-aue-prop="image"]');
    if (imgElement && imgElement.src) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt || '', false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('featurecards-card-img');
      cardImgContainer.append(picture);
      moveInstrumentation(imgElement, picture);
    }
    cardWrapper.append(cardImgContainer);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper');

    const textContentDiv = document.createElement('div');
    const title = itemNode.querySelector('[data-aue-prop="title"]');
    if (title) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-boltesitare-card-section--title', 'featurecards-boing--text__heading-3', 'featurecards-text-boing-dark');
      h2.append(...title.childNodes);
      textContentDiv.append(h2);
      moveInstrumentation(title, h2);
    }

    const description = itemNode.querySelector('[data-aue-prop="description"]');
    if (description) {
      const p = document.createElement('p');
      p.classList.add('featurecards-boltesitare-card-section--text', 'featurecards-boing--text__body-3', 'featurecards-text-boing-dark');
      p.append(...description.childNodes);
      textContentDiv.append(p);
      moveInstrumentation(description, p);
    }
    contentWrapper.append(textContentDiv);

    const buttonDiv = document.createElement('div');
    const buttonText = itemNode.querySelector('[data-aue-prop="buttonText"]');
    if (buttonText) {
      const button = document.createElement('button');
      button.classList.add('featurecards-boltesitare-card-section--btn', 'featurecards-text-white', 'featurecards-boing--text__body-4');
      button.textContent = buttonText.textContent.trim();
      buttonDiv.append(button);
      moveInstrumentation(buttonText, button);
    }
    contentWrapper.append(buttonDiv);

    cardWrapper.append(contentWrapper);
    cardLink.append(cardWrapper);
    boltesitareCardSectionWrapper.append(cardLink);
    moveInstrumentation(itemNode, cardLink);
  });
  featurecardsWrapper.append(boltesitareCardSectionWrapper);
  featurecardsWrapper.append(curveContainer);

  const featureCardSectionWrapper = document.createElement('div');
  featureCardSectionWrapper.classList.add('featurecards-card-section-wrapper');
  featureCardItems.forEach((itemNode) => {
    const linkElement = itemNode.querySelector('a');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkTitle = linkElement ? linkElement.title : '';
    const linkTarget = linkElement ? linkElement.target : '_self';
    const linkCtaLabel = linkElement ? linkElement.dataset.ctaLabel : '';

    const section = document.createElement('section');
    section.classList.add('featurecards-card-section', 'featurecards-feature_card', 'featurecards-mx-auto');

    const cardLink = document.createElement('a');
    cardLink.classList.add('featurecards-flex-column', 'featurecards-analytics-cta-click', 'featurecards-text-decoration-none');
    cardLink.href = linkHref;
    cardLink.title = linkTitle;
    cardLink.target = linkTarget;
    cardLink.dataset.ctaLabel = linkCtaLabel;

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('featurecards-feature_card--image', 'featurecards-w-100', 'featurecards-pb-4');

    const imgElement = itemNode.querySelector('[data-aue-prop="image"]');
    if (imgElement && imgElement.src) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt || '', false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('featurecards-w-100', 'featurecards-h-100');
      imageDiv.append(picture);
      moveInstrumentation(imgElement, picture);
    }
    cardLink.append(imageDiv);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.classList.add('featurecards-text-center');

    const title = itemNode.querySelector('[data-aue-prop="title"]');
    if (title) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-feature_card--title', 'featurecards-boing--text__heading-1');
      h2.append(...title.childNodes);
      textCenterDiv.append(h2);
      moveInstrumentation(title, h2);
    }

    const pb5Div = document.createElement('div');
    pb5Div.classList.add('featurecards-pb-5');
    const description = itemNode.querySelector('[data-aue-prop="description"]');
    if (description) {
      const p = document.createElement('p');
      p.classList.add('featurecards-feature_card--desc', 'featurecards-boing--text__body-2', 'featurecards-text-boing-dark');
      p.append(...description.childNodes);
      pb5Div.append(p);
      moveInstrumentation(description, p);
    }
    textCenterDiv.append(pb5Div);

    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.classList.add('featurecards-redirected_btn', 'featurecards-d-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-btn');
    // Assuming button content is static or not provided in JSON for this button
    button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773311859075.svg+xml';
    redirectedBtnDiv.append(button);
    textCenterDiv.append(redirectedBtnDiv);

    cardLink.append(textCenterDiv);
    section.append(cardLink);
    featureCardSectionWrapper.append(section);
    moveInstrumentation(itemNode, section);
  });
  featurecardsWrapper.append(featureCardSectionWrapper);

  block.textContent = '';
  block.append(featurecardsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}