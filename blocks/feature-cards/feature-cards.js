import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.className = 'featurecards-container';

  const mainTitleWrapper = block.querySelector('[data-aue-prop="mainTitle"]');
  if (mainTitleWrapper) {
    const textWrapper = document.createElement('div');
    textWrapper.id = `text-${Math.random().toString(36).substring(2, 11)}`;
    textWrapper.className = 'featurecards-text-wrapper cmp-text';

    const h1 = document.createElement('h1');
    h1.className = 'featurecards-main-title';
    h1.style.textAlign = 'center';
    h1.innerHTML = mainTitleWrapper.innerHTML;

    textWrapper.append(h1);
    featureCardsContainer.append(textWrapper);
    moveInstrumentation(mainTitleWrapper, textWrapper);
  }

  const cardItems = block.querySelectorAll('[data-aue-model="featureCard"]');
  if (cardItems.length > 0) {
    cardItems.forEach((cardItem) => {
      const section = document.createElement('section');
      section.className = 'featurecards-section featurecards-card-section mx-auto';

      const linkElement = cardItem.querySelector('[data-aue-prop="link"]');
      const linkHref = linkElement ? linkElement.querySelector('a')?.href || linkElement.textContent.trim() : '#';
      const linkTitle = linkElement ? linkElement.querySelector('a')?.title || linkElement.textContent.trim() : '';

      const cardLink = document.createElement('a');
      cardLink.className = 'featurecards-card-link d-flex flex-column analytics_cta_click text-decoration-none';
      cardLink.href = linkHref;
      cardLink.title = linkTitle;
      cardLink.setAttribute('data-cta-label', linkTitle || 'Explore');

      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'featurecards-card-image w-100 pb-4';
      const imgElement = cardItem.querySelector('[data-aue-prop="image"]');
      if (imgElement) {
        imageWrapper.append(createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]));
        moveInstrumentation(imgElement, imageWrapper.querySelector('picture'));
      }

      const textCenterDiv = document.createElement('div');
      textCenterDiv.className = 'text-center';

      const titleElement = cardItem.querySelector('[data-aue-prop="title"]');
      if (titleElement) {
        const h2 = document.createElement('h2');
        h2.className = 'featurecards-card-title boing--text__heading-1';
        h2.innerHTML = titleElement.innerHTML;
        textCenterDiv.append(h2);
        moveInstrumentation(titleElement, h2);
      }

      const descriptionElement = cardItem.querySelector('[data-aue-prop="description"]');
      if (descriptionElement) {
        const pbDiv = document.createElement('div');
        pbDiv.className = 'pb-5';
        const p = document.createElement('p');
        p.className = 'featurecards-card-description boing--text__body-2 text-boing-dark';
        p.innerHTML = descriptionElement.innerHTML;
        pbDiv.append(p);
        textCenterDiv.append(pbDiv);
        moveInstrumentation(descriptionElement, p);
      }

      const redirectedButtonDiv = document.createElement('div');
      redirectedButtonDiv.className = 'featurecards-redirected-button d-none';
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.className = 'featurecards-arrow-icon-btn';
      button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1766555773068.svg+xml'; // Placeholder or actual SVG path
      redirectedButtonDiv.append(button);
      textCenterDiv.append(redirectedButtonDiv);

      cardLink.append(imageWrapper, textCenterDiv);
      section.append(cardLink);
      featureCardsContainer.append(section);
      moveInstrumentation(cardItem, section);
    });
  }

  // Bolte Sitare Card Section (d-none by default)
  if (cardItems.length > 0) {
    cardItems.forEach((cardItem) => {
      const linkElement = cardItem.querySelector('[data-aue-prop="link"]');
      const linkHref = linkElement ? linkElement.querySelector('a')?.href || linkElement.textContent.trim() : '#';
      const linkTitle = linkElement ? linkElement.querySelector('a')?.title || linkElement.textContent.trim() : '';

      const bolteSitareLink = document.createElement('a');
      bolteSitareLink.className = 'featurecards-bolte-sitare-card-section d-none analytics_cta_click text-decoration-none';
      bolteSitareLink.href = linkHref;
      bolteSitareLink.title = linkTitle;
      bolteSitareLink.setAttribute('data-title', linkTitle || 'Explore');

      const bolteSitareWrapper = document.createElement('div');
      bolteSitareWrapper.className = 'featurecards-bolte-sitare-card-wrapper d-flex';

      const bolteSitareImageDiv = document.createElement('div');
      bolteSitareImageDiv.className = 'featurecards-bolte-sitare-card-image';
      const imgElement = cardItem.querySelector('[data-aue-prop="image"]');
      if (imgElement) {
        const img = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]);
        img.querySelector('img').className = 'h-100 w-100 featurecards-card-img';
        bolteSitareImageDiv.append(img);
        moveInstrumentation(imgElement, bolteSitareImageDiv.querySelector('picture'));
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'featurecards-content-wrapper content-wrapper d-flex flex-column justify-content-between';

      const textContentDiv = document.createElement('div');

      const titleElement = cardItem.querySelector('[data-aue-prop="title"]');
      if (titleElement) {
        const h2 = document.createElement('h2');
        h2.className = 'featurecards-bolte-sitare-card-title boing--text__heading-3 text-boing-dark';
        h2.innerHTML = titleElement.innerHTML;
        textContentDiv.append(h2);
        moveInstrumentation(titleElement, h2);
      }

      const descriptionElement = cardItem.querySelector('[data-aue-prop="description"]');
      if (descriptionElement) {
        const p = document.createElement('p');
        p.className = 'featurecards-bolte-sitare-card-text boing--text__body-3 text-boing-dark';
        p.innerHTML = descriptionElement.innerHTML;
        textContentDiv.append(p);
        moveInstrumentation(descriptionElement, p);
      }

      const buttonDiv = document.createElement('div');
      const button = document.createElement('button');
      button.className = 'featurecards-bolte-sitare-card-button text-white boing--text__body-4 d-inline-block';
      button.textContent = 'Explore';
      buttonDiv.append(button);

      contentWrapper.append(textContentDiv, buttonDiv);
      bolteSitareWrapper.append(bolteSitareImageDiv, contentWrapper);
      bolteSitareLink.append(bolteSitareWrapper);
      featureCardsContainer.append(bolteSitareLink);
      moveInstrumentation(cardItem, bolteSitareLink);
    });
  }

  const curveContainer = document.createElement('div');
  curveContainer.className = 'featurecards-curve-container d-none';
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
