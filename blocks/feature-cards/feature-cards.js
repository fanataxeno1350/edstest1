import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  const titleWrapper = block.querySelector('div:first-child');
  if (titleWrapper) {
    const featurecardsTextWrapper = document.createElement('div');
    featurecardsTextWrapper.classList.add('featurecards-text-wrapper');

    const h1 = document.createElement('h1');
    h1.classList.add('featurecards-title-main');

    const titleText = titleWrapper.querySelector('h1, h2, h3, h4, h5, h6');
    if (titleText) {
      h1.innerHTML = titleText.innerHTML;
      moveInstrumentation(titleText, h1);
    }

    featurecardsTextWrapper.append(h1);
    featureCardsContainer.append(featurecardsTextWrapper);
    moveInstrumentation(titleWrapper, featurecardsTextWrapper);
  }

  const cardSections = block.querySelectorAll(':scope > div[data-aue-model="featureCard"]');
  cardSections.forEach((cardSection) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section', 'featurecards-card-section');

    const link = cardSection.querySelector('a');
    const linkElement = document.createElement('a');
    linkElement.classList.add('featurecards-link', 'analytics_cta_click');
    if (link) {
      linkElement.href = link.href;
      linkElement.title = link.title;
      if (link.target) {
        linkElement.target = link.target;
      }
      if (link.dataset.ctaLabel) {
        linkElement.dataset.ctaLabel = link.dataset.ctaLabel;
      }
      moveInstrumentation(link, linkElement);
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('featurecards-image-wrapper', 'featurecards-image-wrapper-pb-4');

    const img = cardSection.querySelector('img[data-aue-prop="image"]');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.classList.add('featurecards-image');
      imageWrapper.append(picture);
      moveInstrumentation(img, picture);
    } else {
      const fallbackImg = cardSection.querySelector('picture img');
      if (fallbackImg) {
        const picture = createOptimizedPicture(fallbackImg.src, fallbackImg.alt);
        picture.classList.add('featurecards-image');
        imageWrapper.append(picture);
        moveInstrumentation(fallbackImg, picture);
      }
    }
    linkElement.append(imageWrapper);

    const textCenter = document.createElement('div');
    textCenter.classList.add('featurecards-text-center');

    const titleElement = cardSection.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-card-title', 'boing--text__heading-1');
      h2.innerHTML = titleElement.innerHTML;
      textCenter.append(h2);
      moveInstrumentation(titleElement, h2);
    }

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('featurecards-pb-5');
    const descriptionElement = cardSection.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.classList.add('featurecards-card-desc', 'boing--text__body-2', 'featurecards-text-boing-dark');
      p.innerHTML = descriptionElement.innerHTML;
      descriptionWrapper.append(p);
      textCenter.append(descriptionWrapper);
      moveInstrumentation(descriptionElement, p);
    }

    const redirectedBtn = document.createElement('div');
    redirectedBtn.classList.add('featurecards-redirected-btn', 'featurecards-d-none');

    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-btn');
    redirectedBtn.append(button);
    textCenter.append(redirectedBtn);

    linkElement.append(textCenter);
    section.append(linkElement);
    featureCardsContainer.append(section);
    moveInstrumentation(cardSection, section);
  });

  // Bolte Sitare Card Section (d-none by default)
  const bolteSitareCardSections = block.querySelectorAll(':scope > div:not([data-aue-model="featureCard"]):not(:first-child)');
  bolteSitareCardSections.forEach((bolteSitareSection) => {
    const link = bolteSitareSection.querySelector('a');
    if (link) {
      const bolteSitareLink = document.createElement('a');
      bolteSitareLink.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'analytics_cta_click');
      bolteSitareLink.href = link.href;
      bolteSitareLink.title = link.title;
      if (link.target) {
        bolteSitareLink.target = link.target;
      }
      if (link.dataset.title) {
        bolteSitareLink.dataset.title = link.dataset.title;
      }

      const wrapper = document.createElement('div');
      wrapper.classList.add('featurecards-bolte-sitare-card-section-wrapper');

      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('featurecards-bolte-sitare-card-section-img');
      const img = link.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.classList.add('featurecards-card-img');
        imgWrapper.append(picture);
        moveInstrumentation(img, picture);
      }
      wrapper.append(imgWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');

      const textDiv = document.createElement('div');
      const title = link.querySelector('h2');
      if (title) {
        const h2 = document.createElement('h2');
        h2.classList.add('featurecards-bolte-sitare-card-section-title', 'boing--text__heading-3', 'featurecards-text-boing-dark');
        h2.innerHTML = title.innerHTML;
        textDiv.append(h2);
        moveInstrumentation(title, h2);
      }

      const description = link.querySelector('p');
      if (description) {
        const p = document.createElement('p');
        p.classList.add('featurecards-bolte-sitare-card-section-text', 'boing--text__body-3', 'featurecards-text-boing-dark');
        p.innerHTML = description.innerHTML;
        textDiv.append(p);
        moveInstrumentation(description, p);
      }
      contentWrapper.append(textDiv);

      const buttonDiv = document.createElement('div');
      const btn = link.querySelector('button');
      if (btn) {
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('featurecards-bolte-sitare-card-section-btn', 'featurecards-text-white', 'boing--text__body-4', 'featurecards-d-inline-block');
        buttonElement.textContent = btn.textContent;
        buttonDiv.append(buttonElement);
        moveInstrumentation(btn, buttonElement);
      }
      contentWrapper.append(buttonDiv);

      wrapper.append(contentWrapper);
      bolteSitareLink.append(wrapper);
      featureCardsContainer.append(bolteSitareLink);
      moveInstrumentation(bolteSitareSection, bolteSitareLink);
    }
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = `feature-cards block`;
  block.dataset.blockStatus = 'loaded';
}