import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featurecardsWrapper = document.createElement('div');
  featurecardsWrapper.className = 'featurecards-wrapper';

  const titleDiv = block.querySelector('div[data-aue-prop="title"]');
  if (titleDiv) {
    const featurecardsText = document.createElement('div');
    featurecardsText.id = `text-${Math.random().toString(36).substring(2, 11)}`;
    featurecardsText.className = 'featurecards-text';

    const h1 = document.createElement('h1');
    h1.className = 'featurecards-title';

    const titleText = titleDiv.textContent.trim();
    const lastSpaceIndex = titleText.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
      const firstPart = titleText.substring(0, lastSpaceIndex);
      const lastPart = titleText.substring(lastSpaceIndex + 1);
      h1.textContent = firstPart + ' ';
      const span = document.createElement('span');
      span.className = 'featurecards-title-partial';
      span.textContent = lastPart;
      h1.append(span);
    } else {
      h1.textContent = titleText;
    }

    featurecardsText.append(h1);
    featurecardsWrapper.append(featurecardsText);
    moveInstrumentation(titleDiv, featurecardsText);
  }

  const featureCardItems = block.querySelectorAll('div[data-aue-model="featurecard"]');

  featureCardItems.forEach((itemNode) => {
    const section = document.createElement('section');
    section.className = 'featurecards-section featurecards-card featurecards-mx-auto';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.textContent.trim() : '#';
    const linkTitle = linkElement ? linkElement.getAttribute('title') || 'Explore' : 'Explore';
    const ctaLabel = linkElement ? linkElement.dataset.ctaLabel || 'Explore' : 'Explore';

    const a = document.createElement('a');
    a.className = 'featurecards-link featurecards-d-flex featurecards-flex-column featurecards-text-decoration-none';
    a.href = linkHref;
    a.title = linkTitle;
    a.dataset.ctaLabel = ctaLabel;

    const imageDiv = document.createElement('div');
    imageDiv.className = 'featurecards-image featurecards-w-100 featurecards-pb-4';

    const imgElement = itemNode.querySelector('[data-aue-prop="image"] img');
    if (imgElement) {
      const optimizedPicture = createOptimizedPicture(imgElement.src, imgElement.alt);
      optimizedPicture.querySelector('img').className = 'featurecards-w-100 featurecards-h-100';
      imageDiv.append(optimizedPicture);
      moveInstrumentation(imgElement.closest('[data-aue-prop="image"]'), imageDiv);
    }
    a.append(imageDiv);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.className = 'featurecards-text-center';

    const titleElement = itemNode.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.className = 'featurecards-title-h2 featurecards-boing-text__heading-1';
      h2.textContent = titleElement.textContent.trim();
      textCenterDiv.append(h2);
      moveInstrumentation(titleElement, h2);
    }

    const descriptionElement = itemNode.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const pb5Div = document.createElement('div');
      pb5Div.className = 'featurecards-pb-5';
      const p = document.createElement('p');
      p.className = 'featurecards-desc featurecards-boing-text__body-2 featurecards-text-boing-dark';
      p.textContent = descriptionElement.textContent.trim();
      pb5Div.append(p);
      textCenterDiv.append(pb5Div);
      moveInstrumentation(descriptionElement, pb5Div);
    }

    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.className = 'featurecards-redirected-btn featurecards-d-none';
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.className = 'featurecards-arrow-icon-btn';
    // Assuming the button text comes from the link's text content or a default
    button.textContent = ctaLabel;
    redirectedBtnDiv.append(button);
    textCenterDiv.append(redirectedBtnDiv);

    a.append(textCenterDiv);
    section.append(a);
    featurecardsWrapper.append(section);
    moveInstrumentation(itemNode, section);
  });

  // Bolte Sitare Card Section (d-none) - Replicate the structure for each featurecard
  featureCardItems.forEach((itemNode) => {
    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.textContent.trim() : '#';
    const linkTitle = linkElement ? linkElement.getAttribute('title') || 'Explore' : 'Explore';

    const bolteSitareCardSection = document.createElement('a');
    bolteSitareCardSection.className = 'featurecards-bolte-sitare-card-section featurecards-d-none featurecards-analytics_cta_click featurecards-text-decoration-none';
    bolteSitareCardSection.href = linkHref;
    bolteSitareCardSection.title = linkTitle;
    bolteSitareCardSection.dataset.title = linkTitle;

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'featurecards-bolte-sitare-card-section--wrapper featurecards-d-flex';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'featurecards-bolte-sitare-card-section--img';

    const imgElement = itemNode.querySelector('[data-aue-prop="image"] img');
    if (imgElement) {
      const optimizedPicture = createOptimizedPicture(imgElement.src, imgElement.alt);
      optimizedPicture.querySelector('img').className = 'featurecards-h-100 featurecards-w-100 featurecards-card-img';
      imgDiv.append(optimizedPicture);
    }
    wrapperDiv.append(imgDiv);

    const contentWrapperDiv = document.createElement('div');
    contentWrapperDiv.className = 'featurecards-content-wrapper featurecards-d-flex featurecards-flex-column featurecards-justify-content-between';

    const topContentDiv = document.createElement('div');

    const titleElement = itemNode.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.className = 'featurecards-bolte-sitare-card-section--title featurecards-boing-text__heading-3 featurecards-text-boing-dark';
      h2.textContent = titleElement.textContent.trim();
      topContentDiv.append(h2);
    }

    const descriptionElement = itemNode.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.className = 'featurecards-bolte-sitare-card-section--text featurecards-boing-text__body-3 featurecards-text-boing-dark';
      p.textContent = descriptionElement.textContent.trim();
      topContentDiv.append(p);
    }
    contentWrapperDiv.append(topContentDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'featurecards-bolte-sitare-card-section--btn featurecards-text-white featurecards-boing-text__body-4 featurecards-d-inline-block';
    button.textContent = 'Explore'; // Default text, can be made dynamic if needed
    buttonDiv.append(button);
    contentWrapperDiv.append(buttonDiv);

    wrapperDiv.append(contentWrapperDiv);
    bolteSitareCardSection.append(wrapperDiv);
    featurecardsWrapper.append(bolteSitareCardSection);
  });

  const curveContainer = document.createElement('div');
  curveContainer.className = 'featurecards-curve-container featurecards-d-none';
  featurecardsWrapper.append(curveContainer);

  block.textContent = '';
  block.append(featurecardsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
