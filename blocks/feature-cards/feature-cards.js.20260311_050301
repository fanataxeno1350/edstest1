import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('featurecards-text-wrapper');
  const h1 = document.createElement('h1');
  h1.classList.add('featurecards-title-main');
  const titleText = block.querySelector('h1.featurecards-title-main');
  if (titleText) {
    const highlightSpan = titleText.querySelector('.featurecards-title-highlight');
    if (highlightSpan) {
      h1.append(titleText.firstChild.cloneNode(true));
      h1.append(highlightSpan.cloneNode(true));
      moveInstrumentation(titleText.firstChild, h1.firstChild);
      moveInstrumentation(highlightSpan, h1.querySelector('.featurecards-title-highlight'));
    } else {
      h1.textContent = titleText.textContent;
    }
    moveInstrumentation(titleText, h1);
  } else {
    h1.textContent = 'Welcome to LetsBoing!';
  }
  titleWrapper.append(h1);
  featureCardsContainer.append(titleWrapper);
  moveInstrumentation(block.querySelector('.featurecards-text-wrapper'), titleWrapper);

  const featureCardItems = block.querySelectorAll('[data-aue-model="featureCard"]');

  featureCardItems.forEach((itemNode) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section', 'featurecards-card-section');

    const link = document.createElement('a');
    link.classList.add('featurecards-link', 'analytics_cta_click');

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      link.href = linkElement.href;
      link.title = linkElement.title || 'Explore';
      link.setAttribute('data-cta-label', linkElement.getAttribute('data-cta-label') || 'Explore');
      if (linkElement.target) {
        link.target = linkElement.target;
      }
      moveInstrumentation(linkElement, link);
    } else {
      link.href = '#';
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('featurecards-image-wrapper', 'featurecards-image-wrapper-pb-4');
    const imgElement = itemNode.querySelector('[data-aue-prop="image"]');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      picture.querySelector('img').classList.add('featurecards-image');
      imageWrapper.append(picture);
      moveInstrumentation(imgElement, picture.querySelector('img'));
    }
    link.append(imageWrapper);

    const textCenter = document.createElement('div');
    textCenter.classList.add('featurecards-text-center');

    const h2 = document.createElement('h2');
    h2.classList.add('featurecards-card-title', 'boing--text__heading-1');
    const titleElement = itemNode.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      h2.textContent = titleElement.textContent;
      moveInstrumentation(titleElement, h2);
    } else {
      h2.textContent = 'Untitled';
    }
    textCenter.append(h2);

    const pb5 = document.createElement('div');
    pb5.classList.add('featurecards-pb-5');
    const p = document.createElement('p');
    p.classList.add('featurecards-card-desc', 'boing--text__body-2', 'featurecards-text-boing-dark');
    const descriptionElement = itemNode.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      p.textContent = descriptionElement.textContent;
      moveInstrumentation(descriptionElement, p);
    } else {
      p.textContent = 'No description available.';
    }
    pb5.append(p);
    textCenter.append(pb5);

    const redirectedBtn = document.createElement('div');
    redirectedBtn.classList.add('featurecards-redirected-btn', 'featurecards-d-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-btn');
    redirectedBtn.append(button);
    textCenter.append(redirectedBtn);

    link.append(textCenter);
    section.append(link);
    featureCardsContainer.append(section);
    moveInstrumentation(itemNode, section);
  });

  const bolteSitareCardItems = block.querySelectorAll('a.featurecards-bolte-sitare-card-section');
  bolteSitareCardItems.forEach((itemNode) => {
    const bolteSitareLink = document.createElement('a');
    bolteSitareLink.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'analytics_cta_click');
    bolteSitareLink.href = itemNode.href;
    bolteSitareLink.title = itemNode.title;
    bolteSitareLink.setAttribute('data-title', itemNode.getAttribute('data-title'));
    if (itemNode.target) {
      bolteSitareLink.target = itemNode.target;
    }

    const wrapper = document.createElement('div');
    wrapper.classList.add('featurecards-bolte-sitare-card-section-wrapper');

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('featurecards-bolte-sitare-card-section-img');
    const img = itemNode.querySelector('img.featurecards-card-img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').classList.add('featurecards-card-img');
      imgDiv.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
    wrapper.append(imgDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');

    const textDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.classList.add('featurecards-bolte-sitare-card-section-title', 'boing--text__heading-3', 'featurecards-text-boing-dark');
    const title = itemNode.querySelector('.featurecards-bolte-sitare-card-section-title');
    if (title) {
      h2.textContent = title.textContent;
      moveInstrumentation(title, h2);
    }
    textDiv.append(h2);

    const p = document.createElement('p');
    p.classList.add('featurecards-bolte-sitare-card-section-text', 'boing--text__body-3', 'featurecards-text-boing-dark');
    const description = itemNode.querySelector('.featurecards-bolte-sitare-card-section-text');
    if (description) {
      p.textContent = description.textContent;
      moveInstrumentation(description, p);
    }
    textDiv.append(p);
    contentWrapper.append(textDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('featurecards-bolte-sitare-card-section-btn', 'featurecards-text-white', 'boing--text__body-4', 'featurecards-d-inline-block');
    const buttonText = itemNode.querySelector('button.featurecards-bolte-sitare-card-section-btn');
    if (buttonText) {
      button.textContent = buttonText.textContent;
      moveInstrumentation(buttonText, button);
    }
    buttonDiv.append(button);
    contentWrapper.append(buttonDiv);

    wrapper.append(contentWrapper);
    bolteSitareLink.append(wrapper);
    featureCardsContainer.append(bolteSitareLink);
    moveInstrumentation(itemNode, bolteSitareLink);
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = `feature-cards block`;
  block.dataset.blockStatus = 'loaded';
}