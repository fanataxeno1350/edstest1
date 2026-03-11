import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.className = 'featurecards-container';

  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'featurecards-text-wrapper';
  const mainTitle = document.createElement('h1');
  mainTitle.className = 'featurecards-title-main';
  const titleTextNode = block.querySelector('div:first-child > div:first-child');
  if (titleTextNode) {
    const textContent = titleTextNode.textContent.trim();
    const parts = textContent.split('LetsBoing!');
    mainTitle.append(parts[0].trim());
    const highlightSpan = document.createElement('span');
    highlightSpan.className = 'featurecards-title-highlight';
    highlightSpan.textContent = 'LetsBoing!';
    mainTitle.append(highlightSpan);
    if (parts[1]) {
      mainTitle.append(parts[1].trim());
    }
    moveInstrumentation(titleTextNode, mainTitle);
  }
  titleWrapper.append(mainTitle);
  featureCardsContainer.append(titleWrapper);

  const cards = block.querySelectorAll('[data-aue-model="featureCard"]');
  cards.forEach((card) => {
    const section = document.createElement('section');
    section.className = 'featurecards-section featurecards-card-section';

    const link = document.createElement('a');
    link.className = 'featurecards-link analytics_cta_click';

    const linkElement = card.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      const href = linkElement.textContent.trim();
      link.href = href;
      link.title = linkElement.dataset.aueLabel || 'Explore';
      link.setAttribute('data-cta-label', link.title);
      if (href.startsWith('http')) {
        link.target = '_blank';
      }
      moveInstrumentation(linkElement, link);
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'featurecards-image-wrapper featurecards-image-wrapper-pb-4';
    const imgElement = card.querySelector('[data-aue-prop="image"] img');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]);
      picture.querySelector('img').className = 'featurecards-image';
      imageWrapper.append(picture);
      moveInstrumentation(imgElement, picture);
    }
    link.append(imageWrapper);

    const textCenter = document.createElement('div');
    textCenter.className = 'featurecards-text-center';

    const titleElement = document.createElement('h2');
    titleElement.className = 'featurecards-card-title boing--text__heading-1';
    const authoredTitle = card.querySelector('[data-aue-prop="title"]');
    if (authoredTitle) {
      titleElement.innerHTML = authoredTitle.innerHTML;
      moveInstrumentation(authoredTitle, titleElement);
    }
    textCenter.append(titleElement);

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.className = 'featurecards-pb-5';
    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'featurecards-card-desc boing--text__body-2 featurecards-text-boing-dark';
    const authoredDescription = card.querySelector('[data-aue-prop="description"]');
    if (authoredDescription) {
      descriptionElement.innerHTML = authoredDescription.innerHTML;
      moveInstrumentation(authoredDescription, descriptionElement);
    }
    descriptionWrapper.append(descriptionElement);
    textCenter.append(descriptionWrapper);

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'featurecards-redirected-btn featurecards-d-none';
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.className = 'featurecards-arrow-icon-btn';
    // The button text is not explicitly authored in the JSON, it's inferred from the link title
    // For now, we'll leave it empty as per the original HTML's hidden button.
    buttonWrapper.append(button);
    textCenter.append(buttonWrapper);

    link.append(textCenter);
    section.append(link);
    featureCardsContainer.append(section);
    moveInstrumentation(card, section);
  });

  // Bolte Sitare Card Sections (hidden by default)
  cards.forEach((card) => {
    const link = document.createElement('a');
    link.className = 'featurecards-bolte-sitare-card-section featurecards-d-none analytics_cta_click';

    const linkElement = card.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      const href = linkElement.textContent.trim();
      link.href = href;
      link.title = linkElement.dataset.aueLabel || card.querySelector('[data-aue-prop="title"]')?.textContent.trim() || 'Explore';
      link.setAttribute('data-title', link.title);
      if (href.startsWith('http')) {
        link.target = '_blank';
      }
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'featurecards-bolte-sitare-card-section-wrapper';

    const imageDiv = document.createElement('div');
    imageDiv.className = 'featurecards-bolte-sitare-card-section-img';
    const imgElement = card.querySelector('[data-aue-prop="image"] img');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]);
      picture.querySelector('img').className = 'featurecards-card-img';
      imageDiv.append(picture);
    }
    wrapper.append(imageDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'featurecards-content-wrapper featurecards-d-flex featurecards-flex-column featurecards-justify-content-between';

    const textDiv = document.createElement('div');
    const titleElement = document.createElement('h2');
    titleElement.className = 'featurecards-bolte-sitare-card-section-title boing--text__heading-3 featurecards-text-boing-dark';
    const authoredTitle = card.querySelector('[data-aue-prop="title"]');
    if (authoredTitle) {
      titleElement.innerHTML = authoredTitle.innerHTML;
    }
    textDiv.append(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'featurecards-bolte-sitare-card-section-text boing--text__body-3 featurecards-text-boing-dark';
    const authoredDescription = card.querySelector('[data-aue-prop="description"]');
    if (authoredDescription) {
      descriptionElement.innerHTML = authoredDescription.innerHTML;
    }
    textDiv.append(descriptionElement);
    contentWrapper.append(textDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'featurecards-bolte-sitare-card-section-btn featurecards-text-white boing--text__body-4 featurecards-d-inline-block';
    // The button text should come from the link title or a specific button label if available.
    button.textContent = link.getAttribute('data-cta-label') || link.title || 'Explore';
    buttonDiv.append(button);
    contentWrapper.append(buttonDiv);

    wrapper.append(contentWrapper);
    link.append(wrapper);
    featureCardsContainer.append(link);
  });

  const curveContainer = document.createElement('div');
  curveContainer.className = 'featurecards-curve-container featurecards-d-none';
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
