import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const socialMediaCmpSocial = document.createElement('div');
  socialMediaCmpSocial.classList.add('social-media-cmp-social');

  // Title Container
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('social-media-cmp-social__title-container');

  const socialMediaTitle = document.createElement('div');
  socialMediaTitle.classList.add('social-media-title', 'social-media-cmp-social__title');
  const socialMediaCmpTitle = document.createElement('div');
  socialMediaCmpTitle.classList.add('social-media-cmp-title', 'social-media-title-star-icon');
  const titleText = block.querySelector('[data-title]');
  if (titleText) {
    const h2 = document.createElement('h2');
    h2.classList.add('social-media-cmp-title__text');
    h2.textContent = titleText.textContent;
    moveInstrumentation(titleText, h2);
    socialMediaCmpTitle.append(h2);
  }
  socialMediaTitle.append(socialMediaCmpTitle);
  titleContainer.append(socialMediaTitle);

  const socialMediaText = document.createElement('div');
  socialMediaText.classList.add('social-media-text', 'social-media-cmp-social__sub-title', 'social-media-body-3');
  const socialMediaCmpText = document.createElement('div');
  socialMediaCmpText.classList.add('social-media-cmp-text');
  const subtitleP = block.querySelector('.social-media-text p');
  if (subtitleP) {
    socialMediaCmpText.append(subtitleP);
    moveInstrumentation(subtitleP, socialMediaCmpText);
  }
  socialMediaText.append(socialMediaCmpText);
  titleContainer.append(socialMediaText);

  socialMediaCmpSocial.append(titleContainer);

  // Card Container
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('social-media-cmp-social__card-container', 'social-media-cmp-social__card-container--anchor');

  const cardColumns = block.querySelectorAll('.social-media-cmp-social__card-column');
  cardColumns.forEach((column) => {
    const newColumn = document.createElement('div');
    newColumn.classList.add('social-media-cmp-social__card-column');

    const cardLinks = column.querySelectorAll('a');
    cardLinks.forEach((link) => {
      const img = link.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.append(picture);
        newColumn.append(newLink);
        moveInstrumentation(link, newLink);
      }
    });
    cardContainer.append(newColumn);
    moveInstrumentation(column, newColumn);
  });

  socialMediaCmpSocial.append(cardContainer);

  // Button
  const socialMediaSocialButton = document.createElement('div');
  socialMediaSocialButton.classList.add('social-media-socialButton', 'social-media-button', 'social-media-cmp-button--primary-anchor');
  const buttonLink = block.querySelector('.social-media-socialButton a');
  if (buttonLink) {
    const newButtonLink = document.createElement('a');
    newButtonLink.id = buttonLink.id;
    newButtonLink.classList.add('social-media-cmp-button');
    if (buttonLink.dataset.request) {
      newButtonLink.dataset.request = buttonLink.dataset.request;
    }
    newButtonLink.href = buttonLink.href;
    if (buttonLink.target) {
      newButtonLink.target = buttonLink.target;
    }

    const spanText = buttonLink.querySelector('.social-media-cmp-button__text');
    if (spanText) {
      newButtonLink.append(spanText);
      moveInstrumentation(spanText, newButtonLink);
    }
    socialMediaSocialButton.append(newButtonLink);
    moveInstrumentation(buttonLink, newButtonLink);
  }
  socialMediaCmpSocial.append(socialMediaSocialButton);

  // Gradient
  const gradient = document.createElement('div');
  gradient.classList.add('social-media-cmp-social__gradient');
  socialMediaCmpSocial.append(gradient);

  block.textContent = '';
  block.append(socialMediaCmpSocial);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
