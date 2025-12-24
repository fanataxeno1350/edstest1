import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featurecardsContainer = document.createElement('div');
  featurecardsContainer.className = 'featurecards-container';

  const titleWrapper = document.createElement('div');
  titleWrapper.id = 'text-68763da680';
  titleWrapper.className = 'featurecards-text-wrapper';

  const mainTitle = document.createElement('h1');
  mainTitle.className = 'featurecards-title-main';
  const mainTitleText = block.querySelector('h1.featurecards-title-main');
  if (mainTitleText) {
    mainTitle.innerHTML = mainTitleText.innerHTML;
    moveInstrumentation(mainTitleText, mainTitle);
  } else {
    mainTitle.textContent = 'Welcome to ';
    const highlightSpan = document.createElement('span');
    highlightSpan.className = 'featurecards-title-highlight';
    highlightSpan.textContent = 'LetsBoing!';
    mainTitle.append(highlightSpan);
  }
  titleWrapper.append(mainTitle);
  featurecardsContainer.append(titleWrapper);

  const featureCardItems = block.querySelectorAll('[data-aue-model="featurecard"]');
  featureCardItems.forEach((itemNode) => {
    const section = document.createElement('section');
    section.className = 'featurecards-section';

    const linkElement = itemNode.querySelector('a[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkTitle = linkElement ? linkElement.getAttribute('title') || 'Explore' : 'Explore';
    const linkCtaLabel = linkElement ? linkElement.dataset.ctaLabel || 'Explore' : 'Explore';

    const anchor = document.createElement('a');
    anchor.className = 'featurecards-link analytics_cta_click';
    anchor.href = linkHref;
    anchor.title = linkTitle;
    anchor.dataset.ctaLabel = linkCtaLabel;
    if (linkElement) {
      moveInstrumentation(linkElement, anchor);
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'featurecards-image-wrapper';
    const imgElement = itemNode.querySelector('[data-aue-prop="image"]');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]);
      picture.querySelector('img').className = 'featurecards-image';
      imageWrapper.append(picture);
      moveInstrumentation(imgElement, picture.querySelector('img'));
    }
    anchor.append(imageWrapper);

    const contentTextCenter = document.createElement('div');
    contentTextCenter.className = 'featurecards-content-text-center';

    const titleElement = itemNode.querySelector('[data-aue-prop="title"]');
    const h2Title = document.createElement('h2');
    h2Title.className = 'featurecards-title boing--text__heading-1';
    if (titleElement) {
      h2Title.innerHTML = titleElement.innerHTML;
      moveInstrumentation(titleElement, h2Title);
    }
    contentTextCenter.append(h2Title);

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.className = 'featurecards-description-wrapper';
    const descriptionElement = itemNode.querySelector('[data-aue-prop="description"]');
    const pDescription = document.createElement('p');
    pDescription.className = 'featurecards-description boing--text__body-2 text-boing-dark';
    if (descriptionElement) {
      pDescription.innerHTML = descriptionElement.innerHTML;
      moveInstrumentation(descriptionElement, pDescription);
    }
    descriptionWrapper.append(pDescription);
    contentTextCenter.append(descriptionWrapper);

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.className = 'featurecards-redirect-button-wrapper d-none';
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.className = 'featurecards-arrow-icon-btn';
    redirectButtonWrapper.append(button);
    contentTextCenter.append(redirectButtonWrapper);

    anchor.append(contentTextCenter);
    section.append(anchor);
    featurecardsContainer.append(section);
    moveInstrumentation(itemNode, section);
  });

  // Bolte Sitare Card Section (hidden by default)
  featureCardItems.forEach((itemNode) => {
    const linkElement = itemNode.querySelector('a[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkTitle = linkElement ? linkElement.getAttribute('title') || 'Tedhe Medhe Samachar' : 'Tedhe Medhe Samachar';
    const linkDataTitle = linkElement ? linkElement.dataset.title || 'Tedhe Medhe Samachar' : 'Tedhe Medhe Samachar';

    const bolteSitareCardSection = document.createElement('a');
    bolteSitareCardSection.className = 'featurecards-bolte-sitare-card-section analytics_cta_click text-decoration-none d-none';
    bolteSitareCardSection.href = linkHref;
    bolteSitareCardSection.title = linkTitle;
    bolteSitareCardSection.dataset.title = linkDataTitle;

    const bolteSitareCardWrapper = document.createElement('div');
    bolteSitareCardWrapper.className = 'featurecards-bolte-sitare-card-wrapper';

    const bolteSitareCardImgDiv = document.createElement('div');
    bolteSitareCardImgDiv.className = 'featurecards-bolte-sitare-card-img';
    const imgElement = itemNode.querySelector('[data-aue-prop="image"]');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]);
      picture.querySelector('img').className = 'featurecards-card-img';
      bolteSitareCardImgDiv.append(picture);
    }
    bolteSitareCardWrapper.append(bolteSitareCardImgDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'featurecards-content-wrapper';

    const textDiv = document.createElement('div');
    const titleElement = itemNode.querySelector('[data-aue-prop="title"]');
    const h2Title = document.createElement('h2');
    h2Title.className = 'featurecards-bolte-sitare-card-title boing--text__heading-3 text-boing-dark';
    if (titleElement) {
      h2Title.innerHTML = titleElement.innerHTML;
    }
    textDiv.append(h2Title);

    const descriptionElement = itemNode.querySelector('[data-aue-prop="description"]');
    const pDescription = document.createElement('p');
    pDescription.className = 'featurecards-bolte-sitare-card-text boing--text__body-3 text-boing-dark';
    if (descriptionElement) {
      pDescription.innerHTML = descriptionElement.innerHTML;
    }
    textDiv.append(pDescription);
    contentWrapper.append(textDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'featurecards-bolte-sitare-card-btn text-white boing--text__body-4';
    button.textContent = 'Explore';
    buttonDiv.append(button);
    contentWrapper.append(buttonDiv);

    bolteSitareCardWrapper.append(contentWrapper);
    bolteSitareCardSection.append(bolteSitareCardWrapper);
    featurecardsContainer.append(bolteSitareCardSection);
  });

  const curveContainer = document.createElement('div');
  curveContainer.className = 'featurecards-curve-container d-none';
  featurecardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featurecardsContainer);
  block.className = `featurecards block`;
  block.dataset.blockStatus = 'loaded';
}
