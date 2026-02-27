import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.className = 'featurecards-wrapper';

  const titleContainer = block.querySelector('div[data-aue-prop="title"]');
  if (titleContainer) {
    const featurecardsText = document.createElement('div');
    featurecardsText.className = 'featurecards-text';
    featurecardsText.id = `text-${Math.random().toString(36).substring(2, 9)}`; // Generate a unique ID

    const h1 = document.createElement('h1');
    h1.className = 'featurecards-title';

    const titleText = titleContainer.querySelector('h1, h2, h3, h4, h5, h6, p');
    if (titleText) {
      const textContent = titleText.textContent.trim();
      const lastSpaceIndex = textContent.lastIndexOf(' ');

      if (lastSpaceIndex !== -1) {
        const firstPart = document.createTextNode(textContent.substring(0, lastSpaceIndex + 1));
        const spanPart = document.createElement('span');
        spanPart.className = 'featurecards-title-partial';
        spanPart.textContent = textContent.substring(lastSpaceIndex + 1);
        h1.append(firstPart, spanPart);
      } else {
        h1.textContent = textContent;
      }
    }
    featurecardsText.append(h1);
    moveInstrumentation(titleContainer, featurecardsText);
    featureCardsWrapper.append(featurecardsText);
  }

  const featureCardElements = block.querySelectorAll('div[data-aue-model="featureCard"]');

  featureCardElements.forEach((featureCardElement) => {
    const linkElement = featureCardElement.querySelector('[data-aue-prop="link"]');
    const imageElement = featureCardElement.querySelector('[data-aue-prop="image"]');
    const titleElement = featureCardElement.querySelector('[data-aue-prop="title"]');
    const descriptionElement = featureCardElement.querySelector('[data-aue-prop="description"]');

    const section = document.createElement('section');
    section.className = 'featurecards-section featurecards-card featurecards-mx-auto';

    const a = document.createElement('a');
    a.className = 'featurecards-link featurecards-d-flex featurecards-flex-column featurecards-text-decoration-none';
    a.setAttribute('title', 'Explore');
    a.setAttribute('data-cta-label', 'Explore');

    if (linkElement) {
      const link = linkElement.querySelector('a');
      if (link) {
        a.href = link.href;
        a.setAttribute('title', link.title || 'Explore');
        a.setAttribute('data-cta-label', link.textContent.trim() || 'Explore');
      } else {
        // Fallback for missing <a> tag within data-aue-prop="link"
        const linkText = linkElement.textContent.trim();
        if (linkText.startsWith('/') || linkText.startsWith('http')) {
          a.href = linkText;
        }
      }
    }

    const imageDiv = document.createElement('div');
    imageDiv.className = 'featurecards-image featurecards-w-100 featurecards-pb-4';

    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        imageDiv.append(optimizedPicture);
      } else {
        // Fallback for missing <img> tag within data-aue-prop="image"
        const fallbackImg = document.createElement('img');
        fallbackImg.src = imageElement.textContent.trim();
        fallbackImg.alt = ''; // Default alt text
        fallbackImg.className = 'featurecards-w-100 featurecards-h-100';
        imageDiv.append(fallbackImg);
      }
      moveInstrumentation(imageElement, imageDiv);
    }
    a.append(imageDiv);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.className = 'featurecards-text-center';

    const h2 = document.createElement('h2');
    h2.className = 'featurecards-title-h2 featurecards-boing-text__heading-1';
    if (titleElement) {
      const titleText = titleElement.querySelector('h1, h2, h3, h4, h5, h6, p');
      h2.textContent = titleText ? titleText.textContent.trim() : titleElement.textContent.trim();
      moveInstrumentation(titleElement, h2);
    }
    textCenterDiv.append(h2);

    const pb5Div = document.createElement('div');
    pb5Div.className = 'featurecards-pb-5';
    const pDesc = document.createElement('p');
    pDesc.className = 'featurecards-desc featurecards-boing-text__body-2 featurecards-text-boing-dark';
    if (descriptionElement) {
      const descText = descriptionElement.querySelector('p');
      pDesc.textContent = descText ? descText.textContent.trim() : descriptionElement.textContent.trim();
      moveInstrumentation(descriptionElement, pDesc);
    }
    pb5Div.append(pDesc);
    textCenterDiv.append(pb5Div);

    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.className = 'featurecards-redirected-btn featurecards-d-none';
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.className = 'featurecards-arrow-icon-btn';
    // The button content is an SVG path, which is not directly from a field.
    // We'll keep it as a placeholder or remove if not needed.
    button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1761293302381.svg+xml';
    redirectedBtnDiv.append(button);
    textCenterDiv.append(redirectedBtnDiv);

    a.append(textCenterDiv);
    section.append(a);
    moveInstrumentation(featureCardElement, section);
    featureCardsWrapper.append(section);
  });

  // Bolte Sitare Card Section (d-none in the provided HTML, but structured here for completeness)
  featureCardElements.forEach((featureCardElement) => {
    const linkElement = featureCardElement.querySelector('[data-aue-prop="link"]');
    const imageElement = featureCardElement.querySelector('[data-aue-prop="image"]');
    const titleElement = featureCardElement.querySelector('[data-aue-prop="title"]');
    const descriptionElement = featureCardElement.querySelector('[data-aue-prop="description"]');

    const bolteSitareCardSection = document.createElement('a');
    bolteSitareCardSection.className = 'featurecards-bolte-sitare-card-section featurecards-d-none featurecards-analytics_cta_click featurecards-text-decoration-none';

    if (linkElement) {
      const link = linkElement.querySelector('a');
      if (link) {
        bolteSitareCardSection.href = link.href;
        bolteSitareCardSection.title = link.title || '';
        bolteSitareCardSection.setAttribute('data-title', link.title || '');
      } else {
        const linkText = linkElement.textContent.trim();
        if (linkText.startsWith('/') || linkText.startsWith('http')) {
          bolteSitareCardSection.href = linkText;
        }
      }
    }

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'featurecards-bolte-sitare-card-section--wrapper featurecards-d-flex';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'featurecards-bolte-sitare-card-section--img';
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const fallbackImg = document.createElement('img');
        fallbackImg.src = img.src;
        fallbackImg.alt = img.alt;
        fallbackImg.className = 'featurecards-h-100 featurecards-w-100 featurecards-card-img';
        imgDiv.append(fallbackImg);
      }
      // No moveInstrumentation here as this is a 'd-none' section and primary instrumentation is on the main card
    }
    wrapperDiv.append(imgDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'featurecards-content-wrapper featurecards-d-flex featurecards-flex-column featurecards-justify-content-between';

    const textDiv = document.createElement('div');
    const h2Title = document.createElement('h2');
    h2Title.className = 'featurecards-bolte-sitare-card-section--title featurecards-boing-text__heading-3 featurecards-text-boing-dark';
    if (titleElement) {
      const titleText = titleElement.querySelector('h1, h2, h3, h4, h5, h6, p');
      h2Title.textContent = titleText ? titleText.textContent.trim() : titleElement.textContent.trim();
    }
    textDiv.append(h2Title);

    const pText = document.createElement('p');
    pText.className = 'featurecards-bolte-sitare-card-section--text featurecards-boing-text__body-3 featurecards-text-boing-dark';
    if (descriptionElement) {
      const descText = descriptionElement.querySelector('p');
      pText.textContent = descText ? descText.textContent.trim() : descriptionElement.textContent.trim();
    }
    textDiv.append(pText);
    contentWrapper.append(textDiv);

    const btnDiv = document.createElement('div');
    const exploreButton = document.createElement('button');
    exploreButton.className = 'featurecards-bolte-sitare-card-section--btn featurecards-text-white featurecards-boing-text__body-4 featurecards-d-inline-block';
    exploreButton.textContent = 'Explore';
    btnDiv.append(exploreButton);
    contentWrapper.append(btnDiv);

    wrapperDiv.append(contentWrapper);
    bolteSitareCardSection.append(wrapperDiv);
    featureCardsWrapper.append(bolteSitareCardSection);
  });

  const curveContainer = document.createElement('div');
  curveContainer.className = 'featurecards-curve-container featurecards-d-none';
  featureCardsWrapper.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
