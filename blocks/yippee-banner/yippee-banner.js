import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerItems = block.querySelectorAll('[data-aue-model="bannerItem"]');

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('yippee-banner-carousel__container');

  const carouselTrack = document.createElement('div');
  carouselTrack.classList.add('yippee-banner-slick-track');

  bannerItems.forEach((itemNode) => {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('yippee-banner-carousel__item');

    const backgroundImageSrc = itemNode.querySelector('[data-aue-prop="backgroundImage"]')?.getAttribute('src');

    const yippeeBannerItem = document.createElement('div');
    yippeeBannerItem.classList.add('yippee-banner-yippee-banner__item');
    if (backgroundImageSrc) {
      yippeeBannerItem.style.backgroundImage = `url("${backgroundImageSrc}")`;
    }

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('yippee-banner-yippee-banner__item-wrapper');

    const itemImageContainer = document.createElement('div');
    itemImageContainer.classList.add('yippee-banner-yippee-banner__item-image');

    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      const lazyImageContainer = document.createElement('div');
      lazyImageContainer.classList.add('yippee-banner-lazy-image-container');
      lazyImageContainer.append(picture);
      itemImageContainer.append(lazyImageContainer);
      moveInstrumentation(imageElement, lazyImageContainer);
    }

    const playIconElement = itemNode.querySelector('[data-aue-prop="playIcon"]');
    if (playIconElement) {
      const playIconPicture = createOptimizedPicture(playIconElement.src, playIconElement.alt);
      playIconPicture.classList.add('yippee-banner-play-icon');
      const lazyImageContainer = document.createElement('div');
      lazyImageContainer.classList.add('yippee-banner-lazy-image-container');
      lazyImageContainer.append(playIconPicture);
      itemImageContainer.append(lazyImageContainer);
      moveInstrumentation(playIconElement, lazyImageContainer);
    }

    const itemInfo = document.createElement('div');
    itemInfo.classList.add('yippee-banner-yippee-banner__item-info');

    const titleElement = itemNode.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const h1 = document.createElement('h1');
      h1.classList.add('yippee-banner-yippee-banner__item-title');
      h1.textContent = titleElement.textContent;
      itemInfo.append(h1);
      moveInstrumentation(titleElement, h1);
    }

    const descriptionElement = itemNode.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.classList.add('yippee-banner-yippee-banner__item-desc', 'yippee-banner-body-2');
      p.textContent = descriptionElement.textContent;
      itemInfo.append(p);
      moveInstrumentation(descriptionElement, p);
    }

    itemContentWrapper.append(itemImageContainer, itemInfo);
    yippeeBannerItem.append(itemContentWrapper);
    itemWrapper.append(yippeeBannerItem);
    carouselTrack.append(itemWrapper);

    moveInstrumentation(itemNode, itemWrapper);
  });

  carouselContainer.append(carouselTrack);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `yippee-banner block`;
  block.dataset.blockStatus = 'loaded';
}
